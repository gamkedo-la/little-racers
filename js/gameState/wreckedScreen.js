function wreckedScreenMouseClick(mousePosX, mousePosY) {
	updateState (STATE_TITLE_SCREEN);
}

function drawWreckedScreen(){

    canvasContext.clearRect(0,0,canvas.width,canvas.height);
 
    canvasContext.drawImage(wreckedScreenGreenPic, 0, 0, canvas.width / scaleWidth, canvas.height / scaleHeight); // can't use canvas.width /2 due to scaling wierdness
}
