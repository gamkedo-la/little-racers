const DEBUG_AI = false;                     // verbose console log used for AI debugging
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
const JUMP_START_ZSPEED = 5;
const GRAVITY = -0.4;
const CAR_COLLISION_RADIUS = 15;
const WALL_LOW_IMPACT_THRESHOLD = Math.PI / 6;
const WALL_BOUNCE_ANGLE = Math.PI / 36; //When cars hit the wall at a low angle, they bounce off at this angle.
const WALL_BOUNCE_SPEED_MODIFIER = 0.85; //Low-angle impact speed reduction.
const WALL_IMPACT_SPEED_MODIFIER = 0.7; //Head-on collion speed reduction.
const GRASS_SLOWDOWN_THRESHOLD = 0.6;
const GRASS_ACCELERATION = 0.9; //Modifier to approach the maximum grass speed.
const TURN_RATE_NITRO = 0.01;
const TURN_RATE_STANDARD = 0.03;
const TURN_RATE_MULTIPLIER_AIRBORNE = 0.25;
const TURN_RATE_MULTIPLIER_OIL = 0.0;
const TURN_RATE_MULTIPLIER_GRASS = 0.75;
const NITRO_FRAME_DURATION = 30; //Being measured in frames, so at 30fps this is 1/3 second.
const NITRO_BOOST_BASE_AMOUNT = .5; //Speed increase per frame.
const NITRO_START_QUANTITY = 5;
const AI_BRAKING_DISTANCE = 50;   //Measured from car center.
const AI_BRAKING_OBSERVATION_ANGLE_90 = 0.707;
const AI_BRAKING_OBSERVATION_ANGLE_110 = 0.5743;
const AI_STUCK_TIME_FRAMES = 10;
const AI_RANDOM_MOVEMENT_FRAMES = 30;
const CAR_WIDTH = 28; //These are determined from examination of the graphics. May be used for collisions (WIP).
const CAR_HEIGHT = 12;
const CAR_LOW_FUEL_LEVEL = 20; // Displays low fuel indicator when fuelInTank is lower than val
const MAX_DAMAGE_PARTICLES_PER_FRAME = 30;

var finalLappedCalled = false;

function carClass() {
    this.x = 60;
    this.y = 60;
    this.oldX = this.x;
    this.oldY = this.y;
    this.z = 0;
    this.zVel = 0;

    this.turnRate = TURN_RATE_STANDARD;
    this.turnRateTileMultiplier = 1;
    this.keyHeld_Gas = false;
    this.keyHeld_Reverse = false;
    this.keyHeld_TurnLeft = false;
    this.keyHeld_TurnRight = false;
    this.keyHeld_Nitro = false;
    this.computerPlayer = false;
    this.runTime = 0.0
    this.nitroBoostOn = false;
    this.wayPointNumber = 0;
    this.wayPointNumberPrev = 0;
    this.wrongDirectionTimerInterval = 150;
    this.wrongDirectionTimer = 0;
    this.wrongDirectionTimerPrev = 0;
    this.wrongDirection = false;
    this.cash = 2000;
    this.placedPosition = false;
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

    this.setupControls = function(forwardKey, backKey, leftKey, rightKey, nitroKey) {
        this.controlKeyForGas = forwardKey;
        this.controlKeyForReverse = backKey;
        this.controlKeyForTurnLeft = leftKey;
        this.controlKeyForTurnRight = rightKey;
        this.controlKeyForNitro = nitroKey;
    }

    this.carReset = function(whichGraphic, whichName, computer) {
        this.name = whichName;
        this.myCarPic = whichGraphic;
        this.speed = 0;
        this.placedPosition = false;
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
        this.wayPointX = levelList[levelNow].wayPointsX.slice();
        this.wayPointY = levelList[levelNow].wayPointsY.slice();
        this.x = this.homeX;
        this.y = this.homeY;

        this.wrongDirection = false;
        this.wrongDirectionTimer = 0;
        this.wrongDirectionTimerPrev = 0;
        this.wayPointNumberPrev = 0;
    }

    this.carInit = function(whichGraphic, whichName, computer) {
        this.myBitmap = whichGraphic;
        this.myName = whichName;
        this.carReset(whichGraphic, whichName, computer);
        this.computerPlayer = computer;
        this.nitroBoostOn = false;
        this.nitroBoostQuantity = NITRO_START_QUANTITY;
        this.nitroBoostTime = 0; //Time (frames) of boost remaining.
        this.airborne = false;
        this.startTime = now;
        this.xOffSet = this.x;
        this.yOffSet = this.y;
        this.runTime = 0.0;
        this.tenthSecond = 0;
        this.second = 0;
        this.secondTensSpot = 0;
        this.minute = 0;
        this.minuteTensSpot = 0;
        this.lapTenthSecond = 0;
        this.lapSecond = 0;
        this.lapSecondTensSpot = 0;
        this.lapMinute = 0;
        this.lapMinuteTensSpot = 0;
        this.lapNumber = 3;
        this.checkPointA = false;
        this.checkPointB = false;
        this.checkPointC = false;
        this.aiRandomMovements = false;
        this.wayPoint = true;
        this.wayPointX = levelList[levelNow].wayPointsX.slice();
        this.wayPointY = levelList[levelNow].wayPointsY.slice();
        this.level = 0;
        this.stuckTime = 0;
        this.randomMovementsTimer = 0;
        this.placedPosition = false;
        this.oilSlickRemaining = 0;
        this.damageParticles = [];
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
        if (!this.placedPosition) {
        	// do you boo
        } else { //use these way points when a place is determined
        	this.wayPointX = levelList[levelNow].placementWayPointsX.slice();
    		this.wayPointY = levelList[levelNow].placementWayPointsY.slice();
			// this works for first place
            // every other place uses first place as a template
            if (this.myName != firstPlace) {
            	this.findMyProperFinishSpot();
       		}
        }
    }

    this.wayPointMovements = function(toX, toY, isComputerPlayer = this.computerPlayer) {
        var wayPointVectorX = toX - this.x;
        var wayPointVectorY = toY - this.y;

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
                if (dot < - dotTurningLimit) {// if result of the dot is much bigger or much lesser than 0 that means car has to make a big turn and it has to slow down.
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
                if (dot > dotTurningLimit) {
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
        var hitWaypointDistance = 27;
        var d = dist(this.x, this.y, toX, toY);
        if (d <= hitWaypointDistance) {
            this.wayPointNumber++;
            if (this.wayPointNumber >= this.wayPointX.length) {
                if (!this.placedPosition) {
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
		switch (this.myName) {
			case secondPlace:
				this.wayPointX[lastIndex] += TRACK_W;
				break;
			case thirdPlace:
				this.wayPointX[lastIndex] += TRACK_W * 2;
				break;
			case fourthPlace:
				this.wayPointY[lastIndex] += TRACK_H;
				break;
			case fifthPlace:
				this.wayPointX[lastIndex] += TRACK_W;
				this.wayPointY[lastIndex] += TRACK_H;
				break;
			case sixthPlace:
				this.wayPointX[lastIndex] += TRACK_W * 2;
				this.wayPointY[lastIndex] += TRACK_H;
				break;
			case seventhPlace:
				this.wayPointY[lastIndex] += TRACK_H * 2;
				break;
			case eigthPlace:
				this.wayPointX[lastIndex] += TRACK_W;
				this.wayPointY[lastIndex] += TRACK_H * 2;
				break;
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

            if (this.keyHeld_Gas) { // no smoke when gliding/braking?
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

            // FIXME: draw on both cameras if splitscreen?
            // FIXME: assumes aspect ratio of 800x600 canvas
            SmokeFX.add(
                this.x-cameraP1.panX+ofsx,
                this.y-cameraP1.panY+ofsy,
                (Math.cos(this.ang)*this.speed*(-SMOKESPEED*spdboost)) + ((Math.random()-0.5)*RANDSPEED),
                (Math.sin(this.ang)*this.speed*(-SMOKESPEED*spdboost)) + ((Math.random()-0.5)*RANDSPEED),
                rgb, 16);
            }

            // pending ground pound (landed from a ramp jump)
            if (justHitTheGround) {
                justHitTheGround = false;
                for (var loop=0; loop<16; loop++) {
                    SmokeFX.add(
                        this.x-cameraP1.panX + ((Math.random()-0.5)*10),
                        this.y-cameraP1.panY + ((Math.random()-0.5)*10),
                        ((Math.random()-0.5)*800),
                        ((Math.random()-0.5)*500),
                        [Math.random()*0.5,Math.random()*0.5,Math.random()*0.5], 16);
                }
            }
        }

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

        if (this.computerPlayer) {
            this.doComputerPlayerDriving(); //Determines their steering and throttle.
        } else {
            this.checkIfWrongDirection();
        }
        this.updateCarSpeedAndTurnRate();
        this.updateCarPositionAndAngle();
        this.handleTileEffects();
        this.trackTime();
        this.skidMarkHandling();
        this.updateDamageParticles();
    }

    //Handle AI steering and throttle
    this.doComputerPlayerDriving = function() {

        if (this.stopCar) { //Car stopped due to things like being done the race and parked.
            this.keyHeld_Gas = false;
            this.speed = 0;
            this.ang = -Math.PI / 2;
            return;
        }
        else
        {
            if (this.isAnotherCarNearAndInFront())
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
                this.wayPointX = 150; //test Pitstop for first level
                this.wayPointY = 460;
            }
        }
    }

    //Check if there is at least one car in front and the AI may want to brake.
    //This is pretty inefficient. Ideally, we could check all interactions and record the state, then make the decision later.
    //But since we're doing this as part of the movement for each car, we'll need to check it every time.
    //To save some overhead, return as soon as a close car in front is found.
    this.isAnotherCarNearAndInFront = function()
    {
        for (var i = 0; i < vehicleList.length; i++) {
            if (this != vehicleList[i])
            {
                var distance = dist(this.x, this.y, vehicleList[i].x, vehicleList[i].y);

                if(distance < AI_BRAKING_DISTANCE)
                {
                    //Get this car's driving vector (unit vector).
                    var carVectorX = Math.cos(this.ang);
                    var carVectorY = Math.sin(this.ang);

                    //Get the unit vector to the other car.
                    var vecToOtherCar = {}
                    vecToOtherCar.x = vehicleList[i].x - this.x;
                    vecToOtherCar.y = vehicleList[i].y - this.y;
                    vecToOtherCar = normalizeVector(vecToOtherCar.x, vecToOtherCar.y);

                    var dot = dotProduct(carVectorX, carVectorY, vecToOtherCar.x, vecToOtherCar.y);

                    //This check tests two things:
                    // 1) Dot product greater than 0 means the other car is in front of this car. (Vectors are in the same direction)
                    // 2) Since they were both unit vectors the result will always be from -1..1. A 45 degree angle between the vectors
                    //    gives a result of 0.707. So checking for > 0.707 means the other car is within a 90 degree window of this car.
                    if (dot > AI_BRAKING_OBSERVATION_ANGLE_90)
                    {
                        return true;
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
            if (this.keyHeld_Gas) {
            	if (this.placedPosition) {
            		if (this.speed > 3) {
            			this.speed = 3;
            		}
            	}
                if (this.fuelInTank > 0) {

                    //Add in basic speed boost every car gets.
                    this.speed += DRIVE_POWER;

                    //Add in engine effects.
                    this.speed += this.engineVersion/ENGINE_BOOST_LEVEL_DIVISOR;

                    //Add in transmission effects for extra increase when at lower speeds.
                    //transmissionBoostScale will be large when car is slow/stopped, getting smaller and going to 0 when approachign cutoff speed.
                    var transmissionBoostScale = TRANSMISSION_BOOST_CUTOFF_SPEED- clamp(0, this.speed, TRANSMISSION_BOOST_CUTOFF_SPEED);
                    var transmissionBoostAmount = transmissionBoostScale*this.transmissionVersion/TRANSMISSION_BOOST_LEVEL_DIVISOR;
                    this.speed += transmissionBoostAmount;

                    if (!debugMode) { //don't remove fuel while in debug mode
                        this.fuelInTank -= DRIVE_POWER * this.fuelConsumptionRate
                    }
                    this.checkForLowFuelLevel()
                    this.checkForEmptyTank()
                }
                if (this.keyHeld_Nitro) { //Don't engage nitro if player is backing up!
                    this.tryNitroBoost();
                }
            }

            if (this.keyHeld_Reverse) {
                if (this.fuelInTank > 0) {
                    this.speed -= REVERSE_POWER;
                    this.fuelInTank -= REVERSE_POWER * this.fuelConsumptionRate
                    this.checkForEmptyTank()
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
            if (this.oilSlickRemaining > 0) {
                this.turnRate *= TURN_RATE_MULTIPLIER_OIL;
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
            case TRACK_ROAD_H_CRACK1:
            case TRACK_ROAD_H_CRACK2:
            case TRACK_ROAD_LFT_TO_BOT:
            case TRACK_ROAD_V_CRACK1:
            case TRACK_ROAD_V_CRACK2:
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
                //console.log(`Checkpoint A crossed by ${this.name}`);
                break;
            case TRACK_ROAD_BBB:
                if (this.checkPointA) {
                    this.checkPointB = true;
                    this.checkPointA = false;
                }
                break;
            case TRACK_ROAD_CCC:
                if (this.checkPointB) {
                    this.checkPointC = true;
                    this.checkPointB = false;
                }
                break;
            case TRACK_FINISH:
                if (this.checkPointC) {
                    this.checkPointC = false;
                    if (this.lapNumber < 3) {
                        if (this.lapNumber == 2 && !finalLappedCalled) {
                            finallapSound.play();
                            finalLappedCalled = true;
                        }
                        this.recordALap();
                    } else {
                        whichPlace(this);
                        this.updateWayPoints();
                    }
                }
                break;
            case TRACK_OIL_SLICK:
                if (!this.airborne && this.oilSlickRemaining <= 0) {
                    this.oilSlickRemaining = OILSLICK_FRAMECOUNT; //No need to set the turnRateTileMultiplier; oil effects use oilSlickRemaining.
                    console.log("car to slip");
                    /* if (this.oilSlickRemaining > 0) {
                        var wobbleSpeed = 1;
                        var wobbleSize = .3;
                        this.ang += Math.sin (this.oilSlickRemaining  * wobbleSpeed) * wobbleSize * (this.oilSlickRemaining/OILSLICK_FRAMECOUNT);
                    }
                   */
                

                }
                break;
            case TRACK_GRASS:
                if (!this.airborne) {
                    this.turnRateTileMultiplier = TURN_RATE_MULTIPLIER_GRASS;
                    if (this.speed > GRASS_SLOWDOWN_THRESHOLD)
                        this.speed *= GRASS_ACCELERATION;
                }
                break;
            case TRACK_NORTH_RAMP:
                if (this.speed < 0 ||
                    (this.ang < -Math.PI && this.ang > -2 * Math.PI)) {
                    this.x = this.oldX;
                    this.y = this.oldY;
                    this.speed = -.5 * this.speed;
                }
                if (this.speed > MIN_JUMP_START_SPEED) {
                    this.startJump();
                }
                break;
            case TRACK_SOUTH_RAMP:
                if (this.speed < 0 ||
                    (this.ang < -Math.PI && this.ang < -3 * Math.PI)) {
                    this.x = this.oldX;
                    this.y = this.oldY;
                    this.speed = -.5 * this.speed;
                }
                if (this.speed > MIN_JUMP_START_SPEED) {
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
                }
                break;
            case TRACK_OIL_BARREL:
                if (!this.airborne) {
                    trackGrid[driveIntoTileIndex] = TRACK_ROAD;
                    addTrackImageAtTileIndex(TRACK_OIL_SLICK, driveIntoTileIndex);
                    this.speed = -.5 * this.speed;
                    if(this.myName == vehicleList[0].myName){
                    cameraP1.shakeCamera(5, 15);
                    } else if (this.myName == vehicleList[1].myName){
                     cameraP2.shakeCamera(5, 15);
                         }
                }
                break;
            case TRACK_BRICK_WALL_LEFT:
            case TRACK_BRICK_WALL_LEFT_GRASS:
                this.handleWallImpact(RADIANS_90_DEGREES_NEGATIVE);
                this.x = this.oldX + 1; //Keep pushing car out of wall in the event its gotten stuck deep.
                break;
            case TRACK_BRICK_WALL_RIGHT:
            case TRACK_BRICK_WALL_RIGHT_GRASS:
                this.handleWallImpact(RADIANS_270_DEGREES_NEGATIVE);
                this.x = this.oldX - 1;
                break;
            case TRACK_BRICK_WALL_TOP_MIDDLE:
            case TRACK_BRICK_WALL_TOP_MIDDLE_GRASS:
                this.handleWallImpact(RADIANS_0_DEGREES);
                this.y = this.oldY + 1;
                break;
            case TRACK_BRICK_WALL_BOT_MIDDLE:
            case TRACK_BRICK_WALL_BOT_MIDDLE_GRASS:
                this.handleWallImpact(RADIANS_180_DEGREES_NEGATIVE);
                this.y = this.oldY - 1;
                break;
            //For the wall corners, just bounce the car out enough the driver can hit one of the orthagonal walls instead.
            case TRACK_BRICK_WALL_TOP_LEFT_END:
            case TRACK_BRICK_WALL_TOP_LEFT_END_GRASS:
                this.x = this.oldX + 1;
                this.y = this.oldY + 1;
                break;
            case TRACK_BRICK_WALL_TOP_RIGHT_END:
            case TRACK_BRICK_WALL_TOP_RIGHT_END_GRASS:
                this.x = this.oldX - 1;
                this.y = this.oldY + 1;
                break;
            case TRACK_BRICK_WALL_BOT_LEFT_END:
            case TRACK_BRICK_WALL_BOT_LEFT_END_GRASS:
                this.x = this.oldX + 1;
                this.y = this.oldY - 1;
                break;
            case TRACK_BRICK_WALL_BOT_RIGHT_END:
            case TRACK_BRICK_WALL_BOT_RIGHT_END_GRASS:
                this.x = this.oldX - 1;
                this.y = this.oldY - 1;
                break;
            //For other things labelled TRACK_WALL, think it covers interior items.
            case TRACK_WALL:
                this.x = this.oldX; //Go back to just before the collision (to try to avoid getting stuck in the wall).
                this.y = this.oldY;
                this.speed = -.5 * this.speed;
                //crashIntoConeSound.play();
                break;
            default: //Handles collision with solid tiles. Really, this catch-all should generally be avoided.
                this.speed = -.5 * this.speed;
        }
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
        this.lapTenthSecond = this.tenthSecond;
        this.lapSecond = this.second;
        this.lapSecondTensSpot = this.secondTensSpot;
        this.lapMinute = this.minute;
        this.lapMinuteTensSpot = this.minuteTensSpot;
    }

    this.trackTime = function() {
        this.runTime = now - this.startTime; // 00:00:0  Minutes : Seconds : MiliSeconds
        if (this.runTime >= 1000) {
            this.runTime = 0;
            this.tenthSecond += 1;
        }
        if (this.tenthSecond >= 10) {
            this.tenthSecond = 0;
            this.second += 1;
        }
        if (this.second >= 10) {
            this.second = 0;
            this.secondTensSpot += 1;
        }
        if (this.secondTensSpot >= 6) {
            this.secondTensSpot = 0;
            this.minute += 1;
        }
        if (this.minute >= 10) {
            this.minute = 0;
            this.minuteTensSpot += 1;
        }
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
            if (this.airborne || otherCar.airborne || this.placedPosition || otherCar.placedPosition) {
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

    this.drawCar = function(canvasContext) {
        var visualAngAdjust = 0;
        if (this.oilSlickRemaining > 0) {
            visualAngAdjust = Math.sin(this.oilSlickRemaining * 0.4) * Math.PI / 5;
        }
        drawBitmapCenteredAtLocationWithRotation(carShadowPic, this.x, this.y, this.ang + visualAngAdjust, canvasContext);
        var xOffSet = this.x;
        var yOffSet = this.y;
        if (this.airborne) {
            yOffSet = yOffSet - 10;
        }
        drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.x - (this.z / 4), this.y - (this.z / 2), this.ang + visualAngAdjust, canvasContext);
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

    this.takeDamage = function(damageAmount) {
        if (isNaN(damageAmount) || damageAmount <= 0) {
            console.error("Invalid damage amount sent to takeDamage on car: " + this.myName);
            return;
        }

        if (this.shieldsRemaining > 0) {
            damageAmount = damageAmount * this.shieldStrength;
            var shieldCheck = this.shieldsRemaining - damageAmount;
            if (shieldCheck < 0) {
                damageAmount = damageAmount - this.shieldsRemaining;
                this.shieldsRemaining = 0;
                if (DEBUG_AI) console.log("Car '" + this.myName + "' has lost all shields!");
                // TODO: Some sort of shields down sound or effect
            } else if (shieldCheck >= 0 ) {
                damageAmount = damageAmount - this.shieldsRemaining;
                this.shieldsRemaining = shieldCheck;
            } // end of shieldCheck
        } // end of shieldsRemaining

        if (damageAmount > 0) {
            damageAmount = damageAmount * this.bodyStrength;
            var healthCheck = this.healthRemaining - damageAmount;
            if (healthCheck <= 0) {
                // TODO: Car aslpode! Game over!
                if (DEBUG_AI) console.log('Car: ' + this.myName + ' is a ghost!')
            } else {
                this.healthRemaining = healthCheck;
                if (DEBUG_AI) console.log("Car '" + this.myName + "' took " + damageAmount + " points damage!");
            } // end of healthCheck
        } else {
            if (DEBUG_AI) console.log("All damage absorbed by shields for car: " + this.myName + ", Shields: " + this.shieldsRemaining + ", Health: " + this.healthRemaining);
            return;
        } // end of damageAmount
    }

    this.addDamageParticles = function() {
        if (this.healthRemaining < this.maxHealth ) {
            for (var i = 0; i < MAX_DAMAGE_PARTICLES_PER_FRAME; i++) {
                var newParticle = new simpleParticleClass(this.x, this.y);
                this.damageParticles.push(newParticle);
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
