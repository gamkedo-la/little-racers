var winScreenTime = 0;
const SHOW_WINSCREEN_TIME = 3500;//time to show the win screen in milliseconds

function drawWinScreen(canvas, canvasContext){
	//placed position
	var placePositionX = 80;
	var placePositionY = 255;
	var increasePlacePositionY = 43;
	//car information
	var carColumnOneX = 325;
	var carColumnTwoX = 555;
	var carRowOneY = 25;
	
	colorRect(0,0,canvas.width * scaleWidth, canvas.height * scaleHeight, 'white');
	canvasContext.drawImage(resultScreenPic, 0, 0);
	var finishTimeDigits = [0,0,0,0,0,0];
	var finishTimeDisplay = [	finishTimeDigits[5], finishTimeDigits[4],
								finishTimeDigits[3], finishTimeDigits[2], 
								finishTimeDigits[1], finishTimeDigits[0]	];
								
	
						
	function getFinishTimeDigits(carPlaces){
		var minutes = Math.floor(carPlaces/60000);
		var miliSeconds = carPlaces - minutes*60000;
	
		//Fill out the race time array such that the 0 index holds hundredths of seconds,
		//the 1 index holds tenths of seconds, etc...

		//Handle seconds (up to 59:99)
		for(var i=0; i<4; i++){
			finishTimeDigits[i] = getDigit(miliSeconds, i+2); //Add two to i: 1 because we don't need thousandths of a second and 1 because
		}                                                   //getDigit specifies the nth digit from the right starting at 1.

		//Handle minutes (up to 99)
		finishTimeDigits[4] = getDigit(minutes, 1);
		finishTimeDigits[5] = getDigit(minutes, 2);
		
		var finishTimeString = finishTimeDigits[5] + finishTimeDigits [4] + ":" +
							finishTimeDigits[3] + finishTimeDigits[2] + ":" +
							finishTimeDigits[1] + finishTimeDigits[0];
							
		return finishTimeString;
	}
						
	for(var i = 0; i < carPlaces.length; i++){
		var miliseconds = Math.floor(carPlaces[i].finishTime / 100) 
		var seconds = Math.floor(carPlaces[i].finishTime / 1000)
		var minutes = Math.floor(carPlaces[i].finishTime)
		
		colorText((placeNames[i])+": " + carPlaces[i].myName, placePositionX, (placePositionY + increasePlacePositionY * i), 'white', font = "18px Arial Black");
		canvasContext.drawImage(carPlaces[i].myBitmap, (placePositionX + 225), (placePositionY + increasePlacePositionY * i)-40);
		colorText("Cash: $" + carPlaces[i].cash, placePositionX + 500, (placePositionY + increasePlacePositionY * i), 'white', font = "18px Arial Black");
		colorText("Time: " + getFinishTimeDigits(carPlaces[i].finishTime), placePositionX + 325, (placePositionY + increasePlacePositionY * i), 'white', font = "18px Arial Black");
		if(levelNow == 0){
			track_01.displayRecords();
		} else if (levelNow == 1){
			track_02.displayRecords();
		}
	
	}
	//trophy
	colorText(carPlaces[0].myName, 350, 188, 'black', font = "10px Arial Black"); // should center text
}

function winScreenMouseClick() {

	const stateObj = {
		titleScreen:false,
		levelEditor:false,
		winScreen:false,
		carUpgradeScreen:true,
		enterPlayerName:false
	};
	nextLevel();
	updateState(stateObj);
	clearRacePositions();
	tireTracks.clear();
}	