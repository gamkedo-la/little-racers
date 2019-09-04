function drawHelpScreen() {
	updateState (STATE_HELP);
	colorRect(0, 0, canvas.width, canvas.height, 'black');
	colorText("HELP MENU", 275, 200, 'white', font = "35px Arial Black");
	colorText("Click anywhere to return to PAUSED MENU.", 250, 240, 'white', font = "15px Arial");
}

function helpScreenMouseClick() {
	updateState (STATE_PAUSED);
}