var firstPlace;
var secondPlace;
var thirdPlace;
var fourthPlace;
var fifthPlace;
var sixthPlace;
var seventhPlace;
var eigthPlace;
var firstPlaceCarPic = vehicleList[0].myBitmap;
var secondPlaceCarPic;
var thirdPlaceCarPic;
var fourthPlaceCarPic;
var fifthPlaceCarPic;
var sixthPlaceCarPic;
var seventhPlaceCarPic;
var eigthPlaceCarPic;
var firstPlaceFilled = false;
var secondPlaceFilled = false;
var thirdPlaceFilled = false;
var fourthPlaceFilled = false;
var fifthPlaceFilled = false;
var sixthPlaceFilled = false;
var seventhPlaceFilled = false;
var eigthPlaceFilled = false;
var soundDelayTimer = 0;

//check to see if position is filled, if not, fill place position with that care, 
//mark position as filled, show car as having a position, and award cash.
function whichPlace(car){	
	if(!firstPlaceFilled && !car.placedPosition){
		firstPlace = car.myName;
		firstPlaceCarPic = vehicleList[0].myBitmap;
		firstPlaceFilled = true;
		car.placedPosition = true;
		car.cash += 1000;
		andTheWinnerIsSound.play();
		console.log("First: " + car.myName + " " + car.cash);
	} else if(!secondPlaceFilled && !car.placedPosition){
		secondPlace = car.myName
		secondPlaceCarPic = car.myCarPic;
		secondPlaceFilled = true;
		car.placedPosition = true;
		car.cash += 750;
		console.log("Second: " + car.myName + " " + car.cash);	
	} else if(!thirdPlaceFilled && !car.placedPosition){
		thirdPlace = car.myName;
		thirdPlaceCarPic = car.myCarPic;
		thirdPlaceFilled = true;
		car.placedPosition = true;
		car.cash += 500;
		console.log("Third: " + car.myName + " " + car.cash);
	} else if(!fourthPlaceFilled && !car.placedPosition){
		fourthPlace = car.myName;
		fourthPlaceCarPic = car.myCarPic;
		fourthPlaceFilled = true;
		car.placedPosition = true;
		car.cash += 250;
		console.log("Fourth: " + car.myName + " " + car.cash);
	} else if(!fifthPlaceFilled && !car.placedPosition){
		fifthPlace = car.myName;
		fifthPlaceCarPic = car.myCarPic;
		fifthPlaceFilled = true;
		car.placedPosition = true;
		car.cash += 100;
		console.log("Fifth: " + car.myName + " " + car.cash);
	} else if(!sixthPlaceFilled && !car.placedPosition){
		sixthPlace = car.myName;
		sixthPlaceCarPic = car.myCarPic;
		sixthPlaceFilled = true;
		car.placedPosition = true;
		car.cash += 50;
		console.log("Sixth: " + car.myName + " " + car.cash);
	} else if(!seventhPlaceFilled && !car.placedPosition){
		seventhPlace = car.myName;
		seventhPlaceCarPic = car.myCarPic;
		seventhPlaceFilled = true;
		car.placedPosition = true;
		car.cash += 25;
		console.log("Seventh: " + car.myName + " " + car.cash);
	} else if(!eigthPlaceFilled && !car.placedPosition){
		eigthPlace = car.myName;
		eigthPlaceCarPic = car.myCarPic;
		eigthPlaceFilled = true;
		car.placedPosition = true;
		car.cash += 10;
		console.log("Eighth: " + car.myName + " " + car.cash);
		nextLevel();
	}
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
