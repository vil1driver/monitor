
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
var T35 = '#FF0000';						// couleur de la température à 35°C et plus
var T30 = '#FC6500';
var T25 = '#FC9B00';
var T20 = '#FCCF65';
var T15 = '#FFE29E';
var T10 = '#DDF5AE';
var T05 = '#AEF5DC';
var T00 = '#AEE3F5';
var T000 = '#EBF4F7';						// couleur de la température sous 0°C

<!-- Change the timeout of the PopUp -->
var switch_protected_timeout = '1000';
var switch_timeout = '1000';

<!-- Special items -->
var city = 'paris';				// localité pour la popup météo (lors du clic sur l'icon météo)
var cityDay = 0;				// météo à J+x (0 = météo du jour, valeur max=3)
var blink = false;				// faire clignoter les valeurs en alarme (true/false)
var loop = false;				// si au moins 3 pages, autoriser rebouclage (true/false)
var showMonth = false;			// affichage(true) ou non(false) du mois dans la date


// ############################################################################################################
// #### vvvvv   USER VALUES below vvvvv   #######
// ############################################################################################################

$(document).ready(function() {
        $.roomplan = 0;           // define roomplan in Domoticz and create items below. (0 = all devices, not limited to a roomplan)
		$.domoticzurl = "http://192.168.22.100:8080";
	
        $.PageArray = [
		
            //page 1
				
			//	['idx','value',  	'cellule',    	'description','1=lastseen 2=icon 3=both','pas de thermostat','override css','Alarme ou valeur max de thermostat'],
							
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


});


