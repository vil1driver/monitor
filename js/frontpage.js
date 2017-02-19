'use strict'; // this runs in strict mode (jslint)

// wellcome
console.log('\n','\n','\n');
console.log('%cWellcome on Monitor for Domoticz','color: blue; font-size:25px;','\n');
console.log('%c    Big thanks to all contributors..','color: blue; font-size:19px;','\n','\n','\n');


// debug
if (!debug) {
console.log = function() {};
}

// on document ready (Sequential load)
$(function(){
		
	setTimeout(RefreshData, 150);
	setTimeout(GetCams , 1000);
	setTimeout(LoadMeteoWidget , 3000);
	
// reload page every hours
	setTimeout(function () {location.reload();}, 1 * 60 * 60 * 1000);
	
});

// no text selected
function ffalse(){
		return false;
}
function ftrue(){
		return true;
}
document.onselectstart = "return false";
if(window.sidebar){
	document.onmousedown = ffalse;
	document.onclick = ftrue;
}

// set default params for all ajax calls
$.ajaxSetup({
			dataType: "json",
            async: true,
			global: false,
			timeout: connectTimeout,
			cache: false 
});
			
// Create popup
var tempo;
function lightbox_open(id, timeout, txt){
			
		if (typeof txt !== 'undefined') {
			$(['#popup_',id].join('')).html(txt);
		}
		//$('div[id^="popup_"]').fadeOut(fad_Duration); // before close all div with same prefix id
        $(['#popup_',id].join('')).fadeIn(fad_Duration);
		$('#fade').fadeIn(fad_Duration);
		$('#fade').click(function(){lightbox_close(id);});
		$(['#popup_',id].join('')).click(function(){lightbox_close(id);});
		tempo = setTimeout(function(){lightbox_close(id);}, timeout);
}

// Close popup
function lightbox_close(id){
        $(['#popup_',id].join('')).fadeOut(fad_Duration);
        //$('div[id^="popup_"]').fadeOut(fad_Duration); // close all div with same prefix id
        $('#fade').fadeOut(fad_Duration);
		$('#fade').off("click");
		$(['#popup_',id].join('')).off("click");
		clearTimeout(tempo);
}

// show security panel popup
function showPanel() {
	$('#popup_secpanel').html(['<object type="text/html" data="',$.domoticzurl,'/secpanel/index.html" width="100%" height="100%"></object>'].join(''));
	//$('#popup_secpanel').load('pages/secpanel.html');
	$('#popup_secpanel').fadeIn(fad_Duration);
	$('#fade').fadeIn(fad_Duration);
	$('#fade').click(closePanel);
	tempo = setTimeout(closePanel,60000);
}

// close security panel popup
function closePanel() {
	$('#popup_secpanel').fadeOut(fad_Duration);
	$('#fade').fadeOut(fad_Duration);
	$("#fade").off("click");
	$('#popup_secpanel').empty();
	clearTimeout(tempo);
}

// show freebox remote popup
function showFreeRemote() {
	$('#popup_freeRemote').fadeIn(fad_Duration);
	$('#fade').fadeIn(fad_Duration);
	$('#fade').click(closeFreeRemote);
	tempo = setTimeout(closeFreeRemote,60000);
}

// close freebox remote popup
function closeFreeRemote() {
	$('#popup_freeRemote').fadeOut(fad_Duration);
	$('#fade').fadeOut(fad_Duration);
	$("#fade").off("click");
	clearTimeout(tempo);
}

// show range popup
function showRange() {
	$('#popup_range').fadeIn(fad_Duration);
	$('#fade').fadeIn(fad_Duration);
	$('#fade').click(closeRange);
	tempo = setTimeout(closeRange,60000);
}

// close range popup
function closeRange() {
	$('#popup_range').fadeOut(fad_Duration);
	$('#fade').fadeOut(fad_Duration);
	$("#fade").off("click");
	clearTimeout(tempo);
}

// Load meteo widget
function LoadMeteoWidget() {
	
	//clearInterval($.refreshMeteoWidget);
	
	if (city === ''){
		$('#popup_meteo0').html('<span>Veuillez indiquer votre ville dans les paramètres<br>exemple:<br>var city = \'paris\'</span>');	
		$('#popup_meteo1').html('<span>Veuillez indiquer votre ville dans les paramètres<br>exemple:<br>var city = \'paris\'</span>');	
		$('#popup_meteo2').html('<span>Veuillez indiquer votre ville dans les paramètres<br>exemple:<br>var city = \'paris\'</span>');	
		$('#popup_meteo3').html('<span>Veuillez indiquer votre ville dans les paramètres<br>exemple:<br>var city = \'paris\'</span>');	
	}
	else{
		$('#popup_meteo0').html(['<img src="http://www.prevision-meteo.ch/uploads/widget/',city,'_0.png?timestamp=',Date.now(),'" alt="Ville inconnue..">'].join(''));
		$('#popup_meteo1').html(['<img src="http://www.prevision-meteo.ch/uploads/widget/',city,'_1.png?timestamp=',Date.now(),'" alt="Ville inconnue..">'].join(''));
		$('#popup_meteo2').html(['<img src="http://www.prevision-meteo.ch/uploads/widget/',city,'_2.png?timestamp=',Date.now(),'" alt="Ville inconnue..">'].join(''));
		$('#popup_meteo3').html(['<img src="http://www.prevision-meteo.ch/uploads/widget/',city,'_3.png?timestamp=',Date.now(),'" alt="Ville inconnue..">'].join(''));
	}
	if (place === ''){
		$('#popup_meteo4').html('<span>Veuillez indiquer votre ville dans les paramètres<br>exemple:<br>var place = \'France/Brittany/Paris\'</span>');	
	}
	else{
		$('#popup_meteo4').html(['<img src="http://www.yr.no/place/',place,'/avansert_meteogram.png?timestamp=',Date.now(),'" alt="Ville inconnue..">'].join(''));
	}
	
	
}

// get graph infos
function RefreshGraphData(xIDX, vdesc, vtype, vrange, vpara, vunit) {
		
		$.ajax({
            url: [$.domoticzurl,'/json.htm?type=graph&sensor=',vtype,'&idx=',xIDX,'&range=',vrange,'&jsoncallback=?'].join(''),
            xIDX: xIDX,
			vdesc: vdesc,
			vtype: vtype,
			vrange: vrange,
            vunit: vunit,
			vpara: vpara
        }).done(function(data) {
            var arrData = [];
            var arrData2 = [];
			var seriesData = [];
			if (vpara === 'p1') {
				
				$.each(data.result, function(i, item) {
					var year = parseInt(item.d.substring(0, 4));
					var month = parseInt(item.d.substring(5, 7));
					var day = parseInt(item.d.substring(8, 10));
					var hour = parseInt(item.d.substring(11, 13));
					var minutes = parseInt(item.d.substring(14, 16));
					var xVal = Date.UTC(year, month-1, day, hour, minutes);
					var x = [xVal, parseFloat(item.v)];
					var x2 = [xVal, parseFloat(item.v2)];
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
			
			}
			else {
				
				$.each(data.result, function(i, item) {
					var year = parseInt(item.d.substring(0, 4));
					var month = parseInt(item.d.substring(5, 7));
					var day = parseInt(item.d.substring(8, 10));
					var hour = parseInt(item.d.substring(11, 13));
					var minutes = parseInt(item.d.substring(14, 16));
					var xVal = Date.UTC(year, month-1, day, hour, minutes);
					var x = [xVal, parseFloat(item[vpara])];
					arrData.push(x);
				});
				
				seriesData = [{
								data: arrData,
								color: '#3333FF',
								borderWidth: 2
							}];	
			}


            createGraph(seriesData, vdesc, vunit);
			
        });
    
}

// create graph
function createGraph(seriesData, vdesc, vunit) {
    
    $('#popup_graph').highcharts({
        chart: {
            backgroundColor: 'white',
            plotBackgroundColor: 'none',
            type: 'line',
            zoomType: 'none',
			animation: false,
			reflow: false
        },
        plotOptions: {
			line: { animation: false, enableMouseTracking: false, stickyTracking: true, shadow: false, dataLabels: { style: { textShadow: false } } }
		},
		
        subtitle: {
            text: ''
        },
        title: {
            text: vdesc
        },
        tooltip: {
            formatter: function() {
                return ['<b>',y,'</b>'].join('');
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
	
	lightbox_open('graph', 25400);
			
}

// init some vars
var var_sunrise, var_sunset;
var IsNight = false;
var error = 0;

//long press events
var timer;
var istrue = false;
var delay = 100; // how much long you have to hold click in MS
function func(idx,e,vdata,vdesc,dimstep)
{
   istrue = true;
   timer = setTimeout(function(){ makeChange(idx,vdata,vdesc,dimstep);},delay);
  // Incase if you want to prevent Default functionality on mouse down
  if (e.preventDefault) 
  { 
	 e.preventDefault();
  } else {
	 e.returnValue = false; 
  }
}
function makeChange(idx,vdata,vdesc,dimstep)
{
	  if(timer)
	  clearTimeout(timer);

	  if(istrue)
	  {
			// rest of your code
		
			
			if (isNaN(vdata))
			vdata = 0;
			
			$( "#popup_range").html('');
			$( "#popup_range").append( '<p>' );
			$( "#popup_range").append( '<label for="amount">'+vdesc+': </label>' );
			$( "#popup_range").append( '<input type="text" id="amount" readonly size="2">' );
			$( "#popup_range").append( '<p>' );
			$( "#popup_range").append( '<div id="slider-H"></div>' );
			
			
			$( "#slider-H" ).slider({
			  orientation: "horisontal",
			  range: "min",
			  min: 0,
			  max: 100,
			  value: vdata,
			  step: 100/dimstep,
			  slide: function( event, ui ) {
				$( "#amount" ).val( parseInt(ui.value) + ' %');
				
				},
			  change: function( event, ui ) {
			
					var d = Math.round(1+parseInt(ui.value)/100*dimstep);
					if( d < 0 )
						d = 0;

                
                $.ajax({
                        url: [$.domoticzurl,'/json.htm?type=command&param=switchlight&idx=',idx,'&switchcmd=Set Level&level=',d].join(''),
						success: function(result){
					
							if (result.message === 'WRONG CODE'){
								console.warn('WRONG CODE');
								//lightbox_open('switch',wrongCode_timeout,txt_wrong_code);
							}else if (result.status === 'OK'){
								console.log('%cSend command : Succes','color:green');
								RefreshData();
							}else{
								//lightbox_open('switch',1500,result.status);
								console.log(result);
							}
						 },
                        error: function(result){
							//lightbox_open('switch',1500,result.statusText);
							console.warn(result.status);
						 }
                });
			  
			  }
			});
			$( "#amount" ).val( parseInt($( "#slider-H" ).slider( "value" ))  + ' %');
			
						
			showRange();	// show popup with slider

	  }
}
function revert()
{
   istrue = false;
}

var refreshTimer;

// Main Frontpage function
function RefreshData()
{
        
		clearTimeout(refreshTimer);
		console.log('%cPage refresh', 'color: blue','\n');
		
		
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
		
	$.ajax({
            url: [$.domoticzurl,'/json.htm?type=command&param=getSunRiseSet&jsoncallback=?'].join(''),
        success: function(data) {
		var one = new Date();
		if (typeof data !== 'undefined') {
                        $.each(data, function(i,item){
				if ( i === 'Sunrise' ) {
					console.log("sunrise: ", item);
					var_sunrise = item.substring(0, 5);
					
				}
				else if ( i === 'Sunset' ) {
					console.log("sunset: ", item);
					var_sunset = item.substring(0, 5);
					
				}
				
			});
		}
		else {
		  console.log('Undefined');
		}
		var today=new Date();
		
		// get season

		var dagmdate=today.getDate().toString();
		dagmdate = dagmdate.trim();
		if (dagmdate.length === 1) { 
		dagmdate = ['0',dagmdate].join('');
		}
		
		var maandmdate=(today.getMonth()+1).toString();
		maandmdate = maandmdate.trim();
		if (maandmdate.length === 1) { 
		maandmdate = ['0',maandmdate].join('');
		}
		
		var mdate = [maandmdate,dagmdate].join('');
		
		//console.log(mdate);
	  
		if (mdate >= '1222') { 
			console.log('season: winter'); 
			if ( typeof bg_day_winter !== 'undefined' && bg_day_winter !== '') {
				bg_day = bg_day_winter;
			}
			if ( typeof bg_night_winter !== 'undefined' && bg_night_winter !== '') {
				bg_night = bg_night_winter; 
			}
		} 
		else if (mdate >= '0923') { 
			console.log('season: autumn'); 
			if ( typeof bg_day_autumn !== 'undefined' && bg_day_autumn !== '') {
				bg_day = bg_day_autumn;
			}
			if ( typeof bg_night_autumn !== 'undefined' && bg_night_autumn !== '') {
				bg_night = bg_night_autumn; 
			}
		} 
		else if (mdate >= '0621') { 
			console.log('season: summer'); 
			if ( typeof bg_day_summer !== 'undefined' && bg_day_summer !== '') {
				bg_day = bg_day_summer;
			}
			if ( typeof bg_night_summer !== 'undefined' && bg_night_summer !== '') {
				bg_night = bg_night_summer; 
			}
		} 
		else if (mdate >= '0319') { 
		console.log('season: spring'); 
			if ( typeof bg_day_spring !== 'undefined' && bg_day_spring !== '') {
				bg_day = bg_day_spring;
			}
			if ( typeof bg_night_spring !== 'undefined' && bg_night_spring !== '') {
				bg_night = bg_night_spring; 
			}
		}
		else { 
			console.log('season: winter'); 
			if ( typeof bg_day_winter !== 'undefined' && bg_day_winter !== '') {
				bg_day = bg_day_winter;
			}
			if ( typeof bg_night_winter !== 'undefined' && bg_night_winter !== '') {
				bg_night = bg_night_winter; 
			}
		} 
 
		// change background image, depending on day/night/season
		// and set IsNight for meteo icon changing
																									
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
			IsNight = true;
			if ( typeof bg_night !== 'undefined' && bg_night !== '') {
				// night background
			
				$('#black').css('background', ['rgba(0,0,0,',bg_nightBright,')'].join(''));
				
				document.body.style.background=['black url(icons/',bg_night,') no-repeat top center fixed'].join('');
				document.body.style.backgroundSize=bg_size;
				
			}
			// night clock background
			if ($('.horloge').length > 0) {
			
				if ($('.horloge').hasClass('day')) {
					$('.horloge').removeClass('day');
				}	
				if (!$('.horloge').hasClass('night')) {
					$('.horloge').addClass('night');
				}	
			}
		}
		else {
			// day
			IsNight = false;
			if ( typeof bg_day !== 'undefined' && bg_day !== '') {
				// day background
			
				$('#black').css('background', ['rgba(0,0,0,',bg_dayBright,')'].join(''));
			
			
				document.body.style.background=['black url(icons/',bg_day,') no-repeat top center fixed'].join('');													
				document.body.style.backgroundSize=bg_size;
					
			}
			// day clock background
			if ($('.horloge').length > 0) {
			
				if ($('.horloge').hasClass('night')) {
					$('.horloge').removeClass('night');
				}	
				if (!$('.horloge').hasClass('day')) {
					$('.horloge').addClass('day');
				}	
			}
		}
												
		console.log('%cConnecting to domoticz : Success', 'color: green','\n');
		if(error != 0){
			error = 0;
			GetCams();
		}	
		if($('#popup_offline').css('display') === 'block'){
			$('#popup_offline').fadeOut(fad_Duration);
			$('#fade2').fadeOut(fad_Duration);
		}
		
		one = new Date() - one;
		console.log('Get sunset/background/clock/meteo: ' + one + 'ms');	
		
		},
		error: function() {
			error += 1;
			console.log(['ERROR connect to ',$.domoticzurl].join(''));
			if( error >= 10 && $('#popup_offline').css('display') === 'none') 
			{
				$('#popup_offline').fadeIn(fad_Duration);
				$('#fade2').fadeIn(fad_Duration);
			}
			else{
				RefreshData();
			}	
				
		}
	});
	
	
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	
		$.ajax({
            url: [$.domoticzurl,'/json.htm?type=devices&plan=',$.roomplan,'&jsoncallback=?'].join(''),
			success: function(data) {
		
				var two = new Date();
		                
				if (typeof data.result !== 'undefined') {
     
						$.each(data.result, function(i,item){
						//    for( var ii = 0, len = $.PageArray.length; ii < len; ii++ ) {
							var ii = 0, len = $.PageArray.length;
							jsKata.nofreeze.forloop(
								  // the condition
								  function() { return ii < len - 1;  }, 
								  // the incrementor
								  function() { ii++; },
								  // this is what will be executed
								  function fct() {
										if( $.PageArray[ii][0] === item.idx || $.PageArray[ii][0] === item.Name ) {         				// Domoticz idx number or device name
                                                var vtype=      $.PageArray[ii][1];             		// Domotitcz type (like Temp, Humidity)
                                                var vlabel=     $.PageArray[ii][2];                     // cell number from HTML layout
                                                var vdesc=      $.PageArray[ii][3];                     // description
												var lastseen=   $.PageArray[ii][4];						// display lastseen or noT
                                                var vplusmin=   $.PageArray[ii][5];             		// minplus buttons
                                                var vattr=      $.PageArray[ii][6];                     // extra css attributes
                                                var valarm=     $.PageArray[ii][7];             		// alarm value to turn text to red
                                                var vdata=      item[vtype];                            // current value
                                                var vstatus=    item.Status;
												var vls=  		item.LastUpdate;						// ´Last Seen´
												var vdimmercurrent=  item.LevelInt;  				// What is the dim level
												
													//console.log(item.Name+' : '+vdata);
												if(vtype === 'Euro'){       
													vdata=item.Data;
												}
												
												if (typeof vdata === 'undefined') {
                                                        vdata='?!';
                                                }
												else {
                                                        // remove too much text
                                                        vdata= String(vdata).split("Watt",1)[0];
                                                        vdata= String(vdata).split("kWh",1)[0];
                                                        vdata= String(vdata).split("km",1)[0];
                                                        vdata= String(vdata).split("Liter",1)[0];
                                                        //vdata= String(vdata).split("V",1)[0];
														if (vdata.charAt(vdata.length - 1) == 'V') {
														  vdata = vdata.substr(0, vdata.length - 1);
														}
                                                        vdata= String(vdata).split("%",1)[0];
                                                        vdata= String(vdata).split(" Level:",1)[0];
                                                        vdata= String(vdata).split("m3",1)[0];
														vdata= String(vdata).split("Lux",1)[0];
														vdata= String(vdata).replace("Set","On");
                                                        vdata= String(vdata).replace("true","protected");
                                                }
												
												if (typeof vattr !== 'undefined') {
													if (vattr === '') {
														vattr = undefined;
													}
												}
												
												//console.log(item.Name+' : '+vdata);
												var switchclick, alarmcss, val, plus, min;
												
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
						
                                                //PushOn PushOff gives wrong(undesired) status
												if (item.SwitchType === 'Push On Button') { vdata = 'Off'; }
												if (item.SwitchType === 'Push Off Button') { vdata = 'On'; }
												
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	

												//Check wether we want to add the last seen to the block
												if (typeof lastseen === 'undefined' || lastseen === '') {
													lastseen = '0';
												}
												if (vtype !== 'ForecastStr' && (lastseen === '1' || lastseen === '3') && ($(['#ls_',vlabel].join('')).length > 0)) { 
													$(['#ls_',vlabel].join('')).html(vls);
												}													
						
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
												
											// wake up
												if(vtype === 'Wakeup') {
													vdata = goodmorning(item.Data);
												}
													
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
											
											
                                            //Dimmer
                                            
												else if(vtype === 'Level' && item.SwitchType === 'Dimmer') {
														if (vstatus === 'Off') {
															alarmcss='color:#E24E2A;';	// text color dimmer percentage when OFF
															vdata = txt_off;
														}
														else {
															alarmcss='color:#1B9772;';	// text color dimmer percentage when ON
														}
													
                                                        if (vdata === txt_off) {
															if (lastseen === '2') {
																val = ['<img src="',$.domoticzurl,'/images/Light48_Off.png" width=48 onclick="SwitchToggle(',item.idx,', \'On\',',txt_switch_on,',',item.Protected,')" onmousedown="func(',item.idx,',event,\'',vdata,'\',\'',vdesc,'\',',item.MaxDimLevel,')" onmouseup="revert()" style=',alarmcss,'>'].join('');
                                                            }
															else {
																val = ['<span onclick="SwitchToggle(',item.idx,', \'On\',',txt_switch_on,',',item.Protected,')" onmousedown="func(',item.idx,',event,\'',vdata,'\',\'',vdesc,'\',',item.MaxDimLevel,')" onmouseup="revert()" style=',alarmcss,'>',vdata,'</span>'].join('');
															}
															plus = "";
                                                            min = "";
                                                        }
                                                        else
                                                        {
															if (item.MaxDimLevel === 100) {
																if (lastseen === '2') {
																	val = ['<img src="',$.domoticzurl,'/images/Light48_On.png" width=48 onclick="SwitchToggle(',item.idx,', \'Off\',',txt_switch_off,',',item.Protected,')" onmousedown="func(',item.idx,',event,\'',vdata,'\',\'',vdesc,'\',',item.MaxDimLevel,')" onmouseup="revert()" style=',alarmcss,'>'].join('');
																	vdesc=[vdesc,'<span class="percent">',vdata,'<span style="font-size:70%;"> &#37;</span></span>'].join('');
																}
																else {
																	val = ['<span onclick="SwitchToggle(',item.idx,', \'Off\',',txt_switch_off,',',item.Protected,')" onmousedown="func(',item.idx,',event,\'',vdata,'\',\'',vdesc,'\',',item.MaxDimLevel,')" onmouseup="revert()" style=',alarmcss,'>',vdata,'</span>'].join('');
																}
																plus = ['<img src=icons/plus.png align=right hspace=10 vspace=4 width=30 onclick="DimLevel100(\'plus\',',vdata,',',item.idx,',',item.Protected,')">'].join('');
																min = ['<img src=icons/min.png align=left hspace=10 vspace=4 width=30 onclick="DimLevel100(\'min\',',vdata,',',item.idx,',',item.Protected,')">'].join('');
															}
															else {
																if (lastseen === '2') {
																	val = ['<img src="',$.domoticzurl,'/images/Light48_On.png" width=48 onclick="SwitchToggle(',item.idx,', \'Off\',',txt_switch_off,',',item.Protected,')" onmousedown="func(',item.idx,',event,\'',vdata,'\',\'',vdesc,'\',',item.MaxDimLevel,')" onmouseup="revert()" style=',alarmcss,'>'].join('');
																	vdesc=[vdesc,'<span class="percent">',vdata,'<span style="font-size:70%;"> &#37;</span></span>'].join('');
																}
																else {
																	val = ['<span onclick="SwitchToggle(',item.idx,', \'Off\',',txt_switch_off,',',item.Protected,')" onmousedown="func(',item.idx,',event,\'',vdata,'\',\'',vdesc,'\',',item.MaxDimLevel,')" onmouseup="revert()" style=',alarmcss,'>',vdata,'</span>'].join('');
																}
																plus = ['<img src=icons/plus.png align=right hspace=10 vspace=4 width=30 onclick="DimLevel16(\'plus\',',vdata,',',item.idx,',',vdimmercurrent,',',item.Protected,')">'].join('');
																min = ['<img src=icons/min.png align=left hspace=10 vspace=4 width=30 onclick="DimLevel16(\'min\',',vdata,',',item.idx,',',vdimmercurrent,',',item.Protected,')">'].join('');
															}
                                                        }
                                                        vdata = [min,val,plus].join('');
														//console.log(vdata);
												} 
										
											
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	

											// selector
											
												else if(vtype === 'Level' && item.SwitchType === 'Selector') {

													// Tableau contenant le nom des levels
													var mots = item.LevelNames.split("|");
													//console.log(12,item.LevelNames);
													for (i = 0; i < mots.length; i++) {
														if (i==parseInt(item.Level)/10) {
															vdata = mots[i];
														}
													}
												//console.log(item.LevelOffHidden);
													switchclick = ['onclick="ShowSelector(',item.idx,',\'',item.LevelNames,'\',',item.LevelOffHidden,',',item.Protected,')"'].join(''); 

												}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	

											//Thermostat
											
												else if(vtype === 'SetPoint' && vplusmin > 0) {
														val = ['<span style=',vattr,'>',vdata,'</span>'].join('');
														if(vdata >= valarm) {
															plus = ['<img src=icons/plusRed.png align=right vspace=4 width=30 onclick="ChangeTherm(\'plus\',',vplusmin,',',item.idx,',',vdata,',',valarm,',',item.Protected,')">'].join('');
														}
														else{
															plus = ['<img src=icons/plus.png align=right vspace=4 width=30 onclick="ChangeTherm(\'plus\',',vplusmin,',',item.idx,',',vdata,',',valarm,',',item.Protected,')">'].join('');
														}
														min = ['<img src=icons/min.png align=left vspace=4 width=30 onclick="ChangeTherm(\'min\',',vplusmin,',',item.idx,',',vdata,',',valarm,',',item.Protected,')">'].join('');
														vdata = [min,val,plus].join('');
														//console.log(vdata);
												}
											
											
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
											
											// blinds
											
												else if (item.SwitchType === 'Blinds') {
													if(vdata === 'Closed') {
															var down = ['<img src=',$.domoticzurl,'/images/blinds48sel.png  hspace=1 width=40 onclick="SwitchToggle(',item.idx,', \'On\',',txt_blind_down,',',item.Protected,')">'].join('');
															var up = ['<img src=',$.domoticzurl,'/images/blindsopen48.png  hspace=1 width=40 onclick="SwitchToggle(',item.idx,', \'Off\',',txt_blind_up,',',item.Protected,')">'].join('');
													}
													else if (vdata === 'Open' || vdata === 'Stopped') {
															var down = ['<img src=',$.domoticzurl,'/images/blinds48.png  hspace=1 width=40 onclick="SwitchToggle(',item.idx,', \'On\',',txt_blind_down,',',item.Protected,')">'].join('');
															var up = ['<img src=',$.domoticzurl,'/images/blindsopen48sel.png  hspace=1 width=40 onclick="SwitchToggle(',item.idx,', \'Off\',',txt_blind_up,',',item.Protected,')">'].join('');
													}
													var stop = ['<img src=',$.domoticzurl,'/images/blindsstop.png  hspace=1 height=40 onclick="SwitchToggle(',item.idx,', \'Stop\',',txt_blind_stop,',',item.Protected,')">'].join('');
													if(item.Type === 'RFY') {
														vdata = [down,stop,up].join('');
													}
													else {
														vdata = [down,up].join('');
													}	
													//console.log(vdata);
												}
												else if (item.SwitchType === 'Blinds Inverted') {
													if(vdata === 'Closed') {
															var down = ['<img src=',$.domoticzurl,'/images/blinds48sel.png  hspace=1 width=40 onclick="SwitchToggle(',item.idx,', \'Off\',',txt_blind_down,',',item.Protected,')">'].join('');
															var up = ['<img src=',$.domoticzurl,'/images/blindsopen48.png  hspace=1 width=40 onclick="SwitchToggle(',item.idx,', \'On\',',txt_blind_up,',',item.Protected,')">'].join('');
													}
													else if (vdata === 'Open' || vdata === 'Stopped') {
															var down = ['<img src=',$.domoticzurl,'/images/blinds48.png  hspace=1 width=40 onclick="SwitchToggle(',item.idx,', \'Off\',',txt_blind_down,',',item.Protected,')">'].join('');
															var up = ['<img src='+$.domoticzurl,'/images/blindsopen48sel.png  hspace=1 width=40 onclick="SwitchToggle(',item.idx,', \'On\',',txt_blind_up,',',item.Protected,')">'].join('');
													}
													var stop = ['<img src=',$.domoticzurl,'/images/blindsstop.png  hspace=1 height=40 onclick="SwitchToggle(',item.idx,', \'Stop\',',txt_blind_stop,',',item.Protected,')">'].join('');
													if(item.Type === 'RFY') {
														vdata = [down,stop,up].join('');
													}
													else {
														vdata = [down,up].join('');
													}
													//console.log(vdata);
												}
												else if (item.SwitchType === 'Venetian Blinds EU' || item.SwitchType === 'Venetian Blinds US') {
													if(vdata === 'Closed') {
															var down = ['<img src=',$.domoticzurl,'/images/blinds48sel.png  hspace=1 width=40 onclick="SwitchToggle(',item.idx,', \'On\',',txt_blind_down,',',item.Protected,')">'].join('');
															var up = ['<img src=',$.domoticzurl,'/images/blindsopen48.png  hspace=1 width=40 onclick="SwitchToggle(',item.idx,', \'Off\',',txt_blind_up,',',item.Protected,')">'].join('');
													}
													else if (vdata === 'Open' || vdata === 'Stopped') {
															var down = ['<img src=',$.domoticzurl,'/images/blinds48.png  hspace=1 width=40 onclick="SwitchToggle(',item.idx,', \'On\',',txt_blind_down,',',item.Protected,')">'].join('');
															var up = ['<img src=',$.domoticzurl,'/images/blindsopen48sel.png  hspace=1 width=40 onclick="SwitchToggle(',item.idx,', \'Off\',',txt_blind_up,',',item.Protected,')">'].join('');
													}
													var stop = ['<img src=',$.domoticzurl,'/images/blindsstop.png  hspace=1 height=40 onclick="SwitchToggle(',item.idx,', \'Stop\',',txt_blind_stop,',',item.Protected,')">'].join('');
													vdata = [down,stop,up].join('');
													//console.log(vdata);
												}
												else if (item.SwitchType === 'Blinds Percentage') {
													
													if(item.Status === 'Closed') {
															vdata = 100;
															var down = ['<img src=',$.domoticzurl,'/images/blinds48sel.png  hspace=1 width=40 onclick="SwitchToggle(',item.idx,', \'On\',',txt_blind_down,',',item.Protected,')">'].join('');
															var up = ['<img src=',$.domoticzurl,'/images/blindsopen48.png  hspace=1 width=40 onclick="SwitchToggle(',item.idx,', \'Off\',',txt_blind_up,',',item.Protected,')">'].join('');
															plus = ['<img src=icons/plus.png  vspace=4 hspace=4 width=30 onclick="DimLevel100(\'min\',',vdata,',',item.idx,',',item.Protected,')">'].join('');
															min = ['<img src=icons/min.png  vspace=4 hspace=4 width=30 onclick="DimLevel100(\'plus\',',vdata,',',item.idx,',',item.Protected,')">'].join('');
														
													}
													else if (item.Status === 'Open') {
															var down = ['<img src=',$.domoticzurl,'/images/blinds48.png  hspace=1 width=40 onclick="SwitchToggle(',item.idx,', \'On\',',txt_blind_down,',',item.Protected,')">'].join('');
															var up = ['<img src=',$.domoticzurl,'/images/blindsopen48sel.png  hspace=1 width=40 onclick="SwitchToggle(',item.idx,', \'Off\',',txt_blind_up,',',item.Protected,')">'].join('');
															plus = ['<img src=icons/plus.png  vspace=4 hspace=4 width=30 onclick="DimLevel100(\'min\',',vdata,',',item.idx,',',item.Protected,')">'].join('');
															min = ['<img src=icons/min.png  vspace=4 hspace=4 width=30 onclick="DimLevel100(\'plus\',',vdata,',',item.idx,',',item.Protected,')">'].join('');
													}
													else {
															var down = ['<img src=',$.domoticzurl,'/images/blinds48.png  hspace=1 width=40 onclick="SwitchToggle(',item.idx,', \'On\',',txt_blind_down,',',item.Protected,')">'].join('');
															var up = ['<img src=',$.domoticzurl,'/images/blindsopen48sel.png  hspace=1 width=40 onclick="SwitchToggle(',item.idx,', \'Off\',',txt_blind_up,',',item.Protected,')">'].join('');
															plus = ['<img src=icons/plus.png  vspace=4 hspace=4 width=30 onclick="DimLevel100(\'min\',',vdata,',',item.idx,',',item.Protected,')">'].join('');
															min = ['<img src=icons/min.png  vspace=4 hspace=4 width=30 onclick="DimLevel100(\'plus\',',vdata,',',item.idx,',',item.Protected,')">'].join('');
													}
													
													vdesc = [vdesc,'<span class="percent">',(100-vdata),'<span style="font-size:50%;"> &#37;</span></span>'].join('');
													vdata = [min,down,up,plus].join('');
													//console.log(vdata);
												}
												else if (item.SwitchType === 'Blinds Percentage Inverted') {
													
													if(item.Status === 'Closed') {
															var down = ['<img src=',$.domoticzurl,'/images/blinds48sel.png  hspace=1 width=40 onclick="SwitchToggle(',item.idx,', \'Off\',',txt_blind_down,',',item.Protected,')">'].join('');
															var up = ['<img src=',$.domoticzurl,'/images/blindsopen48.png  hspace=1 width=40 onclick="SwitchToggle(',item.idx,', \'On\',',txt_blind_up,',',item.Protected,')">'].join('');
															plus = ['<img src=icons/plus.png vspace=4 hspace=4 width=30 onclick="DimLevel100(\'plus\',',vdata,',',item.idx,',',item.Protected,')">'].join('');
															min = ['<img src=icons/min.png vspace=4 hspace=4 width=30 onclick="DimLevel100(\'min\',',vdata,',',item.idx,',',item.Protected,')">'].join('');
															
													}
													else if (item.Status === 'Open') {
															vdata = 100;
															var down = ['<img src=',$.domoticzurl,'/images/blinds48.png  hspace=1 width=40 onclick="SwitchToggle(',item.idx,', \'Off\',',txt_blind_down,',',item.Protected,')">'].join('');
															var up = ['<img src=',$.domoticzurl,'/images/blindsopen48sel.png  hspace=1 width=40 onclick="SwitchToggle(',item.idx,', \'On\',',txt_blind_up,',',item.Protected,')">'].join('');
															plus = ['<img src=icons/plus.png vspace=4 hspace=4 width=30 onclick="DimLevel100(\'plus\',',vdata,',',item.idx,',',item.Protected,')">'].join('');
															min = ['<img src=icons/min.png vspace=4 hspace=4 width=30 onclick="DimLevel100(\'min\',',vdata,',',item.idx,',',item.Protected,')">'].join('');
													
													}
													else {
															var down = ['<img src=',$.domoticzurl,'/images/blinds48.png  hspace=1 width=40 onclick="SwitchToggle(',item.idx,', \'Off\',',txt_blind_down,',',item.Protected,')">'].join('');
															var up = ['<img src=',$.domoticzurl,'/images/blindsopen48sel.png  hspace=1 width=40 onclick="SwitchToggle(',item.idx,', \'On\',',txt_blind_up,',',item.Protected,')">'].join('');
															plus = ['<img src=icons/plus.png vspace=4 hspace=4 width=30 onclick="DimLevel100(\'plus\',',vdata,',',item.idx,',',item.Protected,')">'].join('');
															min = ['<img src=icons/min.png vspace=4 hspace=4 width=30 onclick="DimLevel100(\'min\',',vdata,',',item.idx,',',item.Protected,')">'].join('');
													
													}
													vdesc = [vdesc,'<span class="percent">',vdata,'<span style="font-size:50%;"> &#37;</span></span>'].join('');
													vdata = [min,down,up,plus].join('');
													//console.log(vdata);
												}
											
												
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
											
												// replace forecast (text) with an image
												
													else if (vtype === 'ForecastStr'){
														if (IsNight) {
															
																switch (vdata) {
																	case 'Sunny':
																		vdata = ['<img src=icons/meteo/night-clear.png width=155 height=155 onclick="lightbox_open(\'meteo',lastseen,'\', 25400)">'].join('');
																		break;
																	case 'Partly Cloudy':
																		vdata = ['<img src=icons/meteo/night-partlycloudy.png width=155 height=155 onclick="lightbox_open(\'meteo',lastseen,'\', 25400)">'].join('');
																		break;
																	case 'Cloudy':
																		vdata = ['<img src=icons/meteo/night-cloudy.png width=155 height=155 onclick="lightbox_open(\'meteo',lastseen,'\', 25400)">'].join('');
																		break;
																	case 'Clear':
																		vdata = ['<img src=icons/meteo/night-clear.png width=155 height=155 onclick="lightbox_open(\'meteo',lastseen,'\', 25400)">'].join('');
																		break;
																	case 'Rain':
																		vdata = ['<img src=icons/meteo/night-rain.png width=155 height=155 onclick="lightbox_open(\'meteo',lastseen,'\', 25400)">'].join('');
																		break;
																	case 'Snow':
																		vdata = ['<img src=icons/meteo/night-snow.png width=155 height=155 onclick="lightbox_open(\'meteo',lastseen,'\', 25400)">'].join('');
																		break;
																	case 'Fog':
																		vdata = ['<img src=icons/meteo/night-fog.png width=155 height=155 onclick="lightbox_open(\'meteo',lastseen,'\', 25400)">'].join('');
																		break;
																	case 'Hail':
																		vdata = ['<img src=icons/meteo/night-hail.png width=155 height=155 onclick="lightbox_open(\'meteo',lastseen,'\', 25400)">'].join('');
																		break;
																	case 'Thunderstom':
																		vdata = ['<img src=icons/meteo/night-thunder.png width=155 height=155 onclick="lightbox_open(\'meteo',lastseen,'\', 25400)">'].join('');
																		break;
																	case 'Sleet':
																		vdata = ['<img src=icons/meteo/night-sleet.png width=155 height=155 onclick="lightbox_open(\'meteo',lastseen,'\', 25400)">'].join('');
																		break;
																}
																
														}else{
																switch (vdata) {
																	case 'Sunny':
																		vdata = ['<img src=icons/meteo/day-sun.png width=155 height=155 onclick="lightbox_open(\'meteo',lastseen,'\', 25400)">'].join('');
																		break;
																	case 'Partly Cloudy':
																		vdata = ['<img src=icons/meteo/day-partlycloudy.png width=155 height=155 onclick="lightbox_open(\'meteo',lastseen,'\', 25400)">'].join('');
																		break;
																	case 'Cloudy':
																		vdata = ['<img src=icons/meteo/day-cloudy.png width=155 height=155 onclick="lightbox_open(\'meteo',lastseen,'\', 25400)">'].join('');
																		break;
																	case 'Clear':
																		vdata = ['<img src=icons/meteo/day-sun.png width=155 height=155 onclick="lightbox_open(\'meteo',lastseen,'\', 25400)">'].join('');
																		break;
																	case 'Rain':
																		vdata = ['<img src=icons/meteo/day-rain.png width=155 height=155 onclick="lightbox_open(\'meteo',lastseen,'\', 25400)">'].join('');
																		break;
																	case 'Snow':
																		vdata = ['<img src=icons/meteo/day-snow.png width=155 height=155 onclick="lightbox_open(\'meteo',lastseen,'\', 25400)">'].join('');
																		break;
																	case 'Fog':
																		vdata = ['<img src=icons/meteo/day-fog.png width=155 height=155 onclick="lightbox_open(\'meteo',lastseen,'\', 25400)">'].join('');
																		break;
																	case 'Hail':
																		vdata = ['<img src=icons/meteo/day-hail.png width=155 height=155 onclick="lightbox_open(\'meteo',lastseen,'\', 25400)">'].join('');
																		break;
																	case 'Thunderstom':
																		vdata = ['<img src=icons/meteo/day-thunder.png width=155 height=155 onclick="lightbox_open(\'meteo',lastseen,'\', 25400)">'].join('');
																		break;
																	case 'Sleet':
																		vdata = ['<img src=icons/meteo/day-sleet.png width=155 height=155 onclick="lightbox_open(\'meteo',lastseen,'\', 25400)">'].join('');  
																		break;
																}
														}
													}
												
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	

												// security panel keyboard popup
												else if (item.SubType === 'Security Panel') {
													switchclick = 'onclick="showPanel()"';
												}												
												
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////													
												
												// traduction
													var HumidityStatus = { "Wet": "Humide", "Comfortable": "Confortable", "ccc": "333" };
													
													if (vdata === 'Closed' && (item.SwitchType === 'Contact' || item.SwitchType === 'Door Lock')) {
															vdata = txt_closed; 
															vattr='color:#E24E2A';
													}
													else if (vdata === 'Open' && (item.SwitchType === 'Contact' || item.SwitchType === 'Door Lock')) {
															vdata = txt_open;
															vattr='color:#1B9772';
													}
													else if (typeof HumidityStatus[vdata] !== 'undefined') {
														vdata = HumidityStatus[vdata];
													}	
												
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////													
                                                											
												// create switchable value when item is switch
												
												//	switchclick='';
													
													if ((vdata === 'Off' || item.SwitchType === 'Doorbell') && item.SwitchType != 'Selector') {
															switchclick = ['onclick="SwitchToggle(',item.idx,', \'On\' ,',txt_switch_on,',',item.Protected,')"'].join('');
																													
															if ( item.SwitchType === 'Push On Button' && lastseen != '2' && lastseen != '3') {
																vdata = vdesc;
																vdesc = '';
															}
															else { 
															vdata = txt_off;
															alarmcss='color:#E24E2A;';
															}
													}
													
													if ((vdata === 'On' ) && item.SwitchType != 'Selector') {
															switchclick = ['onclick="SwitchToggle(',item.idx,', \'Off\' ,',txt_switch_off,',',item.Protected,')"'].join('');

															if ( item.SwitchType === 'Push Off Button' && lastseen != '2' && lastseen != '3') {
																vdata = vdesc;
																vdesc = '';
															}
															else { 
															vdata = txt_on;
															alarmcss='color:#1B9772;';
															}
															
													}
												

												
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////													

												// Replace Status with icon if needed
												if (vtype !== 'ForecastStr' && typeof lastseen !== 'undefined') {
													if (lastseen === '2' || lastseen === '3') {
														if (item.SwitchType === 'Dusk Sensor') {
															var icon_On = 'uvdark.png';
															var icon_Off = 'uvsunny.png';
														}
														else if (item.SwitchType === 'Door Lock') {
															var icon_On = 'door48open.png';
															var icon_Off = 'door48.png';
														}
														else if (item.SwitchType === 'Doorbell') {
															var icon_Off = 'doorbell48.png';
														}
														else if (item.SwitchType === 'Contact') {
															var icon_On = 'contact48_open.png';
															var icon_Off = 'contact48.png';
														}
														else if (item.SwitchType === 'Motion Sensor') {
															var icon_On = 'motion48-on.png';
															var icon_Off = 'motion48-off.png';
														}
														else if (item.SwitchType === 'Push On Button') {
															var icon_Off = 'push48.png';
														}
														else if (item.SwitchType === 'Push Off Button') {
															var icon_On = 'pushoff48.png';
														}
														else if (item.SwitchType === 'Smoke Detector') {
															var icon_On = 'smoke48on.png';
															var icon_Off = 'smoke48off.png';
														}
														else if (item.SubType === 'Security Panel') {
															vdesc = vdata;
															var icon = 'security48.png'
															if (vdata === 'Normal') {
																//vdata= '<img src='icons/alarm_off.png'  width=48>';
																vdata = ['<img src=',$.domoticzurl,'/images/',icon,'  width=48>'].join('');
															}
															else if (vdata === 'Arm Home') {
																//vdata= '<img src='icons/alarm_home.png'  width=48>';
																vdata = ['<img src=',$.domoticzurl,'/images/',icon,'  width=48>'].join('');
															}
															else if (vdata === 'Arm Away') {
																//vdata= '<img src='icons/alarm_away.png'  width=48>';
																vdata = ['<img src=',$.domoticzurl,'/images/',icon,'  width=48>'].join('');
															}
														}
														else if (item.SubType === 'Alert') {
															var icon_On = ['Alert48_',vdata,'.png'].join('');
															vdata = txt_on;
														}
														else {
															var	icon_On = [item.Image,'48_On.png'].join('');
															var	icon_Off = [item.Image,'48_Off.png'].join('');
														}
														
														if (vdata === txt_on || vdata === txt_open) {
															vdata = ['<img src=',$.domoticzurl,'/images/',icon_On,' width=48>'].join('');
														}
														else if (vdata === txt_off || vdata === txt_closed) {
															vdata = ['<img src=',$.domoticzurl,'/images/',icon_Off,'  width=48>'].join('');
														}
														else if(vtype === 'Level' && item.SwitchType === 'Selector') {
															vdata = ['<img src=icons/',vdata.replace(/ /g,"%20"),'.png width=48>'].join('');
														}
													}	
													else if (lastseen !== '0' && lastseen !== '1') {
														if (vdata === txt_on || vdata === txt_open) {
															vdata = ['<img src=icons/',lastseen,'48_On.png width=48>'].join('');
														}
														else if (vdata === txt_off || vdata === txt_closed) {
															vdata = ['<img src=icons/',lastseen,'48_Off.png width=48>'].join('');
														}
														else if (item.SwitchType === 'Push On Button' || item.SwitchType === 'Push Off Button') {
															vdata = ['<img src=icons/',lastseen,'.png width=48>'].join('');
															vdesc = $.PageArray[ii][3];
														}
													}
												}	
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////													
												
                                                // if alarm threshold is defined, make value red
												
													if (typeof valarm !== 'undefined' && vtype !== 'SetPoint') {
														
														if ( eval(valarm.replace(/x/g, "Number(vdata)")) ) {  
															alarmcss='color:red;';
															if (blink && !$('#'+vlabel).hasClass("blink_me")) {
																$('#'+vlabel).addClass('blink_me');
															}		
														}
														else if ( $('#'+vlabel ).hasClass( "blink_me" ) ) {
															$('#'+vlabel).removeClass('blink_me');
														}
													}  
											
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
											
												// // graphs and units and temps color 
												
													if((vtype === 'Temp' || vtype === 'Chill') && alarmcss === 'color:red;') {
														vattr = undefined;
													}
													else if((vtype === 'Temp' || vtype === 'Chill') && alarmcss !== 'color:red;' && typeof vattr !== 'undefined') {
															 if (parseInt(vdata, 10) >= 35) { vattr=['color:',T35,';',vattr].join(''); } 
														else if (parseInt(vdata, 10) >= 34) { vattr=['color:',T34,';',vattr].join(''); } 
														else if (parseInt(vdata, 10) >= 33) { vattr=['color:',T33,';',vattr].join(''); } 
														else if (parseInt(vdata, 10) >= 32) { vattr=['color:',T32,';',vattr].join(''); } 
														else if (parseInt(vdata, 10) >= 31) { vattr=['color:',T31,';',vattr].join(''); } 
														else if (parseInt(vdata, 10) >= 30) { vattr=['color:',T30,';',vattr].join(''); } 
														else if (parseInt(vdata, 10) >= 29) { vattr=['color:',T29,';',vattr].join(''); } 
														else if (parseInt(vdata, 10) >= 28) { vattr=['color:',T28,';',vattr].join(''); } 
														else if (parseInt(vdata, 10) >= 27) { vattr=['color:',T27,';',vattr].join(''); } 
														else if (parseInt(vdata, 10) >= 26) { vattr=['color:',T26,';',vattr].join(''); } 
														else if (parseInt(vdata, 10) >= 25) { vattr=['color:',T25,';',vattr].join(''); } 
														else if (parseInt(vdata, 10) >= 24) { vattr=['color:',T24,';',vattr].join(''); } 
														else if (parseInt(vdata, 10) >= 23) { vattr=['color:',T23,';',vattr].join(''); } 
														else if (parseInt(vdata, 10) >= 22) { vattr=['color:',T22,';',vattr].join(''); } 
														else if (parseInt(vdata, 10) >= 21) { vattr=['color:',T21,';',vattr].join(''); } 
														else if (parseInt(vdata, 10) >= 20) { vattr=['color:',T20,';',vattr].join(''); } 
														else if (parseInt(vdata, 10) >= 19) { vattr=['color:',T19,';',vattr].join(''); } 
														else if (parseInt(vdata, 10) >= 18) { vattr=['color:',T18,';',vattr].join(''); } 
														else if (parseInt(vdata, 10) >= 17) { vattr=['color:',T17,';',vattr].join(''); } 
														else if (parseInt(vdata, 10) >= 16) { vattr=['color:',T16,';',vattr].join(''); } 
														else if (parseInt(vdata, 10) >= 15) { vattr=['color:',T15,';',vattr].join(''); } 
														else if (parseInt(vdata, 10) >= 14) { vattr=['color:',T14,';',vattr].join(''); } 
														else if (parseInt(vdata, 10) >= 13) { vattr=['color:',T13,';',vattr].join(''); } 
														else if (parseInt(vdata, 10) >= 12) { vattr=['color:',T12,';',vattr].join(''); } 
														else if (parseInt(vdata, 10) >= 11) { vattr=['color:',T11,';',vattr].join(''); } 
														else if (parseInt(vdata, 10) >= 10) { vattr=['color:',T10,';',vattr].join(''); } 
														else if (parseInt(vdata, 10) >= 9) { vattr=['color:',T09,';',vattr].join(''); } 
														else if (parseInt(vdata, 10) >= 8) { vattr=['color:',T08,';',vattr].join(''); } 
														else if (parseInt(vdata, 10) >= 7) { vattr=['color:',T07,';',vattr].join(''); } 
														else if (parseInt(vdata, 10) >= 6) { vattr=['color:',T06,';',vattr].join(''); } 
														else if (parseInt(vdata, 10) >= 5) { vattr=['color:',T05,';',vattr].join(''); } 
														else if (parseInt(vdata, 10) >= 4) { vattr=['color:',T04,';',vattr].join(''); } 
														else if (parseInt(vdata, 10) >= 3) { vattr=['color:',T03,';',vattr].join(''); } 
														else if (parseInt(vdata, 10) >= 2) { vattr=['color:',T02,';',vattr].join(''); } 
														else if (parseInt(vdata, 10) >= 1) { vattr=['color:',T01,';',vattr].join(''); } 
														else if (parseInt(vdata, 10) >= 0) { vattr=['color:',T00,';',vattr].join(''); }
																					  else  { vattr=['color:',T000,';',vattr].join(''); }
													}
													else if((vtype === 'Temp' || vtype === 'Chill') && alarmcss !== 'color:red;' && typeof vattr === 'undefined') {
															 if (parseInt(vdata, 10) >= 35) { vattr=['color:',T35].join(''); } 
														else if (parseInt(vdata, 10) >= 34) { vattr=['color:',T34].join(''); } 
														else if (parseInt(vdata, 10) >= 33) { vattr=['color:',T33].join(''); } 
														else if (parseInt(vdata, 10) >= 32) { vattr=['color:',T32].join(''); } 
														else if (parseInt(vdata, 10) >= 31) { vattr=['color:',T31].join(''); } 
														else if (parseInt(vdata, 10) >= 30) { vattr=['color:',T30].join(''); } 
														else if (parseInt(vdata, 10) >= 29) { vattr=['color:',T29].join(''); } 
														else if (parseInt(vdata, 10) >= 28) { vattr=['color:',T28].join(''); } 
														else if (parseInt(vdata, 10) >= 27) { vattr=['color:',T27].join(''); } 
														else if (parseInt(vdata, 10) >= 26) { vattr=['color:',T26].join(''); } 
														else if (parseInt(vdata, 10) >= 25) { vattr=['color:',T25].join(''); } 
														else if (parseInt(vdata, 10) >= 24) { vattr=['color:',T24].join(''); } 
														else if (parseInt(vdata, 10) >= 23) { vattr=['color:',T23].join(''); } 
														else if (parseInt(vdata, 10) >= 22) { vattr=['color:',T22].join(''); } 
														else if (parseInt(vdata, 10) >= 21) { vattr=['color:',T21].join(''); } 
														else if (parseInt(vdata, 10) >= 20) { vattr=['color:',T20].join(''); } 
														else if (parseInt(vdata, 10) >= 19) { vattr=['color:',T19].join(''); } 
														else if (parseInt(vdata, 10) >= 18) { vattr=['color:',T18].join(''); } 
														else if (parseInt(vdata, 10) >= 17) { vattr=['color:',T17].join(''); } 
														else if (parseInt(vdata, 10) >= 16) { vattr=['color:',T16].join(''); } 
														else if (parseInt(vdata, 10) >= 15) { vattr=['color:',T15].join(''); } 
														else if (parseInt(vdata, 10) >= 14) { vattr=['color:',T14].join(''); } 
														else if (parseInt(vdata, 10) >= 13) { vattr=['color:',T13].join(''); } 
														else if (parseInt(vdata, 10) >= 12) { vattr=['color:',T12].join(''); } 
														else if (parseInt(vdata, 10) >= 11) { vattr=['color:',T11].join(''); } 
														else if (parseInt(vdata, 10) >= 10) { vattr=['color:',T10].join(''); } 
														else if (parseInt(vdata, 10) >= 9) { vattr=['color:',T09].join(''); } 
														else if (parseInt(vdata, 10) >= 8) { vattr=['color:',T08].join(''); } 
														else if (parseInt(vdata, 10) >= 7) { vattr=['color:',T07].join(''); } 
														else if (parseInt(vdata, 10) >= 6) { vattr=['color:',T06].join(''); } 
														else if (parseInt(vdata, 10) >= 5) { vattr=['color:',T05].join(''); } 
														else if (parseInt(vdata, 10) >= 4) { vattr=['color:',T04].join(''); } 
														else if (parseInt(vdata, 10) >= 3) { vattr=['color:',T03].join(''); } 
														else if (parseInt(vdata, 10) >= 2) { vattr=['color:',T02].join(''); } 
														else if (parseInt(vdata, 10) >= 1) { vattr=['color:',T01].join(''); } 
														else if (parseInt(vdata, 10) >= 0) { vattr=['color:',T00].join(''); }
																					  else  { vattr=['color:',T000].join(''); }
													}
													
													// Adds °C after the temperature
													if(vtype === 'Temp' || vtype === 'Chill') {
														vdata = ['<span onclick="RefreshGraphData(',item.idx,',\'',vdesc,'\',\'temp\',\'day\',\'te\',\'Température &#8451;\')">',vdata,'<sup style="font-size:50%;" >&#8451;</sup></span>'].join('');
													}													
																									
													// Adds % after the humidity
													else if(vtype === 'Humidity'){       
														vdata = ['<span onclick="RefreshGraphData(',item.idx,',\'',vdesc,'\',\'temp\',\'day\',\'hu\',\'Humidité &#37;\')">',vdata,'<span style="font-size:50%;"> &#37;</span></span>'].join('');
													}
													// Adds hPa after Barometer
													else if(vtype === 'Barometer'){
														vdata = ['<span onclick="RefreshGraphData(',item.idx,',\'',vdesc,'\',\'temp\',\'day\',\'ba\',\'Baromètre hpa\')">',vdata,'<span style="font-size:50%;"> hPa</span></span>'].join('');
													}
													// Adds Km/h after the wind
													else if(vtype === 'Speed' || vtype === 'Gust'){       
														vdata = ['<span onclick="RefreshGraphData(',item.idx,',\'',vdesc,'\',\'wind\',\'day\',\'sp\',\'Vitesse km/h\')">',vdata,'<span style="font-size:50%;"> km/h</span></span>'].join('');
													}
													// Adds mm after the rain
													else if(item.Type === 'Rain'){       
														vdata = ['<span onclick="RefreshGraphData(',item.idx,',\'',vdesc,'\',\'rain\',\'day\',\'mm\',\'Précipitations mm\')">',vdata,'<span style="font-size:50%;"> mm</span></span>'].join('');
													}
													// Adds UVI after UV
													else if(item.Type === 'UV'){
														vdata = [vdata,'<span style="font-size:50%;"> UVI</span>'].join('');
													}
													// Adds lx after luminous flux
													else if(item.Type === 'Lux'){       
														vdata = [vdata,'<span style="font-size:50%;"> lx</span>'].join('');
													}
													// Adds % after percentage
													else if(vtype === 'Data' && item.SubType === 'Percentage'){       
														vdata = ['<span onclick="RefreshGraphData(',item.idx,',\'',vdesc,'\',\'Percentage\',\'day\',\'v\',\'Pourcentage &#37;\')">',Math.ceil(vdata),'<span style="font-size:50%;"> &#37;</span></span>'].join('');
													}
													// Adds % after Leaf Wetness
													else if(vtype === 'Data' && item.SubType === 'Leaf Wetness'){
														vdata = ['<span onclick="RefreshGraphData(',item.idx,',\'',vdesc,'\',\'Leaf Wetness\',\'day\',\'v\',\'Pourcentage &#37;\')">',Math.ceil(vdata),'<span style="font-size:50%;"> &#37;</span></span>'].join('');
													}
													// Adds Watt after the Usage
													else if((vtype === 'Usage' || vtype === 'Data') && (item.SubType === 'Energy' || item.SubType === 'CM119 / CM160' || item.SubType === 'CM180' || item.SubType === 'kWh' || item.SubType === 'Electric')){       
														if(item.Type === 'P1 Smart Meter') {
															vdata = ['<span onclick="RefreshGraphData(',item.idx,',\'',vdesc,'\',\'counter\',\'day\',\'p1\',\'Electricité Watt\')">',Math.ceil(vdata),'<span style="font-size:50%;"> Watt</span></span>'].join('');
														}else{	
															vdata = ['<span onclick="RefreshGraphData(',item.idx,',\'',vdesc,'\',\'counter&method=1\',\'day\',\'v\',\'Electricité Watt\')">',Math.ceil(vdata),'<span style="font-size:50%;"> Watt</span></span>'].join('');
														}
													}
													// Adds Kwh after the CounterToday
													else if((vtype === 'CounterToday' || vtype === 'Data') && (item.SubType === 'Energy' || item.SubType === 'CM119 / CM160' || item.SubType === 'CM180' || item.SubType === 'kWh' || item.SubType === 'Electric' || item.SubType === 'RFXMeter counter')){       
														vdata = [Math.ceil(vdata*10)/10,'<span style="font-size:50%;"> kWh</span>'].join('');
													}
													// Adds Kwh after the Counter and convert float to integer
													else if((vtype === 'Counter' || vtype === 'Data') && (item.SubType === 'Energy' || item.SubType === 'CM119 / CM160' || item.SubType === 'CM180' || item.SubType === 'kWh' || item.SubType === 'Electric')){       
														vdata = [Math.ceil(vdata),'<span style="font-size:50%;"> kWh</span>'].join('');
													}
													// Adds € after price
													else if(vtype === 'Euro'){       
														vdata = [Math.ceil(vdata*100)/100,'<span style="font-size:50%;"> &#8364;</span>'].join('');
													}
													// for incremental counter or RFXMeter
													else if((item.Type === 'Counter Incremental' || item.Type === 'RFXMeter') && (item.SwitchTypeVal == '1' || item.SwitchTypeVal == '2')){
														// Adds m³ after volume
														if(vtype === 'Data' || vtype === 'Counter'){
															vdata = [vdata,'<span style="font-size:50%;"> m&#179;</span>'].join('');
														}
														// Adds L after volume today
														if(vtype === 'CounterToday'){
															vdata = [vdata,'<span style="font-size:50%;"> L</span>'].join('');
														}
													}
													// Adds Kwh after energy for incremental counter
													else if(item.Type === 'Counter Incremental' && (item.SwitchTypeVal == '0' || item.SwitchTypeVal == '4')){
														vdata = [vdata,'<span style="font-size:50%;"> kWh</span>'].join('');
													}
													// Adds Watt/m² after solar radiation
													else if(item.SubType === 'Solar Radiation'){
														vdata = [vdata,'<span style="font-size:50%;"> W/m&#178;</span>'].join('');
													}
													// Adds km after visibility for WU
													else if(item.SubType === 'Visibility'){
														vdata = [vdata,'<span style="font-size:50%;"> km</span>'].join('');
													}
													// graph for counter without unit
													else if(item.Type === 'RFXMeter' && item.SwitchTypeVal == '3'){       
														vdata = ['<span onclick="RefreshGraphData(',item.idx,',\'',vdesc,'\',\'counter\',\'day\',\'v\',\'Compteur\')">',vdata,'</span>'].join('');
													}
													// adds V after voltage
													else if(vtype === 'Voltage' || item.SubType === 'Voltage'){       
														vdata = ['<span onclick="RefreshGraphData(',item.idx,',\'',vdesc,'\',\'counter\',\'day\',\'v\',\'Tension V\')">',Math.ceil(vdata*100)/100,'<span style="font-size:50%;"> V</span></span>'].join('');
													}
												
												
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////													
																								
												// if extra css attributes.
												
													if (typeof alarmcss !== 'undefined' && typeof vattr === 'undefined') {
														$(['#',vlabel].join('')).html(['<span ',switchclick,' style=',alarmcss,'>',vdata,'</span>'].join(''));
													}
													else if (typeof alarmcss !== 'undefined' && typeof vattr !== 'undefined') {
														$(['#',vlabel].join('')).html(['<span ',switchclick,' style=',vattr,';',alarmcss,'>',vdata,'</span>'].join(''));
													}
													else if (typeof alarmcss === 'undefined' && typeof vattr !== 'undefined') {
														$(['#',vlabel].join('')).html(['<span ',switchclick,' style=',vattr,';>',vdata,'</span>'].join(''));
													}
													else if (typeof alarmcss === 'undefined' && typeof vattr === 'undefined') {
														$(['#',vlabel].join('')).html(['<span ',switchclick,'>',vdata,'</span>'].join(''));
													}
																										
													if ($(['#desc_',vlabel].join('')).length > 0) {
														$(['#desc_',vlabel].join('')).html(vdesc);
													}
											

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
												
                                        }
                                        else if ( $.PageArray[ii][1] === 'Text' ) { 			//Special nummer, link in cell (test)
                                                var vlabel=     $.PageArray[ii][2];             // cell number from HTML layout
                                                var vdesc = 	$.PageArray[ii][3];				// description (text in this case
												var vattr=    $.PageArray[ii][6];             	// extra css attributes
                                                var valarm=     '';             // alarm value to turn text to red
												
												$(['#',vlabel].join('')).html(['<span style=',vattr,'>',vdesc,'</span>'].join(''));
												if ($(['#desc_',vlabel].join('')).length > 0) {
													$(['#desc_',vlabel].join('')).empty();
												}
										}
										else if ( $.PageArray[ii][1] === 'FreeRemote' ) { 			//Special nummer, link in cell (test)
                                                var vlabel=     $.PageArray[ii][2];             // cell number from HTML layout
                                                var vdesc = 	$.PageArray[ii][3];				// description (text in this case
												var vattr=    $.PageArray[ii][6];             	// extra css attributes
                                                var valarm=     '';             // alarm value to turn text to red
												
												$(['#',vlabel].join('')).html('<img src="icons/freeRemote.png" width=48 height=48 onclick="showFreeRemote()"></img>');
												if ($(['#desc_',vlabel].join('')).length > 0) {
													$(['#desc_',vlabel].join('')).html(vdesc);
												}
										}
										else if ( $.PageArray[ii][1] === 'Hide' ) { 			//Special nummer, link in cell (test)
                                                var vlabel=     $.PageArray[ii][2];             // cell number from HTML layout
                                                var vdata=      $.PageArray[ii][3];             // description (link in this case
                                                var valarm= '';             // alarm value to turn text to red
                                                
												$(['#',vlabel].join('')).empty();
                                                if ($(['#desc_',vlabel].join('')).length > 0) {
													$(['#desc_',vlabel].join('')).empty();
												}	
                                        }
										else if ( $.PageArray[ii][1] === 'Html' ) { 			//Special nummer, link in cell (test)
                                                var vlabel=     $.PageArray[ii][2];             // cell number from HTML layout
                                                var vdata=      $.PageArray[ii][3];             // description (link in this case
                                                var valarm=  '';             // alarm value to turn text to red
                                                
                                                $(['#',vlabel].join('')).html(vdata);
                                                if ($(['#desc_',vlabel].join('')).length > 0) {
													$(['#desc_',vlabel].join('')).empty();
												}	
                                        }
										else if ( $.PageArray[ii][1] === 'Clock' ) { 			//Special nummer, Clock in cell (test)
                                                var vlabel=     $.PageArray[ii][2];             // cell number from HTML layout
                                                var vdata=      currentTime();             		// Get present time
                                                var vattr=    $.PageArray[ii][6];             	// extra css attributes
                                                var valarm=   '';             // alarm value to turn text to red
                                                
                                                $(['#',vlabel].join('')).html(['<span style=',vattr,'>',vdata,'</span>'].join(''));
                                                if ($(['#desc_',vlabel].join('')).length > 0) {
													$(['#desc_',vlabel].join('')).empty();
												}	 
										}
										else if ( $.PageArray[ii][1] === 'Date' ) { 			//Special nummer, Date in cell (test)
                                                var vlabel=     $.PageArray[ii][2];             // cell number from HTML layout
                                                var vdata=      currentDate();             		// Get present time
                                                var vattr=    $.PageArray[ii][6];             	// extra css attributes
                                                var valarm=    '';             // alarm value to turn text to red
                                                
                                                $(['#',vlabel].join('')).html(['<span style=',vattr,'>',vdata,'</span>'].join(''));
                                                if ($(['#desc_',vlabel].join('')).length > 0) {
													$(['#desc_',vlabel].join('')).empty();
												}	 
										}
										else if ( $.PageArray[ii][1] === 'MonthYear' ) { 			//Special nummer, Date in cell (test)
                                                var vlabel=     $.PageArray[ii][2];             // cell number from HTML layout
                                                var vdata=      currentMonthYear();             		// Get present time
                                                var vattr=    $.PageArray[ii][6];             	// extra css attributes
                                                var valarm=   '';             // alarm value to turn text to red
                                                
                                                $(['#',vlabel].join('')).html(['<span style=',vattr,'>',vdata,'</span>'].join(''));
                                                if ($(['#desc_',vlabel].join('')).length > 0) {
													$(['#desc_',vlabel].join('')).empty();
												}	 
										}	
                                        else if ( $.PageArray[ii][1] === 'SunRise' ) { 			//Special nummer, zonsop/onder in cell (test)
                                                var vlabel=     $.PageArray[ii][2];             // cell number from HTML layout
                                                var vattr=    $.PageArray[ii][6];             	// extra css attributes
                                                var valarm=   '';             // alarm value to turn text to red

                                                $(['#',vlabel].join('')).html(['<span style=',vattr,'>',var_sunrise,'</span>'].join(''));
                                                if ($(['#desc_',vlabel].join('')).length > 0) {
													$(['#desc_',vlabel].join('')).html(txt_sunrise);
												}	 
										}	
                                        else if ( $.PageArray[ii][1] === 'SunSet' ) { 			//Special nummer, zonsop/onder in cell (test)
                                                var vlabel=     $.PageArray[ii][2];             // cell number from HTML layout
                                                var vattr=    $.PageArray[ii][6];             	// extra css attributes
                                                var valarm=    '';             // alarm value to turn text to red

                                                $(['#',vlabel].join('')).html(['<span style=',vattr,'>',var_sunset,'</span>'].join(''));
                                                if ($(['#desc_',vlabel].join('')).length > 0) {
													$(['#desc_',vlabel].join('')).html(txt_sunset);
												}	 
										}	
                                        else if ( $.PageArray[ii][1] === 'SunBoth' ) { 			//Special nummer, zonsop/onder in cell (test)
                                                var vlabel=     $.PageArray[ii][2];             // cell number from HTML layout
                                                var vattr=    $.PageArray[ii][6];             	// extra css attributes
                                                var valarm=   '';             // alarm value to turn text to red
												
                                                $(['#',vlabel].join('')).html(['<span style=',vattr,'><img src=icons/sun.png  height="15" width="15" style="PADDING-RIGHT: 2px;">',var_sunrise,'<img src=icons/moon.png  height="15" width="15" style="PADDING-LEFT: 15px;">',var_sunset,'</span>'].join(''));
                                                if ($(['#desc_',vlabel].join('')).length > 0) {
													$(['#desc_',vlabel].join('')).html(txt_sunboth);
												} 
										}
                                
																		 
                                });
                        }, { releaseObjects: true });
                }
		two = new Date() - two;
		console.log('Get switchs: ' + two + 'ms');
				
        }
	});
		

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
											
		// affichage de la partie scène/groupe
		
		$.ajax({
            url: [$.domoticzurl,'/json.htm?type=scenes&plan=',$.roomplan,'&jsoncallback=?'].join(''),
			success: function(data) {
		
				var three = new Date();
		
                if (typeof data.result !== 'undefined') {

                        $.each(data.result, function(i,item){
                            //    for( var ii = 0, len = $.PageArray_Scenes.length; ii < len; ii++ ) {
                            var ii = 0, len = $.PageArray_Scenes.length;
							jsKata.nofreeze.forloop(
								  // the condition
								  function() { return ii < len - 1;  }, 
								  // the incrementor
								  function() { ii++; },
								  // this is what will be executed
								  function fct() {
								  if( $.PageArray_Scenes[ii][0] === item.idx || $.PageArray_Scenes[ii][0] === item.Name ) {          				// Domoticz idx number
                                                var vtype=      $.PageArray_Scenes[ii][1];              		// Domotitcz type (like Temp, Humidity)
                                                var vlabel=     $.PageArray_Scenes[ii][2];                      // cell number from HTML layout
                                                var vdesc=      $.PageArray_Scenes[ii][3];                      // description
												var vicon=   	$.PageArray_Scenes[ii][4];							//Name of custom icon
                                                var vattr=    	$.PageArray_Scenes[ii][5];                      // extra css attributes
                                                var vdata=      item[vtype];                            		// current value
												
												
												if (typeof vdata === 'undefined') {
													vdata='?!';
                                                }
												else {
                                                        // remove too much text
                                                        vdata= String(vdata).split("Watt",1)[0];
                                                        vdata= String(vdata).split("kWh",1)[0];
                                                }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////													

                                                // create switchable value when item is scene
                                                var switchclick, alarmcss, min, plus;
                                                                                            
                                               												
												if (vdata === 'Off'  || item.Type === 'Scene' ) {
                                                        switchclick = ['onclick="SceneToggle(',item.idx,', \'On\',',txt_switch_on,',',item.Protected,')"'].join('');

                                                        if ( item.Type === 'Scene' ) {
															vdata = vdesc;
															//vdata = ['<img src=icons/',vicon.replace(/ /g,"%20"),'.png width=48>'].join('');
															vdesc = '';
														}else {
														vdata = txt_off;
														alarmcss='color:#E24E2A;';
														}
                                                }
                                                else if (vdata === 'On' ) {
                                                        switchclick = ['onclick="SceneToggle(',item.idx,', \'Off\',',txt_switch_off,',',item.Protected,')"'].join('');
                                                        alarmcss='color:#1B9772;';
                                                        vdata = txt_on;
                                                }
												else if (vdata === 'Mixed' ) {
                                                        min = ['<span style="font-size:100%;position:relative;left:-10px;color:#1B9772;" onclick="SceneToggle(',item.idx,', \'On\',',txt_switch_on,',',item.Protected,')">',txt_on,'</span>'].join('');
														plus = ['<span  style="font-size:100%;position:relative;left:10px;color:#E24E2A;" onclick="SceneToggle(',item.idx,', \'Off\',',txt_switch_off,',',item.Protected,')">',txt_off,'</span>'].join('');
														vdata = [min,plus].join('');
														
                                                }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////													

													// show custom icon
												
													if ( isNaN(vicon) && typeof vicon !== 'undefined') {
														
														var	icon_On = [vicon,'48_On.png'].join('');
														var	icon_Off = [vicon,'48_Off.png'].join('');
														
														if (vicon === 'Blinds') {
															icon_On = 'blindsopen48sel.png';
															icon_Off = 'blinds48sel.png';
														}	
														
														if (item.Type === 'Scene'){
															vdesc=      $.PageArray_Scenes[ii][3]; 
															vdata = ['<img src="icons/',vicon.replace(/ /g,"%20"),'.png" width=48>'].join('');
														}
														else if (vdata === txt_on) {
															vdata = ['<img src="',$.domoticzurl,'/images/',icon_On,'" width=48>'].join('');
														}
														else if (vdata === txt_off) {
															vdata= ['<img src="',$.domoticzurl,'/images/',icon_Off,'"  width=48>'].join('');
														}
														else  {
															min = ['<img src="',$.domoticzurl,'/images/',icon_On,'"  hspace=10 width=48 onclick="SceneToggle(',item.idx,', \'On\',',txt_switch_on,',',item.Protected,')">'].join('');
															plus = ['<img src="',$.domoticzurl,'/images/',icon_Off,'"  hspace=10 width=48 onclick="SceneToggle(',item.idx,', \'Off\',',txt_switch_off,',',item.Protected,')">'].join('');
															vdata = [min,plus].join('');
															
														}
														
													}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////													

                                                // if extra css attributes
                                                
												if (typeof alarmcss !== 'undefined' && typeof vattr === 'undefined') {
													$(['#',vlabel].join('')).html(['<span ',switchclick,' style=',alarmcss,'>',vdata,'</span>'].join(''));
												}
												else if (typeof alarmcss !== 'undefined' && typeof vattr !== 'undefined') {
													$(['#',vlabel].join('')).html(['<span ',switchclick,' style=',vattr,';',alarmcss,'>',vdata,'</span>'].join(''));
												}
												else if (typeof alarmcss === 'undefined' && typeof vattr !== 'undefined') {
													$(['#',vlabel].join('')).html(['<span ',switchclick,' style=',vattr,';>',vdata,'</span>'].join(''));
												}
												else if (typeof alarmcss === 'undefined' && typeof vattr === 'undefined') {
													$(['#',vlabel].join('')).html(['<span ',switchclick,'>',vdata,'</span>'].join(''));
												}

                                                if ($(['#desc_',vlabel].join('')).length > 0) {
													$(['#desc_',vlabel].join('')).html(vdesc);
                                                }
												
												
								 
												
                                        }
										

                                });
                        }, { releaseObjects: true });
                }
				
			three = new Date() - three;
			console.log('Get scenes/groups: ' + three + 'ms');	
			
				
        }
	});
		
		
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////													
		
		      // affichage de la partie UserVariable

      $.ajax({
		url: [$.domoticzurl,'/json.htm?type=command&param=getuservariables&jsoncallback=?'].join(''),
		success: function(data) {
      
         var four = new Date();
      
                   if (typeof data.result !== 'undefined') {

                      $.each(data.result, function(i,item){
                          //    for( var ii = 0, len = $.PageArray_UserVariable.length; ii < len; ii++ ) {
                         var ii = 0, len = $.PageArray_UserVariable.length;
               jsKata.nofreeze.forloop(
                    // the condition
                  function() { return ii < len - 1;  }, 
                    // the incrementor
                  function() { ii++; },
                  // this is what will be executed
                  function fct() {
                     if( $.PageArray_UserVariable[ii][0] === item.idx || $.PageArray_UserVariable[ii][0] === item.Name ) {

                        // Domoticz idx number
                             var vtype=      $.PageArray_UserVariable[ii][1];         // Domotitcz type (like Temp, Humidity)
                             var vlabel=     $.PageArray_UserVariable[ii][2];         // cell number from HTML layout
                             var vdesc=      $.PageArray_UserVariable[ii][3];         // description
                             var vattr=       $.PageArray_UserVariable[ii][4];         // extra css attributes
                             var vdata=      item[vtype];                            // current value
							
							if (typeof vdata === 'undefined') {
								vdata='?!';
                             }
                     
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////													

                                  // if extra css attributes
                                  if (typeof vattr === 'undefined') {
                                     $(['#',vlabel].join('')).html(['<span>',vdata,'</span>'].join(''));
                                  }
                        else {
                                     $(['#',vlabel].join('')).html(['<span style=',vattr,'>',vdata,'</span>'].join(''));
                                  }

                                  if ($(['#desc_',vlabel].join('')).length > 0) {
                           $(['#desc_',vlabel].join('')).html(vdesc);
                                  }                      
                                    
                                              }

                                      });
                              }, { releaseObjects: true });
                   }
            
         four = new Date() - four;
         console.log('Get user variable : ' + four + 'ms');   
         
            
        }
	});
		
        refreshTimer = setTimeout(RefreshData, refresh); 
	
}

		
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////													
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////													
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////													

// One shot get cams
function GetCams()
{
	//	for( var ii = 0, len = $.PageArray.length; ii < len; ii++ ) {
	    var ii = 0, len = $.PageArray.length;
		jsKata.nofreeze.forloop(
			  // the condition
			  function() { return ii < len - 1;  }, 
			  // the incrementor
			  function() { ii++; },
			  // this is what will be executed
			  function fct() {	
					if ( $.PageArray[ii][1] === 'Camera' ) { 			//Special nummer, link in cell (test)
																			
							var vlabel=     $.PageArray[ii][2];             // cell number from HTML layout
							var src_1 = 	$.PageArray[ii][3];				// Local network
							var src_2 = 	$.PageArray[ii][4];				// www

							
							if(src_2 === '' || typeof src_2 === 'undefined'){
								src_2 = [location.href.replace( "index.html", "" ).replace(/\/$/, ''),'/icons/offline.jpg'].join('');
							}	
						
							$(['#',vlabel].join('')).html(['<img src=',src_1,' alt=',src_2,' class=\'camera\' >'].join(''));
							$(['#',vlabel,' img'].join('')).on( "error",function(){
																	console.log('vlabel: '+this.parentNode.className);
																	console.log('on error: '+this.src);
																	this.onerror=null;
																	if( this.src === this.alt)
																	{
																		this.src = [location.href.replace( "index.html", "" ).replace(/\/$/, ''),'/icons/offline.jpg'].join('');
																	}
																	else{
																		this.src = this.alt;
																	}	
																	console.log('replace: '+this.src);
																});
							$(['#',vlabel,' img'].join('')).click(function(){
																	$('#popup_camera').html(['<img src=',this.src,' >'].join(''));
																	lightbox_open('camera', 25400);
																});
							
															
							if ($(['#desc_',vlabel].join('')).length > 0) {
								$(['#desc_',vlabel].join('')).empty();
							}
					}
					
					
		});	
}

//Switch state of a scene/group
function SceneToggle(idx, switchcmd, txt, Protected)
{

		var pswd;
		if (Protected) {
			pswd = prompt("Mot de pass");
			if (pswd === null) {
				return; //break out of the function early
			}
		 }
		 
         $.ajax({
				 url: [$.domoticzurl,'/json.htm?type=command&param=switchscene&idx=',idx,'&switchcmd=',switchcmd,'&level=0&passcode=',pswd].join(''),
				 success: function(result){
					
					if (result.message === 'WRONG CODE'){
						console.warn('WRONG CODE');
						lightbox_open('switch',wrongCode_timeout,txt_wrong_code);
					}else if (result.status === 'OK'){
						console.log('%cSend command : Succes','color:green');
						if (switch_timeout !== 0) {
							lightbox_open('switch',switch_timeout,txt);
						}
						RefreshData();
					}else{
						lightbox_open('switch',1500,result.status);
						console.log(result);
					}
				 },
				 error: function(result){
					lightbox_open('switch',1500,result.statusText);
					console.warn(result.status);
				 }
		});
}

//switch state of a switch
function SwitchToggle(idx, switchcmd, txt, Protected)
{
        var pswd;
		if (Protected) {
			pswd = prompt("Mot de pass");
			if (pswd === null) {
				return; //break out of the function early
			}
		 }
		 
		 $.ajax({
				 url: [$.domoticzurl,'/json.htm?type=command&param=switchlight&idx=',idx,'&switchcmd=',switchcmd,'&level=0&passcode=',pswd].join(''),
				 success: function(result){
					
					if (result.message === 'WRONG CODE'){
						console.warn('WRONG CODE');
						lightbox_open('switch',wrongCode_timeout,txt_wrong_code);
					}else if (result.status === 'OK'){
						console.log('%cSend command : Succes','color:green');
						if (switch_timeout !== 0) {
							lightbox_open('switch',switch_timeout,txt);
						}
						RefreshData();
					}else{
						lightbox_open('switch',1500,result.status);
						console.log(result);
					}
				 },
				 error: function(result){
					lightbox_open('switch',1500,result.statusText);
					console.warn(result.status);
				 }
        });
}

//Dimmer, 0-16
function DimLevel16(OpenDicht,level,idx,currentlevel, Protected)
{

		var pswd;
		if (Protected) {
			pswd = prompt("Mot de pass");
			if (pswd === null) {
				return; //break out of the function early
			}
		 }
		 
		 
//When switched off return to previous level, no matter if plus or min pressed
if (level === txt_off) {
	if (currentlevel === 1) {
		currentlevel++;
	}
	//console.log("In uit",currentlevel);
        $.ajax({
                url: [$.domoticzurl,'/json.htm?type=command&param=switchlight&idx=',idx,'&switchcmd=Set Level&level=',currentlevel,'&passcode=',pswd].join(''),
                success: function(result){
					
					if (result.message === 'WRONG CODE'){
						console.warn('WRONG CODE');
						lightbox_open('switch',wrongCode_timeout,txt_wrong_code);
					}else if (result.status === 'OK'){
						console.log('%cSend command : Succes','color:green');
						RefreshData();
					}else{
						lightbox_open('switch',1500,result.status);
						console.log(result);
					}
				 },
                error: function(result){
					lightbox_open('switch',1500,result.statusText);
					console.warn(result.status);
				 }
        });
}
else
{
        level = level * 1;
        //console.log(OpenDicht,level);
        if (OpenDicht === "plus")
          {
                var d = ((level + 10)/100 * 16) +  0.5;
                if(d > 16) {
                        d = 16;
                }
                $.ajax({
                        url: [$.domoticzurl,'/json.htm?type=command&param=switchlight&idx=',idx,'&switchcmd=Set Level&level=',d,'&passcode=',pswd].join(''),
                        success: function(result){
					
							if (result.message === 'WRONG CODE'){
								console.warn('WRONG CODE');
								lightbox_open('switch',wrongCode_timeout,txt_wrong_code);
							}else if (result.status === 'OK'){
								console.log('%cSend command : Succes','color:green');
								RefreshData();
							}else{
								lightbox_open('switch',1500,result.status);
								console.log(result);
							}
						 },
                        error: function(result){
							lightbox_open('switch',1500,result.statusText);
							console.warn(result.status);
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
                        url: [$.domoticzurl,'/json.htm?type=command&param=switchlight&idx=',idx,'&switchcmd=Set Level&level=',d,'&passcode=',pswd].join(''),
						success: function(result){
					
							if (result.message === 'WRONG CODE'){
								console.warn('WRONG CODE');
								lightbox_open('switch',wrongCode_timeout,txt_wrong_code);
							}else if (result.status === 'OK'){
								console.log('%cSend command : Succes','color:green');
								RefreshData();
							}else{
								lightbox_open('switch',1500,result.status);
								console.log(result);
							}
						 },
                        error: function(result){
							lightbox_open('switch',1500,result.statusText);
							console.warn(result.status);
						 }
                });
          }
        }
				
}

//Dimmer, 0-100
function DimLevel100(OpenDicht,level,idx, Protected)
{

        var pswd;
		if (Protected) {
			pswd = prompt("Mot de pass");
			if (pswd === null) {
				return; //break out of the function early
			}
		 }
		 
		 if (OpenDicht === "plus")
          {
                var d = level + 10;
                if(d > 100) {
                        d = 100;
                }
                $.ajax({
                        url: [$.domoticzurl,'/json.htm?type=command&param=switchlight&idx=',idx,'&switchcmd=Set Level&level=',d,'&passcode=',pswd].join(''),
                        success: function(result){
					
							if (result.message === 'WRONG CODE'){
								console.warn('WRONG CODE');
								lightbox_open('switch',wrongCode_timeout,txt_wrong_code);
							}else if (result.status === 'OK'){
								console.log('%cSend command : Succes','color:green');
								RefreshData();
							}else{
								lightbox_open('switch',1500,result.status);
								console.log(result);
							}
						 },
                        error: function(result){
							lightbox_open('switch',1500,result.statusText);
							console.warn(result.status);
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
                        url: [$.domoticzurl,'/json.htm?type=command&param=switchlight&idx=',idx,'&switchcmd=Set Level&level=',d,'&passcode=',pswd].join(''),
                        success: function(result){
					
							if (result.message === 'WRONG CODE'){
								console.warn('WRONG CODE');
								lightbox_open('switch',wrongCode_timeout,txt_wrong_code);
							}else if (result.status === 'OK'){
								console.log('%cSend command : Succes','color:green');
								RefreshData();
							}else{
								lightbox_open('switch',1500,result.status);
								console.log(result);
							}
						 },
                        error: function(result){
							lightbox_open('switch',1500,result.statusText);
							console.warn(result.status);
						 }
                });
          }
}

// thermostat
function ChangeTherm(dimtype,stepsize,idx,currentvalue,thermmax, Protected)
{
		var pswd;
		if (Protected) {
			pswd = prompt("Mot de pass");
			if (pswd === null) {
				return; //break out of the function early
			}
		 }
		 
		 var newvalue='';
	  //console.log(dimtype,stepsize,idx,currentvalue,thermmax)
	 if (dimtype === 'plus') { 
		if ((currentvalue + stepsize) > thermmax){
			 newvalue = thermmax;
		} else {
		 newvalue = currentvalue + stepsize;
		}
	}
	else if (dimtype === 'min'){ 
		 if (currentvalue < stepsize){
			 newvalue = 1;
		} else {
		 newvalue = currentvalue - stepsize;
		}
	}
	 $.ajax({
			 url: [$.domoticzurl,'/json.htm?type=command&param=udevice&idx=',idx,'&nvalue=0&svalue=',newvalue,'&passcode=',pswd].join(''),
			 success: function(result){
					
					if (result.message === 'WRONG CODE'){
						console.warn('WRONG CODE');
						lightbox_open('switch',wrongCode_timeout,txt_wrong_code);
					}else if (result.status === 'OK'){
						console.log('%cSend command : Succes','color:green');
						RefreshData();
					}else{
						lightbox_open('switch',1500,result.status);
						console.log(result);
					}
				 },
			 error: function(result){
					lightbox_open('switch',1500,result.statusText);
					console.warn(result.status);
				 }
 	});
 		
}

// time and date
function currentTime() {
    var today=new Date();
    var h=today.getHours().toString();
    h = h.trim();
    if (h.length === 1) { 
	h = '0'+ h;
    }
    var m=today.getMinutes().toString();
    m = m.trim();
    if (m.length === 1) { 
	m = '0'+ m;
    }
	var day = days[today.getDay().toString()];
	
    var dag=today.getDate().toString();
    dag = dag.trim();
    if (dag.length === 1) { 
	dag = '0'+ dag;
    }
	var maand = months[(today.getMonth()).toString()];
	
    if (showMonth){
		// with month
		var ret_str = ['<span style="font-size:120%;position:relative;top:-5px;">',h,':',m,'</span><br><span style="font-size:35%;position:relative;top:-40px;">',day,' ',dag,' ',maand,'</span>'].join('');
	}else{
		// without month
		var ret_str = ['<span style="font-size:120%;position:relative;top:-5px;">',h,':',m,'</span><br><span style="font-size:35%;position:relative;top:-40px;">',day,' ',dag,'</span>'].join('');
	}
	return ret_str;
}

// date
function currentDate() {
    var today=new Date();
    var day = days[today.getDay().toString()];
	
    var dag=today.getDate().toString();
    dag = dag.trim();
    if (dag.length === 1) { 
	dag = '0'+ dag;
    }
	var maand = months[(today.getMonth()).toString()];
	
    if (showMonth){
		// with month
		var ret_str = ['<span style="font-size:50%;">',day,' ',dag,' ',maand,'</span>'].join('');
	}else{
		// without month
		var ret_str = ['<span style="font-size:50%;">',day,' ',dag,'</span>'].join('');
	}
	return ret_str;
}

// month and year
function currentMonthYear() {
    var today=new Date();
    var maand = months[(today.getMonth()).toString()];
	var year = today.getFullYear().toString();
    var ret_str = ['<span style="font-size:60%;position:relative;top:-5px;">',maand,'</span><br><span style="font-size:55%;position:relative;top:-40px;">',year,'</span>'].join('');
	return ret_str;
}

// wakeup time format
function goodmorning(v) {
	//(format 15:00-1-10/02/2015)
	var h = v.substring(0, 2);
	var m = v.substring(3, 5);
	var date = v.substring(8, 10);
	var day = days[v.substring(6, 7)-1];
	var month = months[v.substring(11, 13).replace(/^0+/, '')-1];
	var year = v.substring(14,18);
	
	var now = new Date();
	//console.log("now: ", now);
	var wakeup = new Date(year,v.substring(11, 13).replace(/^0+/, '')-1,date,h,m);
	//console.log("wakeup: ", wakeup);
	
	if (showMonth) {
	// with month 
	var ret_str = ['<span style="font-size:100%;position:relative;top:-5px;">',h,':',m,'</span><br><span style="font-size:35%;position:relative;top:-40px;">',day,' ',date,' ',month,'</span>'].join('');
	}
	else {
	// without month
	var ret_str = ['<span style="font-size:100%;position:relative;top:-5px;">',h,':',m,'</span><br><span style="font-size:35%;position:relative;top:-40px;">',day,' ',date,'</span>'].join('');
	}
	
	if (now > wakeup) {
		//var ret_str = "ZZzzz";
		var ret_str = "<img src=icons/sleep.png  height='70' width='70'>"; 
	}
	
	return ret_str;
}	

function ShowSelector(idx,mots,LevelOffHidden, Protected) {

	//console.log(idx,mots);
	var levels = mots.split("|");
	//console.log(levels);
	$( "#popup_selector").html("");
	for (i = 0; i < levels.length; i++) {
		
		//console.log('level ',i,' ',levels[i],10*i);
		if ((LevelOffHidden && levels[i] != 'Off') || !LevelOffHidden) {
			$( "#popup_selector").append( ['<span onclick="SwitchSelector(',idx,',',10*i,',',Protected,')">',levels[i],'</span><br>'].join(''));
		}		
	}
	lightbox_open('selector', 25000);
}

function SwitchSelector(idx,lvl, Protected) {

		var pswd;
		if (Protected) {
			pswd = prompt("Mot de pass");
			if (pswd === null) {
				return; //break out of the function early
			}
		 }
		 
		 $.ajax({
			url: [$.domoticzurl,'/json.htm?type=command&param=switchlight&idx=',idx,'&switchcmd=Set%20Level&level=',lvl,'&passcode=',pswd].join(''),
			success: function(result){
					
					if (result.message === 'WRONG CODE'){
						console.warn('WRONG CODE');
						lightbox_open('switch',wrongCode_timeout,txt_wrong_code);
					}else if (result.status === 'OK'){
						console.log('%cSend command : Succes','color:green');
						RefreshData();
					}else{
						lightbox_open('switch',1500,result.status);
						console.log(result);
					}
				 },
			error: function(result){
					lightbox_open('switch',1500,result.statusText);
					console.warn(result.status);
				 }
	});
}


function rss(feedUrl) {
	//domoticz feed 'https://github.com/domoticz/domoticz/commits/master.atom';
	$.ajax({
	  url      : document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(feedUrl),
	  success  : function (data) {
		if (data.responseData.feed && data.responseData.feed.entries) {
		  $.each(data.responseData.feed.entries, function (i, e) {
			console.log("------------------------");
			console.log("title      : " + e.title);
			console.log("author     : " + e.author);
			console.log("description: " + e.description);
		  });
		}
		
		// show result html here
		
	  }
	});
}
