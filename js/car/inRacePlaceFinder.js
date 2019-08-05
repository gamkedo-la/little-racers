var inRaceFirst;
var inRaceSecond;
var inRaceThird;
var inRaceFourth;
var inRaceFifth;
var inRaceSixth;
var inRaceSeventh;
var inRaceEight;

function checkForInRacePosition(){
	for(i = 0, i < vehicleList.length, i++){
		if(vehicleList[0].distance >= vehicleList[i + 1]){
			vehicleList[0].inRacePosition++;
		}
		console.log("Position: " + vehicleList[0].inRacePosition);
		console.log("Place: " + vehicleList[0].distance;
	}
	
	


	
}