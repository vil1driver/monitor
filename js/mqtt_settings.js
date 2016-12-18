/*

Mosquitto va être notre passerelle entre domoticz et la custom page
la cstom page va par la suite être capable de recevoir directement des messages
venant de domoticz et agir en conséquence..



	Prérequis:

installer mosquitto sur la machine faisant tourner domoticz et monitor

			sudo apt-get update
			sudo apt-get install libwebsockets mosquitto mosquitto-clients

créer un fichier de config pour notre usage

			sudo nano /etc/mosquitto/conf.d/monitor.conf

copiez y ceci
 
			listener 1883
			listener 9001
			protocol websockets

relancer mosquitto

			sudo service mosquitto restart
ou
			sudo /etc/init.d/mosquitto restart

ajouter le matériel MQTT à domoticz

			Menu réglages > matériel
			
			Activé: coché
			Nom: choisir un nom
			Type: "MQTT Client Gateway with LAN interface"
			Délai d'attente de données: Disabled
			Adresse distante: localhost (ou l'ip de votre raspberry pi)
			Port: 1883
			Identifian: laisser vide
			Mot de passe: laisser vide
			Publish Topic: out
			CA Filename: laisser vide
			
			AJOUTER
			
dans le menu log de domoticz, ceci vous indiquera que la connection s'effectue bien

			MQTT: Connecting to localhost:1883
			MQTT: connected to: localhost:1883
			MQTT: Subscribed

pour voir ce que domoticz envoie à mosquitto, vous pouvez taper ceci dans un terminal

			mosquitto_sub -t 'domoticz/out'
			
la custom page devrait également être en mesure de réceptionner ces même messages,
activez le mode debug dans frontpage_settings.js

			var debug = true;
			
recharger la custom page et ouvrez la console de dev de chrome (F12),
vous devriez voir ceci s'afficher

			Connecting to MQTT : Success
			
suivit par des messages de de genre (l'interrupteur du plafonnier de ma chambre pour l'exemple)

			MQTT Message Arrived: 
			 {
			   "Battery" : 255,
			   "RSSI" : 12,
			   "dtype" : "Lighting 2",
			   "id" : "06553BA",
			   "idx" : 442,
			   "name" : "la chambre",
			   "nvalue" : 1,
			   "stype" : "AC",
			   "svalue1" : "0",
			   "switchType" : "On/Off",
			   "unit" : 2
			}

si tout est OK, rendez-vous plus bas pour paramètrer les actions qui vont en découlé 
en espérant que les quelques exemples vous aideront à en comprendre le fonctionnement.

*/



// Create a client instance
client = new Paho.MQTT.Client(location.hostname, 9001, '', 'monitor');	// mosquitto doit tourner sur la même machine que monitor et domoticz

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({onSuccess:onConnect});


// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log('%cConnecting to MQTT : Success ', 'color: green');
  client.subscribe("domoticz/out");	// on écoute domoticz
  //message = new Paho.MQTT.Message("Hello");
  //message.destinationName = "domoticz/in";
  //client.send(message);
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {
	console.log('%cMQTT Message Arrived:','color: #c44800','\n',message.payloadString);

	message = JSON.parse(message.payloadString);


////////////////////////////////////////////////////////////////////////////////
//// 							USER SETTINGS								////
////////////////////////////////////////////////////////////////////////////////


	switch(message.name) { // filtre sur le nom du dispositif
			
			// si le nom est "d1", changer de page
			case "d1": 						// nom du bouton de la télécommande
				
				if (message.nvalue == 1)	// status On 
					mySwipe.prev(); 		// page précédente
					
				if (message.nvalue == 0)	// status Off
					mySwipe.next(); 		// page suivante
					
				break;
				
			
			case "Cafetiere on": // nom du bouton pushOn de mise en route de la cafetière

					mySwipe.slide(1);	// passe à la page 2
					
					// annonce la mise en route
					var oAudio = document.getElementById('myaudio');
					oAudio.src = "sounds/cofee.mp3";
					oAudio.play();
					
					// affiche une popup text
					lightbox_open('switch',25000,'café en préparation');	
					
				break;	
				
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
					//oAudio.src = "sounds/poubellejaune.mp3";
					oAudio.play();
					
				}	
				
				if (message.nvalue == 0){	// status Off
				
					oAudio.pause();	// stop
					oAudio.src = "";
					//oAudio.src = "sounds/poubellegrise.mp3";
					//oAudio.play();
					
				}	
				
				break;
				
				
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
				
			
			// annonce vocale suivant le contenu d'un dummy text
			case "tts": // nom du widget text
			
								
				var text = message.svalue1;
				var oAudio = document.getElementById('myaudio');
				oAudio.src = "http://www.voxygen.fr/sites/all/modules/voxygen_voices/assets/proxy/index.php?method=redirect&text="+text+"&voice=Fabienne";
				oAudio.play();
				
				break;
				
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


