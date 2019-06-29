var transmissionOptions = false;
var tireOptions = false;
var engineOptions = false;
var nitroOptions = false;
var exhaustOptions = false;
var optionOneX = 500;
var optionOneY = 10;
var optionTwoX = 500;
var optionTwoY = 150;
var optionThreeX = 500;
var optionThreeY = 300
var optionFourX = 500;
var optionFourY = 450;
var purchaseBoxX = 610;
var purchaseBoxY = 100;
var option1 = false;
var option2 = false;
var option3 = false;
var option4 = false;
var optionsSelected = false;
var purchaseBox = false;
var purchaseItem;

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
	if(optionsSelected){
		if(option1){
			colorRect(optionOneX, optionOneY,100,100, 'green'); 
		} else {
			colorRect(optionOneX, optionOneY,100,100, 'blue'); 
		}
		if(option2){
			colorRect(optionTwoX,optionTwoY,100,100, 'green'); 
		} else {
			colorRect(optionTwoX,optionTwoY,100,100, 'blue'); 
		}
		if(option3){
			colorRect(optionThreeX,optionThreeY,100,100, 'green'); 
		} else {
			colorRect(optionThreeX,optionThreeY,100,100, 'blue'); 
		}
		if(option4){
			colorRect(optionFourX,optionFourY,100,100, 'green');
		} else {
			colorRect(optionFourX,optionFourY,100,100, 'blue');
		}
		if(purchaseBox){
			colorRect(purchaseBoxX,purchaseBoxY,100,50, 'green');
			colorText("Purchase", purchaseBoxX + 20, purchaseBoxY + 20, 'black', font = "10px Arial Black");
			colorText(purchaseItem, purchaseBoxX + 10, purchaseBoxY + 40, 'black', font = "10px Arial Black");
		}
	}
	
	if(transmissionOptions){ //I plan to re-factor this code.... way too long and repetitive - Vince
		optionsSelected = true;
		colorRect(250,290,30,200, 'red');
		colorText("Transmission", 62, 390, 'red', font = "12px Arial Black");
		colorText("Tx Option 1", 505, 50, 'white', font = "12px Arial Black"); // To be replaced with a pic
		colorText("Tx Option 2", 505, 205, 'white', font = "12px Arial Black"); 
		colorText("Tx Option 3", 505, 355, 'white', font = "12px Arial Black");
		colorText("Tx Option 4", 505, 505, 'white', font = "12px Arial Black");
	} else if(tireOptions){
		optionsSelected = true;
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
		optionsSelected = true;
		colorRect(215,290,90,50, 'red');
		colorText("Engine", 395, 320, 'red', font = "14px Arial Black");		
		colorText("En Option 1", 505, 50, 'white', font = "12px Arial Black"); 
		colorText("En Option 2", 505, 205, 'white', font = "12px Arial Black");
		colorText("En Option 3", 505, 355, 'white', font = "12px Arial Black");
		colorText("En Option 4", 505, 505, 'white', font = "12px Arial Black");
	} else if(nitroOptions){
		optionsSelected = true;
		colorRect(220,350,20,20, 'red'); 
		colorText("Nitro", 88, 320, 'red', font = "14px Arial Black");
		//Tire Option 1
		canvasContext.drawImage(nitrosOptionOnePic, optionOneX, optionOneY);
		colorText("Basic Nitros", optionOneX + 18, optionOneY + 115, 'black', font = "10px Arial Black");
		colorText("$50", optionOneX + 35, optionOneY + 130, 'black', font = "10px Arial Black");
		//Tire Option 2
		canvasContext.drawImage(nitrosOptionTwoPic, optionTwoX, optionTwoY);
		colorText("Good Nitros", optionTwoX + 18, optionTwoY + 115, 'black', font = "10px Arial Black");
		colorText("$100", optionTwoX + 35, optionTwoY + 130, 'black', font = "10px Arial Black");
		//Tire Option 3
		//canvasContext.drawImage(nitrosOptionThreePic, optionThreeX, optionThreeY);
		colorText("Advanced Nitros", optionThreeX + 5, optionThreeY + 115, 'black', font = "10px Arial Black");
		colorText("$200", optionThreeX + 35, optionThreeY + 130, 'black', font = "10px Arial Black");
		//Tire Option 4
		//canvasContext.drawImage(nitrosOptionFourPic, optionFourX, optionFourY);
		colorText("Premium Nitros", optionFourX + 7, optionFourY + 115, 'black', font = "10px Arial Black");
		colorText("$500", optionFourX + 35, optionFourY + 130, 'black', font = "10px Arial Black");
	} else if(exhaustOptions){
		optionsSelected = true;
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
		turnOffOption1through4();
		transmissionOptions = true;
	} else if(mousePosX > 60 * scaleWidth && mousePosX < 160 * scaleWidth && mousePosY > 460 * scaleHeight  && mousePosY < 510 * scaleHeight ){  // Tires  
		turnOffOtherOptions();
		turnOffOption1through4();
		tireOptions = true;
	} else if(mousePosX > 375 * scaleWidth && mousePosX < 475 * scaleWidth && mousePosY > 290 * scaleHeight  && mousePosY < 340 * scaleHeight ){ //Engine
		turnOffOtherOptions();
		turnOffOption1through4();
		engineOptions = true;
	} else if(mousePosX > 88 * scaleWidth && mousePosX < 188 * scaleWidth && mousePosY > 290 * scaleHeight  && mousePosY < 340 * scaleHeight ){ //Nitro
		turnOffOtherOptions();
		turnOffOption1through4();
		nitroOptions = true;
	} else if(mousePosX > 375 * scaleWidth && mousePosX < 475 * scaleWidth && mousePosY > 510 * scaleHeight  && mousePosY < 560 * scaleHeight ){ //Exhaust
		turnOffOtherOptions();
		turnOffOption1through4();
		exhaustOptions = true;
	} else if(mousePosX > 300 * scaleWidth && mousePosX < 400 * scaleWidth && mousePosY > 150 * scaleHeight  && mousePosY < 200 * scaleHeight ){ //Exit the shop
		carUpgradeScreen = false;
	} else if(mousePosX > 500 * scaleWidth && mousePosX < 600 * scaleWidth && mousePosY > 20 * scaleHeight && mousePosY < 120 * scaleHeight){ // Option Box 1
		if(transmissionOptions){
			turnOffOption1through4();
			option1 = true;
		} else if(tireOptions){
			turnOffOption1through4();
			option1 = true;
		} else if(engineOptions){
			turnOffOption1through4();
			option1 = true;
		} else if(nitroOptions){
			turnOffOption1through4();
			option1 = true;
		} else if(exhaustOptions){
			turnOffOption1through4();
			option1 = true;
		}
	} else if(mousePosX > 500 * scaleWidth && mousePosX < 600 * scaleWidth && mousePosY > 175 * scaleHeight && mousePosY < 275 * scaleHeight){ // Option Box 2
		if(transmissionOptions){
			turnOffOption1through4();
			option2 = true;
		} else if(tireOptions){
			turnOffOption1through4();
			option2 = true;
		} else if(engineOptions){
			turnOffOption1through4();
			option2 = true;
		} else if(nitroOptions){
			turnOffOption1through4();
			option2 = true;
		} else if(exhaustOptions){
			turnOffOption1through4();
			option2 = true;
		}
	} else if(mousePosX > 500 * scaleWidth && mousePosX < 600 * scaleWidth && mousePosY > 325 * scaleHeight && mousePosY < 425 * scaleHeight){ // Option Box 3
		if(transmissionOptions){
			turnOffOption1through4();
			option3 = true;
		} else if(transmissionOptions){
			turnOffOption1through4();
			option3 = true;
		} else if(tireOptions){
			turnOffOption1through4();
			option3 = true;
		} else if(engineOptions){
			turnOffOption1through4();
			option3 = true;
		} else if(nitroOptions){
			turnOffOption1through4();
			option3 = true;
		} else if(exhaustOptions){
			turnOffOption1through4();
			option3 = true;
		}
	} else if(mousePosX > 500 * scaleWidth && mousePosX < 600 * scaleWidth && mousePosY > 475 * scaleHeight && mousePosY < 575 * scaleHeight){ // Option Box 4
		if(transmissionOptions){
			turnOffOption1through4();
			option4 = true;
			purchaseBox = true;
			purchaseItem = "Transmission 4";
		} else if(tireOptions){
			turnOffOption1through4();
			option4 = true;
			purchaseBox = true;
			purchaseItem = "Tire 4";
		} else if(engineOptions){
			turnOffOption1through4();
			option4 = true;
			purchaseBox = true;
			purchaseItem = "Enginer 4";
		} else if(nitroOptions){
			turnOffOption1through4();
			option4 = true;
			purchaseBox = true;
			purchaseItem = "Nitro 4";
		} else if(exhaustOptions){
			turnOffOption1through4();
			option4 = true;
			purchaseBox = true;
			purchaseItem = "Exhaust 4";
		}
	}
}

function turnOffOption1through4(){
	option1 = false;
	option2 = false;
	option3 = false;
	option4 = false;
}

function turnOffOtherOptions(){
	transmissionOptions = false;
	tireOptions = false;
	engineOptions = false;
	nitroOptions = false;
	exhaustOptions = false;
}

