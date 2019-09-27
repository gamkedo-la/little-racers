function wreckedScreenMouseClick(mousePosX, mousePosY) {
    resetLevel();
    updateState (STATE_TITLE_SCREEN);
    resetCars();
}

function drawWreckedScreen(cvs, ctx){
	var wreckedScreenCarColor;
    ctx.clearRect(0,0,cvs.width,cvs.height);

    if (!vehicleList[1].computerPlayer) {
        for (var i = 0; i < vehicleList.length; i++) {
            if (vehicleList[i].healthRemaining <= 0) {
                wreckedScreenCarColor = wreckedScreenHalfPics[i];
            }
        }
    } else {
        for (var i = 0; i < vehicleList.length; i++) {
            if (vehicleList[i].healthRemaining <= 0) {
                wreckedScreenCarColor = wreckedScreenPics[i];
            }
        }
    }
 
    ctx.drawImage(wreckedScreenCarColor, 0, 0, canvas.width / scaleWidth, canvas.height / scaleHeight); // can't use canvas.width /2 due to scaling wierdness
}
