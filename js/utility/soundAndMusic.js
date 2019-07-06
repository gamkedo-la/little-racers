var audioFormat;
var isMuted = false;
var soundSetforMeetings = true; //make false to hear at normal level

//sounds
var crashIntoConeSound = new SoundOverlapsClass("crashCone");
var engineSound = new SoundOverlapsClass("engine");
var andTheWinnerIsSound = new SoundOverlapsClass("andTheWinnerIs_01");
var carOneSound = new SoundOverlapsClass("carnumber_one_01");
var carTwoSound = new SoundOverlapsClass("carnumber_two_01");
var carThreeSound = new SoundOverlapsClass("carnumber_three_01");
var carFourSound = new SoundOverlapsClass("carnumber_four_01");
var carFiveSound = new SoundOverlapsClass("carnumber_five_01");
var carSixSound = new SoundOverlapsClass("carnumber_six_01");
var carSevenSound = new SoundOverlapsClass("carnumber_seven_01");
var carEightSound = new SoundOverlapsClass("carnumber_eight_01");
var attentionDriversSound = new SoundOverlapsClass("attentiondrivers_01");
var startYourEnginesSound = new SoundOverlapsClass("startyourengines_01");
var readySetGoSound = new SoundOverlapsClass("readysetgo_01");
var finallapSound =  new SoundOverlapsClass("finallap_01");
var exhilaratingSound = new SoundOverlapsClass("exhilarating_01");
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
		musicSound.volume = 0.04; //quiter for screen sharing during meetings
		musicSound.loop = true;
		musicSound.play();
    }

    this.startOrStopMusic = function() {
		if (musicSound.paused) {
			musicSound.play();
		} else {
			musicSound.pause();
		}
    }
}
