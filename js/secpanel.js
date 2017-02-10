﻿		ion.sound({
			sounds: [
				{name: "arm"},
				{name: "disarm"},
				{name: "key"},
				{name: "wrongcode"}
			],

			// main config
			path: "sounds/",
			preload: true,
			multiplay: true,
			volume: 0.9
		});
	
		function ShowError(error) {
			if (error=="NoConnect") {
				$('#digitdisplay').val("no connect");
			}
			else if (error=="NoOkData") {
				$('#digitdisplay').val("no ok data");
			}
			else if (error=="NoSettingsData") {
				$('#digitdisplay').val("no settings");
			}
			else {
				$('#digitdisplay').val("unkown err");
			}
			RefreshTimer=setTimeout('SetRefreshTimer();', 60000);
		}

		function ShowStatus() {
			$.ajax({
				url: $.domoticzurl+"/json.htm?type=command&param=getsecstatus",
				//async: false, 
				//dataType: 'json',
				success: function(data) {
					if (data.status != "OK") {
						ShowError('NoOkData');
						return;
					}
					else {
						var displaytext="";
						if (data.secstatus==0) displaytext="DISARMED";
						else if (data.secstatus==1) displaytext="ARM HOME";
						else if (data.secstatus==2) displaytext="ARM AWAY";
						else displaytext="UNKNOWN";
						$('#digitdisplay').val("* "+displaytext+" *");
					}
				},
				error: function(){
					ShowError('NoConnect');
					return;
				}
			});
			if (1==2) {
				var elements = document.getElementsByClassName('digit');
				for(var i=0; i<elements.length; i++) {
					elements[i].setAttribute('onClick','AddDigit('+(i+1)+');');
				}
				document.getElementById('setall').setAttribute('onClick','beep();');
			}
			$('#password').val("");
		}

		function SetRefreshTimer() {
			if (typeof(RefreshTimer) != "undefined") {
				RefreshTimer=clearTimeout(RefreshTimer);
			}
			$.ajax({
				url: $.domoticzurl+"/json.htm?type=command&param=getuservariables",
				//async: false, 
				//dataType: 'json',
				success: function(data) {
					if (data.status != "OK") {
						ShowError('NoOkData');
						return;
					}
					else {
						if (typeof(data.result) != "undefined") {
							$.each(data.result, function(i,item) {
								if (item.Name=='secpanel-autorefresh') {
									var timer=item.Value*1000;
									RefreshTimer=setTimeout('ShowStatus(); SetRefreshTimer();', timer);
								}
								else {
									RefreshTimer=setTimeout('ShowStatus(); SetRefreshTimer();', 60000);
								}
							});
						}
					}
				},
				error: function(){
					ShowError('NoConnect');
					return;
				}
			});
		}
		
		var CountdownTimer = 0;
		function countdown() {
			if (timer > 1) {
				timer = timer - 1;
				beep('set');
				$('#digitdisplay').val('Arm Delay: '+timer);
			}
			else {
				clearInterval(CountdownTimer);
				beep('in');
				ShowStatus();
				SetRefreshTimer();
			}
		}

		function ArmDelay() {
			var secondelay=0;
			$.ajax({
				url: $.domoticzurl+"/json.htm?type=settings",
				//async: false, 
				//dataType: 'json',
				success: function(data) {
					if (data.status != "OK") {
						ShowError('NoOkData');
						return;
					}
					else {
						if (typeof(data.SecOnDelay) != "undefined") {
							secondelay=data.SecOnDelay;
						}
					}
				},
				error: function(){
					ShowError('NoConnect');
					return;
				}
			});
			return secondelay;
		}

		// custom function for zone clear check, searches idx for switches starting with 'alarm zone'
		function ZoneIdx() {
			var idxnumbers=[];
			$.ajax({
				url: $.domoticzurl+"/json.htm?type=command&param=getlightswitches",
				//async: false, 
				//dataType: 'json',
				success: function(data) {
					if (data.status != "OK") {
						ShowError('NoOkData');
						return;
					}
					else {
						if (typeof(data.result) != "undefined") {
							$.each(data.result, function(i,item) {
								if (item.Name.toLowerCase().indexOf('alarm zone')==0) idxnumbers[idxnumbers.length]=item.idx;
							});
						}
					}
				},
				error: function(){
					ShowError('NoConnect');
					return;
				}
			});
			return idxnumbers;
		}
		var zones=ZoneIdx();

		// check if provided zone idx number(s) is/are clear
		function CheckZoneClear(zonearray) {
			var openzone=false;
			if (typeof(zonearray) != "undefined") {
				$.each(zonearray, function(i,item) {
					$.ajax({
						url: $.domoticzurl+"/json.htm?type=devices&rid="+item,
						//async: false, 
						//dataType: 'json',
						success: function(data) {
							if (data.status != "OK") {
								ShowError('NoOkData');
								return;
							}
							else {
								if (typeof(data.result) != "undefined") {
									$.each(data.result, function(j,zone) {
										if (zone.Status=='On') openzone=true;
									});
								}
								return openzone;
							}
						},
						error: function(){
							ShowError('NoConnect');
							return;
						}
					});
				});
			}
			return openzone;
		}

		function SetSecStatus(status, zonearray, seccode, setzone) {
			clearInterval(CountdownTimer);
			if (typeof(seccode) == "undefined") seccode=$('#password').val();
			if (isNaN(seccode)) {
				beep('error');
				return;
			}
			if (typeof(RefreshTimer) != "undefined") RefreshTimer=clearTimeout(RefreshTimer);
			if (typeof(CodeSetTimer) != "undefined") CodeSetTimer=clearTimeout(CodeSetTimer);

			// if (status==1 || status==2) {
			if (1==2) {
				beep();
				if (typeof(setzone) == "undefined") {
					var zonedisplay='* ALL ZONES *';
				}
				if (setzone=="all") zonedisplay='* ALL ZONES *';
				if (setzone==1) zonedisplay='* ZONE 1 *';
				if (setzone==2) zonedisplay='* ZONE 2 *';
				if (setzone==3) zonedisplay='* ZONE 3 *';
				$('#digitdisplay').val($.t(zonedisplay));

				var elements = document.getElementsByClassName('digit');
				for(var i=0; i<elements.length; i++) {
					elements[i].setAttribute('onClick','SetSecStatus('+status+', zones, '+seccode+', '+(i+1)+');');
				}
				document.getElementById('setall').setAttribute('onClick','SetSecStatus('+status+', zones, '+seccode+', \'all\');');

				CodeSetTimer=setTimeout('ShowStatus(); SetRefreshTimer();', 10000);
				return;
			}

			if (typeof(zonearray) != "undefined") {
				if (CheckZoneClear(zonearray)) {
					beep('error');
					$('#digitdisplay').val($.t('* ZONE OPEN *'));
					// CodeSetTimer=setTimeout('ShowStatus(); SetRefreshTimer(); AddDigit('+seccode+');', 2000);
					CodeSetTimer=setTimeout('ShowStatus(); SetRefreshTimer();', 3000);
					return;
				}
			}
			$.ajax({
				url: $.domoticzurl+"/json.htm?type=command&param=setsecstatus&secstatus=" + status + "&seccode=" + md5(seccode),
				//async: false, 
				//dataType: 'json',
				success: function(data) {
					if (data.status != "OK") {
						if (data.message=="WRONG CODE") {
							$('#digitdisplay').val($.t('* WRONG CODE *'));
							CodeSetTimer=setTimeout('ShowStatus(); SetRefreshTimer();', 2000);
							$('#password').val("");
							beep('error');
							// $('#digitdisplay').css('background', 'red');
						}
						else {
							ShowError('NoOkData');
							return;
						}
						return;
					}
					else {
						ShowStatus();
						if (status==1 || status==2) {
							timer=ArmDelay();
							if (timer>0) {
								CountdownTimer = setInterval("countdown();", 1000);
								beep('set');
							}
							else {
								beep('in');
							}
						}
						else {
							SetRefreshTimer();
							beep('out');
						}
					}
				},
				error: function(){
					ShowError('NoConnect');
					return;
				}
			});
		}

		function AddDigit(digit) {
			beep(); 
			if (typeof(CodeSetTimer) != "undefined") {
				CodeSetTimer=clearTimeout(CodeSetTimer);
			}
			if (typeof(RefreshTimer) != "undefined") {
				RefreshTimer=clearTimeout(RefreshTimer);
			}
			if (typeof(CountdownTimer) != "undefined") {
				CountdownTimer=clearInterval(CountdownTimer)
				$('#digitdisplay').val("");
			}
			CodeSetTimer=setTimeout('ShowStatus(); SetRefreshTimer();', 10000);

			var orgtext=$('#password').val();
			if (isNaN(orgtext)) orgtext="";

			var newtext=orgtext+digit;
			var codeinput="";
			for(var i=0; i<newtext.length; i++) {
				codeinput=codeinput+'#';
			}

			$('#digitdisplay').val(codeinput);
			$('#password').val(newtext);
		}
		
		function beep(tone) {
			if (tone=="error") {
				ion.sound.play("wrongcode");
			}
			else if (tone=="set") {
				ion.sound.play("key");
			}
			else if (tone=="in") {
				ion.sound.play("arm");
			}
			else if (tone=="out") {
				ion.sound.play("disarm");
			}
			else {
				ion.sound.play("key");
			}
		}
		
		function SetLanguageEx(lng) {
			$.i18n.init({
				resGetPath: '/i18n/domoticz-__lng__.json',
				fallbackLng: false,
				getAsync: false,
				debug: false,
				useCookie: false,
				nsseparator: 'aadd',
				keyseparator: 'bbcc',
				lng: lng
			});
			$(".nav").i18n();
			MakeDatatableTranslations();
		}
		$(document).ready(function() {
			$.ajax({
				 url: $.domoticzurl+"/json.htm?type=command&param=getlanguage",
				 //async: false, 
				 //dataType: 'json',
				 success: function(data) {
					if (typeof data.language != 'undefined') {
						SetLanguageEx(data.language);
					}
					else {
						SetLanguageEx('en');
					}
				 },
				 error: function(){
				 }
			});
			ShowStatus();
			SetRefreshTimer();
		});