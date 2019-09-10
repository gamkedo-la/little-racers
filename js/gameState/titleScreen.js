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
{leftX: 325, topY: 300, width: 150, height: 50, word: "Debug Mode :", action: toggleDebug},
{leftX: 350, topY: 500, width: 100, height: 50, word: "Credits", action: showCredits}
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