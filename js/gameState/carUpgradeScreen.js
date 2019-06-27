var transmissionOptions = false;
var tireOptions = false;
var engineOptions = false;
var nitroOptions = false;
var exhaustOptions = false;
var optionOneX = 500;
var optionOneY = 10;
var optionTwoX = 500;
var optionTwoY = 150;
var optionThreeX =500;
var optionThreeY = 300
var optionFourX = 500;
var optionFourY = 450;

function drawCarUpgradeScreen(){
	colorRect(0,0,canvas.width * scaleWidth,canvas.height * scaleHeight, 'white');
	colorRect(10,10,400,200,'green');
	canvasContext.drawImage(bodyShopPic, 0, 0);
	colorText("Body Shop", 120, 50, 'black', font = "24px Arial Black");
	colorText("Cash: $" + vehicleList[0].cash, 50, 100, font = "12px Arial Black");
	colorRect(60,360,100,50, 'blue'); //transmission	
	colorRect(60,460,100,50, 'blue');	//tires
	colorRect(375,290,100,50, 'blue');	//engine
	colorRect(60,290,100,50, 'blue');	//nitro
	colorRect(375,510,100,50, 'blue');	//exhaust 
	colorRect(300,150,100,50,'red'); //exit shop
	colorText("Transmission", 62, 390, 'white', font = "12px Arial Black");
	colorText("Tires", 88, 490, 'white', font = "14px Arial Black");
	colorText("Engine", 395, 320, 'white', font = "14px Arial Black");
	colorText("Nitro", 88, 320, 'white', font = "14px Arial Black");
	colorText("Exhaust", 390, 540, 'white', font = "14px Arial Black");
	colorText("Exit Shop", 315, 180, 'black', font = "14px Arial Black");
	
	if(transmissionOptions){
		colorRect(500, 20,100,100, 'blue'); 
		colorRect(500,175,100,100, 'blue'); 
		colorRect(500,325,100,100, 'blue'); 
		colorRect(500,475,100,100, 'blue');
		colorRect(250,290,30,200, 'red');
		colorText("Transmission", 62, 390, 'red', font = "12px Arial Black");
		colorText("Tx Option 1", 505, 50, 'white', font = "12px Arial Black"); // To be replaced with a pic
		colorText("Tx Option 2", 505, 205, 'white', font = "12px Arial Black"); 
		colorText("Tx Option 3", 505, 355, 'white', font = "12px Arial Black");
		colorText("Tx Option 4", 505, 505, 'white', font = "12px Arial Black");
	} else if(tireOptions){
		colorRect(optionOneX, optionOneY,100,100, 'blue'); 
		colorRect(optionTwoX, optionTwoY,100,100, 'blue'); 
		colorRect(optionThreeX, optionThreeY,100,100, 'blue'); 
		colorRect(optionFourX, optionFourY,100,100, 'blue'); 
		colorRect(168,283,18,50, 'red'); //left front tire
		colorRect(338,283,18,50, 'red'); //right front tire
		colorRect(168,457,18,58, 'red'); // left back tire
		colorRect(338,457,18,58, 'red'); // right back tire
		colorText("Tires", 88, 490, 'red', font = "14px Arial Black");
		//Tire Option 1
		canvasContext.drawImage(tireOptionOnePic, optionOneX, optionOneY);
		colorText("Basic Tires", optionOneX + 18, optionOneY + 115, 'black', font = "10px Arial Black");
		colorText("$100", optionOneX + 35, optionOneY + 130, 'black', font = "10px Arial Black");
		//Tire Option 2
		canvasContext.drawImage(tireOptionTwoPic, optionTwoX, optionTwoY);
		colorText("Good Tires", optionTwoX + 18, optionTwoY + 115, 'black', font = "10px Arial Black");
		colorText("$300", optionTwoX + 35, optionTwoY + 130, 'black', font = "10px Arial Black");
		//Tire Option 3
		canvasContext.drawImage(tireOptionThreePic, optionThreeX, optionThreeY);
		colorText("Advanced Tires", optionThreeX + 5, optionThreeY + 115, 'black', font = "10px Arial Black");
		colorText("$500", optionThreeX + 35, optionThreeY + 130, 'black', font = "10px Arial Black");
		//Tire Option 4
		canvasContext.drawImage(tireOptionFourPic, optionFourX, optionFourY);
		colorText("Premium Tires", optionFourX + 7, optionFourY + 115, 'black', font = "10px Arial Black");
		colorText("$1,000", optionFourX + 32, optionFourY + 130, 'black', font = "10px Arial Black");
	} else if(engineOptions){
		colorRect(500, 20,100,100, 'blue'); 
		colorRect(500,175,100,100, 'blue'); 
		colorRect(500,325,100,100, 'blue'); 
		colorRect(500,475,100,100, 'blue');
		colorRect(215,290,90,50, 'red');
		colorText("Engine", 395, 320, 'red', font = "14px Arial Black");		
		colorText("En Option 1", 505, 50, 'white', font = "12px Arial Black"); // To be replaced with a pic
		colorText("En Option 2", 505, 205, 'white', font = "12px Arial Black");
		colorText("En Option 3", 505, 355, 'white', font = "12px Arial Black");
		colorText("En Option 4", 505, 505, 'white', font = "12px Arial Black");
	} else if(nitroOptions){
		colorRect(500, 20,100,100, 'blue'); 
		colorRect(500,175,100,100, 'blue'); 
		colorRect(500,325,100,100, 'blue'); 
		colorRect(500,475,100,100, 'blue');
		colorRect(215,320,30,30, 'red');
		colorText("Nitro", 88, 320, 'red', font = "14px Arial Black");
		colorText("N Option 1", 505, 50, 'white', font = "12px Arial Black"); // To be replaced with a pic
		colorText("N Option 2", 505, 205, 'white', font = "12px Arial Black");
		colorText("N Option 3", 505, 355, 'white', font = "12px Arial Black");
		colorText("N Option 5", 505, 505, 'white', font = "12px Arial Black");
	} else if(exhaustOptions){
		colorRect(500, 20,100,100, 'blue'); 
		colorRect(500,175,100,100, 'blue'); 
		colorRect(500,325,100,100, 'blue'); 
		colorRect(500,475,100,100, 'blue');
		colorRect(225,520,20,10, 'red');
		colorRect(280,520,20,10, 'red');
		colorText("Exhaust", 390, 540, 'red', font = "14px Arial Black");
		colorText("Ex Option 1", 505, 50, 'white', font = "12px Arial Black"); // To be replaced with a pic
		colorText("Ex Option 2", 505, 205, 'white', font = "12px Arial Black");
		colorText("Ex Option 3", 505, 355, 'white', font = "12px Arial Black");
		colorText("Ex Option 5", 505, 505, 'white', font = "12px Arial Black");
	}
}
	
function carUpgradeScreenMouseClick(mousePosX, mousePosY) {
	console.log(mousePosX, mousePosY);
	if(mousePosX > 60 * scaleWidth && mousePosX < 160 * scaleWidth && mousePosY > 360 * scaleHeight  && mousePosY < 410 * scaleHeight ){ //Transmission
		turnOffOtherOptions();
		transmissionOptions = true;
	} else if(mousePosX > 60 * scaleWidth && mousePosX < 160 * scaleWidth && mousePosY > 460 * scaleHeight  && mousePosY < 510 * scaleHeight ){  // Tires  
		turnOffOtherOptions();
		tireOptions = true;
	} else if(mousePosX > 375 * scaleWidth && mousePosX < 475 * scaleWidth && mousePosY > 290 * scaleHeight  && mousePosY < 340 * scaleHeight ){ //Engine
		turnOffOtherOptions();
		engineOptions = true;
	} else if(mousePosX > 88 * scaleWidth && mousePosX < 188 * scaleWidth && mousePosY > 290 * scaleHeight  && mousePosY < 340 * scaleHeight ){ //Nitro
		turnOffOtherOptions();
		nitroOptions = true;
	} else if(mousePosX > 375 * scaleWidth && mousePosX < 475 * scaleWidth && mousePosY > 510 * scaleHeight  && mousePosY < 560 * scaleHeight ){ //Exhaust
		turnOffOtherOptions();
		exhaustOptions = true;
	} else if(mousePosX > 300 * scaleWidth && mousePosX < 400 * scaleWidth && mousePosY > 150 * scaleHeight  && mousePosY < 200 * scaleHeight ){ //Exit the shop
		carUpgradeScreen = false;
	}
}

function turnOffOtherOptions(){
	transmissionOptions = false;
	tireOptions = false;
	engineOptions = false;
	nitroOptions = false;
	exhaustOptions = false;
}

