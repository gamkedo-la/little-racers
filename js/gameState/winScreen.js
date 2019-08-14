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
	for(var i = 0; i < carPlaces.length; i++){
		colorText((placeNames[i])+": " + carPlaces[i].myName, placePositionX, (placePositionY + increasePlacePositionY * i), 'white', font = "18px Arial Black");
		canvasContext.drawImage(carPlaces[i].myBitmap, (placePositionX + 225), (placePositionY + increasePlacePositionY * i)-40);
		colorText("Cash: $" + carPlaces[i].cash, placePositionX + 500, (placePositionY + increasePlacePositionY * i), 'white', font = "18px Arial Black");
	}
	//trophy
	colorText(firstPlace, 350, 190, 'black', font = "16px Arial Black"); // should center text
}

//function winScreenTimer(){
//	if(winScreenTime == 0) {
//		winScreenTime = Date.now();
//	} 

//	if(Date.now() - winScreenTime >= SHOW_WINSCREEN_TIME) {
//		winScreenTime = 0;
//		winScreen = false;
//		carUpgradeScreen = true;
//		clearRacePositions();
//		tireTracks.clear();
//	}	
//}

canvas.addEventListener('mousedown', winScreenMouseClick);

function winScreenMouseClick(evt) {
	if(winScreen) {
			//need a function to determine track records
			const stateObj = {
			titleScreen:false,
			levelEditor:false,
			winScreen:false,
			carUpgradeScreen:true,
			enterPlayerName:false
		}
		updateState(stateObj);
		clearRacePositions();
		tireTracks.clear();
	}
}	