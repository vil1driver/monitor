<!-- Javascript for Domoticz frontpage -->
<!-- Create popup -->
var tempo;
function lightbox_open(id, timeout, txt){
		window.scrollTo(0,0);
		if (typeof txt != 'undefined') {
			$('#popup_'+id).html('<div>'+txt+'</div>');
		}
        $('#popup_'+id).fadeIn('fast');
		$('#fade').fadeIn('fast');
		tempo = setTimeout(function() {lightbox_close(id);}, timeout);
}

<!-- Close popup -->
function lightbox_close(id){
        $('#popup_'+id).fadeOut('fast');
        $('#fade').fadeOut('fast');
		clearTimeout(tempo);
}

<!-- show security panel -->
function showPanel() {
$('#popup_secpanel').html('<object type="text/html" data="'+$.domoticzurl+'/secpanel/index.html" width="100%" height="100%"></object>');
$('#popup_secpanel').fadeIn('fast');
$('#fade').fadeIn('fast');
$('#fade').click(function(){closePanel();});
tempo = setTimeout(function(){closePanel();},60000);
}

<!-- close security panel -->
function closePanel() {
$('#popup_secpanel').fadeOut('fast');
$('#fade').fadeOut('fast');
$("#fade").off("click");
$('#popup_secpanel').html('');
clearTimeout(tempo);
}

<!-- Load meteo widget -->
function LoadMeteoWidget() {
	setTimeout(function(){
	if (city == '') {
		$('#popup_meteo').html('<div onClick="lightbox_close(\'meteo\');" width="650" height="250" valign="center" line-height="15px">Veuillez indiquer votre ville dans les paramètres<br>exemple:<br>var city = \'paris\'</div>');	
	}else{
		$('#popup_meteo').html('<img src="http://www.prevision-meteo.ch/uploads/widget/'+city+'_0.png#' + new Date().getTime()+'" onClick="lightbox_close(\'meteo\');" width="650" height="250" alt="Ville inconnue..">');
	}	
	setInterval(LoadMeteoWidget, 7200000); 	// rechargement toutes les 2 heures
	}, 3000);	// tempo de 3s avant d'aller chercher l'image
}

<!-- blink alarm value -->
function show(cell){document.getElementById(cell).style.visibility = "visible";}
function hide(cell){document.getElementById(cell).style.visibility = "hidden";} 
 
var var_sunrise='';	
var var_sunset='';

<!-- Main Frontpage fuction -->
function RefreshData()
{
        clearInterval($.refreshTimer);
		
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
		
	//Get sunrise/sunset
	
	var timeurl=$.domoticzurl+"/json.htm?type=command&param=getSunRiseSet&jsoncallback=?";
	$.getJSON(timeurl,
	{
		format: "json"
	},
	function(data) {
		if (typeof data != 'undefined') {
                        $.each(data, function(i,item){
				if ( i == 'Sunrise' ) {
					//console.log("Opgang: ", item);
					var_sunrise = item;
					
				}
				else if ( i == 'Sunset' ) {
					//console.log("Ondergang: ", item);
					var_sunset = item;
					
				}
				
			});
		}
		else {
		  console.log('Undefined');
		}	
	});

	
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	
		
		// affichage de la partie switch
        var jurl=$.domoticzurl+"/json.htm?type=devices&plan="+$.roomplan+"&jsoncallback=?";
        $.getJSON(jurl,
        {
                format: "json"
        },
        function(data) {
                if (typeof data.result != 'undefined') {
     
						$.each(data.result, function(i,item){
                                for( var ii = 0, len = $.PageArray.length; ii < len; ii++ ) {
                                        if( $.PageArray[ii][0] === item.idx ) {         				// Domoticz idx number
                                                var vtype=      $.PageArray[ii][1];             		// Domotitcz type (like Temp, Humidity)
                                                var vlabel=     $.PageArray[ii][2];                     // cell number from HTML layout
                                                var vdesc=      $.PageArray[ii][3];                     // description
												var lastseen=   $.PageArray[ii][4];						//Display lastseen or noT
                                                var vplusmin=   $.PageArray[ii][5];             		// minplus buttons
                                                var vattr=      $.PageArray[ii][6];                     // extra css attributes
                                                var valarm=     $.PageArray[ii][7];             		// alarm value to turn text to red
                                                var vdata=      item[vtype];                            // current value
                                                var vstatus=    item["Status"];
												var vls=  		item["LastUpdate"];						// ´Last Seen´
												var vdimmercurrent=  item["LevelInt"];  				// What is the dim level
											
                                                if (typeof vdata == 'undefined') {
                                                        vdata="?!";
                                                } else {
                                                        // remove too much text
                                                        vdata=new String(vdata).split("Watt",1)[0];
                                                        vdata=new String(vdata).split("kWh",1)[0];
                                                        vdata=new String(vdata).split("%",1)[0];
                                                        vdata=new String(vdata).split(" Level:",1)[0];
                                                        vdata=new String(vdata).replace("Set","On");
                                                        vdata=new String(vdata).split("m3",1)[0];
                                                        vdata=new String(vdata).replace("true","protected");
                                                }
                                                alarmcss='';
												
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
						
                                                //PushOn PushOff gives wrong(undesired) status
												if (item.SwitchType == 'Push On Button') { vdata = 'Off' }
												if (item.SwitchType == 'Push Off Button') { vdata = 'On' }
												
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	

												//Check wether we want to add the last seen to the block
												if (lastseen == '1' || lastseen == '3') {
													$('#ls_'+vlabel).html(vls);
												}
						
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

												// change background image, depending on sunset and sunrise
												// and set IsNight for meteo icon changing
												var today=new Date();
												
												var h1 = today.getHours();
												var m1 = today.getMinutes();
													
												var h2 = var_sunrise.substring(0, 2);
												var m2 = var_sunrise.substring(3, 5);
												
												var h3 = var_sunset.substring(0, 2);
												var m3 = var_sunset.substring(3, 5);
												
												
												h2 = parseInt(h2, 10);
												m2 = parseInt(m2, 10);
												h3 = parseInt(h3, 10);
												m3 = parseInt(m3, 10); 
												
												var t1 = (60 * h1) + m1;	// time
												var t2 = (60 * h2) + m2;	// sunrise
												var t3 = (60 * h3) + m3;	// sunset
												
												
												if ( t1 > t3 || t1 < t2) {
													// night
													var IsNight = 'Yes';
													document.body.style.background='black url(icons/'+bg_night+') no-repeat top center fixed';
													document.body.style.backgroundSize=bg_size;
												} else {
													// day
													var IsNight = 'No';
													document.body.style.background='black url(icons/'+bg_day+') no-repeat top center fixed';
													document.body.style.backgroundSize=bg_size;
												} 
	
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
												
											// Si reveil ->> mise en forme 
												if(vtype == 'Wakeup') {
													vdata = goodmorning(item.Data);
												}
													
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
												
                                             //Dimmer
                                                if(vtype == 'Level' && item.SwitchType == 'Dimmer') {
														if (vstatus == 'Off') {
															alarmcss=';color:#E24E2A;';	// text color dimmer percentage when OFF
															vdata = txt_off;
														}
														else {
															alarmcss=';color:#1B9772;';	// text color dimmer percentage when ON
														}
													
                                                        if (vdata == txt_off) {
															if (lastseen == '2') {
																var hlp = '<img src="'+$.domoticzurl+'/images/Light48_Off.png" width=48 onclick="SwitchToggle('+item.idx+', \'On\');lightbox_open(\'switch\', '+switch_on_timeout+', '+txt_switch_on+')"; style='+alarmcss+'>';
                                                            } else {
																var hlp = '<span onclick="SwitchToggle('+item.idx+', \'On\');lightbox_open(\'switch\', '+switch_on_timeout+', '+txt_switch_on+')"; style='+alarmcss+'>'+ vdata+'</span>';
															}
															var plus = "";
                                                            var min = "";
                                                        }
                                                        else
                                                        {
															if (item.MaxDimLevel == 100) {
																if (lastseen == '2') {
																	var hlp = '<img src="'+$.domoticzurl+'/images/Light48_On.png" width=48 onclick="SwitchToggle('+item.idx+', \'Off\');lightbox_open(\'switch\', '+switch_off_timeout+', '+txt_switch_off+')"; style='+alarmcss+'>';
																	vdesc=new String(vdesc).replace( vdesc,vdesc + "<span style='color:#FD0CE9;font-size:20px;'> "+vdata+"&#37;</span>");
																} else {
																	var hlp = '<span onclick="SwitchToggle('+item.idx+', \'Off\');lightbox_open(\'switch\', '+switch_off_timeout+', '+txt_switch_off+')"; style='+alarmcss+'>'+ vdata+'</span>';
																}
																var plus = "<img src=icons/plus.png align=right hspace=10 vspace=4 width=30 onclick=DimLevel100('plus'," + vdata + "," + item.idx + ")>";
																var min = "<img src=icons/min.png align=left hspace=10 vspace=4 width=30 onclick=DimLevel100('min'," + vdata + "," + item.idx + ")>";
															} else {
																if (lastseen == '2') {
																	var hlp = '<img src="'+$.domoticzurl+'/images/Light48_On.png" width=48 onclick="SwitchToggle('+item.idx+', \'Off\');lightbox_open(\'switch\', '+switch_off_timeout+', '+txt_switch_off+')"; style='+alarmcss+'>';
																	vdesc=new String(vdesc).replace( vdesc,vdesc + "<span style='color:#FD0CE9;font-size:20px;'> "+vdata+"&#37;</span>");
																} else {
																	var hlp = '<span onclick="SwitchToggle('+item.idx+', \'Off\');lightbox_open(\'switch\', '+switch_off_timeout+', '+txt_switch_off+')"; style='+alarmcss+'>'+ vdata+'</span>';
																}
																var plus = "<img src=icons/plus.png align=right hspace=10 vspace=4 width=30 onclick=DimLevel16('plus'," + vdata + "," + item.idx + ","+ vdimmercurrent+")>";
																var min = "<img src=icons/min.png align=left hspace=10 vspace=4 width=30 onclick=DimLevel16('min'," + vdata + "," + item.idx + ","+ vdimmercurrent+")>";
															}
                                                        }
                                                        vdata = min.concat(hlp,plus);
                                                        //console.log(vdata);
                                                } 

											
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	

											//Thermostat
												if(vtype == 'SetPoint' && vplusmin > 0) {
														var hlp = '<span style='+vattr+'>'+ vdata+'</span>';
														var plus = "<img src=icons/plus.png align=right vspace=4 width=30 onclick=ChangeTherm('plus'," +vplusmin+ "," + item.idx + ","+ vdata+","+ valarm+")>";
														var min = "<img src=icons/min.png align=left vspace=4 width=30 onclick=ChangeTherm('min'," +vplusmin+ "," + item.idx + ","+ vdata+","+ valarm+")>";
														vdata = min.concat(hlp,plus);
														//console.log(vdata);
												}
												
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
											
											// blinds
													if (item.SwitchType == 'Blinds') {
														if(vdata == 'Closed') {
																var down = '<img src='+$.domoticzurl+'/images/blinds48sel.png  hspace=1 width=40 onclick="SwitchToggle('+item.idx+', \'On\');lightbox_open(\'switch\', '+switch_on_timeout+', '+txt_blind_down+')">';
																var up = '<img src='+$.domoticzurl+'/images/blindsopen48.png  hspace=1 width=40 onclick="SwitchToggle('+item.idx+', \'Off\');lightbox_open(\'switch\', '+switch_off_timeout+', '+txt_blind_up+')">';
														}
														if (vdata == 'Open' || vdata == 'Stopped') {
																var down = '<img src='+$.domoticzurl+'/images/blinds48.png  hspace=1 width=40 onclick="SwitchToggle('+item.idx+', \'On\');lightbox_open(\'switch\', '+switch_on_timeout+', '+txt_blind_down+')">';
																var up = '<img src='+$.domoticzurl+'/images/blindsopen48sel.png  hspace=1 width=40 onclick="SwitchToggle('+item.idx+', \'Off\');lightbox_open(\'switch\', '+switch_off_timeout+', '+txt_blind_up+')">';
														}
														var stop = '<img src='+$.domoticzurl+'/images/blindsstop.png  hspace=1 height=40 onclick="SwitchToggle('+item.idx+', \'Stop\');lightbox_open(\'switch\', '+switch_on_timeout+', '+txt_blind_stop+')">';
														if(item.Type == 'RFY') {
															vdata = down.concat(stop,up);
														} else	{
															vdata = down.concat(up);
														}	
														//console.log(vdata);
													}
													if (item.SwitchType == 'Blinds Inverted') {
														if(vdata == 'Closed') {
																var down = '<img src='+$.domoticzurl+'/images/blinds48sel.png  hspace=1 width=40 onclick="SwitchToggle('+item.idx+', \'Off\');lightbox_open(\'switch\', '+switch_off_timeout+', '+txt_blind_down+')">';
																var up = '<img src='+$.domoticzurl+'/images/blindsopen48.png  hspace=1 width=40 onclick="SwitchToggle('+item.idx+', \'On\');lightbox_open(\'switch\', '+switch_on_timeout+', '+txt_blind_up+')">';
														}
														if (vdata == 'Open' || vdata == 'Stopped') {
																var down = '<img src='+$.domoticzurl+'/images/blinds48.png  hspace=1 width=40 onclick="SwitchToggle('+item.idx+', \'Off\');lightbox_open(\'switch\', '+switch_off_timeout+', '+txt_blind_down+')">';
																var up = '<img src='+$.domoticzurl+'/images/blindsopen48sel.png  hspace=1 width=40 onclick="SwitchToggle('+item.idx+', \'On\');lightbox_open(\'switch\', '+switch_on_timeout+', '+txt_blind_up+')">';
														}
														var stop = '<img src='+$.domoticzurl+'/images/blindsstop.png  hspace=1 height=40 onclick="SwitchToggle('+item.idx+', \'Stop\');lightbox_open(\'switch\', '+switch_on_timeout+', '+txt_blind_stop+')">';
														if(item.Type == 'RFY') {
															vdata = down.concat(stop,up);
														} else	{
															vdata = down.concat(up);
														}
														//console.log(vdata);
													}
													if (item.SwitchType == 'Venetian Blinds EU' || item.SwitchType == 'Venetian Blinds US') {
														if(vdata == 'Closed') {
																var down = '<img src='+$.domoticzurl+'/images/blinds48sel.png  hspace=1 width=40 onclick="SwitchToggle('+item.idx+', \'On\');lightbox_open(\'switch\', '+switch_on_timeout+', '+txt_blind_down+')">';
																var up = '<img src='+$.domoticzurl+'/images/blindsopen48.png  hspace=1 width=40 onclick="SwitchToggle('+item.idx+', \'Off\');lightbox_open(\'switch\', '+switch_off_timeout+', '+txt_blind_up+')">';
														}
														if (vdata == 'Open' || vdata == 'Stopped') {
																var down = '<img src='+$.domoticzurl+'/images/blinds48.png  hspace=1 width=40 onclick="SwitchToggle('+item.idx+', \'On\');lightbox_open(\'switch\', '+switch_on_timeout+', '+txt_blind_down+')">';
																var up = '<img src='+$.domoticzurl+'/images/blindsopen48sel.png  hspace=1 width=40 onclick="SwitchToggle('+item.idx+', \'Off\');lightbox_open(\'switch\', '+switch_off_timeout+', '+txt_blind_up+')">';
														}
														var stop = '<img src='+$.domoticzurl+'/images/blindsstop.png  hspace=1 height=40 onclick="SwitchToggle('+item.idx+', \'Stop\');lightbox_open(\'switch\', '+switch_on_timeout+', '+txt_blind_stop+')">';
														vdata = down.concat(stop,up);
														//console.log(vdata);
													}
													if (item.SwitchType == 'Blinds Percentage') {
														
														if(item.Status == 'Closed') {
																vdata = 100;
																var down = '<img src='+$.domoticzurl+'/images/blinds48sel.png  hspace=1 width=40 onclick="SwitchToggle('+item.idx+', \'On\');lightbox_open(\'switch\', '+switch_on_timeout+', '+txt_blind_down+')">';
																var up = '<img src='+$.domoticzurl+'/images/blindsopen48.png  hspace=1 width=40 onclick="SwitchToggle('+item.idx+', \'Off\');lightbox_open(\'switch\', '+switch_off_timeout+', '+txt_blind_up+')">';
																var plus = "<img src=icons/plus.png  vspace=4 hspace=4 width=30 onclick=DimLevel100('min'," + vdata + "," + item.idx + ")>";
																var min = "<img src=icons/min.png  vspace=4 hspace=4 width=30 onclick=DimLevel100('plus'," + vdata + "," + item.idx + ")>";
															
														}
														else if (item.Status == 'Open') {
																var down = '<img src='+$.domoticzurl+'/images/blinds48.png  hspace=1 width=40 onclick="SwitchToggle('+item.idx+', \'On\');lightbox_open(\'switch\', '+switch_on_timeout+', '+txt_blind_down+')">';
																var up = '<img src='+$.domoticzurl+'/images/blindsopen48sel.png  hspace=1 width=40 onclick="SwitchToggle('+item.idx+', \'Off\');lightbox_open(\'switch\', '+switch_off_timeout+', '+txt_blind_up+')">';
																var plus = "<img src=icons/plus.png  vspace=4 hspace=4 width=30 onclick=DimLevel100('min'," + vdata + "," + item.idx + ")>";
																var min = "<img src=icons/min.png  vspace=4 hspace=4 width=30 onclick=DimLevel100('plus'," + vdata + "," + item.idx + ")>";
														}
														else {
																var down = '<img src='+$.domoticzurl+'/images/blinds48.png  hspace=1 width=40 onclick="SwitchToggle('+item.idx+', \'On\');lightbox_open(\'switch\', '+switch_on_timeout+', '+txt_blind_down+')">';
																var up = '<img src='+$.domoticzurl+'/images/blindsopen48sel.png  hspace=1 width=40 onclick="SwitchToggle('+item.idx+', \'Off\');lightbox_open(\'switch\', '+switch_off_timeout+', '+txt_blind_up+')">';
																var plus = "<img src=icons/plus.png  vspace=4 hspace=4 width=30 onclick=DimLevel100('min'," + vdata + "," + item.idx + ")>";
																var min = "<img src=icons/min.png  vspace=4 hspace=4 width=30 onclick=DimLevel100('plus'," + vdata + "," + item.idx + ")>";
														}
														
														vdesc=new String(vdesc).replace( vdesc,vdesc + "<span style='color:#1B9772;font-size:20px;'> "+(100-vdata)+"&#37;</span>");
														vdata = min.concat(down,up,plus);
														//console.log(vdata);
													}
													if (item.SwitchType == 'Blinds Percentage Inverted') {
														
														if(item.Status == 'Closed') {
																var down = '<img src='+$.domoticzurl+'/images/blinds48sel.png  hspace=1 width=40 onclick="SwitchToggle('+item.idx+', \'Off\');lightbox_open(\'switch\', '+switch_off_timeout+', '+txt_blind_down+')">';
																var up = '<img src='+$.domoticzurl+'/images/blindsopen48.png  hspace=1 width=40 onclick="SwitchToggle('+item.idx+', \'On\');lightbox_open(\'switch\', '+switch_on_timeout+', '+txt_blind_up+')">';
																var plus = "<img src=icons/plus.png vspace=4 hspace=4 width=30 onclick=DimLevel100('plus'," + vdata + "," + item.idx + ")>";
																var min = "<img src=icons/min.png vspace=4 hspace=4 width=30 onclick=DimLevel100('min'," + vdata + "," + item.idx + ")>";
																
														}
														else if (item.Status == 'Open') {
																vdata = 100;
																var down = '<img src='+$.domoticzurl+'/images/blinds48.png  hspace=1 width=40 onclick="SwitchToggle('+item.idx+', \'Off\');lightbox_open(\'switch\', '+switch_off_timeout+', '+txt_blind_down+')">';
																var up = '<img src='+$.domoticzurl+'/images/blindsopen48sel.png  hspace=1 width=40 onclick="SwitchToggle('+item.idx+', \'On\');lightbox_open(\'switch\', '+switch_on_timeout+', '+txt_blind_up+')">';
																var plus = "<img src=icons/plus.png vspace=4 hspace=4 width=30 onclick=DimLevel100('plus'," + vdata + "," + item.idx + ")>";
																var min = "<img src=icons/min.png vspace=4 hspace=4 width=30 onclick=DimLevel100('min'," + vdata + "," + item.idx + ")>";
														
														}
														else {
																var down = '<img src='+$.domoticzurl+'/images/blinds48.png  hspace=1 width=40 onclick="SwitchToggle('+item.idx+', \'Off\');lightbox_open(\'switch\', '+switch_off_timeout+', '+txt_blind_down+')">';
																var up = '<img src='+$.domoticzurl+'/images/blindsopen48sel.png  hspace=1 width=40 onclick="SwitchToggle('+item.idx+', \'On\');lightbox_open(\'switch\', '+switch_on_timeout+', '+txt_blind_up+')">';
																var plus = "<img src=icons/plus.png vspace=4 hspace=4 width=30 onclick=DimLevel100('plus'," + vdata + "," + item.idx + ")>";
																var min = "<img src=icons/min.png vspace=4 hspace=4 width=30 onclick=DimLevel100('min'," + vdata + "," + item.idx + ")>";
														
														}
														vdesc=new String(vdesc).replace( vdesc,vdesc + "<span style='color:#1B9772;font-size:20px;'> "+vdata+"&#37;</span>");
														vdata = min.concat(down,up,plus);
														//console.log(vdata);
													}
													
												
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
											
                                            // replace forecast (text) with an image (THIS IS THE NIGHT part)	
																		
                                                if (vdata == 'Sunny' && IsNight == 'Yes') {
                                                        vdata=new String(vdata).replace( "Sunny",'<img src=icons/meteo/night-clear.png width=155 height=155 onclick="lightbox_open(\'meteo\', 25400)">');
                                                }
                                                if (vdata == 'Partly Cloudy' && IsNight == 'Yes') {
                                                        vdata=new String(vdata).replace( "Partly Cloudy",'<img src=icons/meteo/night-partlycloudy.png width=155 height=155 onclick="lightbox_open(\'meteo\', 25400)">');
                                                }
                                                if (vdata == 'Cloudy' && IsNight == 'Yes') {
                                                        vdata=new String(vdata).replace( "Cloudy",'<img src=icons/meteo/night-cloudy.png width=155 height=155 onclick="lightbox_open(\'meteo\', 25400)">');
                                                }
                                                if (vdata == 'Clear' && IsNight == 'Yes') {
                                                        vdata=new String(vdata).replace( "Clear",'<img src=icons/meteo/night-clear.png width=155 height=155 onclick="lightbox_open(\'meteo\', 25400)">');
                                                }
                                                if (vdata == 'Rain' && IsNight == 'Yes') {
                                                        vdata=new String(vdata).replace( "Rain",'<img src=icons/meteo/night-rain.png width=155 height=155 onclick="lightbox_open(\'meteo\', 25400)">');
                                                }
                                                if (vdata == 'Snow' && IsNight == 'Yes') {
                                                        vdata=new String(vdata).replace( "Snow",'<img src=icons/meteo/night-snow.png width=155 height=155 onclick="lightbox_open(\'meteo\', 25400)">');
                                                }
                                                if (vdata == 'Fog' && IsNight == 'Yes') {
                                                        vdata=new String(vdata).replace( "Fog",'<img src=icons/meteo/night-fog.png width=155 height=155 onclick="lightbox_open(\'meteo\', 25400)">');
                                                }
                                                if (vdata == 'Hail' && IsNight == 'Yes') {
                                                        vdata=new String(vdata).replace( "Hail",'<img src=icons/meteo/night-hail.png width=155 height=155 onclick="lightbox_open(\'meteo\', 25400)">');
                                                }
                                                if (vdata == 'Thunderstom' && IsNight == 'Yes') {
                                                        vdata=new String(vdata).replace( "Thunderstorm",'<img src=icons/meteo/night-thunder.png width=155 height=155 onclick="lightbox_open(\'meteo\', 25400)">');
                                                }
                                                if (vdata == 'Sleet' && IsNight == 'Yes')  {
                                                        vdata=new String(vdata).replace( "Sleet",'<img src=icons/meteo/night-sleet.png width=155 height=155 onclick="lightbox_open(\'meteo\', 25400)">');  
                                                }
											// replace forecast (text) with an image (THIS IS THE DAY part)
												if (vdata == 'Sunny' && IsNight == 'No') {
                                                        vdata=new String(vdata).replace( "Sunny",'<img src=icons/meteo/day-sun.png width=155 height=155 onclick="lightbox_open(\'meteo\', 25400)">');
                                                }
                                                if (vdata == 'Partly Cloudy' && IsNight == 'No') {
                                                        vdata=new String(vdata).replace( "Partly Cloudy",'<img src=icons/meteo/day-partlycloudy.png width=155 height=155 onclick="lightbox_open(\'meteo\', 25400)">');
                                                }
                                                if (vdata == 'Cloudy' && IsNight == 'No') {
                                                        vdata=new String(vdata).replace( "Cloudy",'<img src=icons/meteo/day-cloudy.png width=155 height=155 onclick="lightbox_open(\'meteo\', 25400)">');
                                                }
                                                if (vdata == 'Clear' && IsNight == 'No') {
                                                        vdata=new String(vdata).replace( "Clear",'<img src=icons/meteo/day-sun.png width=155 height=155 onclick="lightbox_open(\'meteo\', 25400)">');
                                                }
                                                if (vdata == 'Rain' && IsNight == 'No') {
                                                        vdata=new String(vdata).replace( "Rain",'<img src=icons/meteo/day-rain.png width=155 height=155 onclick="lightbox_open(\'meteo\', 25400)">');
                                                }
                                                if (vdata == 'Snow' && IsNight == 'No') {
                                                        vdata=new String(vdata).replace( "Snow",'<img src=icons/meteo/day-snow.png width=155 height=155 onclick="lightbox_open(\'meteo\', 25400)">');
                                                }
                                                if (vdata == 'Fog' && IsNight == 'No') {
                                                        vdata=new String(vdata).replace( "Fog",'<img src=icons/meteo/day-fog.png width=155 height=155 onclick="lightbox_open(\'meteo\', 25400)">');
                                                }
                                                if (vdata == 'Hail' && IsNight == 'No') {
                                                        vdata=new String(vdata).replace( "Hail",'<img src=icons/meteo/day-hail.png width=155 height=155 onclick="lightbox_open(\'meteo\', 25400)">');
                                                }
                                                if (vdata == 'Thunderstom' && IsNight == 'No') {
                                                        vdata=new String(vdata).replace( "Thunderstorm",'<img src=icons/meteo/day-thunder.png width=155 height=155 onclick="lightbox_open(\'meteo\', 25400)">');
                                                }
                                                if (vdata == 'Sleet' && IsNight == 'No')  {
                                                        vdata=new String(vdata).replace( "Sleet",'<img src=icons/meteo/day-sleet.png width=155 height=155 onclick="lightbox_open(\'meteo\', 25400)">');  
                                                }
												
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////													
												
												// traduction
												if (vdata == 'Closed' && (item.SwitchType == 'Contact' || item.SwitchType == 'Door Lock')) {
                                                        vdata = txt_closed; 
														vattr='color:#E24E2A';
                                                }
                                                if (vdata == 'Open' && (item.SwitchType == 'Contact' || item.SwitchType == 'Door Lock')) {
                                                        vdata = txt_open;
														vattr='color:#1B9772';
                                                }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////													
                                                												
												// create switchable value when item is switch
                                                switchclick='';
												
												if (vdata == 'Off') {
                                                        switchclick = 'onclick="SwitchToggle('+item.idx+', \'On\');lightbox_open(\'switch\', '+switch_on_timeout+', '+txt_switch_on+')"';

                                                         if ( item.SwitchType == 'Push On Button' ) {
															vdata = vdesc;
															vdesc = '';
														}else { 
														vdata = txt_off;
														alarmcss=';color:#E24E2A;';
														}
                                                }
												
												if (vdata == 'On') {
                                                        switchclick = 'onclick="SwitchToggle('+item.idx+', \'Off\');lightbox_open(\'switch\', '+switch_off_timeout+', '+txt_switch_off+')"';

                                                      
														if ( item.SwitchType == 'Push Off Button' ) {
															vdata = vdesc;
															vdesc = '';
														}else { 
														vdata = txt_on;
														alarmcss=';color:#1B9772;';
														}
														
                                                }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	

												// security panel keyboard popup
												
												if (item.SubType == 'Security Panel') {
													switchclick = 'onclick="showPanel()"';
												}
												
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////													

												// Replace On/Off status with custom icon if needed
												
												if (lastseen == '2' || lastseen == '3') {
												 	
													
													if (item.SwitchType == 'Dusk Sensor') {
														var icon_On = 'uvdark.png';
														var icon_Off = 'uvsunny.png';
													} else if (item.SwitchType == 'Door Lock') {
														var icon_On = 'door48open.png';
														var icon_Off = 'door48.png';
													} else if (item.SwitchType == 'Contact') {
														var icon_On = 'contact48_open.png';
														var icon_Off = 'contact48.png';
													} else if (item.SwitchType == 'Motion Sensor') {
														var icon_On = 'motion48-on.png';
														var icon_Off = 'motion48-off.png';
													} else if (item.SubType == 'Security Panel') {
														vdesc = vdata;
														var icon = 'security48.png'
														if (vdata == 'Normal') {
															//vdata=new String(vdata).replace( vdata,"<img src='icons/alarm_off.png'  width=48>");
															vdata=new String(vdata).replace( vdata,"<img src="+$.domoticzurl+'/images/'+icon+"  width=48>");
														}
														if (vdata == 'Arm Home') {
															//vdata=new String(vdata).replace( vdata,"<img src='icons/alarm_home.png'  width=48>");
															vdata=new String(vdata).replace( vdata,"<img src="+$.domoticzurl+'/images/'+icon+"  width=48>");
														}
														if (vdata == 'Arm Away') {
															//vdata=new String(vdata).replace( vdata,"<img src='icons/alarm_away.png'  width=48>");
															vdata=new String(vdata).replace( vdata,"<img src="+$.domoticzurl+'/images/'+icon+"  width=48>");
														}
													} else {
														var	icon_On = item.Image.concat('48_On.png');
														var	icon_Off = item.Image.concat('48_Off.png');
													}
													
													if (vdata == txt_on || vdata == txt_open) {
														vdata=new String(vdata).replace( vdata,"<img src="+$.domoticzurl+'/images/'+icon_On+" width=48>");
													}
													if (vdata == txt_off || vdata == txt_closed) {
														vdata=new String(vdata).replace( vdata,"<img src="+$.domoticzurl+'/images/'+icon_Off+"  width=48>");
													} 
												}	
                                               									
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////													

                                                // if alarm threshold is defined, make value red
                                                if (typeof valarm != 'undefined' && vtype != 'SetPoint') {
                                                        alarmcss='';
														if ( Number(vdata) >= valarm ) {  
                                                            alarmcss=';color:red;';
															//blink value
															if (blink == true) {
																for(var i=0; i < 8100; i=i+900)
																	{
																		setTimeout("hide(\""+vlabel+"\")",i);
																		setTimeout("show(\""+vlabel+"\")",i+300);
																	}
																	//console.log('Alarme '+vdesc+' : '+vdata+' >= '+valarm);
															}		
														}
                                                }
												
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
											
												// gestion des unitées 
												
												// Adds °C after the temperature
										 		if(vtype == 'Temp' && vlabel == 'cell3' && vdata > -100){       
													vdata=new String(vdata).replace( vdata,vdata + "<span style='font-size:40px;position:relative;top:-45px;'>&#176;C</span>");
												}
												else if(vtype == 'Temp' && vdata > -100){       
													vdata=new String(vdata).replace( vdata,vdata + "<span style='font-size:20px;position:relative;top:-15px;'>&#176;C</span>");
												}
												// on change la couleur suivant la température
												if(vtype == 'Temp' && typeof vattr == 'undefined') {
													 if (parseInt(vdata, 10) >= 35) { vattr='color:#F24735'; } 
													else if (parseInt(vdata, 10) >= 30) { vattr='color:#F26135'; } 
													else if (parseInt(vdata, 10) >= 25) { vattr='color:#F27935'; } 
													else if (parseInt(vdata, 10) >= 20) { vattr='color:#FD8A1C'; } 
													else if (parseInt(vdata, 10) >= 15) { vattr='color:#FF9B0E'; } 
													else if (parseInt(vdata, 10) >= 10) { vattr='color:#FFAE0E'; } 
													else if (parseInt(vdata, 10) >= 05) { vattr='color:#DBC14C'; } 
													else if (parseInt(vdata, 10) >= 00) { vattr='color:#A3D6AD'; } 
													else  { vattr='color:#78C5F5'; } 
												}
												// Adds Km/h after the wind
												if(vtype == 'Speed' || vtype == 'Gust' && vdata > -100){       
													vdata=new String(vdata).replace( vdata,vdata + "<span style='font-size:25px;'> Km/h</span>");
												}
												// Adds mm after the rain
												if(vtype == 'Rain' && vdata > -100){       
													vdata=new String(vdata).replace( vdata,vdata + "<span style='font-size:25px;'> mm</span>");
												}
												// Adds % after the humidity
												if(vtype == 'Humidity' && vdata > -100){       
													vdata=new String(vdata).replace( vdata,vdata + "<span style='font-size:25px;'> &#37;</span>");
												}
												// Adds % after percentage
												if(vtype == 'Data' && item.SubType == 'Percentage' && vdata > -100){       
													vdata=new String(vdata).replace( vdata,Math.ceil(vdata) + "<span style='font-size:25px;'> &#37;</span>");
												}
												// Adds Watt after the Usage
												if(vtype == 'Usage' && (item.SubType == 'Energy' || item.SubType == 'CM119 / CM160') && vdata > -100){       
													vdata=new String(vdata).replace( vdata,vdata + "<span style='font-size:15px;'> Watt</span>");
												}
												// Adds Kwh after the CounterToday
												if(vtype == 'CounterToday' && (item.SubType == 'Energy' || item.SubType == 'CM119 / CM160') && vdata > -100){       
													vdata=new String(vdata).replace( vdata,Math.ceil(vdata*10)/10 + "<span style='font-size:15px;'> Kwh</span>");
												}
												// Adds Kwh after the Counter and convert float to integer
												if((vtype == 'Counter' || vtype == 'Data') && (item.SubType == 'Energy' || item.SubType == 'CM119 / CM160') && vdata > -100){       
													vdata=new String(vdata).replace( vdata,Math.ceil(vdata) + "<span style='font-size:15px;'> Kwh</span>");
												}
												// Adds € after price
												if(vtype == 'Euro'){       
													vdata=item.Data;
													vdata=new String(vdata).replace( vdata,Math.ceil(vdata*100)/100 + "<span style='font-size:30px;'> €</span>");
												}
												
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////													

												// if extra css attributes. Make switch not switchable when it is protected, just give message.
												if (typeof vattr == 'undefined') {
													if (item.Protected == true) {
														$('#'+vlabel).html('<div onClick="lightbox_open(\'protected\', '+switch_protected_timeout+', '+txt_switch_protected+');" style='+alarmcss+'>'+vdata+'</div>');
													} else { 
														$('#'+vlabel).html('<div '+switchclick+' style='+alarmcss+'>'+vdata+'</div>');
													}
												} 
												else if (item.Protected == true) {
													$('#'+vlabel).html( '<div onClick="lightbox_open(\'protected\', '+switch_protected_timeout+ ', '+txt_switch_protected+');" style='+vattr+alarmcss+'>'+vdata+'</div>');
												} else {
													$('#'+vlabel).html( '<div '+switchclick+' style='+vattr+alarmcss+'>'+vdata+'</div>');
												}
												
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////							

                                                $('#desc_'+vlabel).html(vdesc);
                                        }
                                        else if ( $.PageArray[ii][1] === 'Text' ) { 			//Special nummer, link in cell (test)
                                                var vlabel=     $.PageArray[ii][2];             // cell number from HTML layout
                                                var vdesc = 	$.PageArray[ii][3];				// description (text in this case
												var vattr=    $.PageArray[ii][6];             	// extra css attributes
                                                var valarm=     '';             // alarm value to turn text to red
												
												$('#'+vlabel).html('<div style='+vattr+'>'+vdesc+'</div>');
										}
										else if ( $.PageArray[ii][1] === 'Hide' ) { 			//Special nummer, link in cell (test)
                                                var vlabel=     $.PageArray[ii][2];             // cell number from HTML layout
                                                var vdata=      $.PageArray[ii][3];             // description (link in this case
                                                var vdesc = '';
                                                var valarm=     $.PageArray[ii][7];             // alarm value to turn text to red
                                                
												$('#'+vlabel).html('');
                                                $('#desc_'+vlabel).html('');
                                        }
										else if ( $.PageArray[ii][1] === 'Link' ) { 			//Special nummer, link in cell (test)
                                                var vlabel=     $.PageArray[ii][2];             // cell number from HTML layout
                                                var vdata=      $.PageArray[ii][3];             // description (link in this case
                                                var vdesc = '';
                                                var valarm=     $.PageArray[ii][7];             // alarm value to turn text to red
                                                
                                                $('#'+vlabel).html( '<div>'+vdata+'</div>');
                                                $('#desc_'+vlabel).html(vdesc);
                                        }
										else if ( $.PageArray[ii][1] === 'Clock' ) { 			//Special nummer, Clock in cell (test)
                                                var vlabel=     $.PageArray[ii][2];             // cell number from HTML layout
                                                var vdata=      currentTime();             		// Get present time
                                                var vdesc = '';
                                                var vattr=    $.PageArray[ii][6];             	// extra css attributes
                                                var valarm=     $.PageArray[ii][7];             // alarm value to turn text to red
                                                
                                                $('#'+vlabel).html( '<div style='+vattr+'>'+vdata+'</div>');
                                                $('#desc_'+vlabel).html(vdesc);
										}	
                                        else if ( $.PageArray[ii][1] === 'SunRise' ) { 			//Special nummer, zonsop/onder in cell (test)
                                                var vlabel=     $.PageArray[ii][2];             // cell number from HTML layout
                                                var vdesc = '';
                                                var vattr=    $.PageArray[ii][6];             	// extra css attributes
                                                var valarm=     $.PageArray[ii][7];             // alarm value to turn text to red

                                                $('#'+vlabel).html( '<div style='+vattr+'>'+var_sunrise+'</div>');
                                                $('#desc_'+vlabel).html(txt_sunrise);
										}	
                                        else if ( $.PageArray[ii][1] === 'SunSet' ) { 			//Special nummer, zonsop/onder in cell (test)
                                                var vlabel=     $.PageArray[ii][2];             // cell number from HTML layout
                                                var vdesc = '';
                                                var vattr=    $.PageArray[ii][6];             	// extra css attributes
                                                var valarm=     $.PageArray[ii][7];             // alarm value to turn text to red

                                                $('#'+vlabel).html( '<div style='+vattr+'>'+var_sunset+'</div>');
                                                $('#desc_'+vlabel).html(txt_sunset);
										}	
                                        else if ( $.PageArray[ii][1] === 'SunBoth' ) { 			//Special nummer, zonsop/onder in cell (test)
                                                var vlabel=     $.PageArray[ii][2];             // cell number from HTML layout
                                                var vdesc = '';
                                                var vattr=    $.PageArray[ii][6];             	// extra css attributes
                                                var valarm=     $.PageArray[ii][7];             // alarm value to turn text to red

                                                $('#'+vlabel).html( '<div style='+vattr+'><img src=icons/sun.png  height="15" width="15" style="PADDING-RIGHT: 2px;">'+var_sunrise+'<img src=icons/moon.png  height="15" width="15" style="PADDING-LEFT: 15px;">'+var_sunset+'</div>');
                                                $('#desc_'+vlabel).html(txt_sunboth);
						
										}
                                        
                                }
                        });
                }
        });
		
		

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////													
		// affichage de la partie scène/groupe
        var jurl=$.domoticzurl+"/json.htm?type=scenes&plan="+$.roomplan+"&jsoncallback=?";
        $.getJSON(jurl,
        {
                format: "json"
        },
        function(data) {
                if (typeof data.result != 'undefined') {

                        $.each(data.result, function(i,item){
                                for( var ii = 0, len = $.PageArray_Scenes.length; ii < len; ii++ ) {
                                        if( $.PageArray_Scenes[ii][0] === item.idx ) {          				// Domoticz idx number
                                                var vtype=      $.PageArray_Scenes[ii][1];              		// Domotitcz type (like Temp, Humidity)
                                                var vlabel=     $.PageArray_Scenes[ii][2];                      // cell number from HTML layout
                                                var vdesc=      $.PageArray_Scenes[ii][3];                      // description
												var vicon=   	$.PageArray_Scenes[ii][4];							//Name of custom icon
                                                var vattr=    	$.PageArray_Scenes[ii][5];                      // extra css attributes
                                                var vdata=      item[vtype];                            		// current value
                                                if (typeof vdata == 'undefined') {
                                                        vdata="?!";
                                                } else {
                                                        // remove too much text
                                                        vdata=new String(vdata).split("Watt",1)[0];
                                                        vdata=new String(vdata).split("kWh",1)[0];
                                                }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////													

                                                // create switchable value when item is scene
                                                switchclick='';
                                                alarmcss='';
                                            
                                               												
												if (vdata == 'Off'  || item.Type == 'Scene' ) {
                                                        switchclick = 'onclick="SceneToggle('+item.idx+', \'On\');lightbox_open(\'switch\', '+switch_on_timeout+', '+txt_switch_on+')"';

                                                        if ( item.Type == 'Scene' ) {
															vdata = vdesc;
															vdesc = '';
														}else {
														vdata = txt_off;
														alarmcss=';color:#E24E2A;';
														}
                                                }
                                                if (vdata == 'On' ) {
                                                        switchclick = 'onclick="SceneToggle('+item.idx+', \'Off\');lightbox_open(\'switch\', '+switch_off_timeout+', '+txt_switch_off+')"';
                                                        alarmcss=';color:#1B9772;';
                                                        vdata = txt_on;
                                                }
												if (vdata == 'Mixed' ) {
                                                        var min = '<span style="font-size:100%;position:relative;left:-10px;color:#1B9772;" onclick="SceneToggle('+item.idx+', \'On\');lightbox_open(\'switch\', '+switch_on_timeout+', '+txt_switch_on+')">'+txt_on+'</span>';
														var plus = '<span  style="font-size:100%;position:relative;left:10px;color:#E24E2A;" onclick="SceneToggle('+item.idx+', \'Off\');lightbox_open(\'switch\', '+switch_off_timeout+', '+txt_switch_off+')">'+txt_off+'</span>';
														vdata = min.concat(plus);
														
                                                }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////													

													// show custom icon
												
													if ( isNaN(vicon) && typeof vicon != 'undefined') {
														
														var	icon_On = vicon.concat('48_On.png');
														var	icon_Off = vicon.concat('48_Off.png');
														
														if (vicon == 'Blinds') {
															icon_On = 'blindsopen48sel.png';
															icon_Off = 'blinds48sel.png';
														}	
														
														if (vdata == txt_on) {
															vdata=new String(vdata).replace( vdata,'<img src="'+$.domoticzurl+'/images/'+icon_On+'" width=48>');
														}
														else if (vdata == txt_off) {
															vdata=new String(vdata).replace( vdata,'<img src="'+$.domoticzurl+'/images/'+icon_Off+'"  width=48>');
														} else  {
															min=new String(vdata).replace( vdata,'<img src="'+$.domoticzurl+'/images/'+icon_On+'"  hspace=10 width=48 onclick="SceneToggle('+item.idx+', \'On\');lightbox_open(\'switch\', '+switch_on_timeout+', '+txt_switch_on+')">');
															plus=new String(vdata).replace( vdata,'<img src="'+$.domoticzurl+'/images/'+icon_Off+'"  hspace=10 width=48 onclick="SceneToggle('+item.idx+', \'Off\');lightbox_open(\'switch\', '+switch_off_timeout+', '+txt_switch_off+')">');
															vdata = min.concat(plus);
														}	
													}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////													

                                                // if extra css attributes
                                                if (typeof vattr == 'undefined') {
                                                        $('#'+vlabel).html('<div '+switchclick+' style='+alarmcss+'>'+vdata+'</div>');
                                                       
                                                } else {
                                                        $('#'+vlabel).html( '<div '+switchclick+' style='+vattr+alarmcss+'>'+vdata+'</div>');
                                                       
                                                }

                                                $('#desc_'+vlabel).html(vdesc);
                                                
                                        }
                                }
                        });
                }
        });
		
		
        $.refreshTimer = setInterval(RefreshData, 8000); // auto refresh page 8 secondes
		
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////													
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////													
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////													

//Switch state off a scene/group
function SceneToggle(idx, switchcmd)
{
         $.ajax({
     url: $.domoticzurl+"/json.htm?type=command&param=switchscene" + "&idx=" + idx + "&switchcmd=" + switchcmd + "&level=0",
     async: false,
     dataType: 'json',
     success: function(){
        console.log('SUCCES');
     },
     error: function(){
        console.log('ERROR');
     }
        });
        RefreshData();
}

//switch state of a switch
function SwitchToggle(idx, switchcmd)
{
         $.ajax({
     url: $.domoticzurl+"/json.htm?type=command&param=switchlight" + "&idx=" + idx + "&switchcmd=" + switchcmd + "&level=0",
     async: false,
     dataType: 'json',
     success: function(){
        console.log('SUCCES');
     },
     error: function(){
        console.log('ERROR');
     }
        });
        RefreshData();
}

//Dimmer, 0-16
function DimLevel16(OpenDicht,level,idx,currentlevel)
{
//When switched off return to previous level, no matter if plus or min pressed
if (level == txt_off) {
	if (currentlevel == 1) {
		currentlevel++;
	}
	//console.log("In uit",currentlevel);
        $.ajax({
                url: $.domoticzurl+"/json.htm?type=command&param=switchlight&idx=" + idx + "&switchcmd=Set Level&level=" + currentlevel,
                async: false,
                dataType: 'json',
                success: function(){
                        console.log('SUCCES');

                },
                error: function(){
                        console.log('ERROR');
                }
        });
}
else
{
        level = level * 1;
        //console.log(OpenDicht,level);
        if (OpenDicht == "plus")
          {
                var d = ((level + 10)/100 * 16) +  0.5;
                if(d > 16) {
                        d = 16;
                }
                $.ajax({
                        url: $.domoticzurl+"/json.htm?type=command&param=switchlight&idx=" + idx + "&switchcmd=Set Level&level=" + d,
                        async: false,
                        dataType: 'json',
                        success: function(){
                                console.log('SUCCES');
                        },
                        error: function(){
                                console.log('ERROR');
                        }
                });
          }
          else
          {
                var d = ((level-0.1 )/100*16)  ;
                //console.log("in min",d,level);
                if( d < 0 ){
                        d = 0;
                }
                $.ajax({
                        url: $.domoticzurl+"/json.htm?type=command&param=switchlight&idx=" + idx + "&switchcmd=Set Level&level=" + d,
                        async: false,
                        dataType: 'json',
                        success: function(){
                                console.log('SUCCES');
                        },
                        error: function(){
                                console.log('ERROR');
                        }
                });
          }
        }
RefreshData();
}
//Dimmer, 0-100
function DimLevel100(OpenDicht,level,idx)
{

        if (OpenDicht == "plus")
          {
                var d = level + 10;
                if(d > 100) {
                        d = 100;
                }
                $.ajax({
                        url: $.domoticzurl+"/json.htm?type=command&param=switchlight&idx=" + idx + "&switchcmd=Set Level&level=" + d,
                        async: false,
                        dataType: 'json',
                        success: function(){
                                console.log('SUCCES');
                        },
                        error: function(){
                                console.log('ERROR');
                        }
                });
          }
          else
          {
                
					var d = level - 10;
                //console.log("in min",d,level);
                if( d < 0 ){
                        d = 0;
                }
                $.ajax({
                        url: $.domoticzurl+"/json.htm?type=command&param=switchlight&idx=" + idx + "&switchcmd=Set Level&level=" + d,
                        async: false,
                        dataType: 'json',
                        success: function(){
                                console.log('SUCCES');
                        },
                        error: function(){
                                console.log('ERROR');
                        }
                });
          }
        
RefreshData();
}
// thermostat
function ChangeTherm(dimtype,stepsize,idx,currentvalue,thermmax)
	{
	 newvalue='';
	  //console.log(dimtype,stepsize,idx,currentvalue,thermmax)
	 if (dimtype == 'plus') { 
		if ((currentvalue + stepsize) > thermmax){
			 newvalue = thermmax;
		} else {
		 newvalue = currentvalue + stepsize;
		}
	}
	else if (dimtype == 'min'){ 
		 if (currentvalue < stepsize){
			 newvalue = 1;
		} else {
		 newvalue = currentvalue - stepsize;
		}
	}
	 $.ajax({
     url: $.domoticzurl+"/json.htm?type=command&param=udevice" + "&idx=" + idx + "&nvalue=0&svalue=" + newvalue,
     async: false, 
     dataType: 'json',
     success: function(){
     	console.log('SUCCES');
     },
     error: function(){
     	console.log('ERROR');
     }
 	});
 	RefreshData();
}


// date et heure
function currentTime() {
    var today=new Date();
    var h=today.getHours().toString();
    h = h.trim();
    if (h.length == 1) { 
	h = '0'+ h;
    }
    var m=today.getMinutes().toString();
    m = m.trim();
    if (m.length == 1) { 
	m = '0'+ m;
    }
	var days = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];
    var day = days[today.getDay().toString()];
	
    var dag=today.getDate().toString();
    dag = dag.trim();
    if (dag.length == 1) { 
	dag = '0'+ dag;
    }
	var months = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Décembre"];
    var maand = months[(today.getMonth()).toString()];
	
    // affiche avec l'année    
    //var ret_str = "<span style='font-size:120%;position:relative;top:-5px;'>"+h+":"+m+"</span><br><span style='font-size:35%;position:relative;top:-40px;'>"+day+" "+dag+" "+maand+"</span>";
    
	// affiche sans l'année
	var ret_str = "<span style='font-size:120%;position:relative;top:-5px;'>"+h+":"+m+"</span><br><span style='font-size:35%;position:relative;top:-40px;'>"+day+" "+dag+"</span>";
	
    return ret_str;
    
}

// mise en forme heure de réveil
function goodmorning(v) {
	//(format 15:00-1-10/02/2015)
	
	// heures
	var h = v.substring(0, 2);
	
	// minutes
	var m = v.substring(3, 5);
	
	// date
	var date = v.substring(8, 10);
	
	// jour de la semaine
	var days = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];
	var day = days[v.substring(6, 7)-1];
	
	// mois
	var months = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Décembre"];
	var month = months[v.substring(11, 13).replace(/^0+/, '')-1];
	
	// année
	var year = v.substring(14,18);
	
	var now = new Date();
	//console.log("now: ", now);
	var wakeup = new Date(year,v.substring(11, 13).replace(/^0+/, '')-1,date,h,m);
	//console.log("wakeup: ", wakeup);
	
	// affiche avec l'année 
	//var ret_str = "<span style='font-size:100%;position:relative;top:-5px;'>"+h+":"+m+"</span><br><span style='font-size:35%;position:relative;top:-40px;'>"+day+" "+date+" "+month+"</span>";
	
	// affiche sans l'année
	var ret_str = "<span style='font-size:100%;position:relative;top:-5px;'>"+h+":"+m+"</span><br><span style='font-size:35%;position:relative;top:-40px;'>"+day+" "+date+"</span>";
	
	// si l'alarme désactivée ou passée.
	if (year == "2000" || now > wakeup) {
		//var ret_str = "ZZzzz";
		var ret_str = "<img src=icons/sleep.png  height='70' width='70'>"; 
	}
	
	return ret_str;
}	
	

