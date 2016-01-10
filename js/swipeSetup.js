// swipe function
var autoRestart;
if (delai == 0){
	autoRestart = false;
}else{
	autoRestart = true;
}	
var mySwipe = {};
mySwipe = Swipe(document.getElementById('slider'),{
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
	  mySwipe.prev();
   } else if(e.keyCode === 39) { // right key
	  mySwipe.next();
   }
});
	
// swipe on mouse wheel	
$(window).bind('mousewheel DOMMouseScroll', function(event){
	if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
		mySwipe.prev();
	}
	else {
		mySwipe.next();
	}
});