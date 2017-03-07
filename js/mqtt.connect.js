// Create a client instance
// mosquitto doit tourner sur la même machine que monitor et domoticz
// dans le cas contraire, indiquer l'ip de la machine a la palce de location.hostname
client = new Paho.MQTT.Client(location.hostname, 9001, '', 'monitor_'+Date.now().toString().match(/\d{5}$/));

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;


// connect the client
function Connect() {
	client.connect({onSuccess:onConnect,onFailure:onSocketError});
}

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
    console.warn("Error MQTT : Connection Lost "+responseObject.errorMessage+" Reconnect will be attempted in 30 seconds.");
	setTimeout(function() {
	  Connect();
	}, 30000);
  }
}

// called when Error in connection establishment
function onSocketError(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.warn("Error MQTT : Connection Failed "+responseObject.errorMessage+" Reconnect will be attempted in 60 seconds.");
	setTimeout(function() {
	  Connect();
	}, 60000);
  }
}

Connect();

