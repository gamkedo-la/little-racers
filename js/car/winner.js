var firstPlace;
var secondPlace;
var thirdPlace;
var fourthPlace;
var fifthPlace;
var sixthPlace;
var seventhPlace;
var eigthPlace;
var firstPlaceCarPic;
var secondPlaceCarPic;
var thirdPlaceCarPic;
var fourthPlaceCarPic;
var fifthPlaceCarPic;
var sixthPlaceCarPic;
var seventhPlaceCarPic;
var eigthPlaceCarPic;
var firstPlaceCarCash;
var secondPlaceCarCash;
var thirdPlaceCarCash;
var fourthPlaceCarCash;
var fifthPlaceCarCash;
var sixthPlaceCarCash;
var seventhPlaceCarCash;
var eigthPlaceCarCash;
var firstPlaceFilled = false;
var secondPlaceFilled = false;
var thirdPlaceFilled = false;
var fourthPlaceFilled = false;
var fifthPlaceFilled = false;
var sixthPlaceFilled = false;
var seventhPlaceFilled = false;
var eigthPlaceFilled = false;
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
	console.log("Car:" + car.myName);
	car.cash += cashPrizes[carPlaces.length];
	carPlaces.push(car);
	console.log(carPlaces.length);
	
	
	
	/*if(!firstPlaceFilled && !car.placedPosition){
		console.log("Car:" + car.myName);
		console.log("Pic: " + car.myBitmap);
		firstPlace = car.myName;
		firstPlaceCarPic = car.myBitmap;
		firstPlaceFilled = true;
		car.placedPosition = true;
		car.cash += 1000;
		firstPlaceCarCash = car.cash;
		andTheWinnerIsSound.play();
		console.log("First: " + car.myName + " " + car.cash);
	} else if(!secondPlaceFilled && !car.placedPosition){
		secondPlace = car.myName
		secondPlaceCarPic = car.myBitmap;
		secondPlaceFilled = true;
		car.placedPosition = true;
		car.cash += 750;
		secondPlaceCarCash = car.cash;
		console.log("Second: " + car.myName + " " + car.cash);	
	} else if(!thirdPlaceFilled && !car.placedPosition){
		thirdPlace = car.myName;
		thirdPlaceCarPic = car.myBitmap;
		thirdPlaceFilled = true;
		car.placedPosition = true;
		car.cash += 500;
		thirdPlaceCarCash = car.cash;
		console.log("Third: " + car.myName + " " + car.cash);
	} else if(!fourthPlaceFilled && !car.placedPosition){
		fourthPlace = car.myName;
		fourthPlaceCarPic = car.myBitmap;
		fourthPlaceFilled = true;
		car.placedPosition = true;
		car.cash += 250;
		fourthPlaceCarCash = car.cash;
		console.log("Fourth: " + car.myName + " " + car.cash);
	} else if(!fifthPlaceFilled && !car.placedPosition){
		fifthPlace = car.myName;
		fifthPlaceCarPic = car.myBitmap;
		fifthPlaceFilled = true;
		car.placedPosition = true;
		car.cash += 100;
		fifthPlaceCarCash = car.cash;
		console.log("Fifth: " + car.myName + " " + car.cash);
	} else if(!sixthPlaceFilled && !car.placedPosition){
		sixthPlace = car.myName;
		sixthPlaceCarPic = car.myBitmap;
		sixthPlaceFilled = true;
		car.placedPosition = true;
		car.cash += 50;
		sixthPlaceCarCash = car.cash;
		console.log("Sixth: " + car.myName + " " + car.cash);
	} else if(!seventhPlaceFilled && !car.placedPosition){
		seventhPlace = car.myName;
		seventhPlaceCarPic = car.myBitmap;
		seventhPlaceFilled = true;
		car.placedPosition = true;
		car.cash += 25;
		seventhPlaceCarCash = car.cash;
		console.log("Seventh: " + car.myName + " " + car.cash);
	} else if(!eigthPlaceFilled && !car.placedPosition){
		eigthPlace = car.myName;
		eigthPlaceCarPic = car.myBitmap;
		eigthPlaceFilled = true;
		car.placedPosition = true;
		car.cash += 10;
		eigthPlaceCarCash = car.cash;
		console.log("Eighth: " + car.myName + " " + car.cash);
		nextLevel();
	} */
}

//reset race positions
function clearRacePositions(){
	soundDelayTimer = 0;
	firstPlaceFilled = false;
	secondPlaceFilled = false;
	thirdPlaceFilled = false;
	fourthPlaceFilled = false;
	fifthPlaceFilled = false;
	sixthPlaceFilled = false;
	seventhPlaceFilled = false;
	eigthPlaceFilled = false;
	firstPlace = "empty";
	secondPlace= "empty";
	thirdPlace = "empty";
	fourthPlace = "empty";
	fifthPlace = "empty";
	sixthPlace = "empty";
	seventhPlace = "empty";
	eigthPlace = "empty";
}

//Announce Race Car Number
function announceRaceCarNumber(delay){
	if(soundDelayTimer == delay){
		if(firstPlace == vehicleNames[0]){
			carOneSound.play();
		} else if(firstPlace == vehicleNames[1]){
			carTwoSound.play();
		} else if(firstPlace == vehicleNames[2]){
			carThreeSound.play();
		} else if(firstPlace == vehicleNames[3]){
			carFourSound.play();
		} else if(firstPlace == vehicleNames[4]){
			carFiveSound.play();
		} else if(firstPlace == vehicleNames[5]){
			carSixSound.play();
		} else if(firstPlace == vehicleNames[6]){
			carSevenSound.play();
		} else if(firstPlace == vehicleNames[7]){
			carEightSound.play();
		}
	}
}
