var nameScreenBoxHeight = 30;
var nameScreenBoxWidth = 30;

//row 1 variables
var nameScreenBoxQ_X = 752;
var nameScreenBoxQ_Y = 629;
var nameScreenBoxW_X = 0;
var nameScreenBoxW_Y = 0;
var nameScreenBoxE_X = 0;
var nameScreenBoxE_Y = 0;
var nameScreenBoxR_X = 0;
var nameScreenBoxR_Y = 0;
var nameScreenBoxT_X = 0;
var nameScreenBoxT_Y = 0;
var nameScreenBoxY_X = 0;
var nameScreenBoxY_Y = 0;
var nameScreenBoxU_X = 0;
var nameScreenBoxU_Y = 0;
var nameScreenBoxI_X = 0;
var nameScreenBoxI_Y = 0;
var nameScreenBoxO_X = 0;
var nameScreenBoxO_Y = 0;
var nameScreenBoxP_X = 0;
var nameScreenBoxP_Y = 0;
//row 2 variables
var nameScreenBoxA_X = 0;
var nameScreenBoxA_Y = 0;
var nameScreenBoxS_X = 0;
var nameScreenBoxS_Y = 0;
var nameScreenBoxD_X = 0;
var nameScreenBoxD_Y = 0;
var nameScreenBoxF_X = 0;
var nameScreenBoxF_Y = 0;
var nameScreenBoxG_X = 0;
var nameScreenBoxG_Y = 0;
var nameScreenBoxH_X = 0;
var nameScreenBoxH_Y = 0;
var nameScreenBoxJ_X = 0;
var nameScreenBoxJ_Y = 0;
var nameScreenBoxK_X = 0;
var nameScreenBoxK_Y = 0;
var nameScreenBoxL_X = 0;
var nameScreenBoxL_Y = 0;
//row 3 variables
var nameScreenBoxZ_X = 0;
var nameScreenBoxZ_Y = 0;
var nameScreenBoxX_X = 0;
var nameScreenBoxX_Y = 0;
var nameScreenBoxC_X = 0;
var nameScreenBoxC_Y = 0;
var nameScreenBoxV_X = 0;
var nameScreenBoxV_Y = 0;
var nameScreenBoxB_X = 0;
var nameScreenBoxB_Y = 0;
var nameScreenBoxN_X = 0;
var nameScreenBoxN_Y = 0;
var nameScreenBoxM_X = 0;
var nameScreenBoxM_Y = 0;
var rowOneLetters = new Array("Q","W","E","R","T","Y","U","I","O","P");
var rowTwoLetters = new Array('A','S','D','G','H','J','K','L');
var rowThreeLetters = new Array('Z','X','C','V','B','N','M');

function drawEnterPlayerNameScreen(canvas, canvasContext){
	
    //clear screen to black
    colorRect(0,0,canvas.width * scaleWidth, canvas.height * scaleHeight, 'black');
	
	// Players Name
	colorText("Player's Name", 320, 200, "white", "28px Arial Black", ctx = canvasContext);
	for(i = 0; i < 9; i++){
		colorRect((i*50 + 200),130, 40, 40, "white");
	}
	
	//row one
	for(i = 0; i < rowOneLetters.length; i++){
		colorRect((i*nameScreenBoxWidth + 300),250,nameScreenBoxWidth - 10,nameScreenBoxHeight,"white");
		colorText(rowOneLetters[i], (i*nameScreenBoxWidth + 305), 270, "black", "14px Arial Black", ctx = canvasContext);
	}
	//row two
    for(i = 0; i < rowTwoLetters.length; i++){
		colorRect((i*nameScreenBoxWidth + 330),300,nameScreenBoxWidth - 10,nameScreenBoxHeight,"white");
		colorText(rowTwoLetters[i], (i*nameScreenBoxWidth + 335), 320, "black", "14px Arial Black", ctx = canvasContext);
	}
	//row three
	for(i = 0; i < rowThreeLetters.length; i++){
		colorRect((i*nameScreenBoxWidth + 350),350,nameScreenBoxWidth - 10,nameScreenBoxHeight,"white");
		colorText(rowThreeLetters[i], (i*nameScreenBoxWidth + 355), 370, "black", "14px Arial Black", ctx = canvasContext);
	}
}

function EnterPlayerNameScreenMouseClick(mousePosX, mousePosY) {
	console.log(mousePosX, mousePosY);
	if(	mousePosX > nameScreenBoxQ_X && 
		mousePosX < (nameScreenBoxQ_X + nameScreenBoxWidth - 10) && 
		mousePosY > nameScreenBoxQ_Y && 
		mousePosY < (nameScreenBoxQ_Y + nameScreenBoxHeight - 10))
		{ 
		console.log("Q");
	}
}