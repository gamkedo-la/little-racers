var nameScreenBoxHeight = 30;
var nameScreenBoxWidth = 30;
var nameScreenRowOneStartX = 300;
var nameScreenRowTwoStartX = 330;
var nameScreenRowThreeStartX = 350;
var nameScreenRowOneStartY = 250;
var nameScreenRowTwoStartY = 300;
var nameScreenRowthreeStartY = 350;
var position1 = " ";
var position2 = " ";
var position3 = " ";
var position4 = " ";
var position5 = " ";
var position6 = " ";
var position7 = " ";
var position8 = " ";
var position9 = " ";
var position1NotFilled = true;
var position2NotFilled = true;
var position3NotFilled = true;
var position4NotFilled = true;
var position5NotFilled = true;
var position6NotFilled = true;
var position7NotFilled = true;
var position8NotFilled = true;
var position9NotFilled = true;

var nameScreenBoxQ_X = nameScreenRowOneStartX;
var nameScreenBoxQ_Y = nameScreenRowOneStartY;
var nameScreenBoxW_X = nameScreenRowOneStartX + nameScreenBoxWidth;
var nameScreenBoxW_Y = nameScreenRowOneStartY;
var nameScreenBoxE_X = nameScreenRowOneStartX + (nameScreenBoxWidth * 2);
var nameScreenBoxE_Y = nameScreenRowOneStartY;
var nameScreenBoxR_X = nameScreenRowOneStartX + (nameScreenBoxWidth * 3);
var nameScreenBoxR_Y = nameScreenRowOneStartY;
var nameScreenBoxT_X = nameScreenRowOneStartX + (nameScreenBoxWidth * 4);
var nameScreenBoxT_Y = nameScreenRowOneStartY;
var nameScreenBoxY_X = nameScreenRowOneStartX + (nameScreenBoxWidth * 5);
var nameScreenBoxY_Y = nameScreenRowOneStartY;
var nameScreenBoxU_X = nameScreenRowOneStartX + (nameScreenBoxWidth * 6);
var nameScreenBoxU_Y = nameScreenRowOneStartY;
var nameScreenBoxI_X = nameScreenRowOneStartX + (nameScreenBoxWidth * 7);
var nameScreenBoxI_Y = nameScreenRowOneStartY;
var nameScreenBoxO_X = nameScreenRowOneStartX + (nameScreenBoxWidth * 8);
var nameScreenBoxO_Y = nameScreenRowOneStartY;
var nameScreenBoxP_X = nameScreenRowOneStartX + (nameScreenBoxWidth * 9);
var nameScreenBoxP_Y = nameScreenRowOneStartY;
//row 2 variables
var nameScreenBoxA_X = nameScreenRowTwoStartX;
var nameScreenBoxA_Y = nameScreenRowTwoStartY;
var nameScreenBoxS_X = nameScreenRowTwoStartX + nameScreenBoxWidth;
var nameScreenBoxS_Y = nameScreenRowTwoStartY;
var nameScreenBoxD_X = nameScreenRowTwoStartX + (nameScreenBoxWidth * 2);
var nameScreenBoxD_Y = nameScreenRowTwoStartY;
var nameScreenBoxF_X = nameScreenRowTwoStartX + (nameScreenBoxWidth * 3);
var nameScreenBoxF_Y = nameScreenRowTwoStartY;
var nameScreenBoxG_X = nameScreenRowTwoStartX + (nameScreenBoxWidth * 4);
var nameScreenBoxG_Y = nameScreenRowTwoStartY;
var nameScreenBoxH_X = nameScreenRowTwoStartX + (nameScreenBoxWidth * 5);
var nameScreenBoxH_Y = nameScreenRowTwoStartY;
var nameScreenBoxJ_X = nameScreenRowTwoStartX + (nameScreenBoxWidth * 6);
var nameScreenBoxJ_Y = nameScreenRowTwoStartY;
var nameScreenBoxK_X = nameScreenRowTwoStartX + (nameScreenBoxWidth * 7);
var nameScreenBoxK_Y = nameScreenRowTwoStartY;
var nameScreenBoxL_X = nameScreenRowTwoStartX + (nameScreenBoxWidth * 8);
var nameScreenBoxL_Y = nameScreenRowTwoStartY;
//row 3 variables
var nameScreenBoxZ_X = nameScreenRowThreeStartX;
var nameScreenBoxZ_Y = nameScreenRowthreeStartY;
var nameScreenBoxX_X = nameScreenRowThreeStartX + nameScreenBoxWidth;
var nameScreenBoxX_Y = nameScreenRowthreeStartY;
var nameScreenBoxC_X = nameScreenRowThreeStartX + (nameScreenBoxWidth * 2);
var nameScreenBoxC_Y = nameScreenRowthreeStartY;
var nameScreenBoxV_X = nameScreenRowThreeStartX + (nameScreenBoxWidth * 3);
var nameScreenBoxV_Y = nameScreenRowthreeStartY;
var nameScreenBoxB_X = nameScreenRowThreeStartX + (nameScreenBoxWidth * 4);
var nameScreenBoxB_Y = nameScreenRowthreeStartY;
var nameScreenBoxN_X = nameScreenRowThreeStartX + (nameScreenBoxWidth * 5);
var nameScreenBoxN_Y = nameScreenRowthreeStartY;
var nameScreenBoxM_X = nameScreenRowThreeStartX + (nameScreenBoxWidth * 6);
var nameScreenBoxM_Y = nameScreenRowthreeStartY;
var rowOneLetters = new Array("Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P");
var rowTwoLetters = new Array('A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L');
var rowThreeLetters = new Array('Z', 'X', 'C', 'V', 'B', 'N', 'M');
var playersName;

function drawEnterPlayerNameScreen(canvas, canvasContext) {

    //clear screen to black
    colorRect(0, 0, canvas.width * scaleWidth, canvas.height * scaleHeight, 'black');

    // Players Name
    colorText("Player's Name", 320, 200, "white", "28px Arial Black", ctx = canvasContext);
    for (i = 0; i < 9; i++) {
        colorRect((i * 50 + 200), 130, 40, 40, "white");
    }
    colorText(position1, 210, 160, "red", "28px Arial Black", ctx = canvasContext);
    colorText(position2, 260, 160, "red", "28px Arial Black", ctx = canvasContext);
    colorText(position3, 310, 160, "red", "28px Arial Black", ctx = canvasContext);
    colorText(position4, 360, 160, "red", "28px Arial Black", ctx = canvasContext);
    colorText(position5, 410, 160, "red", "28px Arial Black", ctx = canvasContext);
    colorText(position6, 460, 160, "red", "28px Arial Black", ctx = canvasContext);
    colorText(position7, 510, 160, "red", "28px Arial Black", ctx = canvasContext);
    colorText(position8, 560, 160, "red", "28px Arial Black", ctx = canvasContext);
    colorText(position9, 610, 160, "red", "28px Arial Black", ctx = canvasContext);


    //row one
    for (i = 0; i < rowOneLetters.length; i++) {
		canvasContext.drawImage(keyPic, (i * nameScreenBoxWidth + nameScreenRowOneStartX), nameScreenRowOneStartY);
		colorText(rowOneLetters[i], (i * nameScreenBoxWidth + nameScreenRowOneStartX + 5), (nameScreenRowOneStartY + 20), "black", "14px Arial Black", ctx = canvasContext);
    }
    //row two
    for (i = 0; i < rowTwoLetters.length; i++) {
        canvasContext.drawImage(keyPic, (i * nameScreenBoxWidth + nameScreenRowTwoStartX), nameScreenRowTwoStartY);
        colorText(rowTwoLetters[i], (i * nameScreenBoxWidth + nameScreenRowTwoStartX + 5), (nameScreenRowTwoStartY + 20), "black", "14px Arial Black", ctx = canvasContext);
    }
    //row three
    for (i = 0; i < rowThreeLetters.length; i++) {
        canvasContext.drawImage(keyPic,(i * nameScreenBoxWidth + nameScreenRowThreeStartX), nameScreenRowthreeStartY);
        colorText(rowThreeLetters[i], (i * nameScreenBoxWidth + nameScreenRowthreeStartY + 5), (nameScreenRowthreeStartY + 20), "black", "14px Arial Black", ctx = canvasContext);
    }
    //delete 
    colorRect(250, nameScreenRowthreeStartY, (nameScreenBoxWidth * 2), nameScreenBoxHeight, "white");
    colorText("DELETE", 255, (nameScreenRowthreeStartY + 18), "red", font = "12px Arial Black", ctx = canvasContext);
    //enter
    colorRect(600, nameScreenRowthreeStartY, (nameScreenBoxWidth * 2), nameScreenBoxHeight, "white");
    colorText("ENTER", 605, (nameScreenRowthreeStartY + 18), "red", font = "12px Arial Black", ctx = canvasContext);
}

function checkLetterBox(mousePosX, mousePosY, xPos, yPos) {
    if (mousePosX / scaleWidth > xPos &&
        mousePosX / scaleWidth < (xPos + nameScreenBoxWidth - 10) &&
        mousePosY / scaleHeight > yPos &&
        mousePosY / scaleHeight < (yPos + nameScreenBoxHeight)) {
        return true;
    }
}

function enterPlayerNameScreenMouseClick(mousePosX, mousePosY) {
    console.log("X: " + mouseX / scaleWidth);
    console.log("Y: " + mouseY / scaleHeight);

    checkLetterBox(nameScreenBoxQ_X, nameScreenBoxQ_Y)
    if (checkLetterBox(mousePosX, mousePosY, nameScreenBoxQ_X, nameScreenBoxQ_Y)) {
        enterALetter("Q");
    } else if (checkLetterBox(mousePosX, mousePosY, nameScreenBoxW_X, nameScreenBoxW_Y)) {
        enterALetter("W");
    } else if (checkLetterBox(mousePosX, mousePosY, nameScreenBoxE_X, nameScreenBoxE_Y)) {
        enterALetter("E");
    } else if (checkLetterBox(mousePosX, mousePosY, nameScreenBoxR_X, nameScreenBoxR_Y)) {
        enterALetter("R");
    } else if (checkLetterBox(mousePosX, mousePosY, nameScreenBoxT_X, nameScreenBoxT_Y)) {
        enterALetter("T");
    } else if (checkLetterBox(mousePosX, mousePosY, nameScreenBoxY_X, nameScreenBoxY_Y)) {
        enterALetter("Y");
    } else if (checkLetterBox(mousePosX, mousePosY, nameScreenBoxU_X, nameScreenBoxU_Y)) {
        enterALetter("U");
    } else if (checkLetterBox(mousePosX, mousePosY, nameScreenBoxI_X, nameScreenBoxI_Y)) {
        enterALetter("I");
    } else if (checkLetterBox(mousePosX, mousePosY, nameScreenBoxO_X, nameScreenBoxO_Y)) {
        enterALetter("O");
    } else if (checkLetterBox(mousePosX, mousePosY, nameScreenBoxP_X, nameScreenBoxP_Y)) {
        enterALetter("P");
    } else if (checkLetterBox(mousePosX, mousePosY, nameScreenBoxA_X, nameScreenBoxA_Y)) {
        enterALetter("A");
    } else if (checkLetterBox(mousePosX, mousePosY, nameScreenBoxS_X, nameScreenBoxS_Y)) {
        enterALetter("S");
    } else if (checkLetterBox(mousePosX, mousePosY, nameScreenBoxD_X, nameScreenBoxD_Y)) {
        enterALetter("D");
    } else if (checkLetterBox(mousePosX, mousePosY, nameScreenBoxF_X, nameScreenBoxF_Y)) {
        enterALetter("F");
    } else if (checkLetterBox(mousePosX, mousePosY, nameScreenBoxG_X, nameScreenBoxG_Y)) {
        enterALetter("G");
    } else if (checkLetterBox(mousePosX, mousePosY, nameScreenBoxH_X, nameScreenBoxH_Y)) {
        enterALetter("H");
    } else if (checkLetterBox(mousePosX, mousePosY, nameScreenBoxI_X, nameScreenBoxI_Y)) {
        enterALetter("I");
    } else if (checkLetterBox(mousePosX, mousePosY, nameScreenBoxJ_X, nameScreenBoxJ_Y)) {
        enterALetter("J");
    } else if (checkLetterBox(mousePosX, mousePosY, nameScreenBoxK_X, nameScreenBoxK_Y)) {
        enterALetter("K");
    } else if (checkLetterBox(mousePosX, mousePosY, nameScreenBoxL_X, nameScreenBoxL_Y)) {
        enterALetter("L");
    } else if (checkLetterBox(mousePosX, mousePosY, nameScreenBoxZ_X, nameScreenBoxZ_Y)) {
        enterALetter("Z");
    } else if (checkLetterBox(mousePosX, mousePosY, nameScreenBoxX_X, nameScreenBoxX_Y)) {
        enterALetter("X");
    } else if (checkLetterBox(mousePosX, mousePosY, nameScreenBoxC_X, nameScreenBoxC_Y)) {
        enterALetter("C");
    } else if (checkLetterBox(mousePosX, mousePosY, nameScreenBoxV_X, nameScreenBoxV_Y)) {
        enterALetter("V");
    } else if (checkLetterBox(mousePosX, mousePosY, nameScreenBoxB_X, nameScreenBoxB_Y)) {
        enterALetter("B");
    } else if (checkLetterBox(mousePosX, mousePosY, nameScreenBoxN_X, nameScreenBoxN_Y)) {
        enterALetter("N");
    } else if (checkLetterBox(mousePosX, mousePosY, nameScreenBoxM_X, nameScreenBoxM_Y)) {
        enterALetter("M");
    } else if (checkLetterBox(mousePosX, mousePosY, 250, nameScreenRowthreeStartY)) { //delete
        deleteALetter()
	} else if (checkLetterBox(mousePosX, mousePosY, 300, nameScreenRowthreeStartY)) { //delete
        deleteALetter()
    } else if (checkLetterBox(mousePosX, mousePosY, 600, nameScreenRowthreeStartY)) { //enter
        playersName = position1.concat(position2, position3, position4, position5, position6, position7, position8, position9);
        updateState(STATE_WIN_SCREEN);
    } else if (checkLetterBox(mousePosX, mousePosY, 650, nameScreenRowthreeStartY)) { //enter
        playersName = position1.concat(position2, position3, position4, position5, position6, position7, position8, position9);
        updateState(STATE_WIN_SCREEN);
    }
}

function enterALetter(letter) {
    if (position1NotFilled) {
        position1 = letter;
        position1NotFilled = false;
    } else if (position2NotFilled) {
        position2 = letter
        position2NotFilled = false;
    } else if (position3NotFilled) {
        position3 = letter
        position3NotFilled = false;
    } else if (position4NotFilled) {
        position4 = letter
        position4NotFilled = false;
    } else if (position5NotFilled) {
        position5 = letter
        position5NotFilled = false;
    } else if (position6NotFilled) {
        position6 = letter
        position6NotFilled = false;
    } else if (position7NotFilled) {
        position7 = letter
        position7NotFilled = false;
    } else if (position8NotFilled) {
        position8 = letter
        position8NotFilled = false;
    } else if (position9NotFilled) {
        position9 = letter
        position9NotFilled = false;
    } else {

    }
}

function deleteALetter() {
	if (position1NotFilled) {
		//no action
	} else if (position2NotFilled) {
		position1 = " ";
		position1NotFilled = true;
	} else if (position3NotFilled) {
		position2 = " ";
		position2NotFilled = true;
	} else if (position4NotFilled) {
		position3 = " ";
		position3NotFilled = true;
	} else if (position5NotFilled) {
		position4 = " ";
		position4NotFilled = true;
	} else if (position6NotFilled) {
		position5 = " ";
		position5NotFilled = true;
	} else if (position7NotFilled) {
		position6 = " ";
		position6NotFilled = true;
	} else if (position8NotFilled) {
		position7 = " ";
		position7NotFilled = true;
	} else if (position9NotFilled) {
		position8 = " ";
		position8NotFilled = true;
	} else {
		position9 = " ";
		position9NotFilled = true;
	}
}