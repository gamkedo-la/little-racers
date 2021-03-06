
const SMOKE_FX_ENABLED = true; // if true, we get a gpu powered particle system
const SMOKE_FX_IN_MENU = true; // back to the future flaming tracks!
const SMOKE_FX_IN_GAME = false; // work in progress
var SmokeFX;

const FPS = 30; // TODO: test running at 60fps
var isWideScreen = false;
var windowWasResized = true;
const ASPECT_RATIO_WIDTH = isWideScreen ? 16 : 4;
const ASPECT_RATIO_HEIGHT = isWideScreen ? 9 : 3;
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const CANVAS_GAP_TWO_PLAYERS = 10;
const OFFSCREEN_DRAW_DELAY = 10;//ensures the win screen is displayed before starting to load next level image

var scaleWidth = 1;
var scaleHeight = 1;

var cameraP1 = new Camera();
var cameraP2 = new Camera();
var trackMap = new miniMap();

var now = new Date();
var lastFrameTime=now;
var raceTimeElapsed=0
var raceTimeDigits = [0,0,0,0,0,0];

var vehicleList = [];
var vehicleNames = ["Sir Puggington III", "McFirepants", "Sunbeam Tiger", "Luminous Thunder", "Max Mad", "Chris DeLorean", "Spectre", "JS Mach"];
var twoPlayerGame = false;
var computerPlayerOn = true;

//Game States
const STATE_TITLE_SCREEN = 0;
const STATE_LEVEL_EDITOR = 1;
const STATE_WIN_SCREEN = 2;
const STATE_CAR_UPGRADE_SCREEN = 3;
const STATE_PAUSED = 4;
const STATE_RACE_HAS_STARTED = 5;
const STATE_ENTER_PLAYER_NAME = 6;
const STATE_PLAY = 7;
const STATE_WRECKED = 8;
const STATE_HELP = 9;
const STATE_CREDITS = 10;
var gameState = STATE_TITLE_SCREEN;

var raceStartTimer = 0;
var drawStartLightsTimer = 0;
var displayRedLight = false;
var displayYellowLight = false;
var displayGreenLight = false;

var speedometerP1 = new MeterClass(5, 450);
speedometerP1.maxValue = CAR_MAX_SPEED_DISPLAY_NITRO_ON;
var fuelMeterP1 = new MeterClass(2, 525, CAR_LOW_FUEL_LEVEL);
fuelMeterP1.meterPic = fuelGaugePic;

var speedometerP2 = new MeterClass(canvas.width/scaleWidth * 1.1 - 7, 450);
speedometerP2.maxValue = CAR_MAX_SPEED_DISPLAY_NITRO_ON;
var fuelMeterP2 = new MeterClass(canvas.width/scaleWidth * 1.1 - 4, 525, CAR_LOW_FUEL_LEVEL);
fuelMeterP2.meterPic = fuelGaugePic;

//Debug Options
var debugMode = false;
var allowRescale = true;
var byPassFadeOut = true; //disable if not using a local server

var isMouseDragging = false;

window.onload = function(){
	for (var i = 0; i < 8; i++) {
		addVehicle();
	}
	window.addEventListener('focus', function () {
		if (gameState == STATE_PAUSED) {
			updateState (STATE_PLAY);
		}
		isMuted = isMutedByShortcut && isMuted;
	});
	window.addEventListener('blur', function () {
		if (gameState == STATE_PLAY) {
			updateState (STATE_PAUSED);
		}
		isMuted = true;
	});
	window.addEventListener('resize', reportWindowResize);
	loadImages();
	initInput();
	resetCars();
}

function resetCars() {
	for (var i = 0; i < vehicleList.length; i++) {
		vehicleList[i].carReset();
	}
}

function reportWindowResize() {
	windowWasResized = true;
}

function enableMainCanvasOnly()
{
	if(windowWasResized) {
		canvas2.width = 0;
		canvasOverlay.width = 0;
		resizeAndRepositionCanvas(canvas, canvasContext);
        windowWasResized = false;
        if (tireTracks) tireTracks.reset(); // and resize        
	}
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

	windowWasResized = false;
    //if (SMOKE_FX_ENABLED) SmokeFX.show();
    //if (SMOKE_FX_ENABLED) SmokeFX.resizeToGameCanvas();
}

// FIXME: this is run multiple times every single frame!
function resizeAndRepositionCanvas(aCanvas, aCanvasContext, isSplitScreen = false, isLeftSide = true, gap=0) {
	if(allowRescale && windowWasResized) {
		aCanvas.width = ASPECT_RATIO_WIDTH * window.innerHeight / ASPECT_RATIO_HEIGHT;
		aCanvas.height = window.innerHeight;

		if (isSplitScreen) {
			aCanvas.width /= 2;
		}
		scaleWidth = aCanvas.width/CANVAS_WIDTH;
		if (isSplitScreen) {
			scaleWidth *= 2;
		}
		scaleHeight = aCanvas.height/CANVAS_HEIGHT;
		aCanvasContext.scale(scaleWidth,scaleHeight);

		//Reposition the canvas to be centered, or to the correct offset from center for split-screen play.
		if(!isSplitScreen)
		{
			aCanvas.style.left = (window.innerWidth/2 - aCanvas.width/2) + 'px';
		}
		else if(isSplitScreen && isLeftSide)
		{
			aCanvas.style.left = (window.innerWidth/2 - aCanvas.width-gap/2) + 'px';
		}
		else
		{
			aCanvas.style.left = (window.innerWidth/2+gap/2) + 'px';
		}
        // works.. but not good to run every frame
        // if (SMOKE_FX_ENABLED) SmokeFX.resizeTo(canvas.width,canvas.height);

        // tiretracks canvas needs resizing as well
        if (tireTracks) {
            tireTracks.reset(); // and resize
        }

	}
}

function imageLoadingDoneSoStartGame(){

    var framesPerSecond = FPS;

    setInterval(function() {
		moveEverything();
        drawEverything();
	}, 1000/framesPerSecond);

	createCarSoundList();

    for (var i = 0; i < vehicleList.length; i++) {
		vehicleList[i].carInit(window['carPic'+(i+1)], vehicleNames[i], carSoundList[i+1], true);
	}
	
    if (SMOKE_FX_ENABLED) {
        SmokeFX = new SmokeFXClass();
        SmokeFXStartRendering();
    }

    //	loadLevel(levelOne);
    loadLevel(levelList[0]);
	createTrackRecords();
	for(i = 0; i < recordList.length; i++){
		recordList[i].init(30600, "Jeff", 35800, "Vince", 51000, "Chris");
		recordList[i].init(32600, "Jeremy", 40900, "Vince", 41800, "Jeff");
		recordList[i].init(36600, "Chris", 39800, "Jeremy", 42800, "Vince");
	}
}

function addVehicle(){
	var tempVehicle = new carClass();
	vehicleList.push(tempVehicle);
}

function moveEverything() {

    updateTime();

    if(gameState != STATE_PLAY && gameState != STATE_PAUSED)
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

    if(gameState == STATE_PAUSED)
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

			var isP1Wrecked = vehicleList[0].healthRemaining <= 0;
			var isP2Wrecked = vehicleList[1].healthRemaining <= 0;
			var is2Pmode = !vehicleList[1].computerPlayer;
			
			if ((!is2Pmode && isP1Wrecked) || (is2Pmode && isP1Wrecked && isP2Wrecked)) {
				updateState(STATE_WRECKED);
				console.log ("player 1 wrecked -- does not handle two player mode, yet");
				console.log ("player 2 wrecked -- does not handle two player mode, yet - IGNORING!!!!!");
			}

            //Handle collisions between cars based on their new positions.
			for (var i = 0; i < vehicleList.length; i++) {
				for (var ii = i+1; ii < vehicleList.length; ii++) {
					vehicleList[i].checkCarCollisionAgainst(vehicleList[ii]);
					vehicleList[i].checkMyRocketCollisionAgainst(vehicleList[ii]);
				}
			}
			
			//sound bite for the winner
			if(firstPlaceFilled){ 
				soundDelayTimer++;
				announceRaceCarNumber(40);
			}
		} else {
		    prepareForRace();
		    lastFrameTime=now;
		    raceTimeElapsed=0;
		}
	}

    // BUGFIX: call only once elsewhere, not here which is run every frame
    //alanZBackgroundMusic.startOrStopMusic(); 
}

var frameCounter = 0;
function updateTime() { // run once per frame
    now = new Date();
    frameCounter++;
	if(raceTimeElapsed >= (60000 * 1.5)){
		updateState(STATE_WIN_SCREEN);	
	}
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
    
    //console.log("Prepare for race!"); // gets called many times at start
    
    raceStartTimer++;
	
	if(raceStartTimer%2 == 0){
		vehicleList[0].highlight = true;
	} 

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

function drawStartLights(canvasContext, x = 100, y = 100){
	if(displayRedLight){
		colorCircle(x, y + 50, 20, 'red', canvasContext);
	}
	if(displayYellowLight){
		colorCircle(x, y + 100, 20, 'yellow', canvasContext);
	}
	if(displayGreenLight){
		colorCircle(x, y + 159, 20, 'green', canvasContext);
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

	// Temp var for setting up meterOverlayPics
	// For each overlay pic, add an object with the following members:
	// {overlayPic: imageVar, overlayX: imageXOffset, overlayY: imageYOffset}
	var setupOverlayPics = [];

	// Setup nitro overlay
	setupOverlayPics[0] = {overlayPic: speedometerNitroOverlays[plr.nitroBoostQuantity], overlayX: NITRO_DISLAY_XOFFSET, overlayY: NITRO_DISLAY_YOFFSET};

	// Setup health bar overlay
	if (plr.healthRemaining > 66 ) {
    //call out health100
      var healthBarPic = health100;
    } else if (plr.healthRemaining <= 66 && plr.healthRemaining > 33) {
        //call out health66
        var healthBarPic = health66;
    } else if (plr.healthRemaining <= 33 && plr.healthRemaining > 0) {
       // call out health33
       var healthBarPic = health33;
   	} else if (plr.healthRemaining <= 0) {
        //call out health0
       var healthBarPic = health0;
    }
	setupOverlayPics[1] = {overlayPic: healthBarPic, overlayX: HEALTH_DISPLAY_XOFFSET, overlayY: HEALTH_DISPLAY_YOFFSET}

	// Setup shields overlay
	if (plr.shieldsRemaining > 80 ) {
	  var shieldsPic = shields100;
	} else if (plr.shieldsRemaining <= 80 && plr.shieldsRemaining > 60) {
		var shieldsPic = shields80;
	} else if (plr.shieldsRemaining <= 60 && plr.shieldsRemaining > 40) {
		var shieldsPic = shields60;
	} else if (plr.shieldsRemaining <= 40 && plr.shieldsRemaining > 20) {
		var shieldsPic = shields40;
	} else if (plr.shieldsRemaining <= 20 && plr.shieldsRemaining > 0) {
		var shieldsPic = shields20;
	} else if (plr.shieldsRemaining <= 0) {
	   var shieldsPic = shields0;
	}
	setupOverlayPics[2] = {overlayPic: shieldsPic, overlayX: SHIELDS_DISPLAY_XOFFSET, overlayY: SHIELDS_DISPLAY_YOFFSET}


	speedMeter.draw(canvasContext, speedMeter.needlePic, speedMeter.meterPic, speedMeter.color,
                    speedMeter.alpha, speedMeter.outlineWidth, speedMeter.outlineColor,
                    speedMeter.needleOffsetX, speedMeter.needleOffsetY,
                    setupOverlayPics);
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
	/////// canvasOverlay no longer works.  Need to rework this code ///////////////////
    /*canvasContextOverlay.clearRect(0, 0, canvasOverlay.width, canvasOverlay.height);

    var xCenter = canvasOverlay.width/scaleWidth*0.5;

    drawClock(canvasContextOverlay, xCenter, 10);
	if (!vehicleList[1].computerPlayer) {
		drawStartLights(canvasContextOverlay, xCenter);
	}
	*/
	
	if (!vehicleList[1].computerPlayer) {
		if (vehicleList[0].healthRemaining <= 0) {
			drawClock(canvasContext2, 200, 0);
		} else if (vehicleList[1].healthRemaining > 0) {
			drawClock(canvasContext2, 0, 0);
		}
		if (vehicleList[1].healthRemaining <= 0) {
			drawClock(canvasContext, 200, 0);
		} else if (vehicleList[0].healthRemaining > 0) {
			drawClock(canvasContext, 400, 0);
		}
	} else {
		drawClock(canvasContext, 400, 0);
	}

	if (!vehicleList[1].computerPlayer) {
		if(vehicleList[0].healthRemaining > 0 && vehicleList[1].healthRemaining > 0) {
			trackMap.draw(canvasContext, canvas.width / scaleWidth * 0.8, canvas.height / scaleHeight * 0.2);
			trackMap.draw(canvasContext2, -110 / scaleWidth, canvas2.height / scaleHeight * 0.2);
		} else if (vehicleList[0].healthRemaining > 0 && vehicleList[1].healthRemaining <= 0)
		{
			trackMap.draw(canvasContext, canvas.width / scaleWidth * 0.32, canvas.height / scaleHeight * 0.2);
		} else if (vehicleList[1].healthRemaining > 0 && vehicleList[0].healthRemaining <= 0) {
			trackMap.draw(canvasContext2, canvas2.width / scaleWidth * 0.32, canvas2.height / scaleHeight * 0.2);
		}
	} else {
		trackMap.draw(canvasContext, canvas.width / scaleWidth * 0.75, canvas.height / scaleHeight * 0.2);
	}

    if (gameState == STATE_PAUSED){
		drawPauseMenu(canvasContext, 320, canvas.height/scaleHeight*0.35);
		if (!vehicleList[1].computerPlayer) {
			drawPauseMenu(canvasContext2,
						  -80, canvas.height/scaleHeight*0.35,
						  -PAUSEMENU_X*.20, PAUSEMENU_Y,
						  -PAUSEMENU_TXT_X*.20, PAUSEMENU_TXT_Y,
						  PAUSEMENU_BUTTONW, PAUSEMENU_BUTTONH,
						  PAUSEMENU_SPACING);
		}
	}
	
    if (isMuted && isMutedByShortcut) {
    	canvasContext.drawImage(mutePic, 25, 25);
	}
}

function drawP1Screen() {
	cameraP1.startPan(canvasContext);
	drawTracksOnScreen(canvas, canvasContext);
	cameraP1.endPan(canvasContext);

	//drawLapOneTime(canvasContext, vehicleList[0]);
	if (vehicleList[1].computerPlayer) {
		drawStartLights(canvasContext, canvas.width / scaleWidth * 0.5);
	}
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

		// drawLapOneTime(canvasContext2, vehicleList[1]);
		drawMeters(canvasContext2, vehicleList[1], fuelMeterP2, speedometerP2);
		drawCheckpointArrow(canvas2, canvasContext2, vehicleList[1]);

		if (raining) {
			drawRain(canvasContext2);
		}
	}
}

function updateState(newState) {
	console.log (newState);
	gameState = newState;
    reportWindowResize();
    if (tireTracks) tireTracks.reset(); // and resize
}

function drawEverything() {

    if(gameState == STATE_TITLE_SCREEN)
    {
        enableMainCanvasOnly();
		drawTitleScreen();
    }
    else if(gameState == STATE_CREDITS)
    {
        drawCredits();
    }
    else if(gameState == STATE_ENTER_PLAYER_NAME)
    {
		drawEnterPlayerNameScreen(canvas, canvasContext);
    }
    else if (gameState == STATE_LEVEL_EDITOR)
    {
		drawLevelEditor(canvas, canvasContext);
	}
	else if (gameState == STATE_WIN_SCREEN)
	{
	    enableMainCanvasOnly();
	    drawWinScreen(canvas, canvasContext);
		if((Date.now() - winScreenTime > OFFSCREEN_DRAW_DELAY) && (terrainChanged)) {
			drawTracksByTile();
		}
	}
	else if (gameState == STATE_CAR_UPGRADE_SCREEN)
	{
	    enableMainCanvasOnly();
	    drawCarUpgradeScreen(canvas, canvasContext);
	    //TODO: code to manage which player is being presented upgrade options.
        //Currently only player one can upgrade.
	}
    // regular in-game world rendering goes here
    // game is also drawn underneath pause GUIs
    else // if (gameState == STATE_PLAY || gameState == STATE_HELP || gameState == STATE_PAUSED)
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
			colorText("Debug Mode", 5, canvas.height/scaleHeight * 0.025, "white",);
		}
	}

	if (vehicleList[0].healthRemaining <= 0) {
		drawWreckedScreen(vehicleList[0], canvas, canvasContext);
	}

	if (vehicleList[1].healthRemaining <= 0) {
		drawWreckedScreen(vehicleList[1], canvas2, canvasContext2);
	}
	
    // now that the world is drawn, we may want pause GUIs on top
    if (gameState == STATE_PAUSED)
	{
		drawCommonScreenElements();	
	}
	else if (gameState == STATE_HELP)
	{
        drawHelpScreen();
	}
}
