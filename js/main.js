
const SMOKE_FX_ENABLED = true; // if true, we get a gpu powered particle system
const SMOKE_FX_IN_MENU = true;
const SMOKE_FX_IN_GAME = false;
var SmokeFX;

const FPS = 30; // TODO: test running at 60fps
var isWideScreen = false;
const ASPECT_RATIO_WIDTH = isWideScreen ? 16 : 4;
const ASPECT_RATIO_HEIGHT = isWideScreen ? 9 : 3;
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const OFFSCREEN_DRAW_DELAY = 10;//ensures the win screen is displayed before starting to load next level image

var mouseX = 0;
var mouseY = 0;
var scaleWidth = 1;
var scaleHeight = 1;

var cameraP1 = new Camera();
var cameraP2 = new Camera();

var now = new Date();
var time = 0;

var vehicleList = [];
var twoPlayerGame = false;
var computerPlayerOn = true;

//Game States
var titleScreen = true; 
var levelEditor = false;
var winScreen = false;
var carUpgradeScreen = false;
var paused = false;
var raceHasStarted = false;
var enterPlayerName = false; 

var raceStartTimer = 0;
var drawStartLightsTimer = 0;
var displayRedLight = false;
var displayYellowLight = false;
var displayGreenLight = false;

var speedometerP1 = new MeterClass(5, 435);
var fuelMeterP1 = new MeterClass(2, 525, CAR_LOW_FUEL_LEVEL);
fuelMeterP1.meterPic = fuelGaugePic;

var speedometerP2 = new MeterClass(canvas.width/scaleWidth * 1.1 - 7, 435);
var fuelMeterP2 = new MeterClass(canvas.width/scaleWidth * 1.1 - 4, 525, CAR_LOW_FUEL_LEVEL);
fuelMeterP2.meterPic = fuelGaugePic;

//Debug Options
var debugMode = true;
var allowRescale = true;
var byPassFadeOut = true; //disable if not using a local server

var isMouseDragging = false;

window.onload = function(){
	window.addEventListener("resize", function () {
		if (allowRescale) {
			resizeCanvas(canvas, canvasContext);
			resizeCanvas(canvas2, canvasContext2);
		}
	});
	for (var i = 0; i < 8; i++) {
		addVehicle();
	}
	if (allowRescale) {
		resizeCanvas(canvas, canvasContext);
		resizeCanvas(canvas2, canvasContext2);
	}
	window.addEventListener('focus', function () {
		paused = false;
	});
	window.addEventListener('blur', function () {
		paused = true;
	});
	loadImages();
	initInput();
	for (var i = 0; i < vehicleList.length; i++) {
		vehicleList[i].carReset();
	}
}

function resizeCanvas(canvas, canvasContext, isSplitScreen = false) {
	if (allowRescale) {
		canvas.width = ASPECT_RATIO_WIDTH * window.innerHeight / ASPECT_RATIO_HEIGHT;		
		canvas.height = window.innerHeight;
		if (isSplitScreen) {
			canvas.width /= 2;			
		}
		scaleWidth = canvas.width/CANVAS_WIDTH;
		if (isSplitScreen) {
			scaleWidth *= 2;
		}
		scaleHeight = canvas.height/CANVAS_HEIGHT;
		canvasContext.scale(scaleWidth,scaleHeight);
	}
}

function imageLoadingDoneSoStartGame(){

    var framesPerSecond = FPS;

    setInterval(function() {
		moveEverything();
        drawEverything();
	}, 1000/framesPerSecond);

    for (var i = 0; i < vehicleList.length; i++) {
		vehicleList[i].carInit(window['carPic'+(i+1)], 'Car '+(i+1), true);
	}

    if (SMOKE_FX_ENABLED) {
        SmokeFX = new SmokeFXClass();
        SmokeFXStartRendering(); 
    }

    //	loadLevel(levelOne);
	loadLevel(levelList[0]);
}

function addVehicle(){
	var tempVehicle = new carClass();
	vehicleList.push(tempVehicle);
}

function moveEverything() {
	if(titleScreen){
		//colorRect(0,0,canvas.width,canvas.height, 'green');
	} else if (enterPlayerName){
		//Intentionally left empty - no movement
	} else if (levelEditor) {
		//Intentionally left empty - no movement
	} else if (winScreen){
		winScreenTimer();
	} else if (carUpgradeScreen){
		//Intentionally left empty - no movement
	} else {
		if(!paused){
			cameraP1.follow(canvas, vehicleList[0]);
			if (!vehicleList[1].computerPlayer) {
				cameraP2.follow(canvas2, vehicleList[1]);
			}
			if(raceHasStarted){
				
				handleJoystickControls(); // optionally
				
                //Move vehicles. Includes AI decisions on turning and gas.
				for (var i = 0; i < vehicleList.length; i++) {
					vehicleList[i].movement();
				}

                //Handle collisions between cars based on their new positions.
				for (var i = 0; i < vehicleList.length; i++) {
					for (var ii = i+1; ii < vehicleList.length; ii++) {
						vehicleList[i].checkCarCollisionAgainst(vehicleList[ii]);
					}
				}
				
				updateTime();
				if(firstPlaceFilled){ //sound bite for the winner
					soundDelayTimer++;
					announceRaceCarNumber(40);
                }
                
			} else {
				prepareForRace();
			}
		}
	}
}

function prepareForRace() {
    raceStartTimer++;

    if (debugMode)
    {
        raceStartTimer = 195;
    }

	if(raceStartTimer == 10){
		attentionDriversSound.play();
	} else if (raceStartTimer == 70){
		startYourEnginesSound.play();
	} else if (raceStartTimer == 140){
		readySetGoSound.play();
		displayRedLight = true;
	} else if (raceStartTimer == 170){
		displayYellowLight = true;
	} else if (raceStartTimer == 195){
		raceHasStarted = true;
		displayGreenLight = true;
		alanZBackgroundMusic.loopSong("backgroundMusicV1");
	}
}

function updateTime(){
	now = new Date();
}

function calculateMousePos(evt) {
	var rect = canvas.getBoundingClientRect(), root = document.documentElement;
	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;
}

function drawClock(canvasContext, sx, sy, sw, sh, dx, dy, dw, dh, clockX){
	canvasContext.drawImage(clockPic, sx, sy, sw, sh, dx, dy, dw, dh);
	var playerOne = vehicleList[0];
	colorText(playerOne.minuteTensSpot.toString() + playerOne.minute.toString() + ':' + playerOne.secondTensSpot.toString() + playerOne.second.toString() +':'+playerOne.tenthSecond.toString(), 
			  clockX, 
			  30, 
			  'black', 
			  "14px Arial Black", 
			  canvasContext);
}

function drawLapOneTime(canvasContext, player){	
	colorText(player.lapMinuteTensSpot.toString() + player.lapMinute.toString() + ':' + player.lapSecondTensSpot.toString() + player.lapSecond.toString() +':'+player.lapTenthSecond.toString(), 
			  canvas.width/scaleWidth * 0.32, 
			  canvas.height/scaleHeight * 0.025 + 15, 
			  'white',
			  "14px Arial Black", 
			  canvasContext);
}

function drawFuelPercentage(canvasContext, player){		
	var percentFuelLeft = Math.round(player.fuelInTank / player.fuelCapacity * 100);
	colorText("Fuel: " + percentFuelLeft.toString()+ "%", 
			  canvas.width/scaleWidth * 0.32, canvas.height/scaleHeight * 0.025, 
			  'white', 
			  "14px Arial Black", 
			  canvasContext);
}

function drawStartLights(canvasContext){
	if(displayRedLight){
		colorCircle(50, 50, 20, 'red', canvasContext)
	}
	if(displayYellowLight){
		colorCircle(50, 100, 20, 'yellow', canvasContext)
	}
	if(displayGreenLight){
		colorCircle(50, 159, 20, 'green', canvasContext)
		drawStartLightsTimer++;
	}
	if( drawStartLightsTimer == 10){
		displayRedLight = false;
		displayYellowLight = false;
		displayGreenLight = false;
	}
}

function drawP1Meters(canvasContext) {
	var playerOne = vehicleList[0];	

	fuelMeterP1.maxValue = playerOne.fuelCapacity;
	fuelMeterP1.currentValue = playerOne.fuelInTank;		
	fuelMeterP1.draw(canvasContext);

	speedometerP1.maxValue = playerOne.maxSpeed;
	speedometerP1.currentValue = Math.abs(playerOne.speed);
	speedometerP1.draw(canvasContext);
}

function drawP2Meters(canvasContext) {
	var playerTwo = vehicleList[1];

	fuelMeterP2.maxValue = playerTwo.fuelCapacity;
	fuelMeterP2.currentValue = playerTwo.fuelInTank;
	fuelMeterP2.draw(canvasContext);

	speedometerP2.maxValue = playerTwo.maxSpeed;
	speedometerP2.currentValue = Math.abs(playerTwo.speed);
	speedometerP2.draw(canvasContext);
}

function drawTracksOnScreen(canvas, canvasContext) {
	drawTracks(canvasContext);
	tireTracks.draw(canvasContext);
	
	for (var i = 0; i < vehicleList.length; i++) {
		vehicleList[i].drawCar(canvasContext);
	}
}

function drawP1Screen() {
	canvas.width = !vehicleList[1].computerPlayer ? CANVAS_WIDTH / 2 : CANVAS_WIDTH;	
	resizeCanvas(canvas, canvasContext, !vehicleList[1].computerPlayer);
	cameraP1.startPan(canvasContext);
	drawTracksOnScreen(canvas, canvasContext);
	cameraP1.endPan(canvasContext);

	drawClock(canvasContext, 0, 0, 100, 40, 350, 2, 100, 40, 368);
	drawLapOneTime(canvasContext, vehicleList[0]);
	drawStartLights(canvasContext);
	drawP1Meters(canvasContext);

	if (raining) {
		//setInterval(function(){ addRainToArray(); }, 3000);
		drawRain(canvasContext);
	}

	if (debugMode) {
		drawFuelPercentage(canvasContext, vehicleList[0]);
	}

	if (paused){
		colorText("PAUSED", 350, canvas.height/scaleHeight * 0.5 - 50, "white", "36px Arial Black", canvasContext);
	}
}

function drawP2Screen() {
	if (!vehicleList[1].computerPlayer) {
		canvas2.width = CANVAS_WIDTH / 2;
		resizeCanvas(canvas2, canvasContext2, !vehicleList[1].computerPlayer);
		cameraP2.startPan(canvasContext2);
		drawTracksOnScreen(canvas2, canvasContext2);
		cameraP2.endPan(canvasContext2);
		
		drawClock(canvasContext2, 50, 0, 50, 40, 0, 2, 50, 40, -32);
		drawLapOneTime(canvasContext2, vehicleList[1]);
		drawStartLights(canvasContext2);
		drawP2Meters(canvasContext2);

		if (raining) {
			//setInterval(function(){ addRainToArray(); }, 3000);
			drawRain(canvasContext2);
		}

		if (debugMode) {
			drawFuelPercentage(canvasContext2, vehicleList[1]);
		}

		if (paused){
			colorText("PAUSED", -50, canvas.height/scaleHeight * 0.5 - 50, "white", "36px Arial Black", canvasContext2);
		}
	} else {
		canvas2.width = 0;
	}
}

function drawEverything() {
	if(titleScreen){
		drawTitleScreen();
	} else if(enterPlayerName){
		drawEnterPlayerNameScreen();
	} else if (levelEditor) {
		drawLevelEditor(canvas, canvasContext);
	} else if (winScreen){
		drawWinScreen(canvas, canvasContext);
		if((Date.now() - winScreenTime > OFFSCREEN_DRAW_DELAY) && (terrainChanged)) {
			drawTracksByTile();
		}
	} else if (carUpgradeScreen){
		drawCarUpgradeScreen(canvas, canvasContext);
		if (!vehicleList[1].computerPlayer) {
			drawCarUpgradeScreen(canvas2, canvasContext2);
		}
	} else {				
		drawP1Screen();
		drawP2Screen();
		
		if (raining) {
			updateRain();
			deleteRainThatShouldBeInvisible();
		}

		if(debugMode){
			colorText("Debug Mode", 5, canvas.height/scaleHeight * 0.025, "white", "14px Arial Black");
		}		
	}
}
