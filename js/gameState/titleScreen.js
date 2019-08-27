function titleScreenMouseClick(mousePosX, mousePosY) {
	console.log(mousePosX, mousePosY);
	if(mousePosX > 200 * scaleWidth && mousePosX < 300 * scaleWidth && mousePosY > 400 * scaleHeight && mousePosY < 450 * scaleHeight){
		vehicleList[0].computerPlayer = false;
		vehicleList[1].computerPlayer = true;
		updateState(STATE_PLAY);
	} else if(mousePosX > 500 * scaleWidth && mousePosX < 600 * scaleWidth && mousePosY > 400 * scaleHeight && mousePosY < 450 * scaleHeight){
		console.log('2 Players');
		vehicleList[0].computerPlayer = false;
		vehicleList[1].computerPlayer = false;
		updateState(STATE_PLAY);
		windowWasResized = true;
	}
	else if(mousePosX > 350 * scaleWidth && mousePosX < 500 * scaleWidth && mousePosY > 300 * scaleHeight && mousePosY < 350 * scaleHeight){
		console.log('Debug Mode');
		debugMode = !debugMode;
	}

	if (gameState != STATE_TITLE_SCREEN) //Player just clicked 1 or 2 players, time to add rain.
	{
	    addRainToArray();
	    setInterval(function () {
	        if (gameState == STATE_PLAY) { 
		   	 addRainToArray();
		   }
	    }, 750)
	}
}

function drawTitleScreen(){
    // clear screen
    // pure black 800x600
    // colorRect(0,0,canvas.width/scaleWidth,canvas.height/scaleHeight, 'black');
    // stretch image 800x600
    // canvasContext.drawImage(titlescreenPic, 0, 0); // can't use canvas.width /2 due to scaling wierdness
    // clear to transparent so we page bg shows through
    canvasContext.clearRect(0,0,canvas.width,canvas.height);
    
    // logo
    //colorText("Little Racers", 310, 200, 'white', font = "24px Arial Black");
    canvasContext.drawImage(titleScreenePic, 0, 0, canvas.width / scaleWidth, canvas.height / scaleHeight); // can't use canvas.width /2 due to scaling wierdness
    // buttons
    colorRect(200,400,100,50, 'white');
	colorRect(500,400,100,50, 'white');
	colorRect(325,300,150,50, 'white');
	colorText("1 Player", 215, 430, 'black', font = "14px Arial Black");
	colorText("2 Players", 515, 430, 'black', font = "14px Arial Black");
	colorText("Debug Mode :" + ((debugMode == true) ? "on" : "off") , 340, 330, 'black', font = "14px Arial Black");
}
