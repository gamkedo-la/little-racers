function start1P() {
	vehicleList[0].computerPlayer = false;
	vehicleList[1].computerPlayer = true;
	updateState(STATE_PLAY);
}
function start2P() {
	vehicleList[0].computerPlayer = false;
	vehicleList[1].computerPlayer = false;
	updateState(STATE_PLAY);
	windowWasResized = true;
}
function toggleDebug() {
	debugMode = !debugMode;
}
var mainMenuButtonList = [
{leftX: 200, topY: 400, width: 100, height: 50, word: "1 Player", action: start1P},
{leftX: 500, topY: 400, width: 100, height: 50, word: "2 Players", action: start2P},
{leftX: 325, topY: 300, width: 150, height: 50, word: "Debug Mode :", action: toggleDebug}
];

function titleScreenMouseClick(mousePosX, mousePosY) {
	// console.log(mousePosX, mousePosY);
	for(var i=0;i<mainMenuButtonList.length;i++) {
		if(mousePosX > mainMenuButtonList[i].leftX * scaleWidth &&
			mousePosX < (mainMenuButtonList[i].leftX+mainMenuButtonList[i].width) * scaleWidth &&
			mousePosY > mainMenuButtonList[i].topY * scaleHeight &&
			mousePosY < (mainMenuButtonList[i].topY+mainMenuButtonList[i].height) * scaleHeight){
			console.log("clicked: " +mainMenuButtonList[i].word);
			mainMenuButtonList[i].action();
		}
	}

	if (gameState != STATE_TITLE_SCREEN) //Player just clicked 1 or 2 players, time to add rain.
	{
	    addRainToArray();
	    setInterval(function () {
	        if (gameState == STATE_PLAY) { 
		   	 addRainToArray();
		   }
	    }, 750)
	}
}

function drawTitleScreen(){
    // clear screen
    // pure black 800x600
    // colorRect(0,0,canvas.width/scaleWidth,canvas.height/scaleHeight, 'black');
    // stretch image 800x600
    // canvasContext.drawImage(titlescreenPic, 0, 0); // can't use canvas.width /2 due to scaling wierdness
    // clear to transparent so we page bg shows through
    canvasContext.clearRect(0,0,canvas.width,canvas.height);
    
    // logo
    //colorText("Little Racers", 310, 200, 'white', font = "24px Arial Black");
    canvasContext.drawImage(titleScreenePic, 0, 0, canvas.width / scaleWidth, canvas.height / scaleHeight); // can't use canvas.width /2 due to scaling wierdness
    // buttons
	var buttonMarginTextX = 15;
	var buttonMarginTextY = 30;

	for(var i=0;i<mainMenuButtonList.length;i++) {
    	colorRect(mainMenuButtonList[i].leftX,mainMenuButtonList[i].topY,
					mainMenuButtonList[i].width, mainMenuButtonList[i].height, 'white');
		colorText(mainMenuButtonList[i].word, mainMenuButtonList[i].leftX+buttonMarginTextX,
					mainMenuButtonList[i].topY+buttonMarginTextY,
							'black', "14px Arial Black");
	}
	var debugButtonIndex = 2;
	colorText(((debugMode == true) ? "on" : "off"), 
			mainMenuButtonList[debugButtonIndex].leftX+120,
			mainMenuButtonList[debugButtonIndex].topY+buttonMarginTextY, 'black', "14px Arial Black");
}

/*
Credits text (not yet implemented, doing a quick refactor of title button draw/interaction code first)

Vince McKeown: Project lead, core gameplay code, debug cheats, body shop functionality and related art, assorted asset integration, camera scrolling, AI waypoint following, internal editor before Tiled integration, race results screne, cash pickup, city sprite sheet, AI collision avoidance, trees and map buildings art, character selection screen, race time and related tracking, name entry, assorted bug fixes, rockets attack support, track 2 design
Jeff "Axphin" Hanlon: Airborne collision fixes, announcer voice over (ex. "start your engines" - many phrases), car sprites, car names support, trophy art for win screen, system clock font, title screen setup, results screen images, explosion and engine sound effects
Simon J Hoffiz: "Guerrilla" level design, mute key, screen shake, oil slip functionality, crack effect code, damage calculation, health display, game state refactoring (bools to enum), wrecked game state hookup, help screen option on pause
Mike LeSauvage: Race completion fix, collision handling improvements, jump speed threshold, nitro feature, arena wall graphics updated, grass and cone improvements, AI braking refactor, gauge system, tuning balance, boundary enforcement, two player upgrades, font integration, clock fix
Christer "McFunkypants" Kaitila: Fading decal support (tracks, skids), gamepad support, smoke effects, title screen flames and other decoration effects (sparkles!), effects optimizations, title screen background image, crack detection, mouse fix, headlights support, checkpoints, hover state support, assorted bug fixes
Randy Tan Shaoxian: Linux support fixes, proportion corrections, CSS improvements, debug draw code, speedometer display, gauges refacor, split screen support plus related fixes, wrong direction test, waypoint error, wreck screen improvement
H Trayford: Performance optimization (cached tile rendering), camera fix, Tiled map editor format integration, crack and oil tiles, pond tile set, title screen improvements, AI spread out, assorted bug fixes
Terrence McDonnell: Canvas rescaling, airborne collision fix, cars parking at end of race, editor waypoint integration, input improvements, assorted bug fixes
Alan Zaring: Background music
Anthony Free: Fuel gauge display, pit stop functionality, shields/health support, car fire
Gonzalo Delgado: Additional Linux support fixes, cone sprite, ramp sprites, oil barrel art, ramp directionality support
Vaan Hope Khani: Minimap feature, restart support, pause game improvements, rockets fix
Michelly Oliveira: Transmission options, nitro fix
Barış Köklü: Debug mode, AI steering improvement
Jose Contreras: Low fuel detection
Justin Horner: Audio pause fix, mute image, ice obstacle sprite hookup
Stebs: Rain effect
Osama "Dorgam" Alsalman: Premium nitro
Ricardo Velez: Car slide on ice
Chris DeLeon: Compiled credits, minimap smoothing, rain pans
*/
