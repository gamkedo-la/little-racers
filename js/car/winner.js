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
function whichPlace(car){	
	if(!firstPlaceFilled && !this.placedPosition){
		firstPlace = this.myName;
		firstPlaceFilled = true;
		this.placedPosition = true;
		this.cash += 1000;
		console.log("First: " + this.myName + " " + this.cash);
	} else if(!secondPlaceFilled && !this.placedPosition){
		secondPlace = this.myName;
		secondPlaceFilled = true;
		this.placedPosition = true;
		this.cash += 750;
		console.log("Second: " + this.myName + " " + this.cash);	
	} else if(!thirdPlaceFilled && !this.placedPosition){
		thirdPlace = this.myName;
		thirdPlaceFilled = true;
		this.placedPosition = true;
		this.cash += 500;
		console.log("Third: " + this.myName + " " + this.cash);
	} else if(!fourthPlaceFilled && !this.placedPosition){
		fourthPlace = this.myName;
		fourthPlaceFilled = true;
		this.placedPosition = true;
		this.cash += 250;
		console.log("Fourth: " + this.myName + " " + this.cash);
	} else if(!fifthPlaceFilled && !this.placedPosition){
		fifthPlace = this.myName;
		fifthPlaceFilled = true;
		this.placedPosition = true;
		this.cash += 100;
		console.log("Fifth: " + this.myName + " " + this.cash);
	} else if(!sixthPlaceFilled && !this.placedPosition){
		sixthPlace = this.myName;
		sixthPlaceFilled = true;
		this.placedPosition = true;
		this.cash += 50;
		console.log("Sixth: " + this.myName + " " + this.cash);
	} else if(!seventhPlaceFilled && !this.placedPosition){
		seventhPlace = this.myName;
		seventhPlaceFilled = true;
		this.placedPosition = true;
		this.cash += 25;
		console.log("Seventh: " + this.myName + " " + this.cash);
	} else if(!eigthPlaceFilled && !this.placedPosition){
		eigthPlace = this.myName;
		eigthPlaceFilled = true;
		this.placedPosition = true;
		this.cash += 10;
		console.log("Eighth: " + this.myName + " " + this.cash);
		nextLevel();
	}
}