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

function whichPlace(whichCar, cash){
	console.log("In whichPlace");
	if(!firstPlaceFilled){
		firstPlace = whichCar;
		firstPlaceFilled = true;
		cash = cash + 1000;
		console.log("First: " + whichCar + " " + cash);
	} else if(!secondPlaceFilled){
		secondPlace = whichCar;
		secondPlaceFilled = true;
		cash = cash + 750;
		console.log("Second: " + whichCar + " " + cash);
	} else if(!thirdPlaceFilled){
		thirdPlace = whichCar;
		thirdPlaceFilled = true;
		cash = cash + 500;
		console.log("Third: " + whichCar + " " + cash);
	} else if(!fourthPlaceFilled){
		fourthPlace = whichCar;
		fourthPlaceFilled = true;
		cash = cash + 250;
		console.log("Fourth: " + whichCar + " " + cash);
	} else if(!fifthPlaceFilled){
		fifthPlace = whichCar;
		fifthPlaceFilled = true;
		cash = cash + 100;
		console.log("Fifth: " + whichCar + " " + cash);
	} else if(!sixthPlaceFilled){
		sixthPlace = whichCar;
		sixthPlaceFilled = true;
		cash = cash + 50;
		console.log("Sixth: " + whichCar + " " + cash);
	} else if(!seventhPlaceFilled){
		seventhPlace = whichCar;
		seventhPlaceFilled = true;
		cash = cash + 25;
		console.log("Seventh: " + whichCar + " " + cash);
	} else if(!eigthPlaceFilled){
		eigthPlace = whichCar;
		eigthPlaceFilled = true;
		cash = cash + 10;
		console.log("Eighth: " + whichCar + " " + cash);
		nextLevel();
	}
}