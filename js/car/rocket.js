const ROCKET_SPEED = 6.0;
const ROCKET_LIFE = 30;
const ROCKET_DISPLAY_RADIUS = 2.0;

function rocketClass(){
	this.x = 60;
	this.y = 60;
	this.rocketLife = 0;
		
	this.reset = function() {
		this.rocketLife = 0;
		this.ang = -0.5 * Math.PI;
		this.xv = 0;
		this.yv = 0;
	}
	
	this.reset(); // Note:  Called Immediately
	
	this.isShotReadyToFire = function(){
		return (this.rocketLife <= 0);
	}
	
	this.shootFrom = function(carFiring){
		this.x = carFiring.x;
		this.y = carFiring.y;
		
		var carXV = Math.cos(carFiring.ang) * carFiring.speed;
		var carYV = Math.sin(carFiring.ang) * carFiring.speed;
		
		this.xv = Math.cos(carFiring.ang) * ROCKET_SPEED + carXV;
		this.yv = Math.sin(carFiring.ang) * ROCKET_SPEED + carYV;
		
		this.ang = carFiring.ang;
		
		this.rocketLife = ROCKET_LIFE;
		//console.log("shootFrom X: " + this.x + " Y: " + this.y);
	}
	
	this.movement = function() { 
		this.x += this.xv; // NaN - Need to Troubleshoot
		this.y += this.yv; // NaN - Need to Troubleshoot
		
		if(this.rocketLife > 0){
			this.rocketLife--;
		}
	}	
	
	this.hitTest = function(otherCar) {
		if(this.rocketLife <= 0) {
			return false;
		}
		return otherCar.isOverlappingPoint(this.x,this.y);
	}
	
	this.draw = function(){
		if(this.rocketLife > 0){
			drawBitmapCenteredAtLocationWithRotation(rocketPic, this.x, this.y, this.ang, canvasContext);
		}
	}
}