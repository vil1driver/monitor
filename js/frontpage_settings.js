
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
var switch_protected_timeout = '1000';		// durée d'affichage (en milisecondes)
var switch_timeout = '1000';
var fad_Duration = 200;					// durée de l'animation (en milisecondes)

<!-- Special items -->
var city = 'paris';		// localité pour la popup météo (lors du clic sur l'icon météo)
var blink = false;							// faire clignoter les valeurs en alarme (true/false)
var showMonth = false;						// affichage du mois dans la date (true/false)

<!-- Swipe options -->
var speed = 300;							// durée de l'animation (en milisecondes)
var delai = 0;								// défilement automatique, temps avant changement de page (en milisecondes)
var direction = 'next';						// si delai est différent de 0, choix d'aller à la page suivante ou de revenir à la première page ('next'/'index')

<!-- Display -->
var zoom = 0;								// ajustage de la valeur de zoom (valeurs négatives autorisées)

// ############################################################################################################
// #### vvvvv   USER VALUES below vvvvv   #######
// ############################################################################################################


        $.roomplan = 0;           // define roomplan in Domoticz and create items below. (0 = all devices, not limited to a roomplan)
		
		//$.domoticzurl = "http://192.168.22.100:8080";	// url de connection à domoticz (ex: http://paul:ochon@toto.com:8765)
		$.domoticzurl = location.protocol + "//" + location.host;		// auto detect (location.protocol + "//paul:ochon@" + location.host)
	
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
				
				
				
        ];
        $.PageArray_Scenes = [		// placez ci dessous vos groupes et scènes
            
			//	['idx','value','cellule','description','icon name (ex: Light, Blinds, WallSocket, Generic,..)','override css'],
           
                ['0','',  				'',                    		'','',''],
                ['0','',  				'',                    		'','',''],
                ['0','',  				'',                    		'','',''],
			
        ];

// ############################################################################################################
// #### ^^^^^   USER VALUES above ^^^^^   #######
// ############################################################################################################




