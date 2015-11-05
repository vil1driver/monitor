window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;   //compatibility for firefox and chrome
var pc = new RTCPeerConnection({iceServers:[]}), noop = function(){};      
pc.createDataChannel("");    //create a bogus data channel
pc.createOffer(pc.setLocalDescription.bind(pc), noop);    // create offer and set local description
pc.onicecandidate = function(ice){  //listen for candidate events
	if(!ice || !ice.candidate || !ice.candidate.candidate)  return;
	var myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];
	if ( myIP.substring(0, 3) == $.domoticzLanUrl.substring(7, 10) ) {
		console.log('acces local, IP is '+myIP);
		$.domoticzurl = $.domoticzLanUrl;
	}else{
		console.log('acces distant');
		$.domoticzurl = $.domoticzWanUrl;
	}	
	pc.onicecandidate = noop;
};

