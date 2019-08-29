function wreckedScreenMouseClick(mousePosX, mousePosY) {
	updateState (STATE_TITLE_SCREEN);
}

function drawWreckedScreen(){
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
