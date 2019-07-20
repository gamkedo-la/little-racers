var audioFormat;
var isMuted = false;
var soundSetforMeetings = true; //make false to hear at normal level

//sounds
var crashIntoConeSound = new SoundOverlapsClass("crashCone");
var engineSound = new SoundOverlapsClass("engine");
var andTheWinnerIsSound = new SoundOverlapsClass("andTheWinnerIs_01");
var carOneSound = new SoundOverlapsClass("annc_puggington_01"); //Green
var carTwoSound = new SoundOverlapsClass("annc_mcfirepants_01"); //Yellow
var carThreeSound = new SoundOverlapsClass("annc_sunbeamtiger_01"); //Orange
var carFourSound = new SoundOverlapsClass("annc_luminousthunder_01"); //Purple
var carFiveSound = new SoundOverlapsClass("annc_maxmad_01"); //Red
var carSixSound = new SoundOverlapsClass("annc_chrisdelorean_01"); //Blue
var carSevenSound = new SoundOverlapsClass("annc_spectre_01"); //Light Gray
var carEightSound = new SoundOverlapsClass("annc_jsmach_01"); //Dark Gray
var attentionDriversSound = new SoundOverlapsClass("attentiondrivers_01");
var startYourEnginesSound = new SoundOverlapsClass("startyourengines_01");
var readySetGoSound = new SoundOverlapsClass("readysetgo_01");
var finallapSound =  new SoundOverlapsClass("finallap_01");
var exhilaratingSound = new SoundOverlapsClass("exhilarating_01");
var puppyGoSound = new SoundOverlapsClass("annc_puppygo_01"); //easter egg if puggington wins
var alanZBackgroundMusic = new BackgroundMusicClass();

function setFormat() {
    var audio = new Audio();
    if (audio.canPlayType("audio/mp3")) {
		audioFormat = ".mp3";
    } else {
		audioFormat = ".ogg";
    }
}

function SoundOverlapsClass(filenameWithPath) {
    setFormat();
    var altSoundTurn = false;
    var mainSound = new Audio("sound/" + filenameWithPath + audioFormat);
    var altSound = new Audio("sound/" + filenameWithPath + audioFormat);
    
    this.play = function() {
    	if (isMuted) {
    		console.log ("sound muted");
    		return;
    	}
		if (altSoundTurn) {
			altSound.currentTime = 0;
			if(soundSetforMeetings){
				altSound.volume = 0.05;  //quieter for screen sharing during meetings
			}
			altSound.play();
		} else {
			mainSound.currentTime = 0;
			if(soundSetforMeetings){
				mainSound.volume = 0.05; //quieter for screen sharing during meetings
			}
			mainSound.play();
		}
		altSoundTurn = !altSoundTurn;
    }
}  

function BackgroundMusicClass() {
    var musicSound = null;
    this.loopSong = function(filenameWithPath) {
		setFormat();

		if (musicSound != null) {
			musicSound.pause();
			musicSound = null;
		}
		musicSound = new Audio("sound/music/" + filenameWithPath + audioFormat);
		if(soundSetforMeetings){
			musicSound.volume = 0.04; //quieter for screen sharing during meetings
		}
		musicSound.loop = true;
		musicSound.play();
    }

    this.startOrStopMusic = function() {
		if (isMuted == false) {
			musicSound.play();
		} else {
			musicSound.pause();
		}
    }
}
