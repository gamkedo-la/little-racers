var firstPlace;
var secondPlace;
var thirdPlace;
var fourthPlace;
var fifthPlace;
var sixthPlace;
var seventhPlace;
var eigthPlace;
var firstPlaceFilled = false;
var secondPlaceFilled = false;
var thirdPlaceFilled = false;
var fourthPlaceFilled = false;
var fifthPlaceFilled = false;
var sixthPlaceFilled = false;
var seventhPlaceFilled = false;
var eigthPlaceFilled = false;

//check to see if position is filled, if not, fill place position with that care, 
//mark position as filled, show car as having a position, and award cash.
function whichPlace(whichCar, cash, placedPosition){
	console.log("In whichPlace");
	console.log("PP: " + placedPosition);
	console.log("FP: " + firstPlaceFilled);	
	if(!firstPlaceFilled && !placedPosition){
		firstPlace = whichCar;
		firstPlaceFilled = true;
		placedPosition = true;
		cash = cash + 1000;
		console.log("First: " + whichCar + " " + cash);
	} else if(!secondPlaceFilled && !placedPosition){
		secondPlace = whichCar;
		secondPlaceFilled = true;
		placedPosition = true;
		cash = cash + 750;
		console.log("Second: " + whichCar + " " + cash);	
	} else if(!thirdPlaceFilled && !placedPosition){
		thirdPlace = whichCar;
		thirdPlaceFilled = true;
		placedPosition = true;
		cash = cash + 500;
		console.log("Third: " + whichCar + " " + cash);
	} else if(!fourthPlaceFilled && !placedPosition){
		fourthPlace = whichCar;
		fourthPlaceFilled = true;
		placedPosition = true;
		cash = cash + 250;
		console.log("Fourth: " + whichCar + " " + cash);
	} else if(!fifthPlaceFilled && !placedPosition){
		fifthPlace = whichCar;
		fifthPlaceFilled = true;
		placedPosition = true;
		cash = cash + 100;
		console.log("Fifth: " + whichCar + " " + cash);
	} else if(!sixthPlaceFilled && !placedPosition){
		sixthPlace = whichCar;
		sixthPlaceFilled = true;
		placedPosition = true;
		cash = cash + 50;
		console.log("Sixth: " + whichCar + " " + cash);
	} else if(!seventhPlaceFilled && !placedPosition){
		seventhPlace = whichCar;
		seventhPlaceFilled = true;
		placedPosition = true;
		cash = cash + 25;
		console.log("Seventh: " + whichCar + " " + cash);
	} else if(!eigthPlaceFilled && !placedPosition){
		eigthPlace = whichCar;
		eigthPlaceFilled = true;
		placedPosition = true;
		cash = cash + 10;
		console.log("Eighth: " + whichCar + " " + cash);
		nextLevel();
	}
}