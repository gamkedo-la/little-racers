var transmissionOptions = false;
var tireOptions = false;
var engineOptions = false;
var nitroOptions = false;
var exhaustOptions = false;
var transmissionBoxX = 155;
var transmissionBoxY = 325;
var tireBoxX = 625;
var tireBoxY = 163;
var engineBoxX = 345;
var engineBoxY = 365;
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
var nitroBoxX = 69;
var nitroBoxY = 163;
var exhaustBoxX = 535;
var exhaustBoxY = 325;
var exitBoxX = 650;
var exitBoxY = 530;
var option1 = false;
var option2 = false;
var option3 = false;
var option4 = false;
var optionsSelected = false;
var purchaseBox = false;
var purchaseItem;

function drawCarUpgradeScreen(cnv, ctx){
	colorRect(0,0,cnv.width * scaleWidth, cnv.height * scaleHeight, 'white', ctx);
	canvasContext.drawImage(bodyShopGaragePic, 0, 0, canvas.width / scaleWidth, canvas.height / scaleHeight); // can't use canvas.width /2 due to scaling wierdness
	canvasContext.drawImage(bodyShopPic,200, 0);
	canvasContext.drawImage(bodyShopOverLayPic,212,120);
	colorRect(transmissionBoxX, transmissionBoxY,110,110, 'blue'); //transmission	
	colorRect(tireBoxX, tireBoxY,110,110, 'blue');	//tires
	colorRect(engineBoxX, engineBoxY,110,110, 'blue');	//engine
	colorRect(nitroBoxX, nitroBoxY,110,110, 'blue');	//nitro
	colorRect(exhaustBoxX, exhaustBoxY,110,110, 'blue');	//exhaust 
	//colorRect(exitBoxX, exitBoxY,130,70,'red'); //exit shop
	colorText("Transmission", 62, 390, 'white', font = "12px Arial Black");
	colorText("Engine", engineBoxX + 20, engineBoxY + 30, 'white', font = "14px Arial Black");
	colorText("Nitro", nitroBoxX + 28, nitroBoxY + 30, 'white', font = "14px Arial Black");
	colorText("Exhaust", exhaustBoxX + 15, exhaustBoxY + 30, 'white', font = "14px Arial Black");
	
	
	if(optionsSelected){
		colorText("Selected", 300, 100, 'red', font = "12px Arial Black");
	}
	
	if(transmissionOptions){ 
		//optionsSelected = true;
		colorText("Transmission", 62, 390, 'red', font = "12px Arial Black");
		
	} else if(tireOptions){
		//optionsSelected = true;
		colorText("Tires", tireBoxX + 20, tireBoxY + 30, 'red', font = "14px Arial Black");
		
	} else if(engineOptions){
		//optionsSelected = true;
		colorText("Engine", engineBoxX + 20, engineBoxY + 30, 'red', font = "14px Arial Black");		
		
	} else if(nitroOptions){
		//optionsSelected = true;
		colorText("Nitro", nitroBoxX + 28, nitroBoxY + 30, 'red', font = "14px Arial Black");
		
	} else if(exhaustOptions){
		optionsSelected = true;
		colorText("Exhaust", exhaustBoxX + 15, exhaustBoxY + 30, 'red', font = "14px Arial Black");
	}
}
	
function carUpgradeScreenMouseClick(mousePosX, mousePosY) {
	console.log(mousePosX * scaleWidth, mousePosY * scaleHeight);
	//Transmission
	if(		mousePosX > transmissionBoxX * scaleWidth && mousePosX < (transmissionBoxX + 110) * scaleWidth && 
			mousePosY > transmissionBoxY * scaleHeight && mousePosY < (transmissionBoxY + 110) * scaleHeight ){ 
		turnOffOtherOptions();
		turnOffOption1through4();
		transmissionOptions = true;
	// Tires  
	} else if(	mousePosX > tireBoxX * scaleWidth && mousePosX < (tireBoxX + 110) * scaleWidth && 
				mousePosY > tireBoxY * scaleHeight && mousePosY < (tireBoxY + 110) * scaleHeight ){  
		turnOffOtherOptions();
		turnOffOption1through4();
		tireOptions = true;
	//Engine
	} else if(	mousePosX > engineBoxX * scaleWidth && mousePosX < (engineBoxX + 110) * scaleWidth && 
				mousePosY > engineBoxY * scaleHeight  && mousePosY < (engineBoxY + 110) * scaleHeight ){ 
		turnOffOtherOptions();
		turnOffOption1through4();
		engineOptions = true;
	//Nitro
	} else if(	mousePosX > nitroBoxX * scaleWidth && mousePosX < (nitroBoxX + 110) * scaleWidth && 
				mousePosY > nitroBoxY * scaleHeight && mousePosY < (nitroBoxY + 110) * scaleHeight ){ 
		turnOffOtherOptions();
		turnOffOption1through4();
		nitroOptions = true;
	//Exhaust
	} else if(	mousePosX > exhaustBoxX * scaleWidth && mousePosX < (exhaustBoxX + 110) * scaleWidth && 
				mousePosY > exhaustBoxY * scaleHeight  && mousePosY < (exhaustBoxY + 110) * scaleHeight ){ 
		turnOffOtherOptions();
		turnOffOption1through4();
		exhaustOptions = true;
	//Exit the shop
	} else if(	mousePosX > exitBoxX * scaleWidth && mousePosX < (exitBoxX + 130) * scaleWidth && 
				mousePosY > exitBoxY * scaleHeight  && mousePosY < (exitBoxY + 70) * scaleHeight ){ 
		updateState(STATE_PLAY);
//		carUpgradeScreen = false;
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
							vehicleList[0].transmissionVersion = 2;
							vehicleList[0].cash = vehicleList[0].cash - 1000;
						}
						break;
					case "Transmission 3":
						if(vehicleList[0].transmissionVersion < 3 && vehicleList[0].cash >= 2000){	
							vehicleList[0].transmissionVersion = 3;
							vehicleList[0].cash = vehicleList[0].cash - 2000;
						}
						break;
					case "Transmission 4":
						if(vehicleList[0].transmissionVersion != 4 && vehicleList[0].cash >= 3000){	
							vehicleList[0].transmissionVersion = 4;
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
						if(vehicleList[0].nitroVersion < 1 && vehicleList[0].cash >= 50){	
							vehicleList[0].nitroVersion = 1;
							vehicleList[0].cash = vehicleList[0].cash - 50;
						}
						break;
					case "Nitro 2":
						if(vehicleList[0].nitroVersion < 2 && vehicleList[0].cash >= 100){	
							vehicleList[0].nitroVersion = 2;
							vehicleList[0].cash = vehicleList[0].cash - 100;
						}
						break;
					case "Nitro 3":
						if(vehicleList[0].nitroVersion < 3 && vehicleList[0].cash >= 200){	
							vehicleList[0].nitroVersion = 3;
							vehicleList[0].cash = vehicleList[0].cash - 200;
						}
						break;
					case "Nitro 4":
						if(vehicleList[0].nitroVersion != 4 && vehicleList[0].cash >= 500){	
							vehicleList[0].nitroVersion = 4;
							vehicleList[0].cash = vehicleList[0].cash - 500;
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

