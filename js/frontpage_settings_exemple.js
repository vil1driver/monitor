
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
var bg_day = 'pissanli.jpg';			// image de fond le jour, laisser vide pour fond noir
var bg_night = 'romantic.jpg';			// image de fond la nuit, laisser vide pour fond noir
var bg_size = 'cover';					// taille de l'image de fond (ex: '1024px 768px') 'cover' : "couvre" au mieux tout le fond.
var bg_dayBright = 0.5;					// luminosité du fond le jour (0=normal 1=noir)
var bg_nightBright = 0.5;				// luminosité du fond la nuit (0=normal 1=noir)

<!-- Change colors of temps -->
var T35 = '#F24735';						// couleur de la température au dessus de 35°C
var T30 = '#F26135';
var T25 = '#F27935';
var T20 = '#FD8A1C';
var T15 = '#FF9B0E';
var T10 = '#FFAE0E';
var T05 = '#DBC14C';
var T00 = '#A3D6AD';
var T000 = '#78C5F5';						// couleur de la température sous 0°C

<!-- Change the timeout of the PopUp -->
var switch_protected_timeout = '1000';
var switch_timeout = '1000';

<!-- Special items -->
var city = 'saint-jacques-de-la-lande';		// localité pour la popup météo (lors du clic sur l'icon météo)
var cityDay = 0;							// météo à J+x (0 = météo du jour, valeur max=3)
var blink = true;							// faire clignoter les valeurs en alarme (true/false)
var loop = true;							// si au moins 3 pages, autoriser rebouclage des pages(true/false)
var showMonth = false;						// affichage(true) ou non(false) du mois dans la date


// ############################################################################################################
// #### vvvvv   USER VALUES below vvvvv   #######
// ############################################################################################################

$(document).ready(function() {
        $.roomplan = 0;           // define roomplan in Domoticz and create items below. (0 = all devices, not limited to a roomplan)
		$.domoticzurl = "http://192.168.22.100:8080";
	
        $.PageArray = [
		
            //page 1
			
			//	['idx','value',  	'cellule',    	'description','1=lastseen 2=icon 3=both','pas de thermostat','override css','Alarme ou valeur max de thermostat'],
			
				['203','Temp',         			'cell6',                        	'Salon','','','font-size:110%;color:#1CD5FD'],	// températures salon
                ['214','Temp',         			'cell7',                       		'Chambre','','','font-size:110%;color:#1CD5FD'],	// températures chambre font-size:110%;color:#1CD5FD
				
				['145','SetPoint',      		'cell11',                       	'','','0.5','font-size:85%;color:#1CD5FD','23'],	// thermostat salon avec un pas de 0.5, valeur max 23°C
				['147','SetPoint',      		'cell12',                       	'','','0.5','font-size:85%;color:#1CD5FD','23'],		// thermostat chambre avec un pas de 0.5, valeur max 23°C
          		
				['59','Status',            		'heat1',                       		'','2','',''],	// visu radiateur salon
                ['60','Status',            		'heat2',                       		'','2','',''],	// visu radiateur chambre
				
				
				
				['279','Temp',           		'cell3',                        	''],	// températures exterieure
				
				
				['103','Status',        		'cell26',                     		'Cafetière','2'],	// interrupteurs classics
				['35','Status',         		'cell13',                       	'Pierres','2'],
				['95','Status',         		'cell9',                        	'Chambre','2'],
				['116','Status',        		'cell4',                       		'','2'], // interrupteurs classics avec icon
				['248','Status',         		'cell21',                     		'Boost','2'], 
				['204','Status',         		'cell22',                     		'Douche','2'], 
				
				['134','Status',       			'cell16',                      		'Chauffage','2'],	
				['232','Status',         		'cell17',                     		'Climatisation','2'],
				
				['150','Wakeup',         		'cell2',                        	'','','','color:#E51CFD'],	// réveil 
																				               
                 
			   
                ['66','Level',         			'cell14',                       	'Veilleuse','2'],	// variateur
				['30','Level',          		'cell8',                        	'Salon','2'],
				               
                ['130','Status',        		'cell23',                       	'Goa','','','color:#6594FE;font-family:brankovic;font-size:100%'],	// boutons PushOn ou pushOff
                ['148','Status',        		'cell20',                       	'Metal','','','color:#6594FE;font-family:brankovic;font-size:100%'],
				['175','Status',        		'cell5',                       		'Spoon','','','color:#6594FE;font-family:brankovic;font-size:100%'],
				['129','Status',   				'cell10',                       	'Reggae','','','color:#6594FE;font-family:brankovic;font-size:100%'],
				['128','Status',        		'cell15',                       	'Rock','','','color:#6594FE;font-family:brankovic;font-size:100%'],
			  
                ['279','ForecastStr',    		'cell25',                       	''],	// icon météo (idx du capteur de température extérieur virtuel Weather Underground)
			    ['0','Clock',            		'cell1',                       		'','','','font-family:digital;color:#8BFD1C;font-size:160%'],	// heure et date
				
							
				['0','SunBoth',					'desc_cell25',						'','','','color:#F2DDB3;font-size:19px;font-weight:bold'],	// heures soleil dans la description de la cellule 25
				
          
			// page 2	
			
				['101','Status',       			'cell2_5',                      	'Porte d\'entrée','2'],	// contact de porte
				['92','Data',          			'cell2_4',                      	'CPU','','','color:#02E07A','10'],	// charge processeur
				['112','Usage',         		'cell2_15',                      	'EDF instant','','','color:#88B496;font-size:90%','2000'],	// consommation instantanée (téléinfo)
				['112','Counter',      			'cell2_20',                      	'EDF total','','','color:#88B496;font-size:90%'],	// consommation totale (téléinfo)
				['112','CounterToday',       	'cell2_10',                     	'EDF today','','','color:#88B496;font-size:90%','15'],	// consommation du jour (téléinfo)
				['255','Euro',       			'cell2_11',                      	'coût jour','1','','color:pink'],	
				['264','Euro',       			'cell2_16',                      	'coût nuit','1','','color:pink'],	
				
				['216','Status',        		'cell2_12',                      	'alarme','2'],	// security pannel
		
				['253','Level',          		'cell2_14',                      	'rgb1_red','2'],	// rgb
				['252','Level',          		'cell2_19',                      	'rgb1_green','2'],	// rgb
				['254','Level',          		'cell2_26',                      	'rgb1_blue','2'],	// rgb
				['257','Status',          		'cell2_9',                      	'rgb1_show','2'],	// rgb
				
				['283','Level',          		'cell2_13',                      	'rgb2_red','2'],	// rgb
				['284','Level',          		'cell2_18',                      	'rgb2_green','2'],	// rgb
				['285','Level',          		'cell2_24',                      	'rgb2_blue','2'],	// rgb
				['286','Status',          		'cell2_8',                      	'rgb2_show','2'],	// rgb
		
				['133','Status',       			'cell2_21',                      	'mv salon','2'],	
				['132','Status',       			'cell2_23',                      	'mv chambre','2'],	
            
			//	['0','Link',       				'cell2_22',                     	'<a href="http://......" target="_blank">blabla</a>'], // simple lien s'ouvrant dans une nouvelle fenêtre
				['0','Clock',           		'cell2_1',                      	'','','','color:#02E07A'],	// heure et date
				
				['0','SunRise',         		'cell2_2',                      	'','','','color:#E6A677'],	// heure de lever du soleil
				['0','SunSet',         			'cell2_6',                     		'','','','color:#E6A677'],		// heure de coucher du soleil
				
			// page 3	
			
				['0','Hide',       				'cell3_5',                      	''],	
				['0','Hide',       				'cell3_3',                      	''],	
				['0','Hide',       				'cell3_25',                      	''],	
				['0','Hide',          			'cell3_4',                      	''],	
				['253','Level',          		'cell3_7',                      	'red','2'],	// rgb
				['252','Level',          		'cell3_8',                      	'green','2'],	// rgb
				['254','Level',          		'cell3_9',                      	'blue','2'],	// rgb
				['0','Hide',         			'cell3_15',                      	''],	
				['0','Hide',      				'cell3_20',                      	''],	
				['195','SignalLevel',       	'cell3_22',                      	'veilleuse mur','1','','color:#FBFE03'],	
				['66','SignalLevel',       		'cell3_13',                      	'veilleuse lit','1','','color:#FBFE03'],	
				['132','SignalLevel',       	'cell3_26',                      	'mv chambre','1','','color:#FBFE03'],	
				['133','SignalLevel',       	'cell3_24',                      	'mv salon','1','','color:#FBFE03'],	
				['136','SignalLevel',       	'cell3_18',                      	'Lumino salon','1','','color:#FBFE03'],	
				['135','SignalLevel',       	'cell3_19',                      	'Lumino chambre','1','','color:#FBFE03'],	
				['101','SignalLevel',       	'cell3_14',                      	'porte','1','','color:#FBFE03'],

				
			// page 4
		
				['203','Temp',       				'cell4_1a',                      	''],	
				['203','Humidity',       			'cell4_1b',                      	'','','','color:#FBFE03'],
				['0','Text',       					'desc_cell4_1',                     'salon'],
				
				['214','Temp',       				'cell4_2',                      	'chambre'],	
				
			// page 5
			
				['203','Temp',         			'cell5_1',                        	'Salon','','',''],	// températures salon
                ['214','Temp',         			'cell5_2',                       	'Chambre','','',''],	// températures chambre font-size:110%;color:#1CD5FD
                ['202','Humidity',         			'cell5_3',                       	'Salle de bain','','',''],	// températures Salle de bain font-size:110%;color:#1CD5FD
				
				['203','Humidity',         			'cell5_1e',                        	'','','','color:green','70'],	// Humidity salon
                ['214','Humidity',         			'cell5_2e',                       	'','','','color:green','70'],	// Humidity chambre font-size:110%;color:#1CD5FD
                ['202','Humidity',         			'cell5_3e',                       	'','','','color:green','70'],	// Humidity Salle de bain font-size:110%;color:#1CD5FD
				
				['145','SetPoint',      		'cell5_1b',                       	'','','0.5','color:#1CD5FD','23'],	// thermostat salon avec un pas de 0.5, valeur max 23°C
				['147','SetPoint',      		'cell5_2b',                       	'','','0.5','color:#1CD5FD','23'],		// thermostat chambre avec un pas de 0.5, valeur max 23°C
				['146','SetPoint',      		'cell5_3b',                       	'','','0.5','color:#1CD5FD','25'],		// thermostat chambre avec un pas de 0.5, valeur max 23°C
          		
				['59','Status',            		'cell5_1c',                       		'','2','',''],	// visu radiateur salon
                ['60','Status',            		'cell5_2c',                       		'','2','',''],	// visu radiateur chambre
				['255','Euro',       			'cell5_1f',                      	'','1','','color:pink'],	
				['264','Euro',       			'cell5_2f',                      	'','1','','color:pink'],	
				
				['134','Status',       			'cell5_6',                      		'Chauffage','2'],	
				
				['248','Status',         		'cell5_1d',                     		'','2'], 
				
				['112','Usage',         		'cell5_9',                      	'edf now','','','color:#88B496;font-size:90%','2000'],	// consommation instantanée (téléinfo)
				['112','Counter',      			'cell5_7',                      	'edf total','','','color:#88B496;font-size:90%'],	// consommation totale (téléinfo)
				['112','CounterToday',       	'cell5_8',                     	'edf day','','','color:#88B496;font-size:90%','15'],	// consommation du jour (téléinfo)
				
				['279','Temp',           		'cell5_4a',                        	'','','','font-size:160%'],	// températures exterieure
				
				['0','Clock',            		'cell5_5',                       		'','','','font-family:digital;color:#8BFD1C;font-size:140%'],	// heure et date		

				['279','ForecastStr',    		'cell5_4',                       	''],	// icon météo (idx du capteur de température extérieur virtuel Weather Underground)	
				['279','HumidityStatus',    	'cell5_4f',                       	'','','','color:#88B496;font-size:80%'],	// icon météo (idx du capteur de température extérieur virtuel Weather Underground)	
				
				['0','Hide',         			'cell5_4b',                      	''],
				['0','Hide',         			'cell5_4e',                      	''],
				['111','Status',         			'cell5_3f',                      	'','2'],	// soufflant sdb
				['263','Data',         			'cell5_4c',                      	'','','','','65'],	// proba pluie dans 1h
				['265','Data',         			'cell5_4d',                      	'','','','','45'],	// proba pluie dans 2h
				
					
					
        ];
        $.PageArray_Scenes = [		// placez ci dessous vos groupes et scènes
            
			//	['idx','value','cellule','description','icon name (ex: Light, Blinds, WallSocket, Generic,..)','override css'],
           
                ['1','Status',  				'cell18',                    		'Ciné','','color:#E4D422;font-size:90%'],	// scène 
				['6','Status',         			'cell19',                       	'Apéro','','color:#E4D422;font-size:90%'],	// scène 
				['24','Status',         		'cell24',                     		'Toute la maison','Light'],	// groupe avec icon Light
			//	['10','Status',         		'cell24',                     		'Toute la maison'],	// groupe 
        ];

// ############################################################################################################
// #### ^^^^^   USER VALUES above ^^^^^   #######
// ############################################################################################################


});


