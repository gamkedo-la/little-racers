var firstPlaceFilled = false; 
var secondPlaceFilled = false;
var thirdPlaceFilled = false;
var lastPlaceFilled = false;

var soundDelayTimer = 0;
var carPlaces = [];
var newRecord = false;

var cashPrizes = [
		1000,
		750,
		500,
		250,
		200,
		150,
		100,
		75
	];
var placeNames = [ 
	"1st",
	"2nd",
	"3rd",
	"4th",
	"5th",
	"6th",
	"7th",
	"8th"
	]; 

//check to see if position is filled, if not, fill place position with that care, 
//mark position as filled, show car as having a position, and award cash.
function whichPlace(car){	
	car.cash += cashPrizes[carPlaces.length];
	carPlaces.push(car);
	car.finishRace = true;

	if(carPlaces.length == 0 && !firstPlaceFilled){
		andTheWinnerIsSound.play();
		firstPlaceFilled = true;
	}
	
	if(carPlaces.length == 1 && !secondPlaceFilled){
		comingInSecondSound.play();
		secondPlaceFilled = true;
	}
	
	if(carPlaces.length == 2 && !thirdPlaceFilled){
		comingInSecondSound.play();
		thirdPlaceFilled = true;
	}
	
	if(carPlaces.length == 7 && !lastPlaceFilled){
		comingInLastSound.play();
		lastPlaceFilled = true;
	}

	if(car.myName == vehicleList[0].myName){
		console.log("FT:  " + vehicleList[0].finishTime);
		checkForTrackRecord(vehicleList[0].finishTime);
	}
	
	if(carPlaces.length == 8){
		if(!newRecord){
			updateState(STATE_WIN_SCREEN);
		} else {
			updateState(STATE_ENTER_PLAYER_NAME);
		}
	}
}	

//reset race positions
function clearRacePositions(){
	soundDelayTimer = 0;
	firstPlaceFilled = false;
	carPlaces.length = 0;
}

//Announce Race Car Number
function announceRaceCarNumber(delay){
	if(soundDelayTimer == delay){
		carPlaces[0].myAnnc.play();
	}
}

function checkForTrackRecord(finishTime){ //this will require refactoring

	if(levelNow == 0){
		console.log("level 0");
		console.log("FT: " + finishTime);
		console.log("RL: " + recordList[0].firstPlace);
		if(finishTime < recordList[0].firstPlace){
			newRecord = true;
			console.log("NR: " + newRecord);
		}
	} else if (levelNow == 1){
		console.log("level 1");
		if(finishTime < recordList[1].firstPlace){
			newRecord = true;
			console.log("NR: " + newRecord);
		}
	}
}

function convertfinishTime(time){
	var minutes = Math.floor(time/60000);
	var miliSeconds = time - minutes*60000;
	var timeDigits = [0, 0, 0, 0, 0, 0, 0];

	//Fill out the race time array such that the 0 index holds hundredths of seconds,
	//the 1 index holds tenths of seconds, etc...

	//Handle seconds (up to 59:99)
	for(var i=0; i<4; i++){
		timeDigits[i] = getDigit(miliSeconds, i+2); //Add two to i: 1 because we don't need thousandths of a second and 1 because
	}                                                   //getDigit specifies the nth digit from the right starting at 1.

	//Handle minutes (up to 99)
	timeDigits[4] = getDigit(minutes, 1);
	timeDigits[5] = getDigit(minutes, 2);
	
	var finishTimeString = timeDigits[5] + timeDigits [4] + ":" +
						timeDigits[3] + timeDigits[2] + ":" +
						timeDigits[1] + timeDigits[0];
						
	return finishTimeString;
}

var recordList = [];

function createTrackRecords(){
	for(i = 0; i < levelList.length; i++){
		var	tempRecord = new timeRecordClass();
		recordList.push(tempRecord);
	}
}

function timeRecordClass() {

	this.init = function (first, firstPlaceName, second, secondPlaceName, third, thirdPlaceName) {
		this.firstPlace = first;
		this.firstRecordHolderName = firstPlaceName;
		this.secondPlace = second;
		this.secondRecordHolderName = secondPlaceName;
		this.thirdPlace = third;
		this.thirdRecordHolderName = thirdPlaceName;
	}
	
	this.displayRecords = function() {
		var time1 = convertfinishTime(this.firstPlace);
		var time2 = convertfinishTime(this.secondPlace);
		var time3 = convertfinishTime(this.thirdPlace);
		
		colorText("Records", 150, 70, "white", font = "16px Arial Black", ctx = canvasContext);
		colorText("1st: " + this.firstRecordHolderName , 100, 100, "white", font = "10px Arial Black", ctx = canvasContext);
		colorText("Time: " + time1, 200, 100, "white", font = "10px Arial Black", ctx = canvasContext);
		colorText("2nd: " + this.secondRecordHolderName, 100, 120, "white", font = "10px Arial Black", ctx = canvasContext);
		colorText("Time: " + time2, 200, 120, "white", font = "10px Arial Black", ctx = canvasContext);
		colorText("3rd: " + this.thirdRecordHolderName, 100, 140, "white", font = "10px Arial Black", ctx = canvasContext);
		colorText("Time: " + time3, 200, 140, "white", font = "10px Arial Black", ctx = canvasContext);
	}
}

