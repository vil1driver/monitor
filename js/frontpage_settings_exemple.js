
// Change the text for on/off switches
var txt_on = 'On';
var txt_off = 'Off';
var txt_closed = 'Fermée';
var txt_open = 'Ouverte';
var txt_sunboth = 'Soleil';
var txt_sunset = 'Coucher soleil';
var txt_sunrise = 'Lever soleil';
var days = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];
var months = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Décembre"];

// Change the text displayed in PopUps
var txt_switch_on = '\'Switch On\'';
var txt_switch_off = '\'Switch Off\'';
var txt_blind_up = '\'Ouverture\'';
var txt_blind_down = '\'Fermeture\'';
var txt_blind_stop = '\'Arrêt\'';
var txt_wrong_code = 'Mot de pass erroné';

// Change backgrounds images, size and brightness
var bg_day = ''; 														// image de fond le jour, laisser vide pour fond noir
var bg_night = ''; 														// image de fond la nuit, laisser vide pour fond noir
var bg_day_spring = 'wallpaper/spring_day.jpg';							// image de fond pour la saison printemps
var bg_night_spring = 'wallpaper/spring_night.jpg';
var bg_day_summer = 'wallpaper/summer_day.jpg';							// image de fond pour la saison été
var bg_night_summer = 'wallpaper/summer_night.jpg';
var bg_day_autumn = 'wallpaper/autumn_day.png';							// image de fond pour la saison automne
var bg_night_autumn = 'wallpaper/autumn_night.jpg';
var bg_day_winter = 'wallpaper/winter_day.jpg';							// image de fond pour la saison hiver
var bg_night_winter = 'wallpaper/winter_night.jpg';
var bg_size = 'cover';												// taille de l'image de fond (ex: '1024px 768px') 'cover' : "couvre" au mieux tout le fond.
var bg_dayBright = 0.5;												// luminosité du fond le jour (0=normal 1=noir)
var bg_nightBright = 0.5;											// luminosité du fond la nuit (0=normal 1=noir)

// Change the timeout of the PopUp
var switch_timeout = 0;						// durée d'affichage (en milisecondes)  [ 0 = désactivée ]
var wrongCode_timeout = 1500;				// durée d'affichage (en milisecondes)
var fad_Duration = 0;						// durée de l'animation (en milisecondes)  [ 0 = désactivée ]

// Special items
var city = 'saint-jacques-de-la-lande';							// localité pour la popup météo option 0,1,2,3 (lors du clic sur l'icon météo) cf http://www.prevision-meteo.ch/
var place = 'France/Brittany/Saint-Jacques-de-la-Lande';		// localité pour la popup météo option 4 (lors du clic sur l'icon météo) cf http://www.yr.no/
var blink = true;							// faire clignoter les valeurs en alarme (true/false)
var showMonth = false;						// affichage du mois dans la date (true/false)

// Swipe options
var speed = 300;							// durée de l'animation (en milisecondes)
var delai = 60000;							// défilement automatique, temps avant changement de page (en milisecondes)
var direction = 'index';					// si delai est différent de 0, choix d'aller à la page suivante ou de revenir à la première page ('next'/'index')

// Display
var connectTimeout = 3000;					// durée avant d'afficher un domoticz offline (en millisecondes)
var refresh = 8000;							// temps entre 2 rafraîchissements (en millisecondes)
var snow = false;							// ajout effet chute de neige..

// Debug
var debug = false;							// affichage des infos de debug dans la console (true/false)

// ############################################################################################################
// #### vvvvv   USER VALUES below vvvvv   #######
// ############################################################################################################


        $.roomplan = 2;           // define roomplan in Domoticz and create items below. (0 = all devices, not limited to a roomplan)
		
		//$.domoticzurl = "http://192.168.22.100:8080";	// url de connection à domoticz (ex: http://paul:ochon@toto.com:8765)
		$.domoticzurl = location.protocol + "//" + location.host;		// auto detect (location.protocol + "//paul:ochon@" + location.host)
				
        $.PagesList = [
		
			// ['html page name (location must be in 'monitor/pages/')','menu icon name (location must be in 'monitor/icons/menu/')],
			
				['iframe.html','domoticz.png'],
				['clock.html','clock.png'],
				['meteo.html','meteo.png'],
				['pluie.html','pluie.png'],
				['page1.html','light1.png'],
				['page2.html','light2.png'],
				['page3.html','light3.png'],
				['page4.html','light4.png'],
				['page5.html','chauffage.png'],
				['trafic.html','map.png'],
				['logs.html','log.png'],
				

		
		
		[]];


        $.PageArray = [

			//	['idx','value','cellule','description','1=lastseen 2=icon 3=both ou J+x(popup météo)','pas de thermostat','override css','Alarme ou valeur max de thermostat'],
			
	
			//page 1
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
				
				['','Hide',         		'cell2',                        	''],	// réveil 
																				               
                 
			   
                ['la veilleuse','Level',         			'cell14',                       	'Veilleuse','2'],	// variateur
				['le salon','Level',          		'cell8',                        	'Salon','2'],
				               
                ['mpd_goa','Status',        		'cell23',                       	'Goa','','','color:#6594FE;font-family:brankovic;font-size:100%'],	// boutons PushOn ou pushOff
                ['mpd_metal','Status',        		'cell20',                       	'Metal','','','color:#6594FE;font-family:brankovic;font-size:100%'],
				['mpd_spoon','Status',        		'cell5',                       		'Spoon','','','color:#6594FE;font-family:brankovic;font-size:100%'],
				['mpd_reggae','Status',   				'cell10',                       	'Reggae','','','color:#6594FE;font-family:brankovic;font-size:100%'],
				['mpd_rock','Status',        		'cell15',                       	'Rock','','','color:#6594FE;font-family:brankovic;font-size:100%'],
			  
                ['exterieur','ForecastStr',    		'cell25',                       	'','4'],	// icon météo (idx du capteur de température extérieur virtuel Weather Underground)
			    ['','Hide',            		'cell1',                       		''],	// heure et date
				
							
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
			
				['','Hide',         			'clock3',                      	''],
				['','Hide',         			'clock5',                      	''],
				['','Hide',         			'clock6',                      	''],
				['','Hide',         			'clock7',                      	''],
				['','Hide',         			'clock8',                      	''],
				['','Hide',         			'clock10',                      	''],
				['','Hide',         			'clock11',                      	''],
				['','Hide',         			'clock12',                      	''],
				['','Hide',         			'clock13',                      	''],
				['','Hide',         			'clock14',                      	''],
				['reveil','Wakeup',         		'clock16',                        	'','','','color:#3A5486;font-size:130%'],	// réveil 
				['','Date',         			'clock15',                        	'','','','color:#3A5486;font-size:130%'],	// date
			//	['','MonthYear',         			'clock15',                        	'','','','color:#3A5486;font-size:130%'],	// date
				['exterieur','ForecastStr',    		'clock2',                       	''],	// icon météo (idx du capteur de température extérieur virtuel Weather Underground)
				
				['','SunBoth',					'desc_clock2',						'','','','color:#F2DDB3;font-size:19px;font-weight:bold'],	// heures soleil dans la description de la cellule clock2
				['exterieur','Temp',           		'clock1',                        	''],	// températures exterieure
			 //	['','Camera',					'clock4',							'http://webcam.st-malo.com/mjpg/video.mjpg','http://webcam.st-malo.com/axis-cgi/mjpg/video.cgi','',''],	// camera 1	
			 	['','Camera',					'clock4',							'http://192.168.22.100:2550','','',''],	// camera 1	
			 //	['','Hide',					'clock4',							''],	
			  	['saint','Data',					'clock9',							'','','','color:#4dd2ff'],	// saint du jour
				
				 
					
        []];
        $.PageArray_Scenes = [		// placez ci dessous vos groupes et scènes
            
			//	['idx','value','cellule','description','icon name (ex: Light, Blinds, WallSocket, Generic,..)','override css'],
           
                ['ciné','Status',  				'cell18',                    		'Ciné','','color:#E4D422;font-size:90%'],	// scène 
				['apéro','Status',         			'cell19',                       	'Apéro','','color:#E4D422;font-size:90%'],	// scène 
				['toute la maison','Status',         		'cell24',                     		'Toute la maison','Light'],	// groupe avec icon Light
			
        []];
		$.PageArray_UserVariable = [      // placez ci dessous vos userVariable
            
			//['idx','value','cellule','description','override css'],
           
            ['reveilmatin','Value','cell5_9','',''],
          
        []];
		
		

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	

		// MQTT
		
		
		// called when a message arrives
		function onMessageArrived(message) {
			console.log('%cMQTT Message Arrived:','color: #c44800','\n',message.payloadString);

			message = JSON.parse(message.payloadString);



			switch(message.name) { // filtre sur le nom du dispositif
			
			
		////////////////////////////////////////////////////////////////////////////////	
					
					// si le nom est "d1", changer de page
					case "d1": 						// nom du bouton de la télécommande
						
						if (message.nvalue == 1)	// status On 
							mySwipe.prev(); 		// page précédente
							
						if (message.nvalue == 0)	// status Off
							mySwipe.next(); 		// page suivante
							
						break;
						
		////////////////////////////////////////////////////////////////////////////////
					
					case "Cafetiere on": // nom du bouton pushOn de mise en route de la cafetière
							
							// affiche une popup text
							lightbox_open('switch',25000,'café en préparation');	
							
						break;	

		////////////////////////////////////////////////////////////////////////////////
						
					//lire une musique
					case "d2": // nom du bouton de la télécommande
					
						/*
										/!\  IMPORTANT  /!\
						
						 à fin de pouvoir lancer de l'audio automatiquement
						 il est nécessaire de désactiver la sécurité suivante
						 "Exiger un geste de l'utilisateur pour lire des éléments multimédias"
						 
						 saisissez cette adresse dans chrome et désactivez l'option
						 
						 chrome://flags/#disable-gesture-requirement-for-media-playback
						 
						*/
						
						var oAudio = document.getElementById('myaudio');

						if (message.nvalue == 1){	// status On 
							
							oAudio.src = "http://icecast.skyrock.net/s/natio_mp3_128k";
							oAudio.play();
						}	
						
						if (message.nvalue == 0){	// status Off
						
							oAudio.pause();	// stop
							oAudio.src = "";
						}	
						
						break;
						
		////////////////////////////////////////////////////////////////////////////////
						
					// afficher la caméra en grand
					case "d3": // nom du bouton de la télécommande
						
						if (message.nvalue == 1){		// status On 
							var source = "http://www.saintveranmeteo.eu/villagesaintveranwebcam.jpg";	// source du flux de la caméra
							$('#popup_camera').html('<img src='+source+' >');	// charge le flux dans la popup caméra
							lightbox_open('camera', 25000);	// afficher la popup 25 secondes
						}	
						if (message.nvalue == 0)		// status Off
							lightbox_close('camera');	// fermer la popup
							
						break;	
						
		////////////////////////////////////////////////////////////////////////////////
					
					// annonces vocales
					case "tts": // nom du widget text
					
						/*
										/!\  IMPORTANT  /!\
						
						 à fin de pouvoir lancer de l'audio automatiquement
						 il est nécessaire de désactiver la sécurité suivante
						 "Exiger un geste de l'utilisateur pour lire des éléments multimédias"
						 
						 saisissez cette adresse dans chrome et désactivez l'option
						 
						 chrome://flags/#disable-gesture-requirement-for-media-playback
						 
						*/
						
						var text = message.svalue1;
						var oAudio = document.getElementById('myaudio');
						var launched = false;
						oAudio.src = "sounds/Arpeggio.ogg";	// ding dong d'alerte
						oAudio.play();
						oAudio.onended = function() {
											if ( !launched ) {
												launched = true;
												oAudio.src = "http://www.voxygen.fr/sites/all/modules/voxygen_voices/assets/proxy/index.php?method=redirect&text="+text+"&voice=Fabienne";
												oAudio.play();
											}
										};
						
						break;

		////////////////////////////////////////////////////////////////////////////////
						
					// afficher une page précise suivant le choix d'un switch sélecteur
					case "page": // nom du switch sélecteur
						
						if (message.svalue1 == 10)   // sélecteur à 10 %
						   mySwipe.slide(0);   // vers page 1 (la première page est numéroté 0)
						if (message.svalue1 == 20)
						   mySwipe.slide(1);   // vers page 2
						if (message.svalue1 == 30)
						   mySwipe.slide(2);   // vers page 3
						if (message.svalue1 == 40)
						   mySwipe.slide(3);   // vers page 4
						if (message.svalue1 == 50)
						   mySwipe.slide(4);   // vers page 5
						if (message.svalue1 == 60)
						   mySwipe.slide(5);   // vers page 6
						if (message.svalue1 == 70)
						   mySwipe.slide(6);   // vers page 7
						if (message.svalue1 == 80)
						   mySwipe.slide(7);   // vers page 8
						if (message.svalue1 == 90)
						   mySwipe.slide(8);   // vers page 9
						if (message.svalue1 == 100)
						   mySwipe.slide(9);   // vers page 10
						   
						break;	
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
			} 
		  
		}		

// ############################################################################################################
// #### ^^^^^   USER VALUES above ^^^^^   #######
// ############################################################################################################




