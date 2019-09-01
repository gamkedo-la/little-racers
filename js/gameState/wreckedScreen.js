function wreckedScreenMouseClick(mousePosX, mousePosY) {
    resetLevel();
    updateState (STATE_TITLE_SCREEN);
    resetCars();
}

function drawWreckedScreenP1(){
	var wreckedScreenCarColor;
    canvasContext.clearRect(0,0,canvas.width,canvas.height);

    if (vehicleList[0].healthRemaining <= 0) {
        wreckedScreenCarColor = wreckedScreenGreenPic;
    }
    else if (vehicleList[1].healthRemaining <= 0) {
        wreckedScreenCarColor = wreckedScreenYellowPic;
    }
    else if (vehicleList[2].healthRemaining <= 0) {
        wreckedScreenCarColor = wreckedScreenOrangePic;
    }
    else if (vehicleList[3].healthRemaining <= 0) {
        wreckedScreenCarColor = wreckedScreenPurplePic;
    }
    else if (vehicleList[4].healthRemaining <= 0) {
        wreckedScreenCarColor = wreckedScreenRedPic;
    }
    else if (vehicleList[5].healthRemaining <= 0) {
        wreckedScreenCarColor = wreckedScreenBluePic;
    }
    else if (vehicleList[6].healthRemaining <= 0) {
        wreckedScreenCarColor = wreckedScreenLightgrayPic;
    }
    else if (vehicleList[7].healthRemaining <= 0) {
        wreckedScreenCarColor = wreckedScreenDarkgrayPic;
    }
 
    canvasContext.drawImage(wreckedScreenCarColor, 0, 0, canvas.width / scaleWidth, canvas.height / scaleHeight); // can't use canvas.width /2 due to scaling wierdness
}

function drawWreckedScreenP2(){
	var wreckedScreenCarColor;
    canvasContext2.clearRect(0,0,canvas2.width,canvas2.height);

    if (vehicleList[1].healthRemaining <= 0) {
        wreckedScreenCarColor = wreckedScreenYellowPic;
    }
     
    canvasContext2.drawImage(wreckedScreenCarColor, 0, 0, canvas2.width / scaleWidth, canvas2.height / scaleHeight); // can't use canvas.width /2 due to scaling wierdness
}


