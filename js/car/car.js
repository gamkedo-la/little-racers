const DRIVE_POWER = 0.5
const REVERSE_POWER = 0.2;
const MIN_TURN_SPEED = 0.5;
const MIN_JUMP_START_SPEED = 4;
const JUMP_START_ZSPEED = 5;
const GRAVITY = -0.4;
const GROUNDSPEED_DECAY_MULT = 0.94;
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
const TURN_RATE_MULTIPLIER_OIL = 0.4;
const TURN_RATE_MULTIPLIER_GRASS = 0.75;
const NITRO_FRAME_DURATION = 10; //Being measured in frames, so at 30fps this is 1/3 second.
const NITRO_BOOST_BASE_AMOUNT = 1.8; //Speed increase per frame.
const NITRO_START_QUANTITY = 5;
const AI_BRAKING_DISTANCE = 50;   //Measured from car center.
const AI_BRAKING_OBSERVATION_ANGLE_90 = 0.707;
const AI_BRAKING_OBSERVATION_ANGLE_110 = 0.5743;
const AI_STUCK_TIME_FRAMES = 10;
const AI_RANDOM_MOVEMENT_FRAMES = 30;
const CAR_WIDTH = 28; //These are determined from examination of the graphics. May be used for collisions (WIP).
const CAR_HEIGHT = 12;

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
    this.cash = 2000;
    this.placedPosition = false;
    this.fuelCapacity = 100;
    this.fuelConsumptionRate = 0.15;
    this.fuelInTank = this.fuelCapacity;
    this.oilslickRemaining = 0;
    this.stopCar = false;
    this.findPitStop = false;
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
        this.placedPosition = false;
        this.stopCar = false;
        this.maxSpeed = MAXSPD_FOR_TRAIL;
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
        this.lapNumber = 3;
        this.checkPointA = false;
        this.checkPointB = false;
        this.checkPointC = false;
        this.aiRandomMovements = false;
        this.wayPoint = true;
        this.wayPointX = [110, 680, 680, 150];
        this.wayPointY = [110, 100, 500, 500];
        //this.wayPointX = levelList[levelNow].wayPointsX.slice();
        //this.wayPointY = levelList[levelNow].wayPointsY.slice();
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
        console.log("Finish Line");
        if (this.level == 0) {
            //use these way points while racing
            if (!this.placedPosition) {
                this.wayPointX = [55, 60, 160, 180, 180];
                this.wayPointY = [485, 435, 380, 320, 145];

                //use these way points when a place is determined
            } else {
            	this.wayPointX = [ 100, /*74,*/ 160, 220];
                this.wayPointY = [ 500, /*420,*/ 380, 300];
                if (this.myName == firstPlace) {
                    this.wayPointX.push(180);
                    this.wayPointY.push(140);
                } else if (this.myName == secondPlace) {
                    this.wayPointX.push(220);
                    this.wayPointY.push(140);
                } else if (this.myName == thirdPlace) {
                    this.wayPointX.push(255);
                    this.wayPointY.push(140);
                } else if (this.myName == fourthPlace) {
                    this.wayPointX.push(180);
                    this.wayPointY.push(180);
                } else if (this.myName == fifthPlace) {
                    this.wayPointX.push(220);
                    this.wayPointY.push(180);
                } else if (this.myName == sixthPlace) {
                    this.wayPointX.push(255);
                    this.wayPointY.push(180);
                } else if (this.myName == seventhPlace) {
                    this.wayPointX.push(180);
                    this.wayPointY.push(220);
                } else if (this.myName == eigthPlace) {
                    this.wayPointX.push(220);
                    this.wayPointY.push(220);
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
        }
    }

    this.wayPointMovements = function(toX, toY) {
        var wayPointVectorX = toX - this.x;
        var wayPointVectorY = toY - this.y;


        //When calculating the car's vector, subtract 90 degrees from it
        //to allow for dot product to give a -ve to +ve result, indicating if car
        //needs to steer left or right.
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
            if (this.wayPointNumber >= this.wayPointX.length) {
                if (!this.placedPosition) {
                    this.wayPointNumber = 0;
                } else {
                    this.stopCar = true;
                    console.log("stop car " + this.stopCar);
                }
            }
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
        if (this.fuelInTank <= 20) {
            console.log("Low fuel!");
            this.findPitStop = true;
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

        if (SMOKE_FX_ENABLED) {
            SmokeFX.add(this.x-camPanX, this.y-camPanY, // FIXME: why offset
                Math.cos(this.ang)*this.speed*-2 +Math.random()-0.5,
                Math.sin(this.ang)*this.speed*-2 +Math.random()-0.5,
                [0.25,0.25,0.2], 16);
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
    this.tryNitroBoost = function() {
        if (this.nitroBoostQuantity > 0 && !this.nitroBoostOn) {
            this.nitroBoostQuantity--;
            this.nitroBoostTime = NITRO_FRAME_DURATION * (this.nitroVersion + 1);
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

    //The priary movement function; everything a car does starts here.
    this.movement = function() {

        if (this.computerPlayer) {
            this.doComputerPlayerDriving(); //Determines their steering and throttle.
        }
        this.updateCarSpeedAndTurnRate();
        this.updateCarPositionAndAngle();
        this.handleTileEffects();
        this.trackTime();
        this.skidMarkHandling();
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
            if (this.oilslickRemaining > 0) {
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
            case TRACK_ROAD_PITSTOP:
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
                if (!this.airborne) {
                    this.oilslickRemaining = OILSLICK_FRAMECOUNT; //No need to set the turnRateTileMultiplier; oil effects use oilSlickRemaining.
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
                this.fuelInTank += 50;
                if (this.fuelInTank > 100) {
                    this.fuelInTank = 100;
                }
                trackGrid[driveIntoTileIndex] = TRACK_ROAD;
                addTrackImageAtTileIndex(TRACK_ROAD, driveIntoTileIndex);
                break;
            case TRACK_CONE:
                if (!this.airborne) {
                    trackGrid[driveIntoTileIndex] = TRACK_ROAD;
                    addTrackImageAtTileIndex(TRACK_KNOCKED_OVER_CONE, driveIntoTileIndex);
                    this.speed = -.5 * this.speed;
                }
                break;
            case TRACK_OIL_BARREL:
                if (!this.airborne) {
                    trackGrid[driveIntoTileIndex] = TRACK_ROAD;
                    addTrackImageAtTileIndex(TRACK_OIL_SLICK, driveIntoTileIndex);
                    this.speed = -.5 * this.speed;
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
        drawBitmapCenteredAtLocationWithRotation(carShadowPic, this.x, this.y, this.ang, canvasContext);
        var xOffSet = this.x;
        var yOffSet = this.y;
        if (this.airborne) {
            yOffSet = yOffSet - 10;
        }
        drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.x - (this.z / 4), this.y - (this.z / 2), this.ang, canvasContext);
        if (debugMode) {
            //Please leave this here but commented out so I don't have to remember how to set it up properly.
            //Draws the red rectangles around cars; use if you're needing some help with collision detection.
            //drawRotatedRectWithLines(this.x - (this.z / 4), this.y - (this.z / 2), CAR_WIDTH + 8, CAR_HEIGHT + 8, this.ang);
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