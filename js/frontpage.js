<!-- Javascript for Domoticz frontpage -->
<!-- Create popup -->
var tempo;
function lightbox_open(id, timeout, txt){
		window.scrollTo(0,0);
		if (typeof txt != 'undefined') {
			$('#popup_'+id).html('<div>'+txt+'</div>');
		}
        $('#popup_'+id).fadeIn(fad_Duration);
		$('#fade').fadeIn(fad_Duration);
		$('#fade').click(function(){lightbox_close(id);});
		tempo = setTimeout(function() {lightbox_close(id);}, timeout);
}

<!-- Close popup -->
function lightbox_close(id){
        $('#popup_'+id).fadeOut(fad_Duration);
        $('#fade').fadeOut(fad_Duration);
		$("#fade").off("click");
		clearTimeout(tempo);
		setTimeout(RefreshData , 150);
}

<!-- help box open popup -->
function helpBox_open(id){
		window.scrollTo(0,0);
		$('#popup_help').html('<div>Bad value, click <a target="_blank" href="'+$.domoticzurl+'/json.htm?type=devices&rid='+id+'">here</a> to show what you can use..</div>');
		$('#popup_help').fadeIn(fad_Duration);
		$('#fade').fadeIn(fad_Duration);
		$('#popup_help').click(function(){helpBox_close();});
		tempo = setTimeout(function() {helpBox_close();}, 30000);
}

<!-- help box close popup -->
function helpBox_close(){
        $('#popup_help').fadeOut(fad_Duration);
        $('#fade').fadeOut(fad_Duration);
		clearTimeout(tempo);
}

<!-- show security panel -->
function showPanel() {
$('#popup_secpanel').html('<object type="text/html" data="'+$.domoticzurl+'/secpanel/index.html" width="100%" height="100%"></object>');
$('#popup_secpanel').fadeIn(fad_Duration);
$('#fade').fadeIn(fad_Duration);
$('#fade').click(function(){closePanel();});
tempo = setTimeout(function(){closePanel();},60000);
}

<!-- close security panel -->
function closePanel() {
$('#popup_secpanel').fadeOut(fad_Duration);
$('#fade').fadeOut(fad_Duration);
$("#fade").off("click");
$('#popup_secpanel').html('');
clearTimeout(tempo);
}

<!-- show graph popup -->
function showGraph() {
$('#popup_graph').fadeIn(fad_Duration);
$('#fade').fadeIn(fad_Duration);
$('#fade').click(function(){closeGraph();});
tempo = setTimeout(function(){closeGraph();},25400);
}

<!-- close graph popup -->
function closeGraph() {
$('#popup_graph').fadeOut(fad_Duration);
$('#fade').fadeOut(fad_Duration);
$("#fade").off("click");
$('#popup_graph').html('');
clearTimeout(tempo);
}

<!-- Load meteo widget -->
function LoadMeteoWidget() {
	if (city == '') {
		$('#popup_meteo0').html('<div onClick="lightbox_close(\'meteo0\')" width="650" height="250" valign="center" line-height="15px">Veuillez indiquer votre ville dans les paramètres<br>exemple:<br>var city = \'paris\'</div>');	
		$('#popup_meteo1').html('<div onClick="lightbox_close(\'meteo1\')" width="650" height="250" valign="center" line-height="15px">Veuillez indiquer votre ville dans les paramètres<br>exemple:<br>var city = \'paris\'</div>');	
		$('#popup_meteo2').html('<div onClick="lightbox_close(\'meteo2\')" width="650" height="250" valign="center" line-height="15px">Veuillez indiquer votre ville dans les paramètres<br>exemple:<br>var city = \'paris\'</div>');	
		$('#popup_meteo3').html('<div onClick="lightbox_close(\'meteo3\')" width="650" height="250" valign="center" line-height="15px">Veuillez indiquer votre ville dans les paramètres<br>exemple:<br>var city = \'paris\'</div>');	
	}else{
		$('#popup_meteo0').html('<img src="http://www.prevision-meteo.ch/uploads/widget/'+city+'_0.png#' + new Date().getTime()+'" onClick="lightbox_close(\'meteo0\')" width="650" height="250" alt="Ville inconnue..">');
		$('#popup_meteo1').html('<img src="http://www.prevision-meteo.ch/uploads/widget/'+city+'_1.png#' + new Date().getTime()+'" onClick="lightbox_close(\'meteo1\')" width="650" height="250" alt="Ville inconnue..">');
		$('#popup_meteo2').html('<img src="http://www.prevision-meteo.ch/uploads/widget/'+city+'_2.png#' + new Date().getTime()+'" onClick="lightbox_close(\'meteo2\')" width="650" height="250" alt="Ville inconnue..">');
		$('#popup_meteo3').html('<img src="http://www.prevision-meteo.ch/uploads/widget/'+city+'_3.png#' + new Date().getTime()+'" onClick="lightbox_close(\'meteo3\')" width="650" height="250" alt="Ville inconnue..">');
	}	
	setInterval(LoadMeteoWidget, 7200000); 	// rechargement toutes les 2 heures
}

function RefreshGraphData(xIDX, vdesc, vtype, vrange, vpara, vunit) {
    /* 
		var vtype = 'temp';
		var vrange = 'day';
		var vpara = 'te';
		var vunit = 'degrees Celcius';
	*/
		
        var jgurl = $.domoticzurl + "/json.htm?type=graph&sensor=" + vtype + "&idx=" + xIDX + "&range=" + vrange;
        //console.log(jgurl);

        $.ajax({
            dataType: "json",
            async: false,
            url: jgurl + '&jsoncallback=?',
            xIDX: xIDX,
			vdesc: vdesc,
			vtype: vtype,
			vrange: vrange,
            vunit: vunit,
			vpara: vpara,
        }).done(function(data) {
            var arrData = [];
            var arrData2 = [];
			var seriesData = [];
            var tmpPara = this.vpara; 
			if (tmpPara == 'p1') {
				
				$.each(data.result, function(i, item) {
					var year = parseInt(item.d.substring(0, 4));
					var month = parseInt(item.d.substring(5, 7));
					var day = parseInt(item.d.substring(8, 10));
					var hour = parseInt(item.d.substring(11, 13));
					var minutes = parseInt(item.d.substring(14, 16));
					var xVal = Date.UTC(year, month, day, hour, minutes);
					var x = [xVal, parseFloat(item['v'])];
					var x2 = [xVal, parseFloat(item['v2'])];
					arrData.push(x);
					arrData2.push(x2);
				});
				
				seriesData = [{
								data: arrData,
								color: '#3333FF',
								borderWidth: 2
							},
							 {
								data: arrData2,
								color: '#0099FF',
								borderWidth: 2
							}];
			
			} else {
				
				$.each(data.result, function(i, item) {
					var year = parseInt(item.d.substring(0, 4));
					var month = parseInt(item.d.substring(5, 7));
					var day = parseInt(item.d.substring(8, 10));
					var hour = parseInt(item.d.substring(11, 13));
					var minutes = parseInt(item.d.substring(14, 16));
					var xVal = Date.UTC(year, month, day, hour, minutes);
					var x = [xVal, parseFloat(item[tmpPara])];
					arrData.push(x);
				});
				
				seriesData = [{
								data: arrData,
								color: '#3333FF',
								borderWidth: 2
							}];	
			}


            createGraph(seriesData, this.vdesc, this.vunit);
        });
    
}


function createGraph(seriesData, vdesc, vunit) {
    
    $('#popup_graph').highcharts({
        chart: {
            backgroundColor: 'white',
            plotBackgroundColor: 'none',
            type: 'line',
            zoomType: 'none',
        },
        plotOptions: {
            line: {
                marker: {
                    enabled: false
                },
                states: {
                    hover: {
                        enabled: false
                    }
                }
            },
            series: {
                allowPointSelect: false,
                point: {
                    events: {
                        click: function() {
                            //console.log(this);
							
                        }
                    }
                }
            }
        },
		
        subtitle: {
            text: ''
        },
        title: {
            text: vdesc
        },
        tooltip: {
            formatter: function() {
                return '<b>' + this.y + '</b>';
            }
        },
        legend: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        xAxis: {
            type: 'datetime',
            minRange: 3600000,
            title: {

                text: 'time',
                style: {
                    font: 'bold 13px Tahoma, sans-serif'
                },
                opposite: true
            }
        },
        yAxis: {
            title: {
                text: vunit,
                style: {
                    font: 'bold 13px Tahoma, sans-serif'
                },
                opposite: true
            }
        },

        series: seriesData
    });
	showGraph();
			
}


var var_sunrise='';	
var var_sunset='';
var IsNight='No';

<!-- Main Frontpage fuction -->
function RefreshData()
{
        clearInterval($.refreshTimer);
		
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
		
	//Get sunrise/sunset
	
	$.getJSON($.domoticzurl+"/json.htm?type=command&param=getSunRiseSet&jsoncallback=?",
	{
		format: "json"
	},
	function(data) {
		if (typeof data != 'undefined') {
                        $.each(data, function(i,item){
				if ( i == 'Sunrise' ) {
					//console.log("Opgang: ", item);
					//var_sunrise = item;
					var_sunrise = item.substring(0, 5);
					
				}
				else if ( i == 'Sunset' ) {
					//console.log("Ondergang: ", item);
					//var_sunset = item;
					var_sunset = item.substring(0, 5);
					
				}
				
			});
		}
		else {
		  console.log('Undefined');
		}
		
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
													IsNight = 'Yes';
													if ( typeof bg_day != 'undefined' ) {
														$('<style>html::after{background:rgba(0,0,0,'+bg_nightBright+')}</style>').appendTo('head');
														document.body.style.background='black url(icons/'+bg_night+') no-repeat top center fixed';
														document.body.style.backgroundSize=bg_size;
													}	
												} else {
													// day
													IsNight = 'No';
													if ( typeof bg_night != 'undefined' ) {
														$('<style>html::after{background:rgba(0,0,0,'+bg_dayBright+')}</style>').appendTo('head');
														document.body.style.background='black url(icons/'+bg_day+') no-repeat top center fixed';													
														document.body.style.backgroundSize=bg_size;
													}	
												}
												
	})//;
	.success(function() {
	//	console.log("connection success");
		$('#popup_warning').fadeOut(fad_Duration);
        $('#fade').fadeOut(fad_Duration);
	})
	.error(function() {
		console.log("error connection lost");
		window.scrollTo(0,0);
		$('#popup_warning').fadeIn(fad_Duration);
		$('#fade').fadeIn(fad_Duration);
	});
	
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	
		
		// affichage de la partie switch

        $.getJSON($.domoticzurl+"/json.htm?type=devices&plan="+$.roomplan+"&jsoncallback=?",
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
                                                        //vdata="?!";
														vdata='<span onclick="helpBox_open('+item.idx+')">?!</span>';
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
												if (typeof lastseen == 'undefined' || lastseen == '') {
													lastseen = '0';
												}
												if (vtype != 'ForecastStr' && (lastseen == '1' || lastseen == '3') && ($('#ls_'+vlabel).length > 0)) { 
													$('#ls_'+vlabel).html(vls);
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
																var hlp = '<img src="'+$.domoticzurl+'/images/Light48_Off.png" width=48 onclick="SwitchToggle('+item.idx+', \'On\');lightbox_open(\'switch\', '+switch_timeout+', '+txt_switch_on+')" style='+alarmcss+'>';
                                                            } else {
																var hlp = '<span onclick="SwitchToggle('+item.idx+', \'On\');lightbox_open(\'switch\', '+switch_timeout+', '+txt_switch_on+')" style='+alarmcss+'>'+ vdata+'</span>';
															}
															var plus = "";
                                                            var min = "";
                                                        }
                                                        else
                                                        {
															if (item.MaxDimLevel == 100) {
																if (lastseen == '2') {
																	var hlp = '<img src="'+$.domoticzurl+'/images/Light48_On.png" width=48 onclick="SwitchToggle('+item.idx+', \'Off\');lightbox_open(\'switch\', '+switch_timeout+', '+txt_switch_off+')" style='+alarmcss+'>';
																	vdesc=new String(vdesc).replace( vdesc,vdesc + "<span class='percent'> "+vdata+"<span style='font-size:70%;'> &#37;</span></span>");
																} else {
																	var hlp = '<span onclick="SwitchToggle('+item.idx+', \'Off\');lightbox_open(\'switch\', '+switch_timeout+', '+txt_switch_off+')" style='+alarmcss+'>'+ vdata+'</span>';
																}
																var plus = '<img src=icons/plus.png align=right hspace=10 vspace=4 width=30 onclick="DimLevel100(\'plus\',' + vdata + ',' + item.idx + ')">';
																var min = '<img src=icons/min.png align=left hspace=10 vspace=4 width=30 onclick="DimLevel100(\'min\',' + vdata + ',' + item.idx + ')">';
															} else {
																if (lastseen == '2') {
																	var hlp = '<img src="'+$.domoticzurl+'/images/Light48_On.png" width=48 onclick="SwitchToggle('+item.idx+', \'Off\');lightbox_open(\'switch\', '+switch_timeout+', '+txt_switch_off+')" style='+alarmcss+'>';
																	vdesc=new String(vdesc).replace( vdesc,vdesc + "<span class='percent'> "+vdata+"<span style='font-size:70%;'> &#37;</span></span>");
																} else {
																	var hlp = '<span onclick="SwitchToggle('+item.idx+', \'Off\');lightbox_open(\'switch\', '+switch_timeout+', '+txt_switch_off+')" style='+alarmcss+'>'+ vdata+'</span>';
																}
																var plus = '<img src=icons/plus.png align=right hspace=10 vspace=4 width=30 onclick="DimLevel16(\'plus\',' + vdata + ',' + item.idx + ','+ vdimmercurrent+')">';
																var min = '<img src=icons/min.png align=left hspace=10 vspace=4 width=30 onclick="DimLevel16(\'min\',' + vdata + ',' + item.idx + ','+ vdimmercurrent+')">';
															}
                                                        }
                                                        vdata = min.concat(hlp,plus);
                                                        //console.log(vdata);
												} 

											
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	

											//Thermostat
												if(vtype == 'SetPoint' && vplusmin > 0) {
														var hlp = '<span style='+vattr+'>'+ vdata+'</span>';
														var plus = '<img src=icons/plus.png align=right vspace=4 width=30 onclick="ChangeTherm(\'plus\',' +vplusmin+ ',' + item.idx + ','+ vdata+','+ valarm+')">';
														var min = '<img src=icons/min.png align=left vspace=4 width=30 onclick="ChangeTherm(\'min\',' +vplusmin+ ',' + item.idx + ','+ vdata+','+ valarm+')">';
														vdata = min.concat(hlp,plus);
														//console.log(vdata);
												}
												
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
											
											// blinds
													if (item.SwitchType == 'Blinds') {
														if(vdata == 'Closed') {
																var down = '<img src='+$.domoticzurl+'/images/blinds48sel.png  hspace=1 width=40 onclick="SwitchToggle('+item.idx+', \'On\');lightbox_open(\'switch\', '+switch_timeout+', '+txt_blind_down+')">';
																var up = '<img src='+$.domoticzurl+'/images/blindsopen48.png  hspace=1 width=40 onclick="SwitchToggle('+item.idx+', \'Off\');lightbox_open(\'switch\', '+switch_timeout+', '+txt_blind_up+')">';
														}
														if (vdata == 'Open' || vdata == 'Stopped') {
																var down = '<img src='+$.domoticzurl+'/images/blinds48.png  hspace=1 width=40 onclick="SwitchToggle('+item.idx+', \'On\');lightbox_open(\'switch\', '+switch_timeout+', '+txt_blind_down+')">';
																var up = '<img src='+$.domoticzurl+'/images/blindsopen48sel.png  hspace=1 width=40 onclick="SwitchToggle('+item.idx+', \'Off\');lightbox_open(\'switch\', '+switch_timeout+', '+txt_blind_up+')">';
														}
														var stop = '<img src='+$.domoticzurl+'/images/blindsstop.png  hspace=1 height=40 onclick="SwitchToggle('+item.idx+', \'Stop\');lightbox_open(\'switch\', '+switch_timeout+', '+txt_blind_stop+')">';
														if(item.Type == 'RFY') {
															vdata = down.concat(stop,up);
														} else	{
															vdata = down.concat(up);
														}	
														//console.log(vdata);
													}
													if (item.SwitchType == 'Blinds Inverted') {
														if(vdata == 'Closed') {
																var down = '<img src='+$.domoticzurl+'/images/blinds48sel.png  hspace=1 width=40 onclick="SwitchToggle('+item.idx+', \'Off\');lightbox_open(\'switch\', '+switch_timeout+', '+txt_blind_down+')">';
																var up = '<img src='+$.domoticzurl+'/images/blindsopen48.png  hspace=1 width=40 onclick="SwitchToggle('+item.idx+', \'On\');lightbox_open(\'switch\', '+switch_timeout+', '+txt_blind_up+')">';
														}
														if (vdata == 'Open' || vdata == 'Stopped') {
																var down = '<img src='+$.domoticzurl+'/images/blinds48.png  hspace=1 width=40 onclick="SwitchToggle('+item.idx+', \'Off\');lightbox_open(\'switch\', '+switch_timeout+', '+txt_blind_down+')">';
																var up = '<img src='+$.domoticzurl+'/images/blindsopen48sel.png  hspace=1 width=40 onclick="SwitchToggle('+item.idx+', \'On\');lightbox_open(\'switch\', '+switch_timeout+', '+txt_blind_up+')">';
														}
														var stop = '<img src='+$.domoticzurl+'/images/blindsstop.png  hspace=1 height=40 onclick="SwitchToggle('+item.idx+', \'Stop\');lightbox_open(\'switch\', '+switch_timeout+', '+txt_blind_stop+')">';
														if(item.Type == 'RFY') {
															vdata = down.concat(stop,up);
														} else	{
															vdata = down.concat(up);
														}
														//console.log(vdata);
													}
													if (item.SwitchType == 'Venetian Blinds EU' || item.SwitchType == 'Venetian Blinds US') {
														if(vdata == 'Closed') {
																var down = '<img src='+$.domoticzurl+'/images/blinds48sel.png  hspace=1 width=40 onclick="SwitchToggle('+item.idx+', \'On\');lightbox_open(\'switch\', '+switch_timeout+', '+txt_blind_down+')">';
																var up = '<img src='+$.domoticzurl+'/images/blindsopen48.png  hspace=1 width=40 onclick="SwitchToggle('+item.idx+', \'Off\');lightbox_open(\'switch\', '+switch_timeout+', '+txt_blind_up+')">';
														}
														if (vdata == 'Open' || vdata == 'Stopped') {
																var down = '<img src='+$.domoticzurl+'/images/blinds48.png  hspace=1 width=40 onclick="SwitchToggle('+item.idx+', \'On\');lightbox_open(\'switch\', '+switch_timeout+', '+txt_blind_down+')">';
																var up = '<img src='+$.domoticzurl+'/images/blindsopen48sel.png  hspace=1 width=40 onclick="SwitchToggle('+item.idx+', \'Off\');lightbox_open(\'switch\', '+switch_timeout+', '+txt_blind_up+')">';
														}
														var stop = '<img src='+$.domoticzurl+'/images/blindsstop.png  hspace=1 height=40 onclick="SwitchToggle('+item.idx+', \'Stop\');lightbox_open(\'switch\', '+switch_timeout+', '+txt_blind_stop+')">';
														vdata = down.concat(stop,up);
														//console.log(vdata);
													}
													if (item.SwitchType == 'Blinds Percentage') {
														
														if(item.Status == 'Closed') {
																vdata = 100;
																var down = '<img src='+$.domoticzurl+'/images/blinds48sel.png  hspace=1 width=40 onclick="SwitchToggle('+item.idx+', \'On\');lightbox_open(\'switch\', '+switch_timeout+', '+txt_blind_down+')">';
																var up = '<img src='+$.domoticzurl+'/images/blindsopen48.png  hspace=1 width=40 onclick="SwitchToggle('+item.idx+', \'Off\');lightbox_open(\'switch\', '+switch_timeout+', '+txt_blind_up+')">';
																var plus = '<img src=icons/plus.png  vspace=4 hspace=4 width=30 onclick="DimLevel100(\'min\',' + vdata + ',' + item.idx + ')">';
																var min = '<img src=icons/min.png  vspace=4 hspace=4 width=30 onclick="DimLevel100(\'plus\',' + vdata + ',' + item.idx + ')">';
															
														}
														else if (item.Status == 'Open') {
																var down = '<img src='+$.domoticzurl+'/images/blinds48.png  hspace=1 width=40 onclick="SwitchToggle('+item.idx+', \'On\');lightbox_open(\'switch\', '+switch_timeout+', '+txt_blind_down+')">';
																var up = '<img src='+$.domoticzurl+'/images/blindsopen48sel.png  hspace=1 width=40 onclick="SwitchToggle('+item.idx+', \'Off\');lightbox_open(\'switch\', '+switch_timeout+', '+txt_blind_up+')">';
																var plus = '<img src=icons/plus.png  vspace=4 hspace=4 width=30 onclick="DimLevel100(\'min\',' + vdata + ',' + item.idx + ')">';
																var min = '<img src=icons/min.png  vspace=4 hspace=4 width=30 onclick="DimLevel100(\'plus\',' + vdata + ',' + item.idx + ')">';
														}
														else {
																var down = '<img src='+$.domoticzurl+'/images/blinds48.png  hspace=1 width=40 onclick="SwitchToggle('+item.idx+', \'On\');lightbox_open(\'switch\', '+switch_timeout+', '+txt_blind_down+')">';
																var up = '<img src='+$.domoticzurl+'/images/blindsopen48sel.png  hspace=1 width=40 onclick="SwitchToggle('+item.idx+', \'Off\');lightbox_open(\'switch\', '+switch_timeout+', '+txt_blind_up+')">';
																var plus = '<img src=icons/plus.png  vspace=4 hspace=4 width=30 onclick="DimLevel100(\'min\',' + vdata + ',' + item.idx + ')">';
																var min = '<img src=icons/min.png  vspace=4 hspace=4 width=30 onclick="DimLevel100(\'plus\',' + vdata + ',' + item.idx + ')">';
														}
														
														vdesc=new String(vdesc).replace( vdesc,vdesc + "<span class='percent'> "+(100-vdata)+"<span style='font-size:50%;'> &#37;</span></span>");
														vdata = min.concat(down,up,plus);
														//console.log(vdata);
													}
													if (item.SwitchType == 'Blinds Percentage Inverted') {
														
														if(item.Status == 'Closed') {
																var down = '<img src='+$.domoticzurl+'/images/blinds48sel.png  hspace=1 width=40 onclick="SwitchToggle('+item.idx+', \'Off\');lightbox_open(\'switch\', '+switch_timeout+', '+txt_blind_down+')">';
																var up = '<img src='+$.domoticzurl+'/images/blindsopen48.png  hspace=1 width=40 onclick="SwitchToggle('+item.idx+', \'On\');lightbox_open(\'switch\', '+switch_timeout+', '+txt_blind_up+')">';
																var plus = '<img src=icons/plus.png vspace=4 hspace=4 width=30 onclick="DimLevel100(\'plus\',' + vdata + ',' + item.idx + ')">';
																var min = '<img src=icons/min.png vspace=4 hspace=4 width=30 onclick="DimLevel100(\'min\',' + vdata + ',' + item.idx + ')">';
																
														}
														else if (item.Status == 'Open') {
																vdata = 100;
																var down = '<img src='+$.domoticzurl+'/images/blinds48.png  hspace=1 width=40 onclick="SwitchToggle('+item.idx+', \'Off\');lightbox_open(\'switch\', '+switch_timeout+', '+txt_blind_down+')">';
																var up = '<img src='+$.domoticzurl+'/images/blindsopen48sel.png  hspace=1 width=40 onclick="SwitchToggle('+item.idx+', \'On\');lightbox_open(\'switch\', '+switch_timeout+', '+txt_blind_up+')">';
																var plus = '<img src=icons/plus.png vspace=4 hspace=4 width=30 onclick="DimLevel100(\'plus\',' + vdata + ',' + item.idx + ')">';
																var min = '<img src=icons/min.png vspace=4 hspace=4 width=30 onclick="DimLevel100(\'min\',' + vdata + ',' + item.idx + ')">';
														
														}
														else {
																var down = '<img src='+$.domoticzurl+'/images/blinds48.png  hspace=1 width=40 onclick="SwitchToggle('+item.idx+', \'Off\');lightbox_open(\'switch\', '+switch_timeout+', '+txt_blind_down+')">';
																var up = '<img src='+$.domoticzurl+'/images/blindsopen48sel.png  hspace=1 width=40 onclick="SwitchToggle('+item.idx+', \'On\');lightbox_open(\'switch\', '+switch_timeout+', '+txt_blind_up+')">';
																var plus = '<img src=icons/plus.png vspace=4 hspace=4 width=30 onclick="DimLevel100(\'plus\',' + vdata + ',' + item.idx + ')">';
																var min = '<img src=icons/min.png vspace=4 hspace=4 width=30 onclick="DimLevel100(\'min\',' + vdata + ',' + item.idx + ')">';
														
														}
														vdesc=new String(vdesc).replace( vdesc,vdesc + "<span class='percent'> "+vdata+"<span style='font-size:50%;'> &#37;</span></span>");
														vdata = min.concat(down,up,plus);
														//console.log(vdata);
													}
													
												
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
											
                                            // replace forecast (text) with an image (THIS IS THE NIGHT part)	
											
												
																		
                                                if (vdata == 'Sunny' && IsNight == 'Yes') {
                                                        vdata=new String(vdata).replace( "Sunny",'<img src=icons/meteo/night-clear.png width=155 height=155 onclick="lightbox_open(\'meteo'+lastseen+'\', 25400)">');
                                                }
                                                if (vdata == 'Partly Cloudy' && IsNight == 'Yes') {
                                                        vdata=new String(vdata).replace( "Partly Cloudy",'<img src=icons/meteo/night-partlycloudy.png width=155 height=155 onclick="lightbox_open(\'meteo'+lastseen+'\', 25400)">');
                                                }
                                                if (vdata == 'Cloudy' && IsNight == 'Yes') {
                                                        vdata=new String(vdata).replace( "Cloudy",'<img src=icons/meteo/night-cloudy.png width=155 height=155 onclick="lightbox_open(\'meteo'+lastseen+'\', 25400)">');
                                                }
                                                if (vdata == 'Clear' && IsNight == 'Yes') {
                                                        vdata=new String(vdata).replace( "Clear",'<img src=icons/meteo/night-clear.png width=155 height=155 onclick="lightbox_open(\'meteo'+lastseen+'\', 25400)">');
                                                }
                                                if (vdata == 'Rain' && IsNight == 'Yes') {
                                                        vdata=new String(vdata).replace( "Rain",'<img src=icons/meteo/night-rain.png width=155 height=155 onclick="lightbox_open(\'meteo'+lastseen+'\', 25400)">');
                                                }
                                                if (vdata == 'Snow' && IsNight == 'Yes') {
                                                        vdata=new String(vdata).replace( "Snow",'<img src=icons/meteo/night-snow.png width=155 height=155 onclick="lightbox_open(\'meteo'+lastseen+'\', 25400)">');
                                                }
                                                if (vdata == 'Fog' && IsNight == 'Yes') {
                                                        vdata=new String(vdata).replace( "Fog",'<img src=icons/meteo/night-fog.png width=155 height=155 onclick="lightbox_open(\'meteo'+lastseen+'\', 25400)">');
                                                }
                                                if (vdata == 'Hail' && IsNight == 'Yes') {
                                                        vdata=new String(vdata).replace( "Hail",'<img src=icons/meteo/night-hail.png width=155 height=155 onclick="lightbox_open(\'meteo'+lastseen+'\', 25400)">');
                                                }
                                                if (vdata == 'Thunderstom' && IsNight == 'Yes') {
                                                        vdata=new String(vdata).replace( "Thunderstorm",'<img src=icons/meteo/night-thunder.png width=155 height=155 onclick="lightbox_open(\'meteo'+lastseen+'\', 25400)">');
                                                }
                                                if (vdata == 'Sleet' && IsNight == 'Yes')  {
                                                        vdata=new String(vdata).replace( "Sleet",'<img src=icons/meteo/night-sleet.png width=155 height=155 onclick="lightbox_open(\'meteo'+lastseen+'\', 25400)">');  
                                                }
											// replace forecast (text) with an image (THIS IS THE DAY part)
												if (vdata == 'Sunny' && IsNight == 'No') {
                                                        vdata=new String(vdata).replace( "Sunny",'<img src=icons/meteo/day-sun.png width=155 height=155 onclick="lightbox_open(\'meteo'+lastseen+'\', 25400)">');
                                                }
                                                if (vdata == 'Partly Cloudy' && IsNight == 'No') {
                                                        vdata=new String(vdata).replace( "Partly Cloudy",'<img src=icons/meteo/day-partlycloudy.png width=155 height=155 onclick="lightbox_open(\'meteo'+lastseen+'\', 25400)">');
                                                }
                                                if (vdata == 'Cloudy' && IsNight == 'No') {
                                                        vdata=new String(vdata).replace( "Cloudy",'<img src=icons/meteo/day-cloudy.png width=155 height=155 onclick="lightbox_open(\'meteo'+lastseen+'\', 25400)">');
                                                }
                                                if (vdata == 'Clear' && IsNight == 'No') {
                                                        vdata=new String(vdata).replace( "Clear",'<img src=icons/meteo/day-sun.png width=155 height=155 onclick="lightbox_open(\'meteo'+lastseen+'\', 25400)">');
                                                }
                                                if (vdata == 'Rain' && IsNight == 'No') {
                                                        vdata=new String(vdata).replace( "Rain",'<img src=icons/meteo/day-rain.png width=155 height=155 onclick="lightbox_open(\'meteo'+lastseen+'\', 25400)">');
                                                }
                                                if (vdata == 'Snow' && IsNight == 'No') {
                                                        vdata=new String(vdata).replace( "Snow",'<img src=icons/meteo/day-snow.png width=155 height=155 onclick="lightbox_open(\'meteo'+lastseen+'\', 25400)">');
                                                }
                                                if (vdata == 'Fog' && IsNight == 'No') {
                                                        vdata=new String(vdata).replace( "Fog",'<img src=icons/meteo/day-fog.png width=155 height=155 onclick="lightbox_open(\'meteo'+lastseen+'\', 25400)">');
                                                }
                                                if (vdata == 'Hail' && IsNight == 'No') {
                                                        vdata=new String(vdata).replace( "Hail",'<img src=icons/meteo/day-hail.png width=155 height=155 onclick="lightbox_open(\'meteo'+lastseen+'\', 25400)">');
                                                }
                                                if (vdata == 'Thunderstom' && IsNight == 'No') {
                                                        vdata=new String(vdata).replace( "Thunderstorm",'<img src=icons/meteo/day-thunder.png width=155 height=155 onclick="lightbox_open(\'meteo'+lastseen+'\', 25400)">');
                                                }
                                                if (vdata == 'Sleet' && IsNight == 'No')  {
                                                        vdata=new String(vdata).replace( "Sleet",'<img src=icons/meteo/day-sleet.png width=155 height=155 onclick="lightbox_open(\'meteo'+lastseen+'\', 25400)">');  
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
												var HumidityStatus = { "Wet": "Humide", "Comfortable": "Confortable", "ccc": "333" };
												if (typeof HumidityStatus[vdata] != 'undefined') {
													vdata = HumidityStatus[vdata];
												}	
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////													
                                                												
												// create switchable value when item is switch
                                                switchclick='';
												
												if (vdata == 'Off' || item.SwitchType == 'Doorbell') {
                                                        switchclick = 'onclick="SwitchToggle('+item.idx+', \'On\');lightbox_open(\'switch\', '+switch_timeout+', '+txt_switch_on+')"';

                                                        if ( item.SwitchType == 'Push On Button' && lastseen != '2' && lastseen != '3') {
															vdata = vdesc;
															vdesc = '';
														}else { 
														vdata = txt_off;
														alarmcss=';color:#E24E2A;';
														}
                                                }
												
												if (vdata == 'On') {
                                                        switchclick = 'onclick="SwitchToggle('+item.idx+', \'Off\');lightbox_open(\'switch\', '+switch_timeout+', '+txt_switch_off+')"';

                                                      
														if ( item.SwitchType == 'Push Off Button' && lastseen != '2' && lastseen != '3') {
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

												// Replace Status with icon if needed
												
												if (vtype != 'ForecastStr' && (lastseen == '2' || lastseen == '3')) {
												 	
													
													if (item.SwitchType == 'Dusk Sensor') {
														var icon_On = 'uvdark.png';
														var icon_Off = 'uvsunny.png';
													} else if (item.SwitchType == 'Door Lock') {
														var icon_On = 'door48open.png';
														var icon_Off = 'door48.png';
													} else if (item.SwitchType == 'Doorbell') {
														var icon_Off = 'doorbell48.png';
													} else if (item.SwitchType == 'Contact') {
														var icon_On = 'contact48_open.png';
														var icon_Off = 'contact48.png';
													} else if (item.SwitchType == 'Motion Sensor') {
														var icon_On = 'motion48-on.png';
														var icon_Off = 'motion48-off.png';
													} else if (item.SwitchType == 'Push On Button') {
														var icon_Off = 'push48.png';
													} else if (item.SwitchType == 'Push Off Button') {
														var icon_On = 'pushoff48.png';
													} else if (item.SwitchType == 'Smoke Detector') {
														var icon_On = 'smoke48on.png';
														var icon_Off = 'smoke48off.png';
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
														if (blink == true && !$( "#"+vlabel ).hasClass( "blink_me" )) {
															document.getElementById(vlabel).classList.add("blink_me");
														}		
													}
													else if ( $( "#"+vlabel ).hasClass( "blink_me" ) ) {
															document.getElementById(vlabel).classList.remove("blink_me");
													}
												}
												
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
											
												// on change la couleur suivant la température
												if(vtype == 'Temp') {
														 if (parseInt(vdata, 10) >= 35) { vattr=new String(vattr).replace( vattr,'color:'+T35+';' + vattr); } 
													else if (parseInt(vdata, 10) >= 30) { vattr=new String(vattr).replace( vattr,'color:'+T30+';' + vattr); } 
													else if (parseInt(vdata, 10) >= 25) { vattr=new String(vattr).replace( vattr,'color:'+T25+';' + vattr); } 
													else if (parseInt(vdata, 10) >= 24) { vattr=new String(vattr).replace( vattr,'color:'+T24+';' + vattr); } 
													else if (parseInt(vdata, 10) >= 23) { vattr=new String(vattr).replace( vattr,'color:'+T23+';' + vattr); } 
													else if (parseInt(vdata, 10) >= 22) { vattr=new String(vattr).replace( vattr,'color:'+T22+';' + vattr); } 
													else if (parseInt(vdata, 10) >= 21) { vattr=new String(vattr).replace( vattr,'color:'+T21+';' + vattr); } 
													else if (parseInt(vdata, 10) >= 20) { vattr=new String(vattr).replace( vattr,'color:'+T20+';' + vattr); } 
													else if (parseInt(vdata, 10) >= 19) { vattr=new String(vattr).replace( vattr,'color:'+T19+';' + vattr); } 
													else if (parseInt(vdata, 10) >= 18) { vattr=new String(vattr).replace( vattr,'color:'+T18+';' + vattr); } 
													else if (parseInt(vdata, 10) >= 17) { vattr=new String(vattr).replace( vattr,'color:'+T17+';' + vattr); } 
													else if (parseInt(vdata, 10) >= 16) { vattr=new String(vattr).replace( vattr,'color:'+T16+';' + vattr); } 
													else if (parseInt(vdata, 10) >= 15) { vattr=new String(vattr).replace( vattr,'color:'+T15+';' + vattr); } 
													else if (parseInt(vdata, 10) >= 10) { vattr=new String(vattr).replace( vattr,'color:'+T10+';' + vattr); } 
													else if (parseInt(vdata, 10) >= 05) { vattr=new String(vattr).replace( vattr,'color:'+T05+';' + vattr); } 
													else if (parseInt(vdata, 10) >= 00) { vattr=new String(vattr).replace( vattr,'color:'+T00+';' + vattr); }
																				  else  { vattr=new String(vattr).replace( vattr,'color:'+T000+';' + vattr); }	
												}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
											
											// gestion des unitées et graphs
												
												// Adds °C after the temperature
										 		if(vtype == 'Temp'){   
													vdata=new String(vdata).replace( vdata,'<span onclick="RefreshGraphData('+item.idx+',\''+vdesc+'\',\'temp\',\'day\',\'te\',\'Température &#8451;\')">' + vdata + '<sup style="font-size:50%;" >&#8451;</sup></span>');
												}
												// Adds % after the humidity
												if(vtype == 'Humidity'){       
													vdata=new String(vdata).replace( vdata,'<span onclick="RefreshGraphData('+item.idx+',\''+vdesc+'\',\'temp\',\'day\',\'hu\',\'Humidité &#37;\')">' + vdata + '<span style="font-size:50%;"> &#37;</span></span>');
												}
												// Adds hPa after Barometer
												if(vtype == 'Barometer'){
													vdata=new String(vdata).replace( vdata,vdata + '<span style="font-size:50%;"> hPa</span>');
												}
												// Adds Km/h after the wind
												if(vtype == 'Speed' || vtype == 'Gust'){       
													vdata=new String(vdata).replace( vdata,'<span onclick="RefreshGraphData('+item.idx+',\''+vdesc+'\',\'wind\',\'day\',\'sp\',\'Vitesse km/h\')">' + vdata + '<span style="font-size:50%;"> km/h</span></span>');
												}
												// Adds mm after the rain
												if(item.Type == 'Rain'){       
													vdata=new String(vdata).replace( vdata,'<span onclick="RefreshGraphData('+item.idx+',\''+vdesc+'\',\'rain\',\'day\',\'mm\',\'Précipitations mm\')">' + vdata + '<span style="font-size:50%;"> mm</span></span>');
												}
												// Adds UVI after UV
												if(item.Type == 'UV'){
													vdata=new String(vdata).replace( vdata,vdata + '<span style="font-size:50%;"> UVI</span>');
												}
												// Adds % after percentage
												if(vtype == 'Data' && item.SubType == 'Percentage'){       
													vdata=new String(vdata).replace( vdata,'<span onclick="RefreshGraphData('+item.idx+',\''+vdesc+'\',\'Percentage\',\'day\',\'v\',\'Pourcentage &#37;\')">' + Math.ceil(vdata) + '<span style="font-size:50%;"> &#37;</span></span>');
												}
												// Adds Watt after the Usage
												if(vtype == 'Usage' && (item.SubType == 'Energy' || item.SubType == 'CM119 / CM160' || item.SubType == 'CM180' || item.SubType == 'kWh')){       
													if(item.Type == 'P1 Smart Meter') {
														vdata=new String(vdata).replace( vdata,'<span onclick="RefreshGraphData('+item.idx+',\''+vdesc+'\',\'counter\',\'day\',\'p1\',\'Electricité Watt\')">' + Math.ceil(vdata) + '<span style="font-size:50%;"> Watt</span></span>');
													}else{	
														vdata=new String(vdata).replace( vdata,'<span onclick="RefreshGraphData('+item.idx+',\''+vdesc+'\',\'counter&method=1\',\'day\',\'v\',\'Electricité Watt\')">' + Math.ceil(vdata) + '<span style="font-size:50%;"> Watt</span></span>');
													}
												}
												// Adds Kwh after the CounterToday
												if(vtype == 'CounterToday' && (item.SubType == 'Energy' || item.SubType == 'CM119 / CM160' || item.SubType == 'CM180' || item.SubType == 'kWh')){       
													vdata=new String(vdata).replace( vdata,Math.ceil(vdata*10)/10 + '<span style="font-size:50%;"> kWh</span>');
												}
												// Adds Kwh after the Counter and convert float to integer
												if((vtype == 'Counter' || vtype == 'Data') && (item.SubType == 'Energy' || item.SubType == 'CM119 / CM160' || item.SubType == 'CM180' || item.SubType == 'kWh')){       
													vdata=new String(vdata).replace( vdata,Math.ceil(vdata) + '<span style="font-size:50%;"> kWh</span>');
												}
												// Adds € after price
												if(vtype == 'Euro'){       
													vdata=item.Data;
													vdata=new String(vdata).replace( vdata,Math.ceil(vdata*100)/100 + '<span style="font-size:50%;"> &#8364;</span>');
												}
												// Adds m³ after volume for incremental counter
												if(item.Type == 'Counter Incremental' && (item.SwitchTypeVal == '1' || item.SwitchTypeVal == '2')){
													vdata=new String(vdata).replace( vdata,vdata + '<span style="font-size:50%;"> m&#179;</span>');
												}
												// Adds Kwh after energy for incremental counter
												if(item.Type == 'Counter Incremental' && (item.SwitchTypeVal == '0' || item.SwitchTypeVal == '4')){
													vdata=new String(vdata).replace( vdata,vdata + '<span style="font-size:50%;"> kWh</span>');
												}
												// Adds Watt/m² after solar radiation
												if(item.SubType == 'Solar Radiation'){
													vdata=new String(vdata).replace( vdata,vdata + '<span style="font-size:50%;"> W/m&#178;</span>');
												}
												
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////													

												// if extra css attributes. Make switch not switchable when it is protected, just give message.
												if (typeof vattr == 'undefined') {
													if (item.Protected == true) {
														$('#'+vlabel).html('<div onClick="lightbox_open(\'protected\', '+switch_protected_timeout+', '+txt_switch_protected+')" style='+alarmcss+'>'+vdata+'</div>');
													} else { 
														$('#'+vlabel).html('<div '+switchclick+' style='+alarmcss+'>'+vdata+'</div>');
													}
												} 
												else if (item.Protected == true) {
													$('#'+vlabel).html( '<div onClick="lightbox_open(\'protected\', '+switch_protected_timeout+ ', '+txt_switch_protected+')" style='+vattr+alarmcss+'>'+vdata+'</div>');
												} else {
													$('#'+vlabel).html( '<div '+switchclick+' style='+vattr+alarmcss+'>'+vdata+'</div>');
												}
												
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////							

                                                 if ($('#desc_'+vlabel).length > 0) {
													$('#desc_'+vlabel).html(vdesc);
												}	 
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
                                                if ($('#desc_'+vlabel).length > 0) {
													$('#desc_'+vlabel).html('');
												}	
                                        }
										else if ( $.PageArray[ii][1] === 'Link' ) { 			//Special nummer, link in cell (test)
                                                var vlabel=     $.PageArray[ii][2];             // cell number from HTML layout
                                                var vdata=      $.PageArray[ii][3];             // description (link in this case
                                                var vdesc = '';
                                                var valarm=     $.PageArray[ii][7];             // alarm value to turn text to red
                                                
                                                $('#'+vlabel).html( '<div>'+vdata+'</div>');
                                                if ($('#desc_'+vlabel).length > 0) {
													$('#desc_'+vlabel).html(vdesc);
												}	
                                        }
										else if ( $.PageArray[ii][1] === 'Clock' ) { 			//Special nummer, Clock in cell (test)
                                                var vlabel=     $.PageArray[ii][2];             // cell number from HTML layout
                                                var vdata=      currentTime();             		// Get present time
                                                var vdesc = '';
                                                var vattr=    $.PageArray[ii][6];             	// extra css attributes
                                                var valarm=     $.PageArray[ii][7];             // alarm value to turn text to red
                                                
                                                $('#'+vlabel).html( '<div style='+vattr+'>'+vdata+'</div>');
                                                 if ($('#desc_'+vlabel).length > 0) {
													$('#desc_'+vlabel).html(vdesc);
												}	 
										}	
                                        else if ( $.PageArray[ii][1] === 'SunRise' ) { 			//Special nummer, zonsop/onder in cell (test)
                                                var vlabel=     $.PageArray[ii][2];             // cell number from HTML layout
                                                var vdesc = '';
                                                var vattr=    $.PageArray[ii][6];             	// extra css attributes
                                                var valarm=     $.PageArray[ii][7];             // alarm value to turn text to red

                                                $('#'+vlabel).html( '<div style='+vattr+'>'+var_sunrise+'</div>');
                                                 if ($('#desc_'+vlabel).length > 0) {
													$('#desc_'+vlabel).html(txt_sunrise);
												}	 
										}	
                                        else if ( $.PageArray[ii][1] === 'SunSet' ) { 			//Special nummer, zonsop/onder in cell (test)
                                                var vlabel=     $.PageArray[ii][2];             // cell number from HTML layout
                                                var vdesc = '';
                                                var vattr=    $.PageArray[ii][6];             	// extra css attributes
                                                var valarm=     $.PageArray[ii][7];             // alarm value to turn text to red

                                                $('#'+vlabel).html( '<div style='+vattr+'>'+var_sunset+'</div>');
                                                 if ($('#desc_'+vlabel).length > 0) {
													$('#desc_'+vlabel).html(txt_sunset);
												}	 
										}	
                                        else if ( $.PageArray[ii][1] === 'SunBoth' ) { 			//Special nummer, zonsop/onder in cell (test)
                                                var vlabel=     $.PageArray[ii][2];             // cell number from HTML layout
                                                var vdesc = '';
                                                var vattr=    $.PageArray[ii][6];             	// extra css attributes
                                                var valarm=     $.PageArray[ii][7];             // alarm value to turn text to red

                                                $('#'+vlabel).html( '<div style='+vattr+'><img src=icons/sun.png  height="15" width="15" style="PADDING-RIGHT: 2px;">'+var_sunrise+'<img src=icons/moon.png  height="15" width="15" style="PADDING-LEFT: 15px;">'+var_sunset+'</div>');
                                                 if ($('#desc_'+vlabel).length > 0) {
													$('#desc_'+vlabel).html(txt_sunboth);
												} 
										}
                                        
                                }
                        });
                }
        });
		
		

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////													
		// affichage de la partie scène/groupe
    
        $.getJSON($.domoticzurl+"/json.htm?type=scenes&plan="+$.roomplan+"&jsoncallback=?",
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
                                                      //  vdata="?!";
                                                        vdata='<span onclick="helpBox_open('+item.idx+')">?!</span>';
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
                                                        switchclick = 'onclick="SceneToggle('+item.idx+', \'On\');lightbox_open(\'switch\', '+switch_timeout+', '+txt_switch_on+')"';

                                                        if ( item.Type == 'Scene' ) {
															vdata = vdesc;
															vdesc = '';
														}else {
														vdata = txt_off;
														alarmcss=';color:#E24E2A;';
														}
                                                }
                                                if (vdata == 'On' ) {
                                                        switchclick = 'onclick="SceneToggle('+item.idx+', \'Off\');lightbox_open(\'switch\', '+switch_timeout+', '+txt_switch_off+')"';
                                                        alarmcss=';color:#1B9772;';
                                                        vdata = txt_on;
                                                }
												if (vdata == 'Mixed' ) {
                                                        var min = '<span style="font-size:100%;position:relative;left:-10px;color:#1B9772;" onclick="SceneToggle('+item.idx+', \'On\');lightbox_open(\'switch\', '+switch_timeout+', '+txt_switch_on+')">'+txt_on+'</span>';
														var plus = '<span  style="font-size:100%;position:relative;left:10px;color:#E24E2A;" onclick="SceneToggle('+item.idx+', \'Off\');lightbox_open(\'switch\', '+switch_timeout+', '+txt_switch_off+')">'+txt_off+'</span>';
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
															min=new String(vdata).replace( vdata,'<img src="'+$.domoticzurl+'/images/'+icon_On+'"  hspace=10 width=48 onclick="SceneToggle('+item.idx+', \'On\');lightbox_open(\'switch\', '+switch_timeout+', '+txt_switch_on+')">');
															plus=new String(vdata).replace( vdata,'<img src="'+$.domoticzurl+'/images/'+icon_Off+'"  hspace=10 width=48 onclick="SceneToggle('+item.idx+', \'Off\');lightbox_open(\'switch\', '+switch_timeout+', '+txt_switch_off+')">');
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

                                                if ($('#desc_'+vlabel).length > 0) {
													$('#desc_'+vlabel).html(vdesc);
                                                }
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
        //RefreshData();	// now include in lightbox_close function
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
        //RefreshData();	// now include in lightbox_close function
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
	
    if (showMonth == true){
		// affiche avec le mois 
		var ret_str = "<span style='font-size:120%;position:relative;top:-5px;'>"+h+":"+m+"</span><br><span style='font-size:35%;position:relative;top:-40px;'>"+day+" "+dag+" "+maand+"</span>";
	}else{
		// affiche sans le mois 
		var ret_str = "<span style='font-size:120%;position:relative;top:-5px;'>"+h+":"+m+"</span><br><span style='font-size:35%;position:relative;top:-40px;'>"+day+" "+dag+"</span>";
	}
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
	
	if (showMonth == true) {
	// affiche avec le mois 
	var ret_str = "<span style='font-size:100%;position:relative;top:-5px;'>"+h+":"+m+"</span><br><span style='font-size:35%;position:relative;top:-40px;'>"+day+" "+date+" "+month+"</span>";
	}
	else {
	// affiche sans le mois 
	var ret_str = "<span style='font-size:100%;position:relative;top:-5px;'>"+h+":"+m+"</span><br><span style='font-size:35%;position:relative;top:-40px;'>"+day+" "+date+"</span>";
	}
	// si l'alarme désactivée ou passée.
	if (now > wakeup) {
		//var ret_str = "ZZzzz";
		var ret_str = "<img src=icons/sleep.png  height='70' width='70'>"; 
	}
	
	return ret_str;
}	
	

