
const SMOKE_FX_ENABLED = true; // if true, we get a gpu powered particle system
const SMOKE_FX_IN_MENU = true; // back to the future flaming tracks!
const SMOKE_FX_IN_GAME = false; // work in progress
var SmokeFX;

const FPS = 30; // TODO: test running at 60fps
var isWideScreen = false;
var windowWasResized = false;
const ASPECT_RATIO_WIDTH = isWideScreen ? 16 : 4;
const ASPECT_RATIO_HEIGHT = isWideScreen ? 9 : 3;
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const CANVAS_GAP_TWO_PLAYERS = 10;
const OFFSCREEN_DRAW_DELAY = 10;//ensures the win screen is displayed before starting to load next level image

var mouseX = 0;
var mouseY = 0;
var scaleWidth = 1;
var scaleHeight = 1;

var cameraP1 = new Camera();
var cameraP2 = new Camera();

var now = new Date();
var lastFrameTime=now;
var raceTimeElapsed=0
var raceTimeDigits = [0,0,0,0,0,0];

var vehicleList = [];
var vehicleNames = ["Sir Puggington III", "McFirepants", "Sunbeam Tiger", "Luminous Thunder", "Max Mad", "Chris DeLorean", "Spectre", "JS Mach"];
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

var speedometerP1 = new MeterClass(5, 450);
speedometerP1.maxValue = CAR_MAX_SPEED_DISPLAY_NITRO_ON;
speedometerP1.overlayX = NITRO_DISLAY_XOFFSET;
speedometerP1.overlayY = NITRO_DISLAY_YOFFSET;
var fuelMeterP1 = new MeterClass(2, 525, CAR_LOW_FUEL_LEVEL);
fuelMeterP1.meterPic = fuelGaugePic;

var speedometerP2 = new MeterClass(canvas.width/scaleWidth * 1.1 - 7, 450);
speedometerP2.maxValue = CAR_MAX_SPEED_DISPLAY_NITRO_ON;
speedometerP2.overlayX = NITRO_DISLAY_XOFFSET;
speedometerP2.overlayY = NITRO_DISLAY_YOFFSET;
var fuelMeterP2 = new MeterClass(canvas.width/scaleWidth * 1.1 - 4, 525, CAR_LOW_FUEL_LEVEL);
fuelMeterP2.meterPic = fuelGaugePic;

//Debug Options
var debugMode = true;
var allowRescale = true;
var byPassFadeOut = true; //disable if not using a local server

var isMouseDragging = false;

window.onload = function(){
	for (var i = 0; i < 8; i++) {
		addVehicle();
	}
	window.addEventListener('focus', function () {
		paused = false;
	});
	window.addEventListener('blur', function () {
		paused = true;
	});
	window.addEventListener('resize', reportWindowResize);
	loadImages();
	initInput();
	for (var i = 0; i < vehicleList.length; i++) {
		vehicleList[i].carReset();
	}	
}

function reportWindowResize(evt) {
	windowWasResized = true;
}

function enableMainCanvasOnly()
{
    canvas2.width = 0;
    canvasOverlay.width = 0;
    resizeAndRepositionCanvas(canvas, canvasContext);
    //if (SMOKE_FX_ENABLED) SmokeFX.hide();
}

function enableP1P2CanvasesWithOverlayOption(drawOverlayCanvas)
{
    if(vehicleList[1].computerPlayer) //Computer player, so draw full screen.
    {
        resizeAndRepositionCanvas(canvas, canvasContext, false, true, CANVAS_GAP_TWO_PLAYERS);
        canvas2.width=0;
    }
    else
    {
        resizeAndRepositionCanvas(canvas, canvasContext, true, true, CANVAS_GAP_TWO_PLAYERS);
        resizeAndRepositionCanvas(canvas2, canvasContext2, true, false, CANVAS_GAP_TWO_PLAYERS);
    }

    if(drawOverlayCanvas)
    {
        resizeAndRepositionCanvas(canvasOverlay, canvasContextOverlay);
    }
    else
    {
        canvasOverlay.width = 0;
    }

    //if (SMOKE_FX_ENABLED) SmokeFX.show();
    //if (SMOKE_FX_ENABLED) SmokeFX.resizeToGameCanvas();
}

// FIXME: this is run multiple times every single frame!
function resizeAndRepositionCanvas(canvas, canvasContext, isSplitScreen = false, isLeftSide = true, gap=0) {
    if (allowRescale && windowWasResized) {
		windowWasResized = false;
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

        //Reposition the canvas to be centered, or to the correct offset from center for split-screen play.
		if(!isSplitScreen)
		{
		    canvas.style.left = (window.innerWidth/2 - canvas.width/2) + 'px';
		}
		else if(isSplitScreen && isLeftSide)
		{
		    canvas.style.left = (window.innerWidth/2 - canvas.width-gap/2) + 'px';
		}
		else
		{
		    canvas2.style.left = (window.innerWidth/2+gap/2) + 'px';

		}

        // works.. but not good to run every frame
        // if (SMOKE_FX_ENABLED) SmokeFX.resizeTo(canvas.width,canvas.height);

	}
}

function imageLoadingDoneSoStartGame(){

    var framesPerSecond = FPS;

    setInterval(function() {
		moveEverything();
        drawEverything();
	}, 1000/framesPerSecond);

    for (var i = 0; i < vehicleList.length; i++) {
		vehicleList[i].carInit(window['carPic'+(i+1)], vehicleNames[i], true);
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

    updateTime();
    
    if(titleScreen || enterPlayerName || levelEditor || winScreen || carUpgradeScreen)
    {
        //Not racing, so reset all the race start info.
        raceStartTimer = 0;
        raceTimeElapsed = 0;
        raceTimeDigits = [0,0,0,0,0,0];
        drawStartLightsTimer = 0;
        displayRedLight = false;
        displayYellowLight = false;
        displayGreenLight = false;
        raceHasStarted = false;
        return;
    }
    
    if(paused)
    {
        lastFrameTime=now;
    }
    else
    {
        cameraP1.follow(canvas, vehicleList[0]);
		if (!vehicleList[1].computerPlayer) {
			cameraP2.follow(canvas2, vehicleList[1]);
		}
		if(raceHasStarted){
				
			handleJoystickControls(); // optionally
				
			raceTimeElapsed += now - lastFrameTime;
			lastFrameTime=now;
			getRaceTimeDigits();

			//Move all vehicles. Includes AI decisions on turning and gas.
			for (var i = 0; i < vehicleList.length; i++) {
				vehicleList[i].movement();
			}

            //Handle collisions between cars based on their new positions.
			for (var i = 0; i < vehicleList.length; i++) {
				for (var ii = i+1; ii < vehicleList.length; ii++) {
					vehicleList[i].checkCarCollisionAgainst(vehicleList[ii]);
				}
			}
				
			if(firstPlaceFilled){ //sound bite for the winner
				soundDelayTimer++;
				announceRaceCarNumber(40);
            }
                
		}
		else
		{
		    prepareForRace();
		    lastFrameTime=now;
		    raceTimeElapsed=0;
		}
	}
}

function updateTime(){
	now = new Date();
}

// 00:00:00  Minutes : Seconds : Hundredths of Seconds
function getRaceTimeDigits()
{
    var minutes = Math.floor(raceTimeElapsed/60000);
    var miliSeconds = raceTimeElapsed - minutes*60000;

    //Fill out the race time array such that the 0 index holds hundredths of seconds,
    //the 1 index holds tenths of seconds, etc...

    //Handle seconds (up to 59:99)
    for(var i=0; i<4; i++)
    {
        raceTimeDigits[i] = getDigit(miliSeconds, i+2); //Add two to i: 1 because we don't need thousandths of a second and 1 because
    }                                                   //getDigit specifies the nth digit from the right starting at 1.

    //Handle minutes (up to 99)
    raceTimeDigits[4] = getDigit(minutes, 1);
    raceTimeDigits[5] = getDigit(minutes, 2);

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


function calculateMousePos(evt) {
	var rect = canvas.getBoundingClientRect(), root = document.documentElement;
	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;
}

function drawClock(ctx, x, imgY){
    const CLOCK_FONT_W = 14;
    const CLOCK_FONT_H = 27;
    const CLOCK_FONT_WIDTH_INC_SPACERS = 15; //Includes transparent pixels not to be rendered. Prevents pixel bleed on resize.
    const CLOCK_FONT_DISPLAY_X_SPACING = 4;
    const CLOCK_FONT_DISPLAY_Y_OFFSET = 4;
    const CLOCK_COLON_INDEX = 10;

    var clockXStart = x-clockPic.width/2;
	ctx.drawImage(clockPic, clockXStart, imgY);
	var playerOne = vehicleList[0];
	var timeDisplay = [raceTimeDigits[5], raceTimeDigits[4], CLOCK_COLON_INDEX,
                       raceTimeDigits[3], raceTimeDigits[2], CLOCK_COLON_INDEX,
                       raceTimeDigits[1], raceTimeDigits[0]];

	for(var pos=0; pos<timeDisplay.length; pos++)
	{
	    ctx.drawImage(clockFont,
                      timeDisplay[pos]*CLOCK_FONT_WIDTH_INC_SPACERS, 0,    //Offset into clock font image to start drawing.
                      CLOCK_FONT_W, CLOCK_FONT_H,                          //Width to render from the font image
                      x-clockPic.width/2 + pos*(CLOCK_FONT_W+CLOCK_FONT_DISPLAY_X_SPACING)+CLOCK_FONT_DISPLAY_X_SPACING, //X location on screen.
                      imgY+CLOCK_FONT_DISPLAY_Y_OFFSET,                                                                  //Y location on screen.
                      CLOCK_FONT_W, CLOCK_FONT_H);                         //Stretch the image? No thanks, use same as render width.
	}
}

function drawLapOneTime(canvasContext, player){	
    colorText(player.lapMinuteTensSpot.toString() + player.lapMinute.toString() + ':' + player.lapSecondTensSpot.toString() + player.lapSecond.toString() +':'+player.lapTenthSecond.toString() +player.lapHundredthSecond.toString(), 
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

function drawMeters(canvasContext, plr, fuelMeter, speedMeter)
{
	fuelMeter.maxValue = plr.fuelCapacity;
	fuelMeter.currentValue = plr.fuelInTank;		
	fuelMeter.draw(canvasContext);

	if(plr.nitroBoostOn)
	{
	    speedMeter.meterPic = speedometerNitroOnPic;
	}
	else
	{
	    speedMeter.meterPic = speedometerNitroOffPic;
	}

	var extraGaugeIncrements = 0;
	if(plr.speed > EXPECTED_CAR_MAX_SPEED_NO_NITRO)
	{
	    var extraGaugeNeedleIncrements = CAR_MAX_SPEED_DISPLAY_NITRO_ON - EXPECTED_CAR_MAX_SPEED_NO_NITRO; //Will be a constant (eg: 4 gauge increments).
	    var extraGaugeSpeedQuantity = NITRO_MAX_SPEED-EXPECTED_CAR_MAX_SPEED_NO_NITRO;                    //Quantity represented by those increments (15).
	    var nitroSpeed = plr.speed;
	    if(nitroSpeed > NITRO_MAX_SPEED)
	        nitroSpeed = NITRO_MAX_SPEED;                                                               //Could be up to 25
	    var speedAboveMax = nitroSpeed - EXPECTED_CAR_MAX_SPEED_NO_NITRO;                               //Actual extra speed we need to draw (eg 0-15).
	    var extraGaugeIncrementScale = speedAboveMax/extraGaugeSpeedQuantity;                           //From 0->1 to scale the extra increments.
	    extraGaugeIncrements = extraGaugeNeedleIncrements*extraGaugeIncrementScale;                     //Actual extra needle increments to draw!
	}
	speedMeter.currentValue = Math.min(Math.abs(plr.speed), EXPECTED_CAR_MAX_SPEED_NO_NITRO) + extraGaugeIncrements;
	speedMeter.draw(canvasContext, speedMeter.needlePic, speedMeter.meterPic, speedMeter.color,
                    speedMeter.alpha, speedMeter.outlineWidth, speedMeter.outlineColor, 
                    speedMeter.needleOffsetX, speedMeter.needleOffsetY,
                    speedometerNitroOverlays[plr.nitroBoostQuantity]);
}

function drawCheckpointArrow(canvas, canvasContext, player, arrowRotateOffset = Math.PI) {	
	if (player.wrongDirection && Math.floor(raceTimeElapsed / 100) % 2 == 0) {
		var toX = player.wayPointX[player.wayPointNumber];
		var toY = player.wayPointY[player.wayPointNumber];
		var angle = Math.atan2(toY - player.y, toX - player.x) - arrowRotateOffset;		
		var arrowX = canvas.width / 2 / scaleWidth;
		var arrowY = (canvas.height / 2 - 300) / scaleHeight;
		drawBitmapCenteredAtLocationWithRotation(arrowPic, arrowX, arrowY, angle, canvasContext);		
	}
}

function drawTracksOnScreen(canvas, canvasContext) {
	drawTracks(canvasContext);
	tireTracks.draw(canvasContext);
	
	for (var i = 0; i < vehicleList.length; i++) {
		vehicleList[i].drawCar(canvasContext);
	}
}

function drawCommonScreenElements()
{
    canvasContextOverlay.clearRect(0, 0, canvasOverlay.width, canvasOverlay.height);

    var xCenter = canvasOverlay.width/scaleWidth*0.5;

    drawClock(canvasContextOverlay, xCenter, 10);

    if (paused){
        colorTextCentered("PAUSED", canvasOverlay.width/scaleWidth*0.5, canvasOverlay.height/scaleHeight*0.5, "white", "36px Arial Black", canvasContextOverlay);
    }
}

function drawP1Screen() {
	cameraP1.startPan(canvasContext);
	drawTracksOnScreen(canvas, canvasContext);
	cameraP1.endPan(canvasContext);

	drawLapOneTime(canvasContext, vehicleList[0]);
	drawStartLights(canvasContext);
	drawMeters(canvasContext, vehicleList[0], fuelMeterP1, speedometerP1);
	drawCheckpointArrow(canvas, canvasContext, vehicleList[0]);

	if (raining) {
		drawRain(canvasContext);
	}
}

function drawP2Screen() {
	if (!vehicleList[1].computerPlayer) {

		cameraP2.startPan(canvasContext2);
		drawTracksOnScreen(canvas2, canvasContext2);
		cameraP2.endPan(canvasContext2);
		
		drawLapOneTime(canvasContext2, vehicleList[1]);
		drawStartLights(canvasContext2);
		drawMeters(canvasContext2, vehicleList[1], fuelMeterP2, speedometerP2);
		drawCheckpointArrow(canvas2, canvasContext2, vehicleList[1]);

		if (raining) {
			drawRain(canvasContext2);
		}

	}
}

function drawEverything() {
    if(titleScreen)
    {
        enableMainCanvasOnly();
		drawTitleScreen();
    }
    else if(enterPlayerName)
    {
		drawEnterPlayerNameScreen();
    }
    else if (levelEditor)
    {
		drawLevelEditor(canvas, canvasContext);
	}
	else if (winScreen)
	{
	    enableMainCanvasOnly();
	    drawWinScreen(canvas, canvasContext);

		if((Date.now() - winScreenTime > OFFSCREEN_DRAW_DELAY) && (terrainChanged)) {
			drawTracksByTile();
		}
	}
	else if (carUpgradeScreen)
	{
	    enableMainCanvasOnly();

	    drawCarUpgradeScreen(canvas, canvasContext);

	    //TODO: code to manage which player is being presented upgrade options.
        //Currently only player one can upgrade.
	}
	else //Game is running, draw the main race screen.
	{
	    enableP1P2CanvasesWithOverlayOption(true);

	    drawP1Screen();
		drawP2Screen();
		drawCommonScreenElements();

		
		if (raining) {
			updateRain();
			deleteRainThatShouldBeInvisible();
		}

		if(debugMode){
			colorText("Debug Mode", 5, canvas.height/scaleHeight * 0.025, "white", "14px Arial Black");
		}		
	}
}
