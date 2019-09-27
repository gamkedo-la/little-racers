function wreckedScreenMouseClick(mousePosX, mousePosY) {
    resetLevel();
    updateState (STATE_TITLE_SCREEN);
    resetCars();
}

function drawWreckedScreen(car, cvs, ctx){	
    ctx.clearRect(0,0,cvs.width,cvs.height);

    for (var i = 0; i < vehicleList.length; i++) {
        if (car == vehicleList[i]) {
            ctx.drawImage(!vehicleList[1].computerPlayer ? wreckedScreenHalfPics[i] : wreckedScreenPics[0], 
                0, 0, 
                canvas.width / scaleWidth, 
                canvas.height / scaleHeight);            
        }
    }
}
