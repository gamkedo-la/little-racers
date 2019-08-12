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
	
	//placed positions
	colorText("1st: " + firstPlace, placePositionX, placePositionY, 'white', font = "18px Arial Black");
	//canvasContext.drawImage(firstPlaceCarPic, (placePositionX + 150), placePositionY);
	colorText("Cash: $" + firstPlaceCarCash, placePositionX + 500, placePositionY, 'white', font = "18px Arial Black");
	
	colorText("2nd: " + secondPlace, placePositionX, (placePositionY + increasePlacePositionY), 'white', font = "18px Arial Black");
	//canvasContext.drawImage(secondPlaceCarPic, (placePositionX + 150), (placePositionY + increasePlacePositionY);
	colorText("Cash: $" + secondPlaceCarCash, placePositionX + 500, (placePositionY + increasePlacePositionY), 'white', font = "18px Arial Black");
	
	colorText("3rd: " + thirdPlace, placePositionX, (placePositionY + increasePlacePositionY * 2), 'white', font = "18px Arial Black");
	//canvasContext.drawImage(thirdPlaceCarPic, (placePositionX + 150), (placePositionY + increasePlacePositionY * 2));
	colorText("Cash: $" + thirdPlaceCarCash, placePositionX + 500, (placePositionY + increasePlacePositionY * 2), 'white', font = "18px Arial Black");
	
	colorText("4th: " + fourthPlace, placePositionX, (placePositionY + increasePlacePositionY * 3), 'white', font = "18px Arial Black");
	//canvasContext.drawImage(fourthPlaceCarPic, (placePositionX + 150), (placePositionY + increasePlacePositionY * 3);
	colorText("Cash: $" + fourthPlaceCarCash, placePositionX + 500, (placePositionY + increasePlacePositionY * 3), 'white', font = "18px Arial Black");
	
	colorText("5th: " + fifthPlace, placePositionX, (placePositionY + increasePlacePositionY * 4), 'white', font = "18px Arial Black");
	//canvasContext.drawImage(fifthPlaceCarPic, (placePositionX + 150), (placePositionY + increasePlacePositionY * 4);
	colorText("Cash: $" + fifthPlaceCarCash, placePositionX + 500, (placePositionY + increasePlacePositionY * 4), 'white', font = "18px Arial Black");
	
	colorText("6th: " + sixthPlace, placePositionX, (placePositionY + increasePlacePositionY * 5), 'white', font = "18px Arial Black");
	//canvasContext.drawImage(sixthPlaceCarPic, (placePositionX + 150), (placePositionY + increasePlacePositionY * 5);
	colorText("Cash: $" + sixthPlaceCarCash, placePositionX + 500, (placePositionY + increasePlacePositionY * 5), 'white', font = "18px Arial Black");
	
	colorText("7th: " + seventhPlace, placePositionX, (placePositionY + increasePlacePositionY * 6), 'white', font = "18px Arial Black");
	//canvasContext.drawImage(seventhPlaceCarPic, (placePositionX + 150), (placePositionY + increasePlacePositionY * 6);
	colorText("Cash: $" + seventhPlaceCarCash, placePositionX + 500, (placePositionY + increasePlacePositionY * 6), 'white', font = "18px Arial Black");
	
	colorText("8th: " + eigthPlace, placePositionX, (placePositionY + increasePlacePositionY * 7), 'white', font = "18px Arial Black");
	//canvasContext.drawImage(eigthPlaceCarPic, (placePositionX + 150), (placePositionY + increasePlacePositionY * 7);
	colorText("Cash: $" + eigthPlaceCarCash, placePositionX + 500, (placePositionY + increasePlacePositionY * 7), 'white', font = "18px Arial Black");
	
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