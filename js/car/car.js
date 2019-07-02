const DRIVE_POWER = 0.5
const REVERSE_POWER = 0.2;
const MIN_TURN_SPEED = 0.5;
const MIN_JUMP_START_SPEED = 4;
const JUMP_START_ZSPEED = 5;
const GRAVITY = -0.4;
const GROUNDSPEED_DECAY_MULT = 0.94;
const CAR_COLLISION_RADIUS = 15;
const TURN_RATE_NITRO = 0.01;
const TURN_RATE_STANDARD = 0.03;
const TURN_RATE_MULTIPLIER_AIRBORNE = 0.25;
const TURN_RATE_MULTIPLIER_OIL = 0.4;
const TURN_RATE_MULTIPLIER_GRASS = 0.75;
const NITRO_FRAME_DURATION = 10;            //Being measured in frames, so at 30fps this is 1 second.
const NITRO_BOOST_BASE_AMOUNT = 1.8;        //Speed increase per frame.
const NITRO_START_QUANTITY = 5;
const CAR_WIDTH = 28;                       //These are determined from examination of the graphics. May be used for collisions (WIP).
const CAR_HEIGHT = 12;

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
    this.cash = 0;
    this.placedPosition = false;
    this.fuelCapacity = 100;
    this.fuelConsumptionRate = 0.15;
    this.fuelInTank = this.fuelCapacity;
    this.oilslickRemaining = 0;
	this.stopCar = false;
	this.transmissionVersion = 0;
	this.tireVersion = 0;
	this.engineVersion = 0;
	this.nitroVersion = 0;
	this.exhaustVersion = 0;
    this.carPic = document.createElement("img");

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
        this.ang = -0.5 * Math.PI; //Angle is in radians; this rotates the graphic -90 degrees to point car up.
        //Because the graphics on the sheet are oriented pointing to the right.

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

        this.x = this.homeX;
        this.y = this.homeY;
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
        this.lapNumber = 0;
        this.checkPointA = false;
        this.checkPointB = false;
        this.checkPointC = false;
        this.aiRandomMovements = false;
        this.wayPoint = true;
        this.wayPointX = [110, 680, 680, 150];
        this.wayPointY = [110, 100, 500, 500];
        this.level = 0;
        this.stuckTime = 0;
        this.randomMovementsTimer = 0;
        this.placedPosition = false;
        this.oilslickRemaining = 0;
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
        if (this.randomMovementsTimer > 300) {
            this.randomMovementsTimer = 0;
            this.aiRandomMovements = false;
            this.wayPoint = true;
        }
    }

    this.updateWayPoints = function() {
        //this.level = this.level + 1; // this needs to move to a Global
        this.wayPointNumber = 0;
        this.lapNumber = 0;
        this.checkPointA = false;
        this.checkPointB = false;
        this.checkPointC = false;
        console.log("Finish Line");
        if (this.level == 0) {
            //use these way points while racing
            if (!this.placedPosition) {
                this.wayPointX = [55, 60, 160, 180, 180];
                this.wayPointY = [485, 435, 380, 320, 145];

            //use these way points when a place is determined
            } else if (this.myName == firstPlace) {
                this.wayPointX = [ 60,  74, 160, 220, 180];
                this.wayPointY = [500, 420, 380, 300, 140];
				
				//if (this.wayPointNumber >= this.wayPointX.length-1){
					this.stopCar = true;
					console.log("stop car " +this.stopCar);
				//}
            } else if (this.myName == secondPlace) {
                this.wayPointX = [ 60,  74, 160, 220, 220];
                this.wayPointY = [500, 420, 380, 300, 140];
            } else if (this.myName == thirdPlace) {
                this.wayPointX = [ 60,  74, 160, 220, 255];
                this.wayPointY = [500, 420, 380, 300, 140];
            } else if (this.myName == fourthPlace) {
                this.wayPointX = [ 60,  74, 160, 220, 180];
                this.wayPointY = [500, 420, 380, 300, 180];
            } else if (this.myName == fifthPlace) {
                this.wayPointX = [ 60,  74, 160, 229, 220];
                this.wayPointY = [500, 420, 380, 300, 180];
            } else if (this.myName == sixthPlace) {
                this.wayPointX = [ 60,  74, 160, 220, 255];
                this.wayPointY = [500, 420, 380, 300, 180];
            } else if (this.myName == seventhPlace) {
                this.wayPointX = [ 60,  74, 160, 220, 180];
                this.wayPointY = [500, 420, 380, 300, 220];
            } else if (this.myName == eigthPlace) {
                this.wayPointX = [ 60,  74, 160, 220, 220];
                this.wayPointY = [500, 420, 380, 300, 220];
            }
        } else if (this.level == 1) {
            this.wayPointX = [110, 304, 334, 437, 461, 680, 680, 150];
            this.wayPointY = [110, 106, 266, 277, 86, 100, 500, 500];
        } else if (this.level == 2) {
            this.wayPointX = [71, 164, 218, 332, 327, 450, 454, 725, 721, 640, 738, 66];
            this.wayPointY = [243, 167, 76, 134, 411, 355, 96, 104, 246, 313, 508, 512];
        } else if (this.level == 3) {
            this.wayPointX = [110, 680, 680, 150];
            this.wayPointY = [110, 100, 500, 500];
        }
    }

    this.wayPointMovements = function(toX, toY) {
        var wayPointVectorX = toX - this.x;
        var wayPointVectorY = toY - this.y;

        //Subtract Pi/2 accounts for the car image being rotated 90 degrees.
        var carVectorX = Math.cos(this.ang - Math.PI / 2);
        var carVectorY = Math.sin(this.ang - Math.PI / 2);
        var dot = dotProduct(wayPointVectorX, wayPointVectorY, carVectorX, carVectorY);

        if (dot < 0) {
            this.keyHeld_TurnRight = true;
            this.keyHeld_TurnLeft = false;
        } else {
            this.keyHeld_TurnRight = false;
            this.keyHeld_TurnLeft = true;
        }

        if (dist(this.x, this.y, toX, toY) < 20) {
            this.wayPointNumber++;
            if (this.wayPointNumber >= this.wayPointX.length && !this.placedPosition) {
                this.wayPointNumber = 0;
            }
        }
    }

    this.checkIfStuck = function() {
        if (this.speed < 1) {
            this.stuckTime++;
            if (this.stuckTime == 100) {
                this.aiRandomMovements = true;
                this.wayPoint = false;
                this.stuckTime = 0;
            }
        }
    }

    this.checkForLowFuelLevel = function() {
        if (this.fuelInTank <= 20) {
            console.log("Low fuel!");
        }
    }

    this.checkForEmptyTank = function() {
        if (this.fuelInTank < 0) {
            this.fuelInTank = 0
        }
    }

    // tire track constants
    const OILSLICK_FRAMECOUNT = 10; // leave dark oil track marks for n frames
    const OILSLICK_OPACITY = 0.15; // very dark when trailing oil
    const PEEL_OUT_SPEED = 2; // when slow, we leave accelerating tire tracks
    const PEEL_OUT_OPACITY = 0.025; // when starting, how dark are the tracks
    const MAXSPD_FOR_TRAIL = 10; // fade out trail as we approach this speed
    const MAXSPD_TRAIL_OPACITY = 0.025; // very faint when on straighaways
    // FIXME: AI is "always turning"
    const TURNING_SKIDMARK_OPACITY = 0.025; // darker when cornering

    this.skidMarkHandling = function() { // draw tire tracks / skid marks

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

        if (this.oilslickRemaining > 0) {
            this.oilslickRemaining--;
            tireTrackAlpha = OILSLICK_OPACITY; // very dark
        }

        if (tireTrackAlpha < 0) tireTrackAlpha = 0;
        if (tireTrackAlpha > 1) tireTrackAlpha = 1;

        //console.log("Car speed: " + this.speed.toFixed(1) + " Skid alpha: " + tireTrackAlpha.toFixed(1));

        if (tireTrackAlpha > 0.001) {
            tireTracks.add(this.x, this.y, this.ang, tireTrackAlpha);
        }

    }

    //Used to turn on the nitro.
    this.tryNitroBoost = function () {
        if (this.nitroBoostQuantity > 0 && !this.nitroBoostOn) {
            this.nitroBoostQuantity--;
            this.nitroBoostTime = NITRO_FRAME_DURATION;
            this.nitroBoostOn = true;
        }
    }

    //Consume nitro and turn off if duration elapsed.
    this.updateNitro = function ()
    {
        if(this.nitroBoostOn)
        {
            this.nitroBoostTime--;
            if(this.nitroBoostTime <=0)
            {
                this.nitroBoostOn = false;
            }
        }
    }

    this.movement = function () {

        if (this.computerPlayer) {
            this.doComputerPlayerDriving(); //Determines their steering and throttle.
        }
        this.updateCarSpeedAndTurnRate();
        this.updateCarPositionAndAngle();
        this.handleTileEffects();
        this.trackTime();
        this.skidMarkHandling();
    }

    this.doComputerPlayerDriving = function()
    {
        if (this.aiRandomMovements) {
            this.randomMovements();
        }
        if (this.wayPoint) {
            this.wayPointMovements(this.wayPointX[this.wayPointNumber], this.wayPointY[this.wayPointNumber]);
            if (this.stopCar) {
                this.keyHeld_Gas = false;
            } else {
                this.keyHeld_Gas = true;
            }
            this.keyHeld_Reverse = false;
            this.checkIfStuck();
        }
    }

    this.updateCarSpeedAndTurnRate = function () {

        if (!this.airborne)  //Handle changes in speed for vehicles on the ground.
        {
            this.speed *= GROUNDSPEED_DECAY_MULT;

            if (this.keyHeld_Gas) {
                if (this.fuelInTank > 0) {
                    this.speed += DRIVE_POWER;
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
        }


        //Determine base turn rate.
        this.turnRate = TURN_RATE_STANDARD;
        if (this.nitroBoostOn)
        {
            this.turnRate = TURN_RATE_NITRO;
        }

        //With the base rate determined, the following will lower it further based on driving conditions.

        //Lower turn rate if airborne. Allows for a tiny bit of steering in defiance of physics!
        if (this.airborne) 
        {
            this.turnRate *= TURN_RATE_MULTIPLIER_AIRBORNE;
        }

        else //On the ground; degrade rate by tile effects and if tires are oil-slicked.
        {
            this.turnRate *= this.turnRateTileMultiplier;
            if (this.oilslickRemaining > 0)
            {
                this.turnRate *= TURN_RATE_MULTIPLIER_OIL;
            }
        }

        this.updateNitro();  //Needs to be done after the above code so that speed is used for one frame before being "consumed".
                             //Do it during the speed increase and you would miss the turn rate penalty!


    }

    this.updateCarPositionAndAngle = function () {

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
            }
            else {
                this.airborne = false;
                this.z = 0;
                this.zVel = 0;
            }
        }

        //Update steering angle.
        if (Math.abs(this.speed) >= MIN_TURN_SPEED) {
            if (this.keyHeld_TurnLeft) {
                this.ang -= this.turnRate * Math.PI;
            }
            if (this.keyHeld_TurnRight) {
                this.ang += this.turnRate * Math.PI;
            }
        }

    }

    this.handleTileEffects = function () {

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
                break;
            case TRACK_ROAD_AAA:
                this.checkPointA = true;
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
                        this.recordALap();
                    } else {
                        whichPlace(this);
                        this.updateWayPoints();
                    }
                }
                break;
            case TRACK_OIL_SLICK:
                if (!this.airborne) {
                    this.oilslickRemaining = OILSLICK_FRAMECOUNT; //No need to set the turnRateTileMultiplier; oil effects use oilSlickRemaining.
                }
                break;
            case TRACK_GRASS:
                if(!this.airborne)
                {
                    this.turnRateTileMultiplier = TURN_RATE_MULTIPLIER_GRASS;
                    this.speed *= 0.5;
                }
                break;
            case TRACK_NORTH_RAMP:
                if (this.speed > MIN_JUMP_START_SPEED) {
                    this.startJump();
                }
                break;
			case TRACK_CASH:
				this.cash += 100;
				trackGrid[driveIntoTileIndex] = TRACK_ROAD;
				terrainChanged = true;				
				break;
			case TRACK_FUEL:
				this.fuelInTank += 50;
				if(this.fuelInTank > 100){
					this.fuelInTank = 100;
				}
				trackGrid[driveIntoTileIndex] = TRACK_ROAD;
				terrainChanged = true;				
				break;
            case TRACK_WALL:
                this.x = this.oldX; //Go back to just before the collision (to try to avoid getting stuck in the wall).
                this.y = this.oldY;
                this.speed = -.5 * this.speed;
                crashIntoConeSound.play();
            default: //Handles collision with solid tiles (interior wall block and track border)
                this.speed = -.5 * this.speed;
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
        if (otherCar.isOverLappingPoint(this.x, this.y))
        {
            distToMove = CAR_COLLISION_RADIUS / 6;  //Determined empirically; will need tweaking.
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

    this.drawCar = function() {
        drawBitmapCenteredAtLocationWithRotation(carShadowPic, this.x, this.y, this.ang);
        var xOffSet = this.x;
        var yOffSet = this.y;
        if (this.airborne) {
            yOffSet = yOffSet - 10;
			//TO DO - don't collide with anything except the perimeter wall
        }
        drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.x - (this.z / 4), this.y - (this.z / 2), this.ang);
        if (debugMode) {
            drawRotatedRectWithLines(this.myBitmap, this.x - (this.z / 4), this.y - (this.z / 2), CAR_WIDTH + 8, CAR_HEIGHT + 8, this.ang);
            colorRect(this.x - (this.z / 4), this.y - (this.z / 2), 2, 2, 'red');
            colorLine(this.x, this.y, this.wayPointX[this.wayPointNumber], this.wayPointY[this.wayPointNumber], 'white')
        }
    }

    this.setFuel = function(setFuelAmount) {
        if (isNaN(setFuelAmount)) {
            return;
        }
        if (setFuelAmount < 0) {
            setFuelAmount = 0;
        } else if (setFuelAmount > this.fuelCapacity) {
            setFuelAmount = this.fuelCapacity
        }
        this.fuelInTank = setFuelAmount
    }
}