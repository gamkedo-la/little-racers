function drawHelpScreen() {
	updateState (STATE_HELP);
	colorRect(0, 0, canvas.width, canvas.height, 'black');
	colorText("HELP", 200, 200, 'white', font = "20px Arial Black");
}

function helpScreenMouseClick() {
	updateState (STATE_PAUSED);
}