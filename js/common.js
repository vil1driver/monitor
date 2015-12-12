//"use strict";

$(function(){
// load content
	setTimeout(RefreshData, 150);
	setTimeout(GetCams , 1000);
	setTimeout(LoadMeteoWidget , 3000);
	
// reload page every hours
	setTimeout(function () {location.reload();}, 1 * 60 * 60 * 1000);
});

// no text selected
    function ffalse()
        {
            return false;
        }
    function ftrue()
        {
            return true;
        }
    document.onselectstart = "return false";
    if(window.sidebar)
        {
            document.onmousedown = ffalse;
            document.onclick = ftrue;
        }

// no right clic		
    document.oncontextmenu = "return false";

// viewport auto detect aspect ratio and best scale
	var def = 962 - zoom;	//962
	var actual = document.documentElement.clientWidth;
	var scale = Math.ceil((actual/def)*100)/100;
	document.querySelector("meta[name=viewport]").setAttribute('content','width=device-width, initial-scale='+scale+', maximum-scale='+scale+', user-scalable=no');

// swipe function
var autoRestart;
if (delai == 0){
	autoRestart = false;
}else{
	autoRestart = true;
}	

var mySwipe = new Swipe(document.getElementById('slider'),{
    startSlide: 0,
	speed: speed,
    auto: delai,
	direction: direction,
    autoRestart: autoRestart,
    continuous: true,
	draggable: false,
    disableScroll: false,
    stopPropagation: true
});

mySwipe.setup();

// swipe on keypad
	$("body").keydown(function(e) {
	   if(e.keyCode === 37) { // left key
		  window.mySwipe.prev();
	   } else if(e.keyCode === 39) { // right key
		  window.mySwipe.next();
	   }
	});
	
// swipe on mouse wheel	
	$(window).bind('mousewheel DOMMouseScroll', function(event){
    if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
        window.mySwipe.prev();
    }
    else {
        window.mySwipe.next();
    }
	});
	
