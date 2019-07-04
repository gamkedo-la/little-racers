var winScreenTime = 0;

function drawWinScreen(){
	//placed position
	var placePositionX = 80;
	var placePositionY = 295;
	var increasePlacePositionY = 35;
	//car information
	var carColumnOneX = 325;
	var carColumnTwoX = 555;
	var carRowOneY = 25;
	
	colorRect(0,0,canvas.width * scaleWidth, canvas.height * scaleHeight, 'white');
	canvasContext.drawImage(resultScreenPic, 0, 0);
	//placed positions
	colorText("1st: " + firstPlace, placePositionX, placePositionY, 'black', font = "20px Arial Black");
	colorText("2nd: " + secondPlace, placePositionX, (placePositionY + increasePlacePositionY), 128, 'black', font = "20px Arial Black");
	colorText("3rd: " + thirdPlace, placePositionX, (placePositionY + increasePlacePositionY * 2), 'black', font = "20px Arial Black");
	colorText("4th: " + fourthPlace, placePositionX, (placePositionY + increasePlacePositionY * 3), 'black', font = "20x Arial Black");
	colorText("5th: " + fifthPlace, placePositionX, (placePositionY + increasePlacePositionY * 4), 'black', font = "20px Arial Black");
	colorText("6th: " + sixthPlace, placePositionX, (placePositionY + increasePlacePositionY * 5), 'black', font = "20px Arial Black");
	colorText("7th: " + seventhPlace, placePositionX, (placePositionY + increasePlacePositionY * 6), 'black', font = "20px Arial Black");
	colorText("8th: " + eigthPlace, placePositionX, (placePositionY + increasePlacePositionY * 7), 'black', font = "20x Arial Black");
	//trophy
	canvasContext.drawImage(firstPlaceTrophyPic, 80, 50);
	colorText("First Place", 140, 192, 'black', font = "8px Arial Black");
	colorText(firstPlace, 140, 202, 'black', font = "8px Arial Black");
	
	//car information
	for(var i = 0; i < 4; i++){
		//row 1
		colorText(vehicleList[i].myName, carColumnOneX, carRowOneY + (150 * i), 'black', font = "20px Arial Black");
		colorText("Transmission: " + vehicleList[i].transmissionVersion, carColumnOneX + 12, carRowOneY + (150 * i) + 24, 'black', font = "10px Arial Black");
		colorText("Tires: " + vehicleList[i].tireVersion, carColumnOneX + 12, carRowOneY + (150 * i) + 36, 'black', font = "10px Arial Black");
		colorText("Nitro: " + vehicleList[i].nitroVersion, carColumnOneX + 12, carRowOneY + (150 * i) + 48, 'black', font = "10px Arial Black");
		colorText("Exhaust: " + vehicleList[i].exhaustVersion, carColumnOneX + 12, carRowOneY + (150 * i) + 60,  'black', font = "10px Arial Black");
		colorText("Cash: $" + vehicleList[i].cash, carColumnOneX + 130, carRowOneY + (150 * i) + 110,  'green', font = "10px Arial Black");
		drawBitmapCenteredAtLocationWithRotation(vehicleList[i].myBitmap, carColumnOneX + 150, carRowOneY + (150 * i), 0);
		//row 2
		colorText(vehicleList[i+4].myName, carColumnTwoX, carRowOneY + (150 * i), 'black', font = "20px Arial Black");
		colorText("Transmission: " + vehicleList[i+4].transmissionVersion, carColumnTwoX + 12, carRowOneY + (150 * i) + 24, 'black', font = "10px Arial Black");
		colorText("Tires: " + vehicleList[i+4].tireVersion, carColumnTwoX + 12, carRowOneY + (150 * i) + 36, 'black', font = "10px Arial Black");
		colorText("Nitro: " + vehicleList[i+4].nitroVersion, carColumnTwoX + 12, carRowOneY + (150 * i) + 48, 'black', font = "10px Arial Black");
		colorText("Exhaust: " + vehicleList[i+4].exhaustVersion, carColumnTwoX + 12, carRowOneY + (150 * i) + 60,  'black', font = "10px Arial Black");
		colorText("Cash: $" + vehicleList[i+4].cash, carColumnTwoX + 130, carRowOneY + (150 * i) + 110,  'green', font = "10px Arial Black");
		drawBitmapCenteredAtLocationWithRotation(vehicleList[i+4].myBitmap, carColumnTwoX + 150, carRowOneY + (150 * i), 0);
	}
}

function winScreenTimer(){
	winScreenTime++;
	if(winScreenTime == 200){
		winScreenTime = 0;
		winScreen = false;
		carUpgradeScreen = true;
		clearRacePositions();
		tireTracks.clear();
	}	
}