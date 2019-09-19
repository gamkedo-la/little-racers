
const DEBUG_AI = false;                     // verbose console log used for AI debugging
const BOUNCE_OFF_WALLS = true;              // if false, use old method w hardcoded angles per tile
const WALL_DAMAGE_PER_FRAME = 1;            // adds up fast, was 5
const WAYPOINT_DISTANCE_THRESHOLD = 128;     // was 27 but it was easy to miss
const MAX_PARTICLES_PER_CAR = 50;           // avoid perf issues with spammy fx
const CHANCE_OF_A_NEW_PARTICLE = 0.25;      // avoid adding particles every single frame
const USE_HEADLIGHTS = true;                // if true draw headlight beams and glows
const DRIVE_POWER = 0.45                    //These values from https://docs.google.com/spreadsheets/d/1bj506aOmZ7FRwFtS2wdQl-u09G10rXYQIrxpWryp_gk/edit#gid=953347406
const GROUNDSPEED_DECAY_MULT = 0.948;
const ENGINE_BOOST_LEVEL_DIVISOR = 60;
const TRANSMISSION_BOOST_LEVEL_DIVISOR = 10;
const TRANSMISSION_BOOST_CUTOFF_SPEED = 5;
const EXPECTED_CAR_MAX_SPEED_NO_NITRO = 10; //This may not be used for anything. Recording as truth info in case needed.
const NITRO_MAX_SPEED = 20;                 //However nitro is implemented, it will be capped to this speed.
const CAR_MAX_SPEED_DISPLAY_NITRO_ON = 14;  //Used to scale the gauge. By putting it at 15, the gauge is configured such that
                                            //at the max upgraded non-nitro speed (10), the needle will line up just before
                                            //the nitro section.
const REVERSE_POWER = 0.2;
const MIN_TURN_SPEED = 0.5;
const MIN_JUMP_START_SPEED = 4;
const RAMP_LAUNCH_EDGE_DISTANCE = 20; //Don't launch the car until it's at least this close to the jumping edge. Distance chosen based on car max speed.
const JUMP_START_ZSPEED = 5;
const GRAVITY = -0.4;
const CAR_COLLISION_RADIUS = 15;
const WALL_LOW_IMPACT_THRESHOLD = Math.PI / 6;
const WALL_BOUNCE_ANGLE = Math.PI / 36; //When cars hit the wall at a low angle, they bounce off at this angle.
const WALL_BOUNCE_SPEED_MODIFIER = 0.85; //Low-angle impact speed reduction.
const WALL_IMPACT_SPEED_MODIFIER = 0.7; //Head-on collion speed reduction.
const GRASS_SLOWDOWN_THRESHOLD = 0.6;
const GRASS_ACCELERATION = 0.9; //Modifier to approach the maximum grass speed.
const ICE_ACCELERATION = 1.05;
const TURN_RATE_NITRO = 0.01;
const TURN_RATE_STANDARD = 0.03;
const TURN_RATE_MULTIPLIER_AIRBORNE = 0.25;
const TURN_RATE_MULTIPLIER_OIL = 0.0;
const TURN_RATE_MULTIPLIER_OIL_SLOW = 0.2;
const OIL_SLOW_TRACTION_THRESHOLD = 2;  //Below this speed, oil reduction will be TURN_RATE_MULTIPLIER_OIL_SLOW (allow some steering at low speed)
const TURN_RATE_MULTIPLIER_GRASS = 0.75;
const TURN_RATE_MULTIPLIER_ICE = 1.10;
const NITRO_FRAME_DURATION = 30; //Being measured in frames, so at 30fps this is 1/3 second.
const NITRO_BOOST_BASE_AMOUNT = .5; //Speed increase per frame.
const NITRO_START_QUANTITY = 1;
const AI_BRAKING_DISTANCE = 50;   //Measured from car center.
const AI_STUCK_TIME_FRAMES = 10;
const AI_RANDOM_MOVEMENT_FRAMES = 30;
const AI_SHOOT_DISTANCE = 300;
const CAR_WIDTH = 28; //These are determined from examination of the graphics. May be used for collisions (WIP).
const CAR_HEIGHT = 12;
const CAR_LOW_FUEL_LEVEL = 20; // Displays low fuel indicator when fuelInTank is lower than val
const MAX_DAMAGE_PARTICLES_PER_FRAME = 20;
const CRACK_SPEED_REDUCTION = 0.87;

var finalLappedCalled = false;

function carClass() {
	this.myRocket = new rocketClass();
    this.x = 60;
    this.y = 60;
    this.oldX = this.x;
    this.oldY = this.y;
    this.z = 0;
    this.zVel = 0;
	this.myBitmap;
	this.myAnnc;
    this.finishTime;
    
    this.respawnPosition = { x:0, y:0, ang:0 }; // last known checkpoint

    this.turnRate = TURN_RATE_STANDARD;
    this.turnRateTileMultiplier = 1;
    this.keyHeld_Gas = false;
    this.keyHeld_Reverse = false;
    this.keyHeld_TurnLeft = false;
    this.keyHeld_TurnRight = false;
    this.keyHeld_Nitro = false;
    this.computerPlayer = false;
	this.nitroBoostOn = false;
    this.wayPointNumber = 0;
    this.wayPointNumberPrev = 0;
	this.computerReloadingWait = 0;
    this.wrongDirectionTimerInterval = 150;
    this.wrongDirectionTimer = 0;
    this.wrongDirectionTimerPrev = 0;
    this.wrongDirection = false;
	this.raceDistance = 0;
	this.inRacePosition = 0;
	this.recordNewDistance = true;
    this.cash = 0;
    this.finishRace = false;
    this.fuelCapacity = 100;
    this.fuelConsumptionRate = 0.15;
    this.fuelInTank = this.fuelCapacity;
    this.oilSlickRemaining = 0;
    this.stopCar = false;
    this.findPitStop = false;
    this.transmissionVersion = 0;
    this.tireVersion = 0;
    this.engineVersion = 0;
    this.exhaustVersion = 0;
    this.carPic = document.createElement("img");
    this.maxShields = 100;
    this.shieldStrength = 1; // Damage reduction factor when shields are available
    this.shieldsRemaining = this.maxShields;
    this.maxHealth = 100;
    this.bodyStrength = 1; // Possibly upgradeable, damage reduction factor when hit without shieldStrength
    this.healthRemaining = this.maxHealth;
	this.highlight = false;


    this.setupControls = function(forwardKey, backKey, leftKey, rightKey, nitroKey, shotKey) {
        this.controlKeyForGas = forwardKey;
        this.controlKeyForReverse = backKey;
        this.controlKeyForTurnLeft = leftKey;
        this.controlKeyForTurnRight = rightKey;
        this.controlKeyForNitro = nitroKey;
		this.controlKeyForRocketFire = shotKey;
    }

    this.carReset = function(whichGraphic, whichName, computer) {
        this.name = whichName;
        this.healthRemaining = this.maxHealth;
        this.speed = 0;
        this.finishRace = false;
        this.stopCar = false;
        this.ang = -0.5 * Math.PI; //Angle is in radians; this rotates the car -90 degrees to point car up. (0 deg is to the right)
        //Graphics on the sheet are oriented pointing to the right, matching angle=0 degrees.`

        for (var i = 0; i < trackGrid.length; i++) {
            if (trackGrid[i] == TRACK_PLAYER) {
                var tileRow = Math.floor(i / getCurrentTrackCols());
                var tileCol = i % getCurrentTrackCols();
                this.homeX = tileCol * TRACK_W + 0.5 * TRACK_W;
                this.homeY = tileRow * TRACK_H + 0.5 * TRACK_H;
                trackGrid[i] = TRACK_ROAD;
                break;
            }
        }
        
        // what if track data is missing TRACK_PLAYER?
        if (!this.homeX) { 
            console.log("ERROR: no TRACK_PLAYER tiles found. Car has no home spawnpoint."); 
            // lol stuff in some fake valid data
            this.homeX = Math.round(Math.random()*500);
            this.homeY = Math.round(Math.random()*500);
        }

        console.log(whichName+"'s spawnpoint set to " +this.homeX+","+this.homeY);

        //console.log("Car is processing waypoints");
        this.wayPointX = levelList[levelNow].wayPointsX.slice();
        this.wayPointY = levelList[levelNow].wayPointsY.slice();

        // point at the first waypoint so we start facing the right direction
        this.ang = Math.atan2(this.wayPointY[0]-this.homeY,this.wayPointX[0]-this.homeX);
        var halfPI = Math.PI / 2.0;
        this.ang = Math.round(this.ang / halfPI) * halfPI;

        this.x = this.homeX;
        this.y = this.homeY;
        this.respawnPosition.x = this.x;
        this.respawnPosition.y = this.y;
        this.respawnPosition.ang = this.ang;

        this.wrongDirection = false;
        this.wrongDirectionTimer = 0;
        this.wrongDirectionTimerPrev = 0;
        this.wayPointNumberPrev = 0;
		this.raceDistance = 0;
		this.fuelInTank = this.fuelCapacity;
    }

    this.carInit = function(whichGraphic, whichName, whichAnnounce, computer) {
        this.myBitmap = whichGraphic;
        this.myName = whichName;
		this.myAnnc = whichAnnounce;
        this.carReset(whichGraphic, whichName, computer);
        this.computerPlayer = computer;
        this.nitroBoostOn = false;
        this.nitroBoostQuantity = NITRO_START_QUANTITY;
        this.nitroBoostTime = 0; //Time (frames) of boost remaining.
        this.airborne = false;
        this.startTime = now;
        this.xOffSet = this.x;
        this.yOffSet = this.y;
        this.lapHundredthSecond = 0;
        this.lapTenthSecond = 0;
        this.lapSecond = 0;
        this.lapSecondTensSpot = 0;
        this.lapMinute = 0;
        this.lapMinuteTensSpot = 0;
        this.lapNumber = 1;
        this.checkPointA = false;
        this.checkPointB = false;
        this.checkPointC = false;
		this.waitForA = true;
		this.waitForB = false;
		this.waitForC = false;
        this.aiRandomMovements = false;
        this.wayPoint = true;
        this.wayPointX = levelList[levelNow].wayPointsX.slice();
        this.wayPointY = levelList[levelNow].wayPointsY.slice();
        this.level = 0;
        this.stuckTime = 0;
        this.randomMovementsTimer = 0;
        this.finishRace = false;
        this.oilSlickRemaining = 0;
        this.damageParticles = [];
		this.raceDistance = 0;
		this.recordNewDistance = true;
        this.quirks = getDriverQuirksForName(this.myName);
		this.finishTime = 0;
		this.computerRandomizedShotWait();
		this.rocketQuantity = 5;
		this.fuelInTank = this.fuelCapacity;
    }

    function getDriverQuirksForName(aName) {
        switch(aName) {
            case vehicleNames[0]:
                return {wayPointX:0, wayPointY:0,
                        turnLimit:10};
            case vehicleNames[1]:
                return {wayPointX:-10, wayPointY:-10,
                        turnLimit:15};
            case vehicleNames[2]:
                return {wayPointX:+10, wayPointY:-10,
                        turnLimit:20};
            case vehicleNames[3]:
                return {wayPointX:-10, wayPointY:+10,
                        turnLimit:25};
            case vehicleNames[4]:
                return {wayPointX:+10, wayPointY:+10,
                        turnLimit:-25};
            case vehicleNames[5]:
                return {wayPointX:-15, wayPointY:-15,
                        turnLimit:-20};
            case vehicleNames[6]:
                return {wayPointX:+15, wayPointY:-15,
                        turnLimit:-15};
            case vehicleNames[7]:
                return {wayPointX:-15, wayPointY:+15,
                        turnLimit:-10};;
        }
    }

    this.randomMovements = function() {
        var chanceToMoveForward = Math.round(Math.random() * 10);
        this.randomMovementsTimer++
        if (chanceToMoveForward > 3) {
            this.keyHeld_Gas = true;
            this.keyHeld_Reverse = false;
        } else {
            this.keyHeld_Reverse = true;
            this.keyHeld_Gas = false;
        }
        var chanceToMoveRight = Math.round(Math.random() * 10);
        if (chanceToMoveRight <= 0) { // 2
            this.keyHeld_TurnRight = true;
            this.keyHeld_TurnLeft = false;
        } else if (chanceToMoveRight == 1) { // 3
            this.keyHeld_TurnRight = false;
            this.keyHeld_TurnLeft = true;
        } else {
            this.keyHeld_TurnRight = false;
            this.keyHeld_TurnLeft = false;
        }
        var chanceToUseNitro = Math.round(Math.random() * 100);
        if (chanceToUseNitro <= 1) {
            this.controlKeyForNitro = true;
        }
        if (this.randomMovementsTimer > AI_RANDOM_MOVEMENT_FRAMES) {
            this.randomMovementsTimer = 0;
            this.aiRandomMovements = false;
            this.wayPoint = true;
        }
    }
	
    this.updateWayPoints = function() {
        this.wayPointNumber = 0;
        this.lapNumber = 0;
        this.checkPointA = false;
        this.checkPointB = false;
        this.checkPointC = false;
            //use these way points while racing
        if (!this.finishRace) {
        	// do you boo
        } else { //use these way points when a place is determined
        	this.wayPointX = levelList[levelNow].placementWayPointsX.slice();
    		this.wayPointY = levelList[levelNow].placementWayPointsY.slice();
			// this works for first place
            // every other place uses first place as a template
            if (this.myName != carPlaces[0].myName) {
            	this.findMyProperFinishSpot();
       		}
        }
    }

    this.wayPointMovements = function(toX, toY, isComputerPlayer = this.computerPlayer) {
        var wayPointVectorX = toX - this.x;
        var wayPointVectorY = toY - this.y;

        if (!this.finishRace) {
            wayPointVectorX += this.quirks.wayPointX;
            wayPointVectorY += this.quirks.wayPointY;
        }


        //When calculating the car's vector, subtract 90 degrees from it
        //to allow for dot product to give a -ve to +ve result, indicating if car
        //needs to steer left or right.
        var carVectorX = Math.cos(this.ang - Math.PI / 2);
        var carVectorY = Math.sin(this.ang - Math.PI / 2);
        var dot = dotProduct(wayPointVectorX, wayPointVectorY, carVectorX, carVectorY);
        var dotTurningLimit = 35;

        if (isComputerPlayer) {
            if (dot < 0) {
                this.keyHeld_TurnRight = true;
                this.keyHeld_TurnLeft = false;
                if (dot < -(dotTurningLimit + this.quirks.turnLimit)) {// if result of the dot is much bigger or much lesser than 0 that means car has to make a big turn and it has to slow down.
                  if (DEBUG_AI) console.log(this.myName + "is slowing down");
                  this.keyHeld_Gas = false;
                  //this.keyHeld_Reverse = true;
                }
                else {
                  this.keyHeld_Gas = true;
                  //this.keyHeld_Reverse = false;
                }

            } else {
                this.keyHeld_TurnRight = false;
                this.keyHeld_TurnLeft = true;
                if (dot > (dotTurningLimit + this.quirks.turnLimit)) {
                  this.keyHeld_Gas = false;
                  if (DEBUG_AI) console.log(this.myName + "is slowing down");
                  //this.keyHeld_Reverse = true;
                }
                else {
                  this.keyHeld_Gas = true;
                  //this.keyHeld_Reverse = false;
                }
            }
        }

        var hitWaypointDistance = WAYPOINT_DISTANCE_THRESHOLD;
        var d = dist(this.x, this.y, toX, toY);
        if (d <= hitWaypointDistance) {
            this.wayPointNumber++;
            if (this.wayPointNumber >= this.wayPointX.length) {
                if (!this.finishRace) {
                    this.wayPointNumber = 0;
                    this.wayPointNumberPrev = 0;
                    this.wrongDirection = false;
                } else {
                    this.stopCar = true;
                }
            }
        }
    }

    this.findMyProperFinishSpot = function() {
    	let lastIndex = this.wayPointX.length - 1;
		if(carPlaces[1].myName == this.myName){
			this.wayPointX[lastIndex] += TRACK_W;
		} else if (carPlaces[2].myName == this.myName){
			this.wayPointX[lastIndex] += TRACK_W * 2;
		} else if (carPlaces[3].myName == this.myName){
			this.wayPointY[lastIndex] += TRACK_H;
		} else if (carPlaces[4].myName == this.myName){
			this.wayPointX[lastIndex] += TRACK_W;
			this.wayPointY[lastIndex] += TRACK_H;
		} else if (carPlaces[5].myName == this.myName){ 
			this.wayPointX[lastIndex] += TRACK_W * 2;
			this.wayPointY[lastIndex] += TRACK_H;
		} else if (carPlaces[6].myName == this.myName){
			this.wayPointY[lastIndex] += TRACK_H * 2;
		} else if (carPlaces[7].myName == this.myName){
			this.wayPointX[lastIndex] += TRACK_W;
			this.wayPointY[lastIndex] += TRACK_H * 2;
		}
    }

    this.checkIfStuck = function() {
        if (this.speed < 1) {
            this.stuckTime++;
            if (this.stuckTime == AI_STUCK_TIME_FRAMES) {
                this.aiRandomMovements = true;
                this.wayPoint = false;
                this.stuckTime = 0;
            }
        }
    }

    this.checkForLowFuelLevel = function() {
        if (this.fuelInTank <= CAR_LOW_FUEL_LEVEL) {
            this.findPitStop = true;
        }
    }

    this.checkForEmptyTank = function() {
        if (this.fuelInTank < 0) {
            this.fuelInTank = 0
        }
    }

    // tire track constants
    const OILSLICK_FRAMECOUNT = 20; // leave dark oil track marks for n frames
    const OILSLICK_OPACITY = 0.15; // very dark when trailing oil
    const PEEL_OUT_SPEED = 2; // when slow, we leave accelerating tire tracks
    const PEEL_OUT_OPACITY = 0.025; // when starting, how dark are the tracks
    const MAXSPD_FOR_TRAIL = 10; // fade out trail as we approach this speed
    const MAXSPD_TRAIL_OPACITY = 0.025; // very faint when on straighaways
    // FIXME: AI is "always turning"
    const TURNING_SKIDMARK_OPACITY = 0.025; // darker when cornering
    const RANDSPEED = 0.25; // randomness in the speed angle
    const SMOKESPEED = 4; // times the car speed
    const FENDERDISTANCE = -20; // pixels from the center of the vehicle
    var justHitTheGround = false; // jump completed this frame?

    this.skidMarkHandling = function() { // draw tire tracks / skid marks

        if (SMOKE_FX_ENABLED) {

            /*
            if (this.keyHeld_Gas) { // no smoke when gliding/braking?
            // FIXME: draw on both cameras if splitscreen?
            // FIXME: assumes aspect ratio of 800x600 canvas
            // constant smoke from exhaust is too costly: too may puffs per frame
            // offset from center of sprite to near rear fender
            var ofsx = Math.cos(this.ang)*FENDERDISTANCE;
            var ofsy = Math.sin(this.ang)*FENDERDISTANCE;
            var spdboost = 1;
            var rgb;
            if (this.speed < PEEL_OUT_SPEED) { rgb = [0.3,0.3,0.3]; }
            else if (this.speed > MAXSPD_FOR_TRAIL) { rgb = [0.01,0.01,0.01]; }
            else if (this.nitroBoostOn) { rgb = [0.5,0,0]; spdboost=2; }
            else if (this.oilSlickRemaining > 0) { rgb = [0.001,0.001,0.2]; spdboost=2; } // no black! [additive particles]
            else rgb = [0.15,0.15,0.15]; // how bright
            if (Math.random()>0.99) {
                SmokeFX.add(
                this.x-cameraP1.panX+ofsx,
                this.y-cameraP1.panY+ofsy,
                (Math.cos(this.ang)*this.speed*(-SMOKESPEED*spdboost)) + ((Math.random()-0.5)*RANDSPEED),
                (Math.sin(this.ang)*this.speed*(-SMOKESPEED*spdboost)) + ((Math.random()-0.5)*RANDSPEED),
                rgb, 0.001);
                }
            }*/

            // pending ground pound (landed from a ramp jump)
            if (justHitTheGround) {
                justHitTheGround = false;
                    SmokeFX.add(
                        this.x-cameraP1.panX + ((Math.random()-0.5)*10),
                        this.y-cameraP1.panY + ((Math.random()-0.5)*10),
                        ((Math.random()-0.5)*800),
                        ((Math.random()-0.5)*500),
                        [Math.random()*0.5+0.4,Math.random()*0.5+0.4,Math.random()*0.5+0.4], 0.001);
            }
        } // if SMOKE_FX_ENABLED

        // never leave a trail when flying through the air
        if (this.airborne) return;
        // nor if we aren't putting our foot on the gas
        //if (!this.keyHeld_Gas) return;

        var tireTrackAlpha = 0;

        // when going slow and accellerating, we make a lot of marks
        if (this.speed > 0 &&
            this.speed < PEEL_OUT_SPEED &&
            this.keyHeld_Gas) {
            tireTrackAlpha = PEEL_OUT_OPACITY * (1 - (PEEL_OUT_SPEED / this.speed));
        }

        // very faint trails on straightaways
        if (this.speed > MAXSPD_FOR_TRAIL) {
            tireTrackAlpha = MAXSPD_TRAIL_OPACITY;
        }

        if (this.keyHeld_TurnRight) {
            tireTrackAlpha = TURNING_SKIDMARK_OPACITY;
        }

        if (this.keyHeld_TurnLeft) {
            tireTrackAlpha = TURNING_SKIDMARK_OPACITY;
        }

        if (this.oilSlickRemaining > 0) {
            this.oilSlickRemaining--;
            tireTrackAlpha = OILSLICK_OPACITY; // very dark
        }

        if (tireTrackAlpha < 0) tireTrackAlpha = 0;
        if (tireTrackAlpha > 1) tireTrackAlpha = 1;

        // force something at all times!
        tireTrackAlpha = Math.max(0.05,tireTrackAlpha);
        
        if (tireTrackAlpha > 0.001) {
            tireTracks.add(this.x, this.y, this.ang, tireTrackAlpha);
        }

    }

    //Used to turn on the nitro.
    this.tryNitroBoost = function() {
        if (this.nitroBoostQuantity > 0 && !this.nitroBoostOn) {
            this.nitroBoostQuantity--;
            this.nitroBoostTime = NITRO_FRAME_DURATION;
            this.nitroBoostOn = true;
        }
    }

    //Consume nitro and turn off if duration elapsed.
    this.updateNitro = function() {
        if (this.nitroBoostOn) {
            this.nitroBoostTime--;
            if (this.nitroBoostTime <= 0) {
                this.nitroBoostOn = false;
            }
        }
    }

    //The primary movement function; everything a car does starts here.
    this.movement = function() {
        if (this.healthRemaining > 0) {
            if (this.computerPlayer) {
                this.doComputerPlayerDriving(); //Determines their steering and throttle.
            } else {
                this.checkIfWrongDirection();
            }
            this.updateCarSpeedAndTurnRate();
            this.updateCarPositionAndAngle();
            this.handleTileEffects();
            this.skidMarkHandling();
            this.updateDamageParticles();
            this.myRocket.movement();
        }
    }
	
	this.rocketFire = function(){
		if(this.myRocket.isShotReadyToFire()){
			this.myRocket.shootFrom(this); 
			console.log("Fired");
		}
	}
	
	this.computerRandomizedShotWait = function() {
		var minSec = 2;
		var randExtraSec = 3;
		this.computerReloadingWait = (minSec * FPS) + Math.random() * (randExtraSec * FPS);
	}
    //Handle AI steering and throttle
    this.doComputerPlayerDriving = function() {
		
		if(this.computerReloadingWait-- < 0){
			if(this.rocketQuantity > 0){
				if(this.finishTime == 0){
					if (this.isAnotherCarNearAndInFront(AI_SHOOT_DISTANCE)){
						this.rocketFire();
						this.computerRandomizedShotWait();
					}
				}
			}
		}
        if (this.stopCar) { //Car stopped due to things like being done the race and parked.
            this.keyHeld_Gas = false;
            this.speed = 0;
            this.ang = -Math.PI / 2;
            return;
        }
        else
        {
            if (this.isAnotherCarNearAndInFront(AI_BRAKING_DISTANCE))
            {
                this.keyHeld_Gas = false; //This requires adjustment based on AI characteristics for aggressiveness, mood, etc.
            }
            else
            {
                this.keyHeld_Gas = true;
            }
        }

        if (this.aiRandomMovements) {
            this.randomMovements();
        }
        if (this.wayPoint) {
            this.wayPointMovements(this.wayPointX[this.wayPointNumber], this.wayPointY[this.wayPointNumber]);

            this.keyHeld_Reverse = false;
            this.checkIfStuck();
            //if low on fuel and past checkPoint C.  Pit stops must come after checkPoint C
            if (this.findPitStop) { //&& this.checkPointC){
                // FIXME: remove hardcoded values and put into level data
                this.wayPointX = 150; //test Pitstop for first level
                this.wayPointY = 460;
            }
        }
    }

   this.isOverlappingPoint = function(atX, atY){
        return dist(this.x, this.y, atX, atY)<20;
   }
    //Check if there is at least one car in front and the AI may want to brake.
    //This is pretty inefficient. Ideally, we could check all interactions and record the state, then make the decision later.
    //But since we're doing this as part of the movement for each car, we'll need to check it every time.
    //To save some overhead, return as soon as a close car in front is found.
    this.isAnotherCarNearAndInFront = function(howClose)
    {
        for (var i = 0; i < vehicleList.length; i++) {
            if (this != vehicleList[i])
            {
                var distance = dist(this.x, this.y, vehicleList[i].x, vehicleList[i].y);

                if(distance < howClose)
                {	
					var frontTest = isInFrontOf(this.x, this.y, this.ang, vehicleList[i].x, vehicleList[i].y);
					
					if(frontTest){
						return true; // bailing, no need to check other cars
					}
                }
            }
        }
        return false; //No other cars near.
    }

    this.updateCarSpeedAndTurnRate = function() {

        if (!this.airborne) //Handle changes in speed for vehicles on the ground.
        {
            this.speed *= GROUNDSPEED_DECAY_MULT;
            if (this.fuelInTank > 0) {
            	if (this.keyHeld_Gas) {
            		if (this.finishRace) {
            			this.speed = 3.5;
            		} else {
		                //Add in basic speed boost every car gets.
		                this.speed += DRIVE_POWER;

		                //Add in engine effects.
		                this.speed += this.engineVersion/ENGINE_BOOST_LEVEL_DIVISOR;

		                //Add in transmission effects for extra increase when at lower speeds.
		                //transmissionBoostScale will be large when car is slow/stopped, getting smaller and going to 0 when approachign cutoff speed.
		                var transmissionBoostScale = TRANSMISSION_BOOST_CUTOFF_SPEED- clamp(0, this.speed, TRANSMISSION_BOOST_CUTOFF_SPEED);
		                var transmissionBoostAmount = transmissionBoostScale*this.transmissionVersion/TRANSMISSION_BOOST_LEVEL_DIVISOR;
		                this.speed += transmissionBoostAmount;

		                this.fuelConsumption(DRIVE_POWER);

		                if (this.keyHeld_Nitro) { //Don't engage nitro if player is backing up!
		                this.tryNitroBoost();
		            	}
	            	}
		        }

	        	if (this.keyHeld_Reverse) {
	                this.speed -= REVERSE_POWER;
	                this.fuelConsumption(REVERSE_POWER);
	            }
        	}

            //As long as you're on the ground, nitro will push you forward even if you're trying to brake!
            //That's why this code is not in the above sections for forward/reverse.
            if (this.nitroBoostOn) {
                this.speed += NITRO_BOOST_BASE_AMOUNT;
            }

            //Finally, cap speed to a reasonable max in case anything else has broken.
            if(this.speed > NITRO_MAX_SPEED)
            {
                this.speed=NITRO_MAX_SPEED;
            }
        }


        //Determine base turn rate.
        this.turnRate = TURN_RATE_STANDARD;
        if (this.nitroBoostOn) {
            this.turnRate = TURN_RATE_NITRO;
        }

        //With the base rate determined, the following will lower it further based on driving conditions.

        //Lower turn rate if airborne. Allows for a tiny bit of steering in defiance of physics!
        if (this.airborne) {
            this.turnRate *= TURN_RATE_MULTIPLIER_AIRBORNE;
        } else //On the ground; degrade rate by tile effects and if tires are oil-slicked.
        {
            this.turnRate *= this.turnRateTileMultiplier;
            if (this.oilSlickRemaining > 0)
            {
                if(Math.abs(this.speed) < OIL_SLOW_TRACTION_THRESHOLD)
                    this.turnRate *= TURN_RATE_MULTIPLIER_OIL_SLOW;
                else
                    this.turnRate *= TURN_RATE_MULTIPLIER_OIL;  //Visual effect will be shown by the draw code.
            }
        }

        this.updateNitro(); //Needs to be done after the above code so that speed is used for one frame before being "consumed".
        //Do it during the speed increase and you would miss the turn rate penalty!
    }

    this.updateCarPositionAndAngle = function() {

        //Preserve previous values for use in tile collisions.
        this.oldX = this.x;
        this.oldY = this.y;

        //Update ground position
        this.x += Math.cos(this.ang) * this.speed;
        this.y += Math.sin(this.ang) * this.speed;

        //Update vertical position.
        if (this.airborne) {
            this.z += this.zVel;

            if (this.z > 0) {
                this.zVel += GRAVITY;
            } else {
                justHitTheGround = true;
                this.airborne = false;
                this.z = 0;
                this.zVel = 0;
            }
        }

        //Update steering angle.
        //Note that it is constrained between 0rad (facing right) to -2Pi radians.
        //The angle is *never* positive.
        //With the magnitude of the negative angle increasing counterclockwise.
        if (Math.abs(this.speed) >= MIN_TURN_SPEED) {
            if (this.keyHeld_TurnLeft) {
                this.ang -= this.turnRate * Math.PI;
                this.ang = constrainAngleToNegativeRange(this.ang)
            }
            if (this.keyHeld_TurnRight) {
                this.ang += this.turnRate * Math.PI;
                this.ang = constrainAngleToNegativeRange(this.ang)
            }
        }
    }

    this.fuelConsumption = function (power) {
    	if (!debugMode) { //don't remove fuel while in debug mode
	        this.fuelInTank -= power * this.fuelConsumptionRate;
	    }
		this.checkForLowFuelLevel();
		this.checkForEmptyTank();
    }

    this.checkIfWrongDirection = function () {
        this.wayPointMovements(this.wayPointX[this.wayPointNumber], this.wayPointY[this.wayPointNumber]);
        if (this.keyHeld_Gas || this.keyHeld_Nitro || this.keyHeld_Reverse) {
            if (this.wrongDirectionTimerPrev <= this.wrongDirectionTimer - this.wrongDirectionTimerInterval) {
                this.wrongDirectionTimerPrev = this.wrongDirectionTimer;

                if (this.wayPointNumber > this.wayPointNumberPrev) {
                    this.wayPointNumberPrev = this.wayPointNumber;
                    this.wrongDirection = false;
                }
                else {
                    if (DEBUG_AI) console.log("Wrong direction or checkpoint missed!");
                    this.wrongDirection = true;
                }
            }
            this.wrongDirectionTimer++;
            if (DEBUG_AI) console.log("wayPointNumber: " + this.wayPointNumber);
            if (DEBUG_AI) console.log("wayPointNumberPrev: " + this.wayPointNumberPrev);
            if (DEBUG_AI) console.log("wrongDirectionTimer: " + this.wrongDirectionTimer);
        }
    }

    //used for determining which place the car is on during the race
    //remembers this position to respawn during pause or after blowing up 
    this.recordDistance = function(){ 
        
        this.respawnPosition.x = this.x;
        this.respawnPosition.y = this.y;
        this.respawnPosition.ang = this.ang;
        //console.log("New spawnpoint: " + this.respawnPosition.x+','+this.respawnPosition.y+','+this.respawnPosition.ang);

        if (this.checkPointA && !this.waitForB){
			this.waitForB = true;
			this.waitForA = false;
			this.raceDistance++;
			checkForInRacePosition();
		} else if (this.checkPointB && !this.waitForC){
			this.waitForC = true;
			this.waitForB = false;
			this.raceDistance++;
			checkForInRacePosition();
		} else if (this.checkPointC && !this.waitForA){
			this.waitForA = true;
			this.waitForC = false;
			this.raceDistance++;
			checkForInRacePosition();
		}
	 }

     this.wallCollisionCamShake = function() {
         if(this.myName == vehicleList[0].myName){
            cameraP1.shakeCamera(5, 1);
        } else if (this.myName == vehicleList[1].myName){
             cameraP2.shakeCamera(5, 1);
            }
     }

    //Determines what happens when cars drive into a tile, including collisions, jumps, tracking waypoints
    //to measure race progress, etc.
    this.handleTileEffects = function() {

        this.turnRateTileMultiplier = 1; //Start at max possible; reduce based on the tiles that impact steering.

        var drivingIntoTileType = getTrackAtPixelCoord(this.x, this.y);
        var driveIntoTileIndex = getTileTypeAtPixelCoord(this.x, this.y);

        switch (drivingIntoTileType) {

            case TRACK_ROAD:
            case TRACK_ROAD_FIRST:
            case TRACK_ROAD_SECOND:
            case TRACK_ROAD_THIRD:
            case TRACK_ROAD_FOURTH:
            case TRACK_ROAD_FIFTH:
            case TRACK_ROAD_SIXTH:
            case TRACK_ROAD_SEVENTH:
            case TRACK_ROAD_EIGHT:
            case TRACK_ROAD_UP_ARROW:
            case TRACK_ROAD_DWN_ARROW:
            case TRACK_ROAD_LFT_ARROW:
            case TRACK_ROAD_RIT_ARROW:
            case TRACK_ROAD_OIL_SPOT:
            case TRACK_ROAD_LFT_TO_BOT:
            case TRACK_ROAD_TOP_TO_LFT:
            case TRACK_ROAD_TOP_TO_RIT:
            case TRACK_ROAD_BOT_TO_RIT:
            case TRACK_ROAD_TOP_STUB:
            case TRACK_ROAD_BOT_STUB:
            case TRACK_ROAD_RIT_STUB:
            case TRACK_ROAD_LFT_STUB:
                break;

            case TRACK_ROAD_PITSTOP:
                this.setFuel(this.fuelInTank += 0.5);
                break;
            case TRACK_ROAD_AAA:
                this.checkPointA = true;
				this.recordDistance();
                //console.log(`Checkpoint A crossed by ${this.name}`);
                break;
            case TRACK_ROAD_BBB:
                if (this.checkPointA) {
                    this.checkPointB = true;
                    this.checkPointA = false;
					this.recordDistance();
                }
                break;
            case TRACK_ROAD_CCC:
                if (this.checkPointB) {
                    this.checkPointC = true;
                    this.checkPointB = false;
					this.recordDistance();
                }
                break;
            case TRACK_FINISH:
                if (this.checkPointC)
                {
                    this.checkPointC = false;
                    this.recordALap();

                    if (this.lapNumber < 3) {
                        if (this.lapNumber == 2 && !finalLappedCalled) {
                            finallapSound.play();
                            finalLappedCalled = true;
                        }
                    }
                    else
                    {
						this.finishTime = raceTimeElapsed;
                        whichPlace(this);
                        this.updateWayPoints();
						console.log("Car Place Length: " +carPlaces.length);
                    }
                }
				this.recordDistance();
                break;
            case TRACK_OIL_SLICK:
                if (!this.airborne && this.oilSlickRemaining <= 0) {
                    this.oilSlickRemaining = OILSLICK_FRAMECOUNT; //No need to set the turnRateTileMultiplier; oil effects use oilSlickRemaining.
                }
                break;
            case TRACK_ICE_SLICK:
                if (!this.airborne) {
                    this.turnRateTileMultiplier = TURN_RATE_MULTIPLIER_ICE;
                    this.speed *= ICE_ACCELERATION;
                }
                break;
            case TRACK_GRASS:
            case LAKE_GRASS_1:
            case LAKE_GRASS_2:
            case LAKE_GRASS_3:
            case LAKE_GRASS_4:
			case TRACK_SIDEWALK:
			case TRACK_L_SHAPE_HOUSE_E:
			case TRACK_LONG_HOUSE_D:
                if (!this.airborne) {
                    this.turnRateTileMultiplier = TURN_RATE_MULTIPLIER_GRASS;
                    if (this.speed > GRASS_SLOWDOWN_THRESHOLD)
                        this.speed *= GRASS_ACCELERATION;
                }
                break;
            case TRACK_NORTH_RAMP:
                //If the car was further north last frame, then it's entering from the wrong direction.
                var trackCoord = pixelCoordToTrackCoords(this.x, this.y);
                var oldTrackCoord = pixelCoordToTrackCoords(this.oldX, this.oldY);
                if(oldTrackCoord.row < trackCoord.row)
                {
                    this.speed = -WALL_IMPACT_SPEED_MODIFIER * this.speed;
                    this.y = this.oldY -1;
                }

                //Don't jump the car until it's at the end of the jump tile.
                //Don't jump unless it's driving forward and above a minimum speed.
                //Don't jump unles its vector is in the forward direction of the ramp.
                var edgeDistances = getTileEdgeDistances(this.x, this.y);
                if(edgeDistances.north < RAMP_LAUNCH_EDGE_DISTANCE && this.speed > MIN_JUMP_START_SPEED && this.ang < 0 && this.ang > - Math.PI)
                {
                    this.startJump();
                }
                break;
            case TRACK_SOUTH_RAMP:
                //If the car was further south last frame, then it's entering from the wrong direction.
                var trackCoord = pixelCoordToTrackCoords(this.x, this.y);
                var oldTrackCoord = pixelCoordToTrackCoords(this.oldX, this.oldY);
                if(oldTrackCoord.row > trackCoord.row)
                {
                    this.speed = -WALL_IMPACT_SPEED_MODIFIER * this.speed;
                    this.y = this.oldY +1;
                }

                //Don't jump the car until it's at the end of the jump tile.
                //Don't jump unless it's driving forward and above a minimum speed.
                //Don't jump unles its vector is in the forward direction of the ramp.
                var edgeDistances = getTileEdgeDistances(this.x, this.y);
                if(edgeDistances.south < RAMP_LAUNCH_EDGE_DISTANCE && this.speed > MIN_JUMP_START_SPEED && this.ang < -Math.PI && this.ang > - 2*Math.PI)
                {
                    this.startJump();
                }
                break;
		    case TRACK_EAST_RAMP:
                //If the car was further east last frame, then it's entering from the wrong direction.
                var trackCoord = pixelCoordToTrackCoords(this.x, this.y);
                var oldTrackCoord = pixelCoordToTrackCoords(this.oldX, this.oldY);
                if(oldTrackCoord.col > trackCoord.col)
                {
                    this.speed = -WALL_IMPACT_SPEED_MODIFIER * this.speed;
                    this.x = this.oldX +1;
                }

                //Don't jump the car until it's at the end of the jump tile.
                //Don't jump unless it's driving forward and above a minimum speed.
                //Don't jump unles its vector is in the forward direction of the ramp.
                var edgeDistances = getTileEdgeDistances(this.x, this.y);
                if(edgeDistances.east < RAMP_LAUNCH_EDGE_DISTANCE && this.speed > MIN_JUMP_START_SPEED && this.ang < -Math.PI && this.ang > - 2*Math.PI)
                {
                    this.startJump();
                }
                break;
		    case TRACK_WEST_RAMP:
                //If the car was further east last frame, then it's entering from the wrong direction.
                var trackCoord = pixelCoordToTrackCoords(this.x, this.y);
                var oldTrackCoord = pixelCoordToTrackCoords(this.oldX, this.oldY);
                if(oldTrackCoord.col < trackCoord.col)
                {
                    this.speed = -WALL_IMPACT_SPEED_MODIFIER * this.speed;
                    this.x = this.oldX - 1;
                }

                //Don't jump the car until it's at the end of the jump tile.
                //Don't jump unless it's driving forward and above a minimum speed.
                //Don't jump unles its vector is in the forward direction of the ramp.
                var edgeDistances = getTileEdgeDistances(this.x, this.y);
                if(edgeDistances.west < RAMP_LAUNCH_EDGE_DISTANCE && this.speed > MIN_JUMP_START_SPEED && this.ang < -Math.PI && this.ang > - 2*Math.PI)
                {
                    this.startJump();
                }
                break;
            case TRACK_CASH:
                this.cash += 100;
                trackGrid[driveIntoTileIndex] = TRACK_ROAD;
                addTrackImageAtTileIndex(TRACK_ROAD, driveIntoTileIndex);
                break;
            case TRACK_FUEL:
                this.setFuel(this.fuelInTank += 50);
                trackGrid[driveIntoTileIndex] = TRACK_ROAD;
                addTrackImageAtTileIndex(TRACK_ROAD, driveIntoTileIndex);
                break;
            case TRACK_CONE:
                if (!this.airborne) {
                    trackGrid[driveIntoTileIndex] = TRACK_ROAD;
                    addTrackImageAtTileIndex(TRACK_KNOCKED_OVER_CONE, driveIntoTileIndex);
                    this.speed = -.5 * this.speed;
                    if(this.myName == vehicleList[0].myName){
                    cameraP1.shakeCamera(5, 3);
                    } else if (this.myName == vehicleList[1].myName){
                     cameraP2.shakeCamera(5, 3);
                         }
                    this.takeDamage(2);
					crashIntoConeSound.play();
                }
                break;
            case TRACK_OIL_BARREL:
                if (!this.airborne) {
                    trackGrid[driveIntoTileIndex] = TRACK_OIL_SLICK;
                    addTrackImageAtTileIndex(TRACK_OIL_SLICK, driveIntoTileIndex);
                    this.speed = -.5 * this.speed;
                    if(this.myName == vehicleList[0].myName){
                    cameraP1.shakeCamera(5, 15);
                    } else if (this.myName == vehicleList[1].myName){
                     cameraP2.shakeCamera(5, 15);
                         }
                    this.takeDamage(10);
                }
                break;
            case TRACK_ROAD_H_CRACK1:
            case TRACK_ROAD_H_CRACK2:
            case TRACK_ROAD_V_CRACK1:
            case TRACK_ROAD_V_CRACK2:
                if (!this.airborne && this.speed >= 1 ) {
                    this.speed = this.speed * CRACK_SPEED_REDUCTION;
                     if(this.myName == vehicleList[0].myName){
                    cameraP1.shakeCamera(5, 1);
                    } else if (this.myName == vehicleList[1].myName){
                     cameraP2.shakeCamera(5, 1);
                         }
                    this.takeDamage(.2);
                }
                break;
            case TRACK_BRICK_WALL_LEFT:
            case TRACK_BRICK_WALL_LEFT_GRASS:
			case TRACK_TOWN_TREE_ONE:
			case TRACK_TOWN_TREE_TWO:
			case TRACK_TOWN_TREE_THREE:
			case TRACK_TOWN_TREE_FOUR:
			case TRACK_TOWN_TREE_FIVE:
			case TRACK_TOWN_TREE_SIX:
			case TRACK_TOWN_TREE_SEVEN:
			case TRACK_TOWN_TREE_EIGHT:
			case TRACK_TOWN_TREE_NINE:
			case TRACK_TOWN_TREE_TEN:
            case LAKE_BANK_RIGHT:
                if (BOUNCE_OFF_WALLS) {
                    this.wallBounce();
                } else { // old way
                    this.handleWallImpact(RADIANS_90_DEGREES_NEGATIVE);
                    this.x = this.oldX + 1; //Keep pushing car out of wall in the event its gotten stuck deep.
                }
                this.wallCollisionCamShake();
                this.takeDamage(WALL_DAMAGE_PER_FRAME);
                break;
            case TRACK_BRICK_WALL_RIGHT:
            case TRACK_BRICK_WALL_RIGHT_GRASS:
            case LAKE_BANK_LEFT:
                if (BOUNCE_OFF_WALLS) {
                    this.wallBounce();
                } else { // old way
                    this.handleWallImpact(RADIANS_270_DEGREES_NEGATIVE);
                    this.x = this.oldX - 1;
                }
                this.wallCollisionCamShake();
                this.takeDamage(WALL_DAMAGE_PER_FRAME);
                break;
            case TRACK_BRICK_WALL_TOP_MIDDLE:
            case TRACK_BRICK_WALL_TOP_MIDDLE_GRASS:
            case LAKE_BANK_BOTTOM:
                if (BOUNCE_OFF_WALLS) {
                    this.wallBounce();
                } else { // old way
                    this.handleWallImpact(RADIANS_0_DEGREES);
                    this.y = this.oldY + 1;
                }
                this.wallCollisionCamShake();
                this.takeDamage(WALL_DAMAGE_PER_FRAME);
                break;
            case TRACK_BRICK_WALL_BOT_MIDDLE:
            case TRACK_BRICK_WALL_BOT_MIDDLE_GRASS:
            case LAKE_BANK_TOP:
                if (BOUNCE_OFF_WALLS) {
                    this.wallBounce();
                } else { // old way
                    this.handleWallImpact(RADIANS_180_DEGREES_NEGATIVE);
                    this.y = this.oldY - 1;
                }
                this.wallCollisionCamShake();
                this.takeDamage(WALL_DAMAGE_PER_FRAME);
                break;
            //For the wall corners, just bounce the car out enough the driver can hit one of the orthagonal walls instead.
            case TRACK_BRICK_WALL_TOP_LEFT_END:
            case TRACK_BRICK_WALL_TOP_LEFT_END_GRASS:
            case LAKE_TOP_LEFT_INNER:
            case LAKE_BOT_RIGHT_OUTER_1:
            case LAKE_BOT_RIGHT_OUTER_2:
                this.x = this.oldX + 1;
                this.y = this.oldY + 1;
                if (BOUNCE_OFF_WALLS) {
                    this.wallBounce();
                }
                break;
            case TRACK_BRICK_WALL_TOP_RIGHT_END:
            case TRACK_BRICK_WALL_TOP_RIGHT_END_GRASS:
            case LAKE_TOP_RIGHT_INNER:
            case LAKE_BOT_LEFT_OUTER_1:
            case LAKE_BOT_LEFT_OUTER_2:
                this.x = this.oldX - 1;
                this.y = this.oldY + 1;
                if (BOUNCE_OFF_WALLS) {
                    this.wallBounce();
                }
                break;
            case TRACK_BRICK_WALL_BOT_LEFT_END:
            case TRACK_BRICK_WALL_BOT_LEFT_END_GRASS:
            case LAKE_BOT_LEFT_INNER:
            case LAKE_TOP_RIGHT_OUTER_1:
            case LAKE_TOP_RIGHT_OUTER_2:
                this.x = this.oldX + 1;
                this.y = this.oldY - 1;
                if (BOUNCE_OFF_WALLS) {
                    this.wallBounce();
                }
                break;
            case TRACK_BRICK_WALL_BOT_RIGHT_END:
            case TRACK_BRICK_WALL_BOT_RIGHT_END_GRASS:
            case LAKE_BOT_RIGHT_INNER:
            case LAKE_TOP_LEFT_OUTER_1:
            case LAKE_TOP_LEFT_OUTER_2:
                this.x = this.oldX - 1;
                this.y = this.oldY - 1;
                if (BOUNCE_OFF_WALLS) {
                    this.wallBounce();
                }
                break;
            //For other things labelled TRACK_WALL, think it covers interior items.
            case TRACK_WALL:
            case LAKE_WATER_1:
            case LAKE_WATER_2:
            case LAKE_WATER_3:
            case LAKE_WATER_4:
            case LAKE_WATER_5:
                this.x = this.oldX; //Go back to just before the collision (to try to avoid getting stuck in the wall).
                this.y = this.oldY;
                this.speed = -.5 * this.speed;
                //crashIntoConeSound.play();
                if (BOUNCE_OFF_WALLS) {
                    this.wallBounce();
                }
                break;
            default: //Handles collision with solid tiles. Really, this catch-all should generally be avoided.
                console.log("Collided with an unknown tile!");
                this.speed = -.5 * this.speed;
                if (BOUNCE_OFF_WALLS) {
                    this.wallBounce();
                }
        }
    }

    // an alternative to handleWallImpact and hardcoded tile angles
    const DEG_TO_RAD = Math.PI/180; // handy math constant
    const WALL_BOUNCE_ANG_RANGE = 10 * DEG_TO_RAD; // range in radians
    const WALL_BOUNCE_POS_RANGE = 0; // pixel jitter range
    const WALL_BOUNCE_REFLECT_DIST = 2; // pixels to the left or right of car ang
    this.wallBounce = function() { 
        //console.log("WALL BOUNCE!");
        // return to last known "good" pos
        this.x = this.oldX;
        this.y = this.oldY;
        // nudge the car directly left or right of the car ang
        // if we are trying to turn: this is generally what the player wants to happen
        if (this.keyHeld_TurnLeft || this.keyHeld_TurnRight) { // player trying to turn?
            var REFLECTOFS = -90 * DEG_TO_RAD;
            if (this.keyHeld_TurnRight) REFLECTOFS *= -1; // other way
            this.x += Math.cos(this.ang+REFLECTOFS)*WALL_BOUNCE_REFLECT_DIST;
            this.y += Math.sin(this.ang+REFLECTOFS)*WALL_BOUNCE_REFLECT_DIST;
        }
        // randomly jitter the steering wheel
        this.ang += Math.random()*WALL_BOUNCE_ANG_RANGE-WALL_BOUNCE_ANG_RANGE/2;
        // randomly bounce around
        this.x += Math.random()*WALL_BOUNCE_POS_RANGE-WALL_BOUNCE_POS_RANGE/2;
        this.y += Math.random()*WALL_BOUNCE_POS_RANGE-WALL_BOUNCE_POS_RANGE/2;
    }

    //checkAngle is the angle around which to constrain forward travel.
    //Angles within 180degrees counterclockwise of checkAngle indicate travel outside the wall.
    //This function will bounce vehicles back when within the WALL_LOW_IMPACT_THRESHOLD angle from checkAngle.
    //WARNING: This function only works with right angles (0/90/180/270). There is math weirdness around the 0
    //         degree range that hasn't been fully developed to handle bounces off other angles.
    this.handleWallImpact = function(checkAngle) {
        var travelAngle = this.ang;
        var checkAngleOpposite = constrainAngleToNegativeRange(checkAngle + RADIANS_180_DEGREES_NEGATIVE);

        //When passed 180deg, checkAngleOpposite becomes 0 degrees; screws up range checking, so fix it to -360.
        if (checkAngleOpposite == 0) {
            checkAngleOpposite = -RADIANS_360_DEGREES_POSITIVE;
        }

        //When travelling backwards, use the opposite angle as the vector for wall impact calculations.
        if (this.speed < 0) {
            travelAngle += RADIANS_180_DEGREES_NEGATIVE;
            travelAngle = constrainAngleToNegativeRange(travelAngle);
        }

        //Handle wall impact, first for low-angle impacts where car can bounce away.
        if (travelAngle < checkAngle && travelAngle > checkAngle - WALL_LOW_IMPACT_THRESHOLD) {
            if (this.speed > 0) {
                this.ang = checkAngle + WALL_BOUNCE_ANGLE;
            } else {
                this.ang = checkAngleOpposite + WALL_BOUNCE_ANGLE;
            }
            this.speed = this.speed * WALL_BOUNCE_SPEED_MODIFIER;
        } else if (travelAngle < checkAngleOpposite + WALL_LOW_IMPACT_THRESHOLD && travelAngle > checkAngleOpposite) {
            if (this.speed < 0) {
                this.ang = checkAngle - WALL_BOUNCE_ANGLE;
            } else {
                this.ang = checkAngleOpposite - WALL_BOUNCE_ANGLE;
            }
            this.speed = this.speed * WALL_BOUNCE_SPEED_MODIFIER;

        } else //Impact is more head-on.
        {
            this.speed = -WALL_IMPACT_SPEED_MODIFIER * this.speed;
        }

    }

    this.startJump = function() { // WIP:  Need to gradually increase shadow while in air.
        if (!this.airborne) {
            this.zVel = JUMP_START_ZSPEED;
            this.airborne = true;
        }
    }

    this.recordALap = function() {
        this.lapNumber += 1;
        this.lapMinuteTensSpot = raceTimeDigits[5];
        this.lapMinute = raceTimeDigits[4];
        this.lapSecondTensSpot = raceTimeDigits[3];
        this.lapSecond = raceTimeDigits[2];
        this.lapTenthSecond = raceTimeDigits[1];
        this.lapHundredthSecond = raceTimeDigits[0];
    }

    this.isOverLappingPoint = function(testX, testY) {
        var deltaX = testX - this.x;
        var deltaY = testY - this.y;
        var dist = vectorMagnitude(deltaX, deltaY);
        return (dist <= CAR_COLLISION_RADIUS);
    }

    //Handles collisions between cars.
    //Current approach is to bounce cars away from each other and slow them both down.
    //Next possiblity: see if they're travelling nearly in the same direction and give the one in
    //front a slight speed boost while slowing the one behind.
    this.checkCarCollisionAgainst = function(otherCar) {
        if (otherCar.isOverLappingPoint(this.x, this.y)) {
            if (this.airborne || otherCar.airborne || this.finishRace || otherCar.finishRace) {
                return;
            }

            distToMove = CAR_COLLISION_RADIUS / 6; //Determined empirically; will need tweaking.
            //Probably will be replaced in a physics-based model?

            var thisToOther = {}; //Vector to the other car.
            thisToOther.x = otherCar.x - this.x;
            thisToOther.y = otherCar.y - this.y;

            //Start with unit vector between the cars, but increase its size by actual distance to move.
            thisToOther = normalizeVector(thisToOther.x, thisToOther.y);
            thisToOther.x *= distToMove;
            thisToOther.y *= distToMove;

            //Move each car away from the other.
            this.x += -thisToOther.x;
            this.y += -thisToOther.y;
            otherCar.x += thisToOther.x;
            otherCar.y += thisToOther.y;

            //Remove a bit of speed from both cars.
            this.speed *= 0.75;
            otherCar.speed *= 0.75;
        }
    }
	
		
	this.checkMyRocketCollisionAgainst = function(otherCar){
		if(this.myRocket.hitTest(otherCar)){
			otherCar.takeDamage(5)
			this.myRocket.reset();
			document.getElementById("debugText").innerHTML = "Enemy car hit";
		}
	}

    this.drawCar = function(canvasContext) {
        var visualAngAdjust = 0;
        if (this.oilSlickRemaining > 0 && Math.abs(this.speed) >= OIL_SLOW_TRACTION_THRESHOLD) {
            visualAngAdjust = Math.sin(this.oilSlickRemaining * 0.4) * Math.PI / 5;
        }
        
        // headlight beam
        if (USE_HEADLIGHTS) {
            drawBitmapCenteredAtLocationWithRotation(headlightsPic, this.x - (this.z / 4), this.y - (this.z / 2), this.ang + visualAngAdjust, canvasContext);
        }
        
        // shadow
        drawBitmapCenteredAtLocationWithRotation(carShadowPic, this.x, this.y, this.ang + visualAngAdjust, canvasContext);
        var xOffSet = this.x;
        var yOffSet = this.y;
        if (this.airborne) {
            yOffSet = yOffSet - 10;
        }
        
        // car sprite
        drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.x - (this.z / 4), this.y - (this.z / 2), this.ang + visualAngAdjust, canvasContext);
		if(this.highlight){
			drawBitmapCenteredAtLocationWithRotation(highlightPic, this.x - (this.z / 4), this.y - (this.z / 2), this.ang + visualAngAdjust, canvasContext);
			this.highlight = false;
		}
		
        this.myRocket.draw();
		if (debugMode) {
            //Please leave this here but commented out so I don't have to remember how to set it up properly.
            //Draws the red rectangles around cars; use if you're needing some help with collision detection.
            //drawRotatedRectWithLines(this.x - (this.z / 4), this.y - (this.z / 2), CAR_WIDTH + 8, CAR_HEIGHT + 8, this.ang);
            // if (this.computerPlayer) {
	            colorRect(this.x - (this.z / 4), this.y - (this.z / 2), 2, 2, 'red');
	            colorLine(this.x, this.y, this.wayPointX[this.wayPointNumber], this.wayPointY[this.wayPointNumber], 'white')
            // }
        }
        this.drawDamageParticles();
    }

    this.setFuel = function(setFuelAmount) {
        if (isNaN(setFuelAmount)) {
            console.error("Invalid fuel amount sent to setFuel on car: " + this.myName);
            return;
        }
        if (setFuelAmount < 0) {
            setFuelAmount = 0;
        } else if (setFuelAmount > this.fuelCapacity) {
            setFuelAmount = this.fuelCapacity;
        }
        this.fuelInTank = setFuelAmount;
    }

    this.setFuelCapacity = function(setCapacityAmount) {
        if (isNaN(setCapacityAmount)) {
            console.error("Invalid fuel capacity amount sent to setFuelCapacity on car: " + this.myName);
            return;
        }
        this.fuelCapacity = setCapacityAmount;
    }

    this.setFuelConsumptionRate = function(setConsumptionAmount) {
        if (isNaN(setConsumptionAmount)) {
            console.error("Invalid fuel consumption rate amount sent to setFuelConsumptionRate on car: " + this.myName);
            return;
        }
        this.fuelConsumptionRate = setConsumptionAmount;
    }

    this.setHealth = function(setHealthAmount) {
        if (isNaN(setHealthAmount)) {
            console.error("Invalid health amount sent to setHealth on car: " + this.myName);
            return;
        }
        if (setHealthAmount < 0) {
            setHealthAmount = 0;
        } else if (setHealthAmount > this.maxHealth) {
            setHealthAmount = this.maxHealth;
        }
        this.healthRemaining = setHealthAmount;
    }

    this.setShields = function(setShieldAmount) {
        if (isNaN(setShieldAmount)) {
            console.error("Invalid shield amount sent to setShields on car: " + this.myName);
            return;
        }
        if (setShieldAmount < 0) {
            setShieldAmount = 0;
        } else if (setShieldAmount > this.maxShields) {
            setShieldAmount = this.maxShields;
        }
        this.shieldsRemaining = setShieldAmount;
    }

    this.setShieldStrength = function(setShieldStrengthAmount) {
        if (isNaN(setShieldStrengthAmount)) {
            console.error("Invalid shield strength amount sent to setShieldStrength on car: " + this.myName);
            return;
        }
        this.shieldStrength = setShieldStrengthAmount;
    }

    this.setBodyStrength = function(setBodyStrengthAmount) {
        if (isNaN(setBodyStrengthAmount)) {
            console.error("Invalid body strength amount sent to setShields on car: " + this.myName);
            return;
        }
        this.bodyStrength = setBodyStrengthAmount;
    }

    //Taking damage has three stages.
    //First, if there are shields, remove health from them.
    //Then remove from health
    //Then, if health has fallen below zero, explode the car and begin reset routine
    this.takeDamage = function(damageAmount) {
        if (isNaN(damageAmount) || damageAmount <= 0) {
            console.error("Invalid damage amount sent to takeDamage on car: " + this.myName);
            return;
        }

        //The strength of shields reduces incoming damage before being applied to shields, but only if there are shields in place.
        //A lower shieldStrength value indicates better shields (they are mitigating more damage)
        if (this.shieldsRemaining > 0) {
            damageAmount = damageAmount * this.shieldStrength;
            var shieldCheck = this.shieldsRemaining - damageAmount;
            if (shieldCheck < 0) {
                damageAmount = damageAmount - this.shieldsRemaining;
                this.shieldsRemaining = 0;
                // TODO: Some sort of shields down sound or effect
            }
            else if (shieldCheck >= 0 ) {
                damageAmount = damageAmount - this.shieldsRemaining;
                this.shieldsRemaining = shieldCheck;
            } // end of shieldCheck
        } // end of shieldsRemaining

        //bodyStrength works in the same way as shieldStrength.
        //A lower number represents damage mitigated by the body being very strong.
        //A number above 1 would be more damage than actually inflicted!
        if (damageAmount > 0) { // If damageAmount <= 0 then shields have absorbed damage and there is nothing left to do here
            damageAmount = damageAmount * this.bodyStrength;
            var healthCheck = this.healthRemaining - damageAmount;
            if (healthCheck <= 0) {
                this.healthRemaining = healthCheck;
                //Create explosion particles.
                //Set a respawn timer that will show a death message?
                //Reset to starting line.
                if (debugMode && !this.computerPlayer) console.log("Car '" + this.myName + "' is a ghost!")
            }
            else {
                this.healthRemaining = healthCheck;
            } // end of healthCheck
        } // end of damageAmount
    }

    this.addDamageParticles = function() {

        // skip frames so we only spawn particles occasionally
        if (Math.random()>=CHANCE_OF_A_NEW_PARTICLE) return;

        if (this.healthRemaining < this.maxHealth ) {
            var intensityFactor = (this.maxHealth - this.healthRemaining) * 0.01;
            for (var i = 0; i < Math.floor(MAX_DAMAGE_PARTICLES_PER_FRAME * intensityFactor); i++) {
                if (this.damageParticles.length<MAX_PARTICLES_PER_CAR) {
                    var newParticle = new fireParticleClass(this.x, this.y);
                    this.damageParticles.push(newParticle);
                } else { // delete the oldest one instead!
                    //console.log("Car has too many particles! " + this.damageParticles.length);
                }
            }
        }
    }

    this.updateDamageParticles = function() {
        for (var i = 0; i < this.damageParticles.length; i++) {
            this.damageParticles[i].move();
        }

        for (var i = 0; i < this.damageParticles.length; i++) {
            if (this.damageParticles[i].readyToRemove) {
                this.damageParticles.splice(i,1);
            }
        }

        this.addDamageParticles();
    }

    this.drawDamageParticles = function() {
        for (var i = 0; i < this.damageParticles.length; i++) {
            this.damageParticles[i].draw();
        }
    }
}
