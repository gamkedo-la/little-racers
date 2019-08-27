const ROCKET_SPEED = 6.0;
const ROCKET_LIFE = 30;
const ROCKET_DISPLAY_RADIUS = 2.0;

function rocketClass(){
	this.x = 60;
	this.y = 60;
	this.shotLife = 0;
	
	this.picture = document.createElement("img");
	
	this.reset = function() {
		this.rocketLife = 0;
		this.ang = -0.5 * Math.PI;
		this.xv = 0;
		this.yv = 0;
	}
		
	this.isShotReadyToFire = function(){
		return (this.rocketLife <= 0);
	}
	
	this.shootFrom = function(carFiring){
		this.x = carFiring.x;
		this.y = carFiring.y;
		
		this.xv = Math.cos(carFiring.ang) * ROCKET_SPEED + carFiring.xv;
		this.yv = Math.sin(carFiring.ang) * ROCKET_SPEED + carFiring.yv;
		
		this.shotLife = ROCKET_LIFE;
		console.log("shootFrom X: " + this.x + " Y: " + this.y);
	}
	
	this.movement = function() { 
		this.x += this.xv; // NaN - Need to Troubleshoot
		this.y += this.yv; // NaN - Need to Troubleshoot
		//this.x = 100;  test to prove rocket can be drawn (works)
		//this.y = 100;
		console.log("Rocket X: " + this.x + " Y: " + this.y);
 
		if(this.shotLife > 0){
			this.shotLife--;
		}
	}	
	
	this.hitTest = function(thisEnemy) {
		if(this.shotLife <= 0) {
			return false;
		}
		return thisEnemy.isOverlappingPoint(this.x,this.y);
	}
	
	this.draw = function(){
		if(this.shotLife > 0){
			console.log("Rocket Draw X: " + this.x + " Y: " + this.y);
			colorCircle(this.x, this.y, ROCKET_DISPLAY_RADIUS, 'white')
		}
	}
}