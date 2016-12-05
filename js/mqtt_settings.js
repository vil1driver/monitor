/*

Prérequis:

installer mosquitto sur la machine faisant tourner domoticz et monitor

			sudo apt-get update
			sudo apt-get install mosquitto

créer un fichier de configue pour notre usage

			sudo nano /etc/mosquitto/conf.d/monitor.conf

y copier ceci
 
			# =================================================================
			# Default listener
			# =================================================================
			# IP address/hostname to bind the default listener to. If not
			# given, the default listener will not be bound to a specific
			# address and so will be accessible to all network interfaces.
			# bind_address ip-address/host name
			#bind_address
			# Port to use for the default listener.
			port 1883
			listener 9001
			protocol websockets

relancer mosquitto

			sudo /etc/init.d/mosquitto restart

ajouter le matériel MQTT à domoticz

			https://www.domoticz.com/wiki/MQTT#Add_hardware_.22MQTT_Client_Gateway.22


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
  console.log("MQTT Connecté");
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
	console.log("onMessageArrived:"+message.payloadString);

	message = JSON.parse(message.payloadString);

/*
	
	suivant le wiki : https://www.domoticz.com/wiki/MQTT#Domoticz_to_MQTT
	
	Nous recevons des messages de ce genre :
	
		{
		 "idx" : 5,
		 "name" : "Internal Temperature",
		 "id" : "00080A",
		 "unit" : 1 
		 "dtype" : "Temp",
		 "stype" : "TFA 30.3133",
		 "nvalue" : 0,
		 "svalue1" : "41.2",
		 "Battery" : 100,
		 "RSSI" : 12,
		}
		
*/	

	switch(message.name) { // filtre sur le nom du dispositif
			
			// changer de page
			case "d1": // nom du bouton de la télécommande
				
				if (message.nvalue == 1)	// status On 
					mySwipe.prev(); // page précédente
				if (message.nvalue == 0)	// status Off
					mySwipe.next(); // page suivante
					// mySwipe.slide(1);	// vers page 2 (la première page est numéroté 0)
					
				break;
				
				
			//lire une musique
			case "d2":
			
				// à fin de pouvoir lancer de l'audio automatiquement
				// il est nécessaire de désactiver une sécurité
				// saisissez l'adresse suivante dans chrome et désactivez l'option suivante
				// "Exiger un geste de l'utilisateur pour lire des éléments multimédias"
				// chrome://flags/#disable-gesture-requirement-for-media-playback
				
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
				
				
			// afficher la caméra en grand
			case "d3":
				
				if (message.nvalue == 1){	// status On 
					$('#popup_camera').html('<img src="http://www.saintveranmeteo.eu/villagesaintveranwebcam.jpg" >');	// charge le flux dans la popup caméra
					lightbox_open('camera', 25400);	// afficher la popup
				}	
				if (message.nvalue == 0)	// status Off
					lightbox_close('camera');	// fermer la popup
					
				break;	
				
			
			case "d4":
				
				break;
	} 
  
  
}


