// an overlay canvas that can be drawn onto
// for infinite scorchmarks, skidmarks, dents, mud, etc

var decalManager = function() {
	
	//var img.crossOrigin = "Anonymous";
	this.clear = function() {
        
        if (!this.tireTrackCanvas)
            this.tireTrackCanvas = document.createElement("canvas");
            
    	this.tireTrackCanvas.width = canvas.width;
		this.tireTrackCanvas.height = canvas.height;
        this.tireTrackCTX = this.tireTrackCanvas.getContext('2d'); 
        this.tireTrackCanvas.width = canvas.width;
        this.tireTrackCanvas.height = canvas.height;
        this.decalCount = 0;
	};

	this.clear();
	
	this.add = function(x,y,rot,alpha,color) {
		this.decalCount++;
		if (alpha === undefined) alpha = 0.1;
		if (alpha > 1) alpha = 1;
		if (alpha < 0) alpha = 0;
		if (color==undefined) color = 'black';
		
		//console.log('addTireTracks:'+x+','+y+','+rot+' alpha:'+alpha);
		this.tireTrackCTX.save();
		this.tireTrackCTX.translate(x,y);
		this.tireTrackCTX.rotate(rot);
		this.tireTrackCTX.globalAlpha = alpha;
		this.tireTrackCTX.drawImage(tireTrackPic, -9, -9);
		
		// this is a tinted version that is nicer but very costly
		//drawImageTinted(this.tireTrackCTX,Images.tire_tracks, x, y, rot, color, alpha);
		
		this.tireTrackCTX.restore()

		if (this.decalCount % 7 == 0) // every Xth skidmark
		{
			if(byPassFadeOut){ 
				return;
			} else {
				this.fadeOut();   
			}
		}
	};

	// warning, this function is costly, don't call every frame
	this.fadeOut = function() {

		/*
		// this way has to run on a real web browser due to cross-origin security
		// we aren't allowed to read pixels of images stored locally
		var myImageData = this.tireTrackCTX.getImageData(0,0,this.tireTrackCanvas.width,this.tireTrackCanvas.height);
		var data = myImageData.data;
		for (var i = 0; i < data.length; i += 4) {
		  //data[i] = data[i];     // red
		  //data[i + 1] = data[i + 1]; // green
		  //data[i + 2] = data[i + 2]; // blue
		  if (data[i + 3]>1) data[i + 3]--; // alpha gets fainter
		}
		this.tireTrackCTX.putImageData(myImageData, 0, 0);
		*/

	};

	this.draw = function(canvasContext) {
		canvasContext.drawImage(this.tireTrackCanvas, 0, 0);
	};

	this.resize = function() {
        
        // bugfix: needs to be the size of the WORLD not the camera region
        // this.tireTrackCanvas.width = canvas.width;
        // this.tireTrackCanvas.height = canvas.height;

        this.tireTrackCanvas.width = TRACK_W * getCurrentTrackCols();
        this.tireTrackCanvas.height = TRACK_H * getCurrentTrackRows();

        console.log("TireTracks canvas resized to "+this.tireTrackCanvas.width+"x"+this.tireTrackCanvas.height);
	};

	this.reset = function() {
        this.resize();
        this.tireTrackCTX.clearRect(0, 0, this.tireTrackCanvas.width, this.tireTrackCanvas.height);
	};
  
};

var tireTracks = new decalManager(); // so we can call tireTracks.add(x,y,r);
