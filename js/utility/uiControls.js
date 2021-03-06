const KEY_W = 87; 
const KEY_S = 83; 
const KEY_A = 65; 
const KEY_D = 68; 
const KEY_F = 70;
const KEY_L = 76;
const KEY_C = 67;
const KEY_Q = 81;

const KEY_INSERT = 45;
const KEY_HOME = 36;
const KEY_PAGE_UP = 33;
const KEY_DELETE = 46;
const KEY_END = 35;
const KEY_PAGE_DOWN = 34; //not all keyboards have a KEY_PAGE_DOWN
const KEY_ENTER = 13;
const KEY_SHIFT = 16;

const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;
const ENTER_KEY = 13;

const KEY_F1 = 112;
const KEY_F2 = 113;
const KEY_P = 80;
const KEY_O = 79;
const KEY_1 = 49;
const KEY_2 = 50;

var mouseX = 0;
var mouseY = 0;

let controlCameraForDebug = false;
var isMutedByShortcut = false;

function initInput(){
	canvas.addEventListener('mousemove', function(evt) {
	  mouseX = calculateMousePos(evt).x;
    mouseY = calculateMousePos(evt).y;
	});

	document.addEventListener("keydown", keyPressed);
	document.addEventListener("keyup", keyReleased);

	canvas.addEventListener('click',function(evt){
		if(gameState == STATE_LEVEL_EDITOR){
			mouseClick(mouseX, mouseY);
		} else if(gameState == STATE_CREDITS) {
			clickCredits();
		} else if(gameState == STATE_TITLE_SCREEN) {
			titleScreenMouseClick(mouseX, mouseY);
		} else if(gameState == STATE_CAR_UPGRADE_SCREEN){
			carUpgradeScreenMouseClick(mouseX, mouseY);
		} else if(gameState == STATE_ENTER_PLAYER_NAME) {
			console.log("This should execute");
			enterPlayerNameScreenMouseClick(mouseX, mouseY);
		} else if(gameState == STATE_WIN_SCREEN){
			winScreenMouseClick();
		} else if(gameState == STATE_PAUSED){
			pauseMenuOnClick(mouseX, mouseY);
		} else if(gameState == STATE_WRECKED){
			wreckedScreenMouseClick(mouseX, mouseY);
		} else if(gameState == STATE_HELP) {
			helpScreenMouseClick(mouseX, mouseY);
		}
	} );

  canvas2.addEventListener('mousemove', function(evt){
    mouseX = calculateMousePos(evt, canvas2).x;
    mouseY = calculateMousePos(evt, canvas2).y;
  });

	canvas2.addEventListener('click',function(evt){
		if(gameState == STATE_WRECKED){
			wreckedScreenMouseClick(mouseX, mouseY);
		}
	});

	if(computerPlayerOn) {
		vehicleList[1].setupControls(KEY_UP_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW, KEY_RIGHT_ARROW, KEY_ENTER, KEY_SHIFT);
	}
	vehicleList[0].setupControls(KEY_W, KEY_S, KEY_A, KEY_D, KEY_F, KEY_Q);
}

const PAUSEMENU_X = 320;
const PAUSEMENU_Y = 310;
const PAUSEMENU_BUTTONW = 288;
const PAUSEMENU_BUTTONH = 40;
const PAUSEMENU_SPACING = 50;
const PAUSEMENU_TXT_X = PAUSEMENU_X + 15;
const PAUSEMENU_TXT_Y = PAUSEMENU_Y + 30;

function isHoveringRestartButton(offsetX = 0, offsetY = 0) {
    return (mouseX > PAUSEMENU_X * scaleWidth + offsetX * scaleWidth
        && mouseX < (PAUSEMENU_X+PAUSEMENU_BUTTONW) * scaleWidth + offsetX * scaleWidth
        && mouseY > PAUSEMENU_Y * scaleHeight + offsetY * scaleHeight
        && mouseY < (PAUSEMENU_Y+PAUSEMENU_BUTTONH) * scaleHeight + offsetY * scaleHeight);
}
function isHoveringRespawnButton(offsetX = 0, offsetY = 0) {
    return (mouseX > PAUSEMENU_X * scaleWidth + offsetX * scaleWidth
        && mouseX < (PAUSEMENU_X+PAUSEMENU_BUTTONW) * scaleWidth + offsetX * scaleWidth
        && mouseY > (PAUSEMENU_Y+PAUSEMENU_SPACING) * scaleHeight + offsetY * scaleHeight
        && mouseY < (PAUSEMENU_Y+PAUSEMENU_SPACING+PAUSEMENU_BUTTONH) * scaleHeight + offsetY * scaleHeight);
}
function isHoveringContinueButton(offsetX = 0, offsetY = 0) {
    return (mouseX > PAUSEMENU_X * scaleWidth + offsetX * scaleWidth
        && mouseX < (PAUSEMENU_X+PAUSEMENU_BUTTONW) * scaleWidth + offsetX * scaleWidth
        && mouseY > (PAUSEMENU_Y+PAUSEMENU_SPACING+PAUSEMENU_SPACING) * scaleHeight + offsetY * scaleHeight
        && mouseY < (PAUSEMENU_Y+PAUSEMENU_SPACING+PAUSEMENU_SPACING+PAUSEMENU_BUTTONH) * scaleHeight + offsetY * scaleHeight);
}

function isHoveringHelpButton(offsetX = 0, offsetY = 0) {
	return (mouseX > PAUSEMENU_X * scaleWidth + offsetX * scaleWidth
        && mouseX < (PAUSEMENU_X+PAUSEMENU_BUTTONW) * scaleWidth + offsetX * scaleWidth
        && mouseY > (PAUSEMENU_Y+PAUSEMENU_SPACING+PAUSEMENU_SPACING+PAUSEMENU_SPACING) * scaleHeight + offsetY * scaleHeight
        && mouseY < (PAUSEMENU_Y+PAUSEMENU_SPACING+PAUSEMENU_SPACING+PAUSEMENU_SPACING+PAUSEMENU_BUTTONH) * scaleHeight + offsetY * scaleHeight);
}

// the pause screen menu
function drawPauseMenu(ctx,
					   pauseX = 200, pauseY = 200,
					   pmX = PAUSEMENU_X, pmY = PAUSEMENU_Y,
					   pmtxtX = PAUSEMENU_TXT_X, pmtxtY = PAUSEMENU_TXT_Y,
					   pmbW = PAUSEMENU_BUTTONW, pmbH = PAUSEMENU_BUTTONH,
					   pmSpacing = PAUSEMENU_SPACING) {
	
	colorText("PAUSED", pauseX+2, pauseY+2, "black", "36px Arial Black", ctx);
	colorText("PAUSED", pauseX, pauseY, "white", "36px Arial Black", ctx);

	//console.log(mousePosX, mousePosY);
  colorRect(pmX,pmY,pmbW,pmbH, 'black', ctx);
  colorRect(pmX,pmY,50,pmbH, 'white');
  var hoveroffsetX = pmX == PAUSEMENU_X ? 0 : -384;
  if (isHoveringRestartButton(hoveroffsetX)) colorRect(pmX,pmY,pmbW,pmbH, 'rgba(255,255,0,0.5)', ctx);
  colorText("RESTART RACE", pmtxtX, pmtxtY, 'orange', font = "24px Arial Black", ctx);

  colorRect(pmX,pmY+pmSpacing,pmbW,pmbH, 'black', ctx);
	colorRect(pmX,pmY+pmSpacing,50,pmbH, 'white', ctx);
  if (isHoveringRespawnButton(hoveroffsetX)) colorRect(pmX,pmY+pmSpacing,pmbW,pmbH, 'rgba(255,255,0,0.5)', ctx);
	colorText("LAST CHECKPOINT"  , pmtxtX, pmtxtY+pmSpacing, 'orange', font = "24px Arial Black", ctx);

	colorRect(pmX,pmY+pmSpacing*2,pmbW,pmbH, 'black', ctx);
	colorRect(pmX,pmY+pmSpacing*2,50,pmbH, 'white', ctx);
  if (isHoveringContinueButton(hoveroffsetX)) colorRect(pmX,pmY+pmSpacing*2,pmbW,pmbH, 'rgba(255,255,0,0.5)', ctx);
	colorText("CONTINUE"  , pmtxtX, pmtxtY+pmSpacing*2, 'orange', font = "24px Arial Black", ctx);

	colorRect(pmX,pmY+pmSpacing*3,pmbW,pmbH, 'black', ctx);
	colorRect(pmX,pmY+pmSpacing*3,50,pmbH, 'white', ctx);
	if (isHoveringHelpButton(hoveroffsetX)) colorRect(pmX,pmY+pmSpacing*3,pmbW,pmbH, 'rgba(255,255,0,0.5)', ctx);
	colorText("HELP"  , pmtxtX, pmtxtY+pmSpacing*3, 'orange', font = "24px Arial Black", ctx);
}

function pauseMenuOnClick(mousePosX, mousePosY) {
    
    if (isHoveringRestartButton()) {
        console.log("Clicked the restart button");
        resetLevel();
        return;
    }
    
    if (isHoveringRespawnButton()) {
        console.log("Clicked the respawn button");
        if (vehicleList && vehicleList[0] && vehicleList[0].respawnPosition) {
            console.log("Moving car 0 to respawn location!");
            vehicleList[0].x = vehicleList[0].respawnPosition.x;
            vehicleList[0].y = vehicleList[0].respawnPosition.y;
            vehicleList[0].ang = vehicleList[0].respawnPosition.ang;
            vehicleList[0].speed = 0;
            updateState(STATE_PLAY);
            isMuted = (gameState == STATE_PAUSED) || isMutedByShortcut;        
        }
    }

    if (isHoveringContinueButton()) {
        console.log("Clicked the continue button");
		updateState(STATE_PLAY);
		isMuted = (gameState == STATE_PAUSED) || isMutedByShortcut;        
    }

    if (isHoveringHelpButton()) {
    	console.log("Clicked the help button");
    	updateState(STATE_HELP);
    }

  }

function keyPressed(evt) {
	var levelEditorKey = KEY_F1;
	var debugKey = KEY_F2;
	var pausedKey = KEY_P;
	var nextLevelKey = KEY_L;
	var raceResultsPageKey = KEY_1;
	var muteKey = KEY_O;
	var enterPlayerNameKey = KEY_2;
	
	var camJump = 40;
	if(gameState == STATE_LEVEL_EDITOR){
		switch (evt.keyCode){
			case KEY_UP_ARROW:
				camPanY -= camJump;
				break;			
			case KEY_DOWN_ARROW:
				camPanY += camJump;
				break;
			case KEY_LEFT_ARROW:
				camPanX -= camJump;
				break;
			case KEY_RIGHT_ARROW:
				camPanX += camJump;
				break;
			case KEY_ENTER:
				downloadMap("var newTrack = [" + trackGrid + "];", "text/plain", "updatedTrackGrid.txt");
			break;
		}
	} else {
		if((debugMode) && (evt.keyCode == KEY_C)) {
			controlCameraForDebug = !controlCameraForDebug;
		}

		if(controlCameraForDebug) {
			switch (evt.keyCode){
				case KEY_UP_ARROW:
					cameraP1.panY -= camJump;
					break;			
				case KEY_DOWN_ARROW:
					cameraP1.panY += camJump;
					break;
				case KEY_LEFT_ARROW:
					cameraP1.panX -= camJump;
					break;
				case KEY_RIGHT_ARROW:
					cameraP1.panX += camJump;
					break;
			}
		} else {
			setKeyHoldState(evt.keyCode, vehicleList[0], true);
			setKeyHoldState(evt.keyCode, vehicleList[1], true);	

			if(evt.keyCode == vehicleList[0].controlKeyForRocketFire){
				vehicleList[0].rocketFire();
			}
			if(evt.keyCode == vehicleList[1].controlKeyForRocketFire){
				vehicleList[1].rocketFire();
			}
		}
	}
	
	evt.preventDefault();
	if (muteKey == evt.keyCode) {
		isMuted = (gameState == STATE_PAUSED) || !isMuted;
		isMutedByShortcut = isMuted;
	} else if(pausedKey == evt.keyCode){
		if (gameState != STATE_PAUSED) {
			updateState(STATE_PAUSED);
		} else {
			updateState(STATE_PLAY);
		}	
		isMuted = (gameState == STATE_PAUSED) || isMutedByShortcut;
	} else if (levelEditorKey == evt.keyCode) {
		if (gameState != STATE_LEVEL_EDITOR) {
			updateState(STATE_LEVEL_EDITOR);
		} else {
			updateState(STATE_PLAY);
		}	
	} else if (debugKey == evt.keyCode){
		debugMode = !debugMode;
	} else if (debugMode){		//Debug options
		if (evt.keyCode == nextLevelKey){
			nextLevel();
//			debugMode = false;
		} else if (evt.keyCode == raceResultsPageKey){
			updateState(STATE_WIN_SCREEN);			
		} else if (evt.keyCode == enterPlayerNameKey){
			
			updateState(STATE_ENTER_PLAYER_NAME);
		}
	}
}

function keyReleased(evt) {
	setKeyHoldState(evt.keyCode, vehicleList[0], false);
	setKeyHoldState(evt.keyCode, vehicleList[1], false);
}

function setKeyHoldState(thisKey, thisCar, setTo) {

	isJoystickBeingUsed = false; // allow user to switch to keybd after trying gamepad

	if(thisKey == thisCar.controlKeyForGas){
		thisCar.keyHeld_Gas = setTo;
	}
	if(thisKey == thisCar.controlKeyForReverse){
		thisCar.keyHeld_Reverse = setTo;
	}
	if(thisKey == thisCar.controlKeyForTurnLeft){
		thisCar.keyHeld_TurnLeft = setTo;
	}
	
	if(thisKey == thisCar.controlKeyForTurnRight){
		thisCar.keyHeld_TurnRight = setTo;
	}
	
	if(thisKey == thisCar.controlKeyForNitro){
		thisCar.keyHeld_Nitro = setTo;
	}
}


function calculateMousePos(evt, cvs = canvas) {
	var rect = cvs.getBoundingClientRect(), root = document.documentElement;
	
  x = evt.clientX - rect.left - root.scrollLeft;
	y = evt.clientY - rect.top - root.scrollTop;

  return {
    'x': x,
    'y': y
  }
}

