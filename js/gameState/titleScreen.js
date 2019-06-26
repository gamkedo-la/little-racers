function titleScreenMouseClick(mousePosX, mousePosY) {
	console.log(mousePosX, mousePosY);
	if(mousePosX > 200 * scaleWidth && mousePosX < 300 * scaleWidth && mousePosY > 400 * scaleHeight && mousePosY < 450 * scaleHeight){
		vehicleList[0].computerPlayer = false;
		vehicleList[1].computerPlayer = true;
		titleScreen = false;
	} else if(mousePosX > 500 * scaleWidth && mousePosX < 600 * scaleWidth && mousePosY > 400 * scaleHeight && mousePosY < 450 * scaleHeight){
		console.log('2 Players');
		vehicleList[0].computerPlayer = false;
		vehicleList[1].computerPlayer = false;
		titleScreen = false;
	}
}

function drawTitleScreen(){
	colorRect(0,0,canvas.width/scaleWidth,canvas.height/scaleHeight, 'black');	
	colorText("Little Racers", 310, 200, 'white', font = "24px Arial Black");
	colorRect(200,400,100,50, 'white');	
	colorRect(500,400,100,50, 'white');	
	colorText("1 Player", 215, 430, 'black', font = "14px Arial Black");
	colorText("2 Players", 515, 430, 'black', font = "14px Arial Black");
}