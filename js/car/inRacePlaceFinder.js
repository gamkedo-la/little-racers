var inRaceFirst;
var inRaceSecond;
var inRaceThird;
var inRaceFourth;
var inRaceFifth;
var inRaceSixth;
var inRaceSeventh;
var inRaceEigth;
var inRaceFirstFilled = false;
var inRaceSecondFilled = false;
var inRaceThirdFilled = false;
var inRaceFourthFilled = false;
var inRaceFifthFilled = false;
var inRaceSixthFilled = false;
var inRaceSeventhFilled = false;
var inRaceEightFilled = false;

function checkForInRacePosition(){
	// console.log("Position: " + vehicleList[0].inRacePosition);
	// console.log("Distance: " + vehicleList[0].raceDistance);
	
	for(i = 0; i < vehicleList.length; i++){						
		for (ii = i + 1; ii < vehicleList.length; ii++){			//nested loop to loop through all vehicles
			if(vehicleList[i].raceDistance > vehicleList[ii].raceDistance){
				vehicleList[i].inRacePosition--;  //if car under test is further, reduce it's position
				checkForInRacePositionFilled(vehicleList[i]);
			} else {
				vehicleList[i].inRacePosition++;  //if car under test is NOT further, raise it's position
			}
			if(vehicleList[i].inRacePosition < 0){  //don't allow car's position under 0.
				vehicleList[i].inRacePosition = 0;
			}
			if(vehicleList[i].inRacePosition > 8){  //don't allow car's position greater than 8.
				vehicleList[i].inRacePosition = 8;
			}
		}
	}
}

function checkForInRacePositionFilled(whichVehicle){
	
}