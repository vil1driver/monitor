$(function(){


    var pressTimer;
    var already_press;

    //numéro du player à controler, 1 si vous n'en avez qu'un
    var numero_du_player = 1;

    //mettre son code de télécommande
    //var code_telecommande = localStorage.getItem("code_telecommande") || null;
    var code_telecommande = 1684984135;

    if(code_telecommande === null){
        do{
            code_telecommande = prompt("Merci de rentrer votre code télécommande freebox .");
            localStorage.setItem("code_telecommande", code_telecommande);            
        }
        while(!parseInt(code_telecommande));
        
    }

    $("body").on("keydown",function(event){
        $('[data-keycode='+event.which+']').trigger("mouseup");
    })


    var maFreebox = new Freebox(numero_du_player, code_telecommande);


    $("[data-navigation]").on("mouseup touchend", function(){
        clearTimeout(pressTimer)
        if(already_press) return false;

        select_press = $(this).data("navigation");
        maFreebox.press(select_press, false);
        
        return false;
    }).on("mousedown touchstart", function(){
        var parent = this;
        already_press = false;

        pressTimer = window.
        setTimeout(function() {
                short_press = $(parent).data("navigation");
                lg_press = $(parent).data("lg-press");
                already_press = true;

                select_press = lg_press || short_press;
                console.log("long press : "+select_press);
                maFreebox.press(select_press, true);
            },1000);

        return false; 
    });
})

var FreeboxTVKeys = {
    RED : "red", // Bouton rouge
    GREEN : "green", // Bouton vert
    BLUE : "blue", // Bouton bleu
    YELLOW : "yellow", // Bouton jaune


    POWER : "power", // Bouton Power
    LIST : "list", // liste of channel
    TV : "tv", // Bouton tv

    NUM_0 : "0", // Bouton 0
    NUM_1 : "1", // Bouton 1
    NUM_2 : "2", // Bouton 2
    NUM_3 : "3", // Bouton 3
    NUM_4 : "4", // Bouton 4
    NUM_5 : "5", // Bouton 5
    NUM_6 : "6", // Bouton 6
    NUM_7 : "7", // Bouton 7
    NUM_8 : "8", // Bouton 8
    NUM_9 : "9", // Bouton 9

    BACK : "back", // Bouton jaune (retour)
    SWAP : "swap", // Bouton swap

    INFO : "info", // Bouton info
    EPG : "epg", // Bouton epg (fct+)
    MAIL : "mail", // Bouton mail
    MEDIA : "media", // Bouton media (fct+)
    HELP : "help", // Bouton help
    OPTIONS : "options", // Bouton options (fct+)
    PIP : "pip", // Bouton pip

    VOL_INC : "vol_inc", // Bouton volume +
    VOL_DEC : "vol_dec", // Bouton volume -

    OK : "ok", // Bouton ok
    UP : "up", // Bouton haut
    RIGHT : "right", // Bouton droite
    DOWN : "down", // Bouton bas
    LEFT : "left", // Bouton gauche

    PRGM_INC : "prgm_inc", //Bouton programme +
    PRGM_DEC : "prgm_dec", // Bouton programme -

    MUTE : "mute", // Bouton sourdine
    HOME : "home", // Bouton Free
    REC : "rec", // Bouton Rec

    BWD : "bwd", // Bouton << retour arrière
    PREV : "prev", // Bouton |<< précédent
    PLAY : "play", // Bouton Lecture / Pause
    FWD : "fwd", // Bouton >> avance rapide
    NEXT : "next" // Bouton >>| suivant
};

function isInt(n){
        return Number(n)===n && n%1===0;
}

function Freebox(id_player, code_telecommande){

    this.press = function(key, long_press, repeat){
        long_press = long_press || false;
        long_press = (long_press)? "true" : "false";

        repeat = repeat || 1;

        var url = "http://hd"+this.id_player+".freebox.fr/pub/remote_control?code="+this.code_telecommande+"&key="+key+"&long="+long_press+"&repeat="+repeat; 

        if(repeat > 1)
            this.repeat(url, repeat);
        else
            this.sendToFreebox(url);

    }

    this.repeat = function(url, nb){
        nb = nb-1;

        console.log("repeat");

        if(nb>0)
            setTimeout(this.repeat, 500, url, nb);

        this.sendToFreebox(url);
    }

    this.sendToFreebox = function(url){
        xhr = $.ajax({
            method: "GET",
            url: url,
            crossDomain: true,
            statusCode: {
                500: function() {
                    alert("Une erreur s'est produite !");
                    }
            }
        });
    }

    this.setHDplayer = function(id_player){
        this.id_player = id_player;
    }

    this.setTelecommandCode = function(code_telecommande){
        this.code_telecommande = code_telecommande;
    }

    this.setChannel = function(number){

    }
   
    this.id_player = id_player;
    this.code_telecommande = code_telecommande;

    console.log(this);


}