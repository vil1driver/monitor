
// Change the text for on/off switches
var txt_on = 'On';
var txt_off = 'Off';
var txt_closed = 'Fermée';
var txt_open = 'Ouverte';
var txt_sunboth='Soleil';
var txt_sunset='Coucher soleil';
var txt_sunrise='Lever soleil';
var days = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];
var months = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Décembre"];

// Change the text displayed in PopUps
var txt_switch_on = '\'Switch On\'';
var txt_switch_off = '\'Switch Off\'';
var txt_blind_up = '\'Ouverture\'';
var txt_blind_down = '\'Fermeture\'';
var txt_blind_stop = '\'Arrêt\'';
var txt_wrong_code = 'Mot de pass erroné';

// Change backgrounds images,size and brightness
var bg_day = 'wallpaper/pissanli.jpg';			// image de fond le jour, laisser vide pour fond noir
var bg_night = 'wallpaper/romantic.jpg';			// image de fond la nuit, laisser vide pour fond noir
var bg_day_spring = '';									// image de fond pour la saison printemps
var bg_night_spring = '';
var bg_day_summer = '';									// image de fond pour la saison été
var bg_night_summer = '';
var bg_day_autumn = '';									// image de fond pour la saison automne
var bg_night_autumn = '';
var bg_day_winter = '';									// image de fond pour la saison hiver
var bg_night_winter = '';
var bg_size = 'cover';					// taille de l'image de fond (ex: '1024px 768px') 'cover' : "couvre" au mieux tout le fond.
var bg_dayBright = 0.5;					// luminosité du fond le jour (0=normal 1=noir)
var bg_nightBright = 0.5;				// luminosité du fond la nuit (0=normal 1=noir)

// Change colors of temps
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

// Change the timeout of the PopUp
var switch_timeout = 1000;					// durée d'affichage (en milisecondes)  [ 0 = désactivée ]
var wrongCode_timeout = 1500;				// durée d'affichage (en milisecondes)
var fad_Duration = 200;						// durée de l'animation (en milisecondes)  [ 0 = désactivée ]

// Special items
var city = 'paris';								// localité pour la popup météo option 0,1,2,3 (lors du clic sur l'icon météo) cf http://www.prevision-meteo.ch/
var place = 'France/Île-de-France/Paris/';		// localité pour la popup météo option 4 (lors du clic sur l'icon météo) cf http://www.yr.no/
var blink = false;							// faire clignoter les valeurs en alarme (true/false)
var showMonth = false;						// affichage du mois dans la date (true/false)

// Swipe options
var speed = 300;							// durée de l'animation (en milisecondes)
var delai = 0;								// défilement automatique, temps avant changement de page (en milisecondes)
var direction = 'next';						// si delai est différent de 0, choix d'aller à la page suivante ou de revenir à la première page ('next'/'index')

// Display
var connectTimeout = 3000;					// durée avant d'afficher un domoticz offline (en millisecondes)
var refresh = 8000;							// temps entre 2 rafraîchissements (en millisecondes)
var snow = false;							// ajout effet chute de neige..

// Debug
var debug = false;							// affichage des infos de debug dans la console (true/false)

// ############################################################################################################
// #### vvvvv   USER VALUES below vvvvv   #######
// ############################################################################################################


        $.roomplan = 0;           // define roomplan in Domoticz and create items below. (0 = all devices, not limited to a roomplan)
		
		//$.domoticzurl = "http://192.168.22.100:8080";	// url de connection à domoticz (ex: http://paul:ochon@toto.com:8765)
		$.domoticzurl = location.protocol + "//" + location.host;		// auto detect (location.protocol + "//paul:ochon@" + location.host)
	
        $.PagesList = [
		
			// ['html page name (location must be in 'monitor/pages/')','menu icon name (location must be in 'monitor/icons/menu/')],
			
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
		
            //page 1
				
			//	['idx','value',  	'cellule',    	'description','1=lastseen 2=icon 3=both ou J+x(popup météo)','pas de thermostat','override css','Alarme ou valeur max de thermostat'],
							
				['0','Clock',           'cell1',                       		'','','','font-family:digital;color:#8BFD1C;font-size:160%',''],	// heure et date
				['0','',         		'cell2',                       		'','','','',''],	
				['0','',      			'cell3',                       		'','','','',''],	
				['0','',      			'cell4',                       		'','','','',''],	
          		['0','',            	'cell5',                       		'','','','',''],	
                ['0','',            	'cell6',                       		'','','','',''],	
				['0','',           		'cell7',                        	'','','','',''],	
				['0','',          		'cell8',                       		'','','','',''], 
				['0','',        		'cell9',                     		'','','','',''],	
				['0','',         		'cell10',                       	'','','','',''],
				['0','',         		'cell11',                        	'','','','',''],
				['0','',        		'cell12',                       	'','','','',''], 
				['0','',         		'cell13',                     		'','','','',''], 
				['0','',         		'cell14',                     		'','','','',''], 
				['0','',         		'cell15',                     		'','','','',''], 
				['0','',       			'cell16',                      		'','','','',''],	
				['0','',         		'cell17',                     		'','','','',''],
				['0','',         		'cell18',                     		'','','','',''],
				['0','',         		'cell19',                     		'','','','',''],
				['0','',         		'cell20',                     		'','','','',''],
				['0','',         		'cell21',                     		'','','','',''],
				['0','',         		'cell22',                     		'','','','',''],
				['0','',         		'cell23',                     		'','','','',''],
				['0','',         		'cell24',                     		'','','','',''],
				['0','',   				'cell25',                       	'','','','',''],
				['0','SunBoth',			'desc_cell25',						'','','','color:#F2DDB3;font-size:19px;font-weight:bold'],	// heures soleil dans la description de la cellule 25
          
			// page 2	
			
				['0','',           		'cell2_1',                       	'','','','',''],	
				['0','',         		'cell2_2',                       	'','','','',''],	
				['0','',      			'cell2_3',                       	'','','','',''],	
				['0','',      			'cell2_4',                       	'','','','',''],	
          		['0','',            	'cell2_5',                       	'','','','',''],	
                ['0','',            	'cell2_6',                       	'','','','',''],	
				['0','',           		'cell2_7',                        	'','','','',''],	
				['0','',          		'cell2_8',                       	'','','','',''], 
				['0','',        		'cell2_9',                     		'','','','',''],	
				['0','',         		'cell2_10',                       	'','','','',''],
				['0','',         		'cell2_11',                        	'','','','',''],
				['0','',        		'cell2_12',                       	'','','','',''], 
				['0','',         		'cell2_13',                     	'','','','',''], 
				['0','',         		'cell2_14',                     	'','','','',''], 
				['0','',         		'cell2_15',                     	'','','','',''], 
				['0','',       			'cell2_16',                      	'','','','',''],	
				['0','',         		'cell2_17',                     	'','','','',''],
				['0','',         		'cell2_18',                     	'','','','',''],
				['0','',         		'cell2_19',                     	'','','','',''],
				['0','',         		'cell2_20',                     	'','','','',''],
				['0','',         		'cell2_21',                     	'','','','',''],
				['0','',         		'cell2_22',                     	'','','','',''],
				['0','',         		'cell2_23',                     	'','','','',''],
				['0','',         		'cell2_24',                     	'','','','',''],
				['0','',         		'cell2_25',                     	'','','','',''],
			   
				
			// page 3	
			
				['0','',           		'cell3_1',                       	'','','','',''],	
				['0','',         		'cell3_2',                       	'','','','',''],	
			//	['0','',      			'cell3_3',                       	'','','','',''],	// camera
				['0','',      			'cell3_4',                       	'','','','',''],	
          		['0','',            	'cell3_5',                       	'','','','',''],	
                ['0','',            	'cell3_6',                       	'','','','',''],	
				['0','',           		'cell3_7',                        	'','','','',''],	
				['0','',          		'cell3_8',                       	'','','','',''], 
				['0','',        		'cell3_9',                     		'','','','',''],	
				['0','',         		'cell3_10',                       	'','','','',''],
				['0','',         		'cell3_11',                        	'','','','',''],
				['0','',        		'cell3_12',                       	'','','','',''], 
				['0','',         		'cell3_13',                     	'','','','',''], 
				['0','',         		'cell3_14',                     	'','','','',''], 
				['0','',         		'cell3_15',                     	'','','','',''], 
				['0','',       			'cell3_16',                      	'','','','',''],	
				['0','',         		'cell3_17',                     	'','','','',''],
				['0','',         		'cell3_18',                     	'','','','',''],
				['0','',         		'cell3_19',                     	'','','','',''],
				['0','',         		'cell3_20',                     	'','','','',''],
				['0','',         		'cell3_21',                     	'','','','',''],
				['0','',         		'cell3_22',                     	'','','','',''],
				['0','',         		'cell3_23',                     	'','','','',''],
				['0','',         		'cell3_24',                     	'','','','',''],
			//	['0','',         		'cell3_25',                     	'','','','',''],	// camera
				
				
				
        []];
        $.PageArray_Scenes = [		// placez ci dessous vos groupes et scènes
            
			//	['idx','value','cellule','description','icon name (ex: Light, Blinds, WallSocket, Generic,..)','override css'],
           
                ['0','',  				'',                    		'','',''],
                ['0','',  				'',                    		'','',''],
                ['0','',  				'',                    		'','',''],
			
        []];
		$.PageArray_UserVariable = [      // placez ci dessous vos userVariable
            
			//['idx','value','cellule','description','override css'],
           
            ['0','Value','','',''],
          
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




