function Camera () {
	this.panX = 0;
	this.panY = 0;
	this.shakeFrames = 0;
	this.shakePower = 5;

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

	this.shakeCamera = function (newPower) {
		this.shakeFrames = 4;
		this.shakePower = newPower;
	}

	this.startPan = function (ctx = canvasContext) {
		var shakeX = 0;
		var shakeY = 0;
		ctx.save();
		if (this.shakeFrames > 0) {
			this.shakeFrames --;
			shakeX = Math.floor(Math.random() * 3 - 1) * this.shakePower;
			shakeY = Math.floor(Math.random() * 3 - 1) * this.shakePower;
		}
		ctx.translate(-this.panX + shakeX, -this.panY + shakeY);
	};

	this.endPan = function (ctx = canvasContext) {
		ctx.restore();
	};
}