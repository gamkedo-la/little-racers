function showCredits() {
	updateState(STATE_CREDITS);
}

function drawCredits() {
	canvasContext.drawImage(titleScreenePic, 0, 0, canvas.width / scaleWidth, canvas.height / scaleHeight);
	canvasContext.globalAlpha = 0.7;
	colorRect(0,0,
					canvas.width / scaleWidth, canvas.height / scaleHeight, 'black');
	canvasContext.globalAlpha = 1.0;
	var textLeftX = 25;
	var textTopY = 30;
	var lineSkip = 15;
	for(var i=0;i<creditsText.length;i++) {
		colorText(creditsText[i],textLeftX,textTopY+lineSkip*i,"white", "14px Arial"); 
	}
}

function clickCredits() {
	updateState(STATE_TITLE_SCREEN);
}

var creditsText =
[
"Vince McKeown: Project lead, core gameplay code, debug cheats, body shop functionality and related art, assorted asset integration, camera scrolling, AI waypoint following, internal editor before Tiled integration, race results screne, cash pickup, city sprite sheet, AI collision avoidance, trees and map buildings art, character selection screen, race time and related tracking, name entry, assorted bug fixes, rockets attack support, track 2 design",
"Jeff \"Axphin\" Hanlon: Airborne collision fixes, announcer voice over (ex. \"start your engines\" - many phrases), car sprites, car names support, trophy art for win screen, system clock font, title screen setup, results screen images, explosion and engine sound effects",
"Simon J Hoffiz: \"Guerrilla\" level design, mute key, screen shake, oil slip functionality, crack effect code, damage calculation, health display, game state refactoring (bools to enum), wrecked game state hookup, help screen option on pause",
"Mike LeSauvage: Race completion fix, collision handling improvements, jump speed threshold, nitro feature, arena wall graphics updated, grass and cone improvements, AI braking refactor, gauge system, tuning balance, boundary enforcement, two player upgrades, font integration, clock fix",
"Christer \"McFunkypants\" Kaitila: Fading decal support (tracks, skids), gamepad support, smoke effects, title screen flames and other decoration effects (sparkles!), effects optimizations, title screen background image, crack detection, mouse fix, headlights support, checkpoints, hover state support, assorted bug fixes",
"Randy Tan Shaoxian: Linux support fixes, proportion corrections, CSS improvements, debug draw code, speedometer display, gauges refacor, split screen support plus related fixes, wrong direction test, waypoint error, wreck screen improvement",
"H Trayford: Performance optimization (cached tile rendering), camera fix, Tiled map editor format integration, crack and oil tiles, pond tile set, title screen improvements, AI spread out, assorted bug fixes",
"Terrence McDonnell: Canvas rescaling, airborne collision fix, cars parking at end of race, editor waypoint integration, input improvements, assorted bug fixes",
"Alan Zaring: Background music",
"Anthony Free: Fuel gauge display, pit stop functionality, shields/health support, car fire",
"Gonzalo Delgado: Additional Linux support fixes, cone sprite, ramp sprites, oil barrel art, ramp directionality support",
"Vaan Hope Khani: Minimap feature, restart support, pause game improvements, rockets fix",
"Michelly Oliveira: Transmission options, nitro fix",
"Barış Köklü: Debug mode, AI steering improvement",
"Jose Contreras: Low fuel detection",
"Justin Horner: Audio pause fix, mute image, ice obstacle sprite hookup",
"Stebs: Rain effect",
"Osama \"Dorgam\" Alsalman: Premium nitro",
"Ricardo Velez: Car slide on ice",
"Chris DeLeon: Compiled credits, minimap smoothing, rain pans",
"                       Game made in HomeTeam GameDev, find out more or apply to join at HomeTeamGameDev.com",
" ",
"                                                                    -- CLICK ANYWHERE TO RETURN --"
];

function lineWrapCredits() {
	var newCut = [];
	var maxLineChar = 119;
	var findEnd;
	for(var i=0;i<creditsText.length;i++) {
		while(creditsText[i].length > 0) {
			findEnd = maxLineChar;
			if(creditsText[i].length > maxLineChar) {
				for(var ii=findEnd;ii>0;ii--) {
					if(creditsText[i].charAt(ii) == " ") {
						findEnd=ii;
						break;
					}
				}
			}
			newCut.push(creditsText[i].substring(0, findEnd));
			creditsText[i] = creditsText[i].substring(findEnd, creditsText[i].length);
		}
	}	
	creditsText = newCut;
}
lineWrapCredits(); // note: calling immediately as part of init
