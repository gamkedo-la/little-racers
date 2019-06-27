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

//sounds
var crashIntoConeSound = new SoundOverlapsClass("crashCone");
var engineSound = new SoundOverlapsClass("engine");

//Game States
var titleScreen = true;
var levelEditor = false;
var winScreen = false;
var carUpgradeScreen = false;
var paused = false;

//Debug Options
var debugMode = false;
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
	loadImages();
	initInput();
	for (var i = 0; i < vehicleList.length; i++) {
		vehicleList[i].carReset();
	}
}

function resizeCanvas() {
	if (allowRescale) {
	    canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		scaleWidth = canvas.width/800;
		scaleHeight = canvas.height/600;
		canvasContext.scale(scaleWidth,scaleHeight);
	}
}

function imageLoadingDoneSoStartGame(){
	var framesPerSecond = 30;
	setInterval(function() {
		moveEverything();
		drawEverything();
	}, 1000/framesPerSecond);
	for (var i = 0; i < vehicleList.length; i++) {
		vehicleList[i].carInit(window['carPic'+(i+1)], 'Car '+(i+1), true);
	}

	loadLevel(levelOne);
}

function addVehicle(){
	var tempVehicle = new carClass();
	vehicleList.push(tempVehicle);
}

function moveEverything() {
	if(titleScreen){
		colorRect(0,0,canvas.width,canvas.height, 'green');
	} else if (levelEditor) {
		//Intentionally left empty - no movement
	} else if (winScreen){
		winScreenTimer();
	} else if (carUpgradeScreen){
		//Intentionally left empty - no movement
	} else {
		if(!paused){
			for (var i = 0; i < vehicleList.length; i++) {
				vehicleList[i].movement();
			}
			updatedCameraPosition();
			for (var i = 0; i < vehicleList.length; i++) {
				for (var ii = i+1; ii < vehicleList.length; ii++) {
					vehicleList[i].checkCarCollisionAgainst(vehicleList[ii]);
				}
			}
			updateTime();
		}
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

function drawEverything() {
	if(titleScreen){
		drawTitleScreen();
	} else if (levelEditor) {
		drawLevelEditor();
	} else if (winScreen){
		drawWinScreen();
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
		drawFuelPercentage();
		if(debugMode){
			colorText("Debug Mode", 10, canvas.height/scaleHeight - 50, "white", font = "14px Arial Black");
		}
		if(paused){
			colorText("PAUSED", 300, canvas.height/scaleHeight - 50, "white", font = "36px Arial Black");
		}
	}
}

function dist (x1, y1, x2, y2){
	var xd = x2 - x1;
	var yd = y2 - y1;
	return Math.sqrt(xd * xd + yd * yd);
}
