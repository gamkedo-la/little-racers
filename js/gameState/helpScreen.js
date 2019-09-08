function drawHelpScreen() {
	colorRect(80, 80, canvas.width-80, canvas.height-80, 'rgba(0,0,0,0.5)');
	colorText("HELP MENU", 275, 200, 'white', font = "35px Arial Black");
	colorText("Click anywhere to return to PAUSED MENU.", 250, 240, 'white', font = "15px Arial");
}

function helpScreenMouseClick() {
    console.log("Help screen clicked. Returning to main menu.");
    updateState (STATE_PAUSED);
}