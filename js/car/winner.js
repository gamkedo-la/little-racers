var firstPlaceFilled = false; //keep

var soundDelayTimer = 0;
var carPlaces = [];

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
	if(carPlaces.length == 1 && !firstPlaceFilled){
		andTheWinnerIsSound.play();
		firstPlaceFilled = true;
	}

	
	/*if(!firstPlaceFilled && !car.placedPosition){
		firstPlaceFilled = true;									
		car.placedPosition = true;
	*/
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
