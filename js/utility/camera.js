var camPanX = 0;
var camPanY = 0;

function updatedCameraPosition(){
	camPanX = vehicleList[0].x - (canvas.width/2)/scaleWidth;
	camPanY = vehicleList[0].y - (canvas.height/2)/scaleHeight;
	if(camPanX < 0){
		camPanX = 0;
	}
	if(camPanY < 0){
		camPanY = 0;
	}
	
	var rightEdgeX = TRACK_W * getCurrentTrackCols();
	var bottomEdgeY = TRACK_H * getCurrentTrackRows();
	
	if(camPanX >= rightEdgeX - 1 - canvas.width/scaleWidth){
		camPanX = rightEdgeX - 1 - canvas.width/scaleWidth ;
	}
	if(camPanY >= bottomEdgeY - 1 - canvas.height/scaleHeight){
		camPanY = bottomEdgeY - 1 - canvas.height/scaleHeight;
	}
}

function shiftForCameraPan(){
	canvasContext.save();
	canvasContext.translate(-camPanX, -camPanY);
}

function finishedCameraPan(){
	canvasContext.restore();
}