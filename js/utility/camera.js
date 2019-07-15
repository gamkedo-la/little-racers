function Camera () {
	this.panX = 0;
	this.panY = 0;

	this.follow = function (canvas, target) {
		this.panX = target.x - (canvas.width/2)/scaleWidth;
		this.panY = target.y - (canvas.height/2)/scaleHeight;
		if(this.panX < 0){
			this.panX = 0;
		}
		if(this.panY < 0){
			this.panY = 0;
		}
		
		var rightEdgeX = TRACK_W * getCurrentTrackCols();
		var bottomEdgeY = TRACK_H * getCurrentTrackRows();
		
		if(this.panX >= rightEdgeX - 1 - canvas.width/scaleWidth){
			this.panX = rightEdgeX - 1 - canvas.width/scaleWidth ;
		}
		if(this.panY >= bottomEdgeY - 1 - canvas.height/scaleHeight){
			this.panY = bottomEdgeY - 1 - canvas.height/scaleHeight;
		}
	};

	this.startPan = function (ctx = canvasContext) {
		ctx.save();
		ctx.translate(-this.panX, -this.panY);
	};

	this.endPan = function (ctx = canvasContext) {
		ctx.restore();
	};
}