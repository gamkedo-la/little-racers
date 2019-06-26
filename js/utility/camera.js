var camPanX = 0;
var camPanY = 0;

function updatedCameraPosition(){
	camPanX = vehicleList[0].x - (canvas.width/2)/scaleWidth;
	camPanY = vehicleList[0].y - (canvas.height/2)/scaleHeight;
}

function shiftForCameraPan(){
	canvasContext.save();
	canvasContext.translate(-camPanX, -camPanY);
}

function finishedCameraPan(){
	canvasContext.restore();
}