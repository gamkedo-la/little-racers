
const SMOKE_FX_ENABLED = false; // if true, we get a gpu powered particle system
var SmokeFX;

const FPS = 30; // TODO: test running at 60fps
var isWideScreen = false;
const ASPECT_RATIO_WIDTH = isWideScreen ? 16 : 4;
const ASPECT_RATIO_HEIGHT = isWideScreen ? 9 : 3;
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const OFFSCREEN_DRAW_DELAY = 10;//ensures the win screen is displayed before starting to load next level image

var canvas;
var canvasContext;
var mouseX = 0;
var mouseY = 0;
var scaleWidth = 1;
var scaleHeight = 1;

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

var raceStartTimer = 0;
var drawStartLightsTimer = 0;
var displayRedLight = false;
var displayYellowLight = false;
var displayGreenLight = false;

var p1Speedometer = new speedometerClass();
var p2Speedometer = new speedometerClass();

var p1FuelGauge = new fuelGaugeClass();
var p2FuelGauge = new fuelGaugeClass();

//Debug Options
var debugMode = true;
var allowRescale = true;
var byPassFadeOut = true; //disable if not using a local server

var isMouseDragging = false;

window.onload = function(){
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	window.addEventListener("resize", resizeCanvas);
	for (var i = 0; i < 8; i++) {
		addVehicle();
	}
	if (allowRescale) {
		resizeCanvas();
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

function resizeCanvas() {
	if (allowRescale) {
	    canvas.width = ASPECT_RATIO_WIDTH * window.innerHeight / ASPECT_RATIO_HEIGHT;
		canvas.height = window.innerHeight;
		scaleWidth = canvas.width/CANVAS_WIDTH;
		scaleHeight = canvas.height/CANVAS_HEIGHT;
		canvasContext.scale(scaleWidth,scaleHeight);
	}
}

function imageLoadingDoneSoStartGame(){

    var framesPerSecond = FPS;

    setInterval(function() {
		moveEverything();
        drawEverything();
        if (SMOKE_FX_ENABLED) SmokeFX.update();
	}, 1000/framesPerSecond);

    for (var i = 0; i < vehicleList.length; i++) {
		vehicleList[i].carInit(window['carPic'+(i+1)], 'Car '+(i+1), true);
	}

    if (SMOKE_FX_ENABLED) SmokeFX = new SmokeFXClass();

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
	} else if (levelEditor) {
		//Intentionally left empty - no movement
	} else if (winScreen){
		winScreenTimer();
	} else if (carUpgradeScreen){
		//Intentionally left empty - no movement
	} else {
		if(!paused){
			updatedCameraPosition();
			if(raceHasStarted){
				
				handleJoystickControls(); // optionally
				
				for (var i = 0; i < vehicleList.length; i++) {
					vehicleList[i].movement();
				}

				for (var i = 0; i < vehicleList.length; i++) {
					for (var ii = i+1; ii < vehicleList.length; ii++) {
						vehicleList[i].checkCarCollisionAgainst(vehicleList[ii]);
					}
				}
				
				for (var i = 0; i < vehicleList.length; i++) {
					for (var ii = 0; ii < vehicleList.length; ii++) {
						if(i != ii){
							vehicleList[i].checkCarCollisionAgainst(vehicleList[ii]);
							var carVectorX = Math.cos(vehicleList[i].ang); 
							var carVectorY = Math.sin(vehicleList[i].ang);
							var distInFrontOfCenter = 25;
							var carFrontX = vehicleList[i].x + carVectorX * distInFrontOfCenter;
							var carFrontY = vehicleList[i].y + carVectorY * distInFrontOfCenter;
							var dot = dotProduct(carVectorX, carVectorY, carFrontX - vehicleList[ii].x, carFrontY - vehicleList[ii].y);
							var distance = dist (vehicleList[i].x, vehicleList[i].y, vehicleList[ii].x, vehicleList[ii].y);							
							if (dot < 0) { // it's infront of us
								if (distance < 35){
									vehicleList[i].speed *= 0.25;
								}
							} 
						}
					}
				}
//				console.log(vehicleList[0].ang);
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

function drawClock(){
	canvasContext.drawImage(clockPic, 350, 2);
	var playerOne = vehicleList[0];
	colorText(playerOne.minuteTensSpot.toString() + playerOne.minute.toString() + ':' + playerOne.secondTensSpot.toString() + playerOne.second.toString() +':'+playerOne.tenthSecond.toString(), 368, 30, 'black');
}

function drawLapOneTime(){
	var playerOne = vehicleList[0];
	colorText(playerOne.lapMinuteTensSpot.toString() + playerOne.lapMinute.toString() + ':' + playerOne.lapSecondTensSpot.toString() + playerOne.lapSecond.toString() +':'+playerOne.lapTenthSecond.toString(), 700, 30, 'black');
}

function drawFuelPercentage(){
	var playerOne = vehicleList[0];
	var playerTwo = vehicleList[1];
	var percentFuelLeftP1 = Math.round(playerOne.fuelInTank / playerOne.fuelCapacity * 100);
	colorText("P1-Fuel: " +percentFuelLeftP1.toString()+ "%", 50, 30, 'black')

	if (!playerTwo.computerPlayer) {
		var percentFuelLeftP2 = Math.round(playerTwo.fuelInTank / playerTwo.fuelCapacity * 100)
		colorText("P2-Fuel: " +percentFuelLeftP2.toString()+ "%", 50, 50, 'black')
	}
}

function drawStartLights(){
	if(displayRedLight){
		colorCircle(50, 50, 20, 'red')
	}
	if(displayYellowLight){
		colorCircle(50, 100, 20, 'yellow')
	}
	if(displayGreenLight){
		colorCircle(50, 159, 20, 'green')
		drawStartLightsTimer++;
	}
	if( drawStartLightsTimer == 10){
		displayRedLight = false;
		displayYellowLight = false;
		displayGreenLight = false;
	}
}

function drawSpeedometers() {
	var playerOne = vehicleList[0];
	var playerTwo = vehicleList[1];

	if (!playerTwo.computerPlayer) {
		// TODO: draw two speedometers
		p1Speedometer.positionX = 15;
		p1Speedometer.positionY = 532;
		p1Speedometer.maxValue = playerOne.maxSpeed;
		p1Speedometer.currentValue = Math.abs(playerOne.speed);

		p1Speedometer.draw();
	} else {
		p1Speedometer.positionX = 15;
		p1Speedometer.positionY = 532;
		p1Speedometer.maxValue = playerOne.maxSpeed;
		p1Speedometer.currentValue = Math.abs(playerOne.speed);

		p1Speedometer.draw();
	}
}

function drawFuelGauges() {
	var playerOne = vehicleList[0];
	var playerTwo = vehicleList[1];

	if (!playerTwo.computerPlayer) {
		// TODO: draw two fuel gauges
		p1FuelGauge.positionX = 715;
		p1FuelGauge.positionY = 532;
		p1FuelGauge.maxValue = playerOne.fuelCapacity;
		p1FuelGauge.currentValue = playerOne.fuelInTank;

		p1FuelGauge.draw();
	} else {
		p1FuelGauge.positionX = 715;
		p1FuelGauge.positionY = 532;
		p1FuelGauge.maxValue = playerOne.fuelCapacity;
		p1FuelGauge.currentValue = playerOne.fuelInTank;

		p1FuelGauge.draw();
	}
}

function drawEverything() {
	if(titleScreen){
		drawTitleScreen();
	} else if (levelEditor) {
		drawLevelEditor();
	} else if (winScreen){
		drawWinScreen();
		if((Date.now() - winScreenTime > OFFSCREEN_DRAW_DELAY) && (terrainChanged)) {
			drawTracksByTile();
		}
	} else if (carUpgradeScreen){
		drawCarUpgradeScreen();
	} else {
		colorRect(0,0,canvas.width/scaleWidth,canvas.height/scaleHeight, 'black');
		shiftForCameraPan();
		drawTracks();
		tireTracks.draw();
		for (var i = 0; i < vehicleList.length; i++) {
			vehicleList[i].drawCar();
		}
		finishedCameraPan();
		drawClock();
		drawLapOneTime();
		drawStartLights();
		drawSpeedometers();
		drawFuelGauges();
		//console.log("raining ", raining);
		if (raining) {
			//setInterval(function(){ addRainToArray(); }, 3000);
			drawRain();
			updateRain();
			deleteRainThatShouldBeInvisible();
		}

		if(debugMode){
			drawFuelPercentage();
			colorText("Debug Mode", 10, canvas.height/scaleHeight - 50, "white", "14px Arial Black");

		}
		if(paused){
			colorText("PAUSED", 300, canvas.height/scaleHeight - 50, "white", "36px Arial Black");
		}
	}
}

function dist (x1, y1, x2, y2){
	var xd = x2 - x1;
	var yd = y2 - y1;
	return Math.sqrt(xd * xd + yd * yd);
}
