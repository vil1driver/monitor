// Create a client instance
// mosquitto doit tourner sur la même machine que monitor et domoticz
// dans le cas contraire, indiquer l'ip de la machine a la palce de location.hostname
client = new Paho.MQTT.Client(location.hostname, 9001, '', 'monitor_'+Date.now());

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

