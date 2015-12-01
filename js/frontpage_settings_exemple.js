
<!-- Change the text for on/off switches -->
var txt_on = 'On';
var txt_off = 'Off';
var txt_closed = 'Fermée';
var txt_open = 'Ouverte';
var txt_sunboth='Soleil';
var txt_sunset='Coucher soleil';
var txt_sunrise='Lever soleil';

<!-- Change the text displayed in PopUps -->
var txt_switch_protected = '\'Interdit\'';
var txt_switch_on = '\'Switch On\'';
var txt_switch_off = '\'Switch Off\'';
var txt_blind_up = '\'Ouverture\'';
var txt_blind_down = '\'Fermeture\'';
var txt_blind_stop = '\'Arrêt\'';

<!-- Change backgrounds images,size and brightness -->
var bg_day = 'pissanli.jpg'; //'pissanli.jpg';			// image de fond le jour, laisser vide pour fond noir
var bg_night = 'romantic.jpg'; //'romantic.jpg';			// image de fond la nuit, laisser vide pour fond noir
var bg_size = 'cover';					// taille de l'image de fond (ex: '1024px 768px') 'cover' : "couvre" au mieux tout le fond.
var bg_dayBright = 0.5;					// luminosité du fond le jour (0=normal 1=noir)
var bg_nightBright = 0.5;				// luminosité du fond la nuit (0=normal 1=noir)

<!-- Change colors of temps -->
var T35 = '#FF0000';						// couleur de la température à 35°C
var T34 = '#FE1400';
var T33 = '#FD2800';
var T32 = '#FD3C00';
var T31 = '#FC5000';
var T30 = '#FC6500';
var T29 = '#FC6F0A';
var T28 = '#FC7A14';
var T27 = '#FC841E';
var T26 = '#FC8F28';
var T25 = '#FC9A32';
var T24 = '#FCA43C';
var T23 = '#FCAF46';
var T22 = '#FCB950';
var T21 = '#FCC45A';
var T20 = '#FCCF65';						// couleur de la température à 20°C
var T19 = '#FCD270';
var T18 = '#FDD67B';
var T17 = '#FDDA87';
var T16 = '#FEDE92';
var T15 = '#FFE29E';
var T14 = '#F8E5A1';
var T13 = '#F1E9A4';
var T12 = '#EAEDA7';
var T11 = '#E3F1AA';
var T10 = '#DDF5AE';
var T09 = '#D3F5B7';
var T08 = '#CAF5C0';
var T07 = '#C0F5C9';
var T06 = '#B7F5D2';
var T05 = '#AEF5DC';
var T04 = '#AEF1E1';
var T03 = '#AEEDE6';
var T02 = '#AEEAEB';
var T01 = '#AEE6F0';
var T00 = '#AEE3F5';
var T000 = '#EBF4F7';						// couleur de la température sous 0°C

<!-- Change the timeout of the PopUp -->
var switch_protected_timeout = '800';		// durée d'affichage (en milisecondes)
var switch_timeout = '600';
var fad_Duration = 0;					// durée de l'animation (en milisecondes)

<!-- Special items -->
var city = 'saint-jacques-de-la-lande';		// localité pour la popup météo (lors du clic sur l'icon météo)
var blink = true;							// faire clignoter les valeurs en alarme (true/false)
var showMonth = false;						// affichage du mois dans la date (true/false)

<!-- Swipe options -->
var speed = 300;							// durée de l'animation (en milisecondes)
var delai = 60000;							// défilement automatique, temps avant changement de page (en milisecondes)
var direction = 'index';						// si delai est différent de 0, choix d'aller à la page suivante ou de revenir à la première page ('next'/'index')

<!-- Display -->
var zoom = -3;								// ajustage de la valeur de zoom

//Pattern_start
// ############################################################################################################
// #### vvvvv   USER VALUES below vvvvv   #######
// ############################################################################################################

$(document).ready(function() {
        $.roomplan = 2;           // define roomplan in Domoticz and create items below. (0 = all devices, not limited to a roomplan)
		
		//$.domoticzurl = "http://192.168.22.100:8080";	// url de connection à domoticz (ex: http://paul:ochon@toto.com:8765)
		$.domoticzurl = location.protocol + "//" + location.host;		// auto detect (location.protocol + "//paul:ochon@" + location.host)
				
        $.PageArray = [
		
            //page 1
			
			//	['idx','value','cellule','description','1=lastseen 2=icon 3=both ou J+x(popup météo)','pas de thermostat','override css','Alarme ou valeur max de thermostat'],
			
	
				
				['exterieur','Temp',           		'cell3',                        	''],	// températures exterieure
				
				
				['la cafetiere','Status',        		'cell26',                     		'Cafetière','2'],	// interrupteurs classics
				['les pierres','Status',         		'cell13',                       	'Pierres','2'],
				['la chambre','Status',         		'cell9',                        	'Chambre','2'],
				['la musique','Status',        		'cell4',                       		'','2'], // interrupteurs classics avec icon
	
				['rgb1_rouge','Level',          		'cell12',                      		'rgb1_red','2'],	// rgb
				['rgb1_vert','Level',          		'cell17',                      		'rgb1_green','2'],	// rgb
				['rgb1_bleu','Level',          		'cell22',                      		'rgb1_blue','2'],	// rgb
				['rgb1_show','Status',          		'cell7',                      		'rgb1_show','2'],	// rgb
				
				['rgb2_rouge','Level',          		'cell11',                      		'rgb2_red','2'],	// rgb
				['rgb2_vert','Level',          		'cell16',                      		'rgb2_green','2'],	// rgb
				['rgb2_bleu','Level',          		'cell21',                      		'rgb2_blue','2'],	// rgb
				['rgb2_show','Status',          		'cell6',                      		'rgb2_show','2'],	// rgb
				
				['reveil','Wakeup',         		'cell2',                        	'','','','color:#E51CFD'],	// réveil 
																				               
                 
			   
                ['la veilleuse','Level',         			'cell14',                       	'Veilleuse','2'],	// variateur
				['le salon','Level',          		'cell8',                        	'Salon','2'],
				               
                ['mpd_goa','Status',        		'cell23',                       	'Goa','','','color:#6594FE;font-family:brankovic;font-size:100%'],	// boutons PushOn ou pushOff
                ['mdp_metal','Status',        		'cell20',                       	'Metal','','','color:#6594FE;font-family:brankovic;font-size:100%'],
				['mpd_spoon','Status',        		'cell5',                       		'Spoon','','','color:#6594FE;font-family:brankovic;font-size:100%'],
				['mpd_reggae','Status',   				'cell10',                       	'Reggae','','','color:#6594FE;font-family:brankovic;font-size:100%'],
				['mpd_rock','Status',        		'cell15',                       	'Rock','','','color:#6594FE;font-family:brankovic;font-size:100%'],
			  
                ['exterieur','ForecastStr',    		'cell25',                       	''],	// icon météo (idx du capteur de température extérieur virtuel Weather Underground)
			    ['','Clock',            		'cell1',                       		'','','','font-family:digital;color:#8BFD1C;font-size:160%'],	// heure et date
				
							
				['','SunBoth',					'desc_cell25',						'','','','color:#F2DDB3;font-size:19px;font-weight:bold'],	// heures soleil dans la description de la cellule 25
				
			
		 	// page 5
	 		
				['salon','Temp',         			'cell5_3',                        	'Salon (7h - 23h)','','','color:#FA8072',''],	// températures salon color:#FA8072
                ['chambre','Temp',         			'cell5_4',                       	'Chambre (9h - 21h)','','','color:#52CE8A'],	// températures chambre color:#52CE8A
                ['salle de bain','Temp',         			'cell5_2',                       	'Salle de bain','','','color:#A752CE'],	// températures Salle de bain color:#A752CE
				
				['salon','Humidity',         		'cell5_3f',                     	'','','','color:#1CD5FD','x < 30 || x > 70'],	// Humidity salon
                ['chambre','Humidity',         		'cell5_4f',                     	'','','','color:#1CD5FD','x < 30 || x > 70'],	// Humidity chambre font-size:110%;color:#1CD5FD
                ['salle de bain','Humidity',         		'cell5_2f',                     	'','','','color:#1CD5FD','x < 30 || x > 70'],	// Humidity Salle de bain font-size:110%;color:#1CD5FD
				
				['th_chambre','SetPoint',      		'cell5_4b',                       	'','','0.5','font-size:110%;color:#72DDEA','23'],	// thermostat salon avec un pas de 0.5, valeur max 23°C
				['th_salon','SetPoint',      		'cell5_3b',                       	'','','0.5','font-size:110%;color:#72DDEA','23'],		// thermostat chambre avec un pas de 0.5, valeur max 23°C
				['th_salle de bain','SetPoint',      		'cell5_2b',                       	'','','1','font-size:110%;color:#72DDEA','25'],		// thermostat Salle de bain avec un pas de 1, valeur max 25°C
          		
				['boost','Status',         		'cell5_3g',                     	'Boost','2'], 
          		['','Hide',					'cell5_1b',							''],
          		['','Hide',					'cell5_1d',							''],
          		['','Hide',					'cell5_3a',							''],
				
				['radiateur salon','Status',            		'cell5_3e',                       	'','2'],	// visu radiateur salon
                ['radiateur chambre','Status',            		'cell5_4d',                       	'','2'],	// visu radiateur chambre
				['conso veille euros','Euro',       			'cell5_8',                      	'edf hier','','','color:pink','x > 4'],	
									
				['chauffage','Status',       			'cell5_7',                      	'Chauffage','2'],	
				
				
				['','Hide',       			'cell5_3d',                      	''],	
				['112','Usage',         		'cell5_9',                      	'edf now','','','color:#D5DE3F;font-size:90%','x > 7500'],	// consommation instantanée (téléinfo)
				['107','CounterToday',      	'cell5_6',                      	'chauffage day','','','color:#D5DE3F;font-size:90%'],	// consommation totale (téléinfo)
				['','Hide',      				'cell5_4c',                      	''],	
							
				['exterieur','Temp',           		'cell5_1c',                        	'','','','font-size:180%'],	// températures exterieure
				
				['','Hide',            		'cell5_1a',                       		''],

				['exterieur','ForecastStr',    		'cell5_1',                       	'','1'],	// icon météo (idx du capteur de température extérieur virtuel Weather Underground)	
				
				['exterieur','HumidityStatus',    	'cell5_1f',                       	'','','','color:#88B496;font-size:80%'],	
				
				
				['','Hide',         			'cell5_4a',                      	''],
				['','Hide',         			'cell5_2a',                      	''],
				['','Hide',         			'cell5_2c',                      	''],
				['','Hide',         			'cell5_2d',                      	''],
				['','Hide',         			'cell5_3c',                      	''],
				['','Hide',         			'cell5_4e',                      	''],
				['','Hide',         			'cell5_4g',                      	''],
			
				['conso chauffage','Usage',          		'cell5_5',                      	'chauffage now','','','color:#D5DE3F;font-size:90%','x > 4000'],	// consommation instantanée chauffage
				
				['soufflant','Status',         		'cell5_2e',                      	'','2'],	// soufflant sdb
				['douche','Status',         		'cell5_2g',                     	'','2'], // douche
				['proba pluie 1h','Data',         			'cell5_1e',                      	'','','','','x > 65'],	// proba pluie dans 1h
				['proba pluie 2h','Data',         			'cell5_1g',                      	'','','','','x > 45'],	// proba pluie dans 2h
				
		// clock page
			
				['','Hide',         			'clock_3',                      	''],
				['','Hide',         			'clock_5',                      	''],
				['','Hide',         			'clock_6',                      	''],
				['','Hide',         			'clock_7',                      	''],
				['','Hide',         			'clock_8',                      	''],
				['','Hide',         			'clock_10',                      	''],
				['','Hide',         			'clock_11',                      	''],
				['','Hide',         			'clock_12',                      	''],
				['','Hide',         			'clock_13',                      	''],
				['','Hide',         			'clock_14',                      	''],
				['reveil','Wakeup',         		'clock_16',                        	'','','','color:#3A5486;font-size:130%'],	// Date 
				['','Date',         			'clock_15',                        	'','','','color:#3A5486;font-size:130%'],	// réveil 
				['exterieur','ForecastStr',    		'clock_2',                       	''],	// icon météo (idx du capteur de température extérieur virtuel Weather Underground)
				
				['','SunBoth',					'desc_clock_2',						'','','','color:#F2DDB3;font-size:19px;font-weight:bold'],	// heures soleil dans la description de la cellule clock_2
				['exterieur','Temp',           		'clock_1',                        	''],	// températures exterieure
			 //	['','Camera',					'clock_4',							'http://webcam.st-malo.com/mjpg/video.mjpg','http://webcam.st-malo.com/axis-cgi/mjpg/video.cgi','',''],	// camera 1	
			 	['','Camera',					'clock_4',							'http://192.168.22.100:2550','','',''],	// camera 1	
			  	['saint','Data',					'clock_9',							'','','','color:#4dd2ff'],	// saint du jour
				
				 
					
        ];
        $.PageArray_Scenes = [		// placez ci dessous vos groupes et scènes
            
			//	['idx','value','cellule','description','icon name (ex: Light, Blinds, WallSocket, Generic,..)','override css'],
           
                ['ciné','Status',  				'cell18',                    		'Ciné','','color:#E4D422;font-size:90%'],	// scène 
				['apéro','Status',         			'cell19',                       	'Apéro','','color:#E4D422;font-size:90%'],	// scène 
				['toute la maison','Status',         		'cell24',                     		'Toute la maison','Light'],	// groupe avec icon Light
			
        ];

// ############################################################################################################
// #### ^^^^^   USER VALUES above ^^^^^   #######
// ############################################################################################################
//Pattern_end

});


