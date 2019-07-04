var transmissionOptions = false;
var tireOptions = false;
var engineOptions = false;
var nitroOptions = false;
var exhaustOptions = false;
var transmissionBoxX = 60;
var transmissionBoxY = 360;
var tireBoxX = 60;
var tireBoxY = 460;
var engineBoxX = 375;
var engineBoxY = 290;
var optionOneX = 500;
var optionOneY = 10;
var optionTwoX = 500;
var optionTwoY = 150;
var optionThreeX = 500;
var optionThreeY = 300
var optionFourX = 500;
var optionFourY = 450;
var purchaseBoxX = 300;
var purchaseBoxY = 0;
var nitroBoxX = 60;
var nitroBoxY = 290;
var exhaustBoxX = 375;
var exhaustBoxY = 510;
var exitBoxX = 300;
var exitBoxY = 150;
var option1 = false;
var option2 = false;
var option3 = false;
var option4 = false;
var optionsSelected = false;
var purchaseBox = false;
var purchaseItem;

function drawCarUpgradeScreen(){
	colorRect(0,0,canvas.width * scaleWidth, canvas.height * scaleHeight, 'white');
	canvasContext.drawImage(bodyShopGaragePic, 0, 0);
	canvasContext.drawImage(bodyShopPic, 0, 0);
	colorText("Body Shop", 135, 30, 'black', font = "24px Arial Black");
	colorText("Cash: $" + vehicleList[0].cash, 5, 16, 'green', font = "12px Arial Black");
	colorText("Tire Type: " + vehicleList[0].tireVersion, 60, 65, 'black', font = "12px Arial Black");
	colorText("Engine Type: " + vehicleList[0].engineVersion, 60, 80, 'black', font = "12px Arial Black");
	colorText("Nitrous Type: " + vehicleList[0].nitroVersion, 60, 95, 'black', font = "12px Arial Black");	
	colorText("Exhaust Type: " + vehicleList[0].exhaustVersion, 60, 110, 'black', font = "12px Arial Black");	
	colorRect(transmissionBoxX, transmissionBoxY,100,50, 'blue'); //transmission	
	colorRect(tireBoxX, tireBoxY,100,50, 'blue');	//tires
	colorRect(engineBoxX, engineBoxY,100,50, 'blue');	//engine
	colorRect(nitroBoxX, nitroBoxY,100,50, 'blue');	//nitro
	colorRect(exhaustBoxX, exhaustBoxY,100,50, 'blue');	//exhaust 
	colorRect(exitBoxX, exitBoxY,100,50,'red'); //exit shop
	colorText("Transmission", transmissionBoxX + 2, transmissionBoxY + 30, 'white', font = "12px Arial Black");
	colorText("Tires", tireBoxX + 20, tireBoxY + 30, 'white', font = "14px Arial Black");
	colorText("Engine", engineBoxX + 20, engineBoxY + 30, 'white', font = "14px Arial Black");
	colorText("Nitro", nitroBoxX + 28, nitroBoxY + 30, 'white', font = "14px Arial Black");
	colorText("Exhaust", exhaustBoxX + 15, exhaustBoxY + 30, 'white', font = "14px Arial Black");
	colorText("Exit Shop", exitBoxX + 15, exitBoxY + 30, 'black', font = "14px Arial Black");
	
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
	
	if(transmissionOptions){ 
		optionsSelected = true;
		colorRect(250,290,30,200, 'red');
		colorText("Transmission", 62, 390, 'red', font = "12px Arial Black");
		colorText("Tx Option 1", optionOneX + 5, 50, 'white', font = "12px Arial Black"); // To be replaced
		colorText("Tx Option 2", optionTwoX + 5, 205, 'white', font = "12px Arial Black"); // to be replaced
		colorText("Tx Option 3", optionThreeX + 5, 355, 'white', font = "12px Arial Black"); // to be replaced 
		colorText("Tx Option 4", optionFourX + 5, 505, 'white', font = "12px Arial Black"); // to be replaced
	} else if(tireOptions){
		optionsSelected = true;
		colorRect(168,283,18,50, 'red'); //left front tire
		colorRect(338,283,18,50, 'red'); //right front tire
		colorRect(168,457,18,58, 'red'); // left back tire
		colorRect(338,457,18,58, 'red'); // right back tire
		colorText("Tires", tireBoxX + 20, tireBoxY + 30, 'red', font = "14px Arial Black");
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
		colorText("Engine", engineBoxX + 20, engineBoxY + 30, 'red', font = "14px Arial Black");		
		colorText("En Option 1", optionOneX + 5, 50, 'white', font = "12px Arial Black");  //to be replaced
		colorText("En Option 2", 505, 205, 'white', font = "12px Arial Black");  //to be replaced
		colorText("En Option 3", 505, 355, 'white', font = "12px Arial Black");  //to be replaced
		colorText("En Option 4", 505, 505, 'white', font = "12px Arial Black");  //to be replaced
	} else if(nitroOptions){
		optionsSelected = true;
		colorRect(220,350,20,20, 'red'); 
		colorText("Nitro", nitroBoxX + 28, nitroBoxY + 30, 'red', font = "14px Arial Black");
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
		colorText("Exhaust", exhaustBoxX + 15, exhaustBoxY + 30, 'red', font = "14px Arial Black");
		colorText("Ex Option 1", optionOneX + 5, 50, 'white', font = "12px Arial Black");  //to be replaced 
		colorText("Ex Option 2", optionTwoX + 5, 205, 'white', font = "12px Arial Black");  //to be replaced
		colorText("Ex Option 3", optionThreeX + 5, 355, 'white', font = "12px Arial Black");  //to be replaced
		colorText("Ex Option 5", optionFourX + 5, 505, 'white', font = "12px Arial Black");  //to be replaced
	}
}
	
function carUpgradeScreenMouseClick(mousePosX, mousePosY) {
	console.log(mousePosX * scaleWidth, mousePosY * scaleHeight);
	//Transmission
	if(		mousePosX > transmissionBoxX * scaleWidth && mousePosX < (transmissionBoxX + 100) * scaleWidth && 
			mousePosY > transmissionBoxY * scaleHeight && mousePosY < (transmissionBoxY + 50) * scaleHeight ){ 
		turnOffOtherOptions();
		turnOffOption1through4();
		transmissionOptions = true;
	// Tires  
	} else if(	mousePosX > tireBoxX * scaleWidth && mousePosX < (tireBoxX + 100) * scaleWidth && 
				mousePosY > tireBoxY * scaleHeight && mousePosY < (tireBoxY + 50) * scaleHeight ){  
		turnOffOtherOptions();
		turnOffOption1through4();
		tireOptions = true;
	//Engine
	} else if(	mousePosX > engineBoxX * scaleWidth && mousePosX < (engineBoxX + 100) * scaleWidth && 
				mousePosY > engineBoxY * scaleHeight  && mousePosY < (engineBoxY + 50) * scaleHeight ){ 
		turnOffOtherOptions();
		turnOffOption1through4();
		engineOptions = true;
	//Nitro
	} else if(	mousePosX > nitroBoxX * scaleWidth && mousePosX < (nitroBoxX + 100) * scaleWidth && 
				mousePosY > nitroBoxY * scaleHeight && mousePosY < (nitroBoxY + 50) * scaleHeight ){ 
		turnOffOtherOptions();
		turnOffOption1through4();
		nitroOptions = true;
	//Exhaust
	} else if(	mousePosX > exhaustBoxX * scaleWidth && mousePosX < (exhaustBoxX + 100) * scaleWidth && 
				mousePosY > exhaustBoxY * scaleHeight  && mousePosY < (exhaustBoxY + 50) * scaleHeight ){ 
		turnOffOtherOptions();
		turnOffOption1through4();
		exhaustOptions = true;
	//Exit the shop
	} else if(	mousePosX > exitBoxX * scaleWidth && mousePosX < (exitBoxX + 100) * scaleWidth && 
				mousePosY > exitBoxY * scaleHeight  && mousePosY < (exitBoxY + 50) * scaleHeight ){ 
		carUpgradeScreen = false;
	//Option Box 1
	} else if(	mousePosX > optionOneX * scaleWidth && mousePosX < (optionOneX + 100) * scaleWidth && 
				mousePosY > optionOneY * scaleHeight && mousePosY < (optionOneY + 100) * scaleHeight){ 
		if(transmissionOptions){
			turnOffOption1through4();
			option1 = true;
			purchaseBox = true;
			purchaseItem = "Transmission 1";
		} else if(tireOptions){
			turnOffOption1through4();
			option1 = true;
			purchaseBox = true;
			purchaseItem = "Tire 1";
		} else if(engineOptions){
			turnOffOption1through4();
			option1 = true;
			purchaseBox = true;
			purchaseItem = "Engine 1";
		} else if(nitroOptions){
			turnOffOption1through4();
			option1 = true;
			purchaseBox = true;
			purchaseItem = "Nitro 1";
		} else if(exhaustOptions){
			turnOffOption1through4();
			option1 = true
			purchaseBox = true;
			purchaseItem = "Exhaust 1";
		}
	// Option Box 2
	} else if(	mousePosX > optionTwoX * scaleWidth && mousePosX < (optionTwoX + 100) * scaleWidth && 
				mousePosY > optionTwoY * scaleHeight && mousePosY < (optionTwoY + 100) * scaleHeight){ 
		if(transmissionOptions){
			turnOffOption1through4();
			option2 = true;
			purchaseBox = true;
			purchaseItem = "Transmission 2";
		} else if(tireOptions){
			turnOffOption1through4();
			option2 = true
			purchaseBox = true;
			purchaseItem = "Tire 2";
		} else if(engineOptions){
			turnOffOption1through4();
			option2 = true
			purchaseBox = true;
			purchaseItem = "Engine 2";
		} else if(nitroOptions){
			turnOffOption1through4();
			option2 = true;
			purchaseBox = true;
			purchaseItem = "Nitro 2";
		} else if(exhaustOptions){
			turnOffOption1through4();
			option2 = true;
			purchaseBox = true;
			purchaseItem = "Exhaust 2";
		}
	// Option Box 3
	} else if(	mousePosX > optionThreeX * scaleWidth && mousePosX < (optionThreeX + 100) * scaleWidth && 
				mousePosY > optionThreeY * scaleHeight && mousePosY < (optionThreeY + 100) * scaleHeight){ 
		if(transmissionOptions){
			turnOffOption1through4();
			option3 = true;
			purchaseBox = true;
			purchaseItem = "Transmission 3";
		} else if(tireOptions){
			turnOffOption1through4();
			option3 = true;
			purchaseBox = true;
			purchaseItem = "Tire 3";
		} else if(engineOptions){
			turnOffOption1through4();
			option3 = true;
			purchaseBox = true;
			purchaseItem = "Engine 3";
		} else if(nitroOptions){
			turnOffOption1through4();
			option3 = true			
			purchaseBox = true;
			purchaseItem = "Nitro 3";
		} else if(exhaustOptions){
			turnOffOption1through4();
			option3 = true;
			purchaseBox = true;
			purchaseItem = "Exhaust 3";
		}
	// Option Box 4
	} else if(	mousePosX > optionFourX * scaleWidth && mousePosX < (optionFourX + 100) * scaleWidth && 
				mousePosY > optionFourY * scaleHeight && mousePosY < (optionFourY + 100) * scaleHeight){
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
			purchaseItem = "Engine 4";
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
	// Purchase Box
	} else if(	mousePosX > purchaseBoxX * scaleWidth && mousePosX < (purchaseBoxX + 100) * scaleWidth && 
				mousePosY > purchaseBoxY * scaleHeight && mousePosY < (purchaseBoxY + 50) * scaleHeight){
				switch(purchaseItem){
					case "Transmission 1":
						if(vehicleList[0].transmissionVersion < 1 && vehicleList[0].cash > 500){	
							vehicleList[0].transmissionVersion = 1;
							vehicleList[0].cash = vehicleList[0].cash - 500;
						}
						break;
					case "Transmission 2":
						if(vehicleList[0].transmissionVersion < 2 && vehicleList[0].cash >= 1000){	
							vehicleList[0].transmissionVersion = 1;
							vehicleList[0].cash = vehicleList[0].cash - 1000;
						}
						break;
					case "Transmission 3":
						if(vehicleList[0].transmissionVersion < 3 && vehicleList[0].cash >= 2000){	
							vehicleList[0].transmissionVersion = 1;
							vehicleList[0].cash = vehicleList[0].cash - 2000;
						}
						break;
					case "Transmission 4":
						if(vehicleList[0].transmissionVersion != 4 && vehicleList[0].cash >= 3000){	
							vehicleList[0].transmissionVersion = 1;
							vehicleList[0].cash = vehicleList[0].cash - 3000;
						}
						break;
					case "Tire 1":
						if(vehicleList[0].tireVersion < 1 && vehicleList[0].cash >= 100){	
							vehicleList[0].tireVersion = 1;
							vehicleList[0].cash = vehicleList[0].cash - 100;
						}
						break;
					case "Tire 2":
						if(vehicleList[0].tireVersion < 2 && vehicleList[0].cash >= 300){	
							vehicleList[0].tireVersion = 2;
							vehicleList[0].cash = vehicleList[0].cash - 300;
						}
						break;
					case "Tire 3":
						if(vehicleList[0].tireVersion < 3 && vehicleList[0].cash >= 500){	
							vehicleList[0].tireVersion = 3;
							vehicleList[0].cash = vehicleList[0].cash - 500;
						}
						break;
					case "Tire 4":
						if(vehicleList[0].tireVersion != 4 && vehicleList[0].cash >= 1000){	
							vehicleList[0].tireVersion = 4;
							vehicleList[0].cash = vehicleList[0].cash - 1000;
						}
						break;
					case "Engine 1":
						if(vehicleList[0].engineVersion < 1 && vehicleList[0].cash >= 1000){	
							vehicleList[0].engineVersion = 1;
							vehicleList[0].cash = vehicleList[0].cash - 1000;
						}
						break;
					case "Engine 2":
						if(vehicleList[0].engineVersion < 2 && vehicleList[0].cash >= 2000){	
							vehicleList[0].engineVersion = 2;
							vehicleList[0].cash = vehicleList[0].cash - 2000;
						}
						break;
					case "Engine 3":
						if(vehicleList[0].engineVersion < 3 && vehicleList[0].cash >= 3000){	
							vehicleList[0].engineVersion = 3;
							vehicleList[0].cash = vehicleList[0].cash - 3000;
						}
						break;
					case "Engine 4":
						if(vehicleList[0].engineVersion != 4 && vehicleList[0].cash >= 4000){	
							vehicleList[0].engineVersion = 4;
							vehicleList[0].cash = vehicleList[0].cash - 4000;
						}
						break;
					case "Nitro 1":
						if(vehicleList[0].nitroVersion < 1 && vehicleList[0].cash >= 100){	
							vehicleList[0].nitroVersion = 1;
							vehicleList[0].cash = vehicleList[0].cash - 100;
						}
						break;
					case "Nitro 2":
						if(vehicleList[0].nitroVersion < 2 && vehicleList[0].cash >= 250){	
							vehicleList[0].nitroVersion = 2;
							vehicleList[0].cash = vehicleList[0].cash - 250;
						}
						break;
					case "Nitro 3":
						if(vehicleList[0].nitroVersion < 3 && vehicleList[0].cash >= 500){	
							vehicleList[0].nitroVersion = 3;
							vehicleList[0].cash = vehicleList[0].cash - 500;
						}
						break;
					case "Nitro 4":
						if(vehicleList[0].nitroVersion != 4 && vehicleList[0].cash >= 1000){	
							vehicleList[0].nitroVersion = 4;
							vehicleList[0].cash = vehicleList[0].cash - 1000;
						}
						break;
					case "Exhaust 1":
						if(vehicleList[0].exhaustVersion < 1 && vehicleList[0].cash >= 100){	
							vehicleList[0].exhaustVersion = 1;
							vehicleList[0].cash = vehicleList[0].cash - 100;
						}
						break;
					case "Exhaust 2":
						if(vehicleList[0].exhaustVersion < 2 && vehicleList[0].cash >= 500){	
							vehicleList[0].exhaustVersion = 2;
							vehicleList[0].cash = vehicleList[0].cash - 500;
						}
						break;
					case "Exhaust 3":
						if(vehicleList[0].exhaustVersion < 3 && vehicleList[0].cash >= 1000){	
							vehicleList[0].exhaustVersion = 3;
							vehicleList[0].cash = vehicleList[0].cash - 1000;
						}
						break;
					case "Exhaust 4":
						if(vehicleList[0].exhaustVersion != 4 && vehicleList[0].cash >= 2000){	
							vehicleList[0].exhaustVersion = 4;
							vehicleList[0].cash = vehicleList[0].cash - 2000;
						}
						break;
				}
	}
}

function turnOffOption1through4(){
	option1 = false;
	option2 = false;
	option3 = false;
	option4 = false;
	purchaseBox = false;
}

function turnOffOtherOptions(){
	transmissionOptions = false;
	tireOptions = false;
	engineOptions = false;
	nitroOptions = false;
	exhaustOptions = false;
	purchaseBox = false;
}

