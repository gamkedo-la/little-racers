var transmissionPurchased = false;
var tireOptions = false;
var engineOptions = false;
var nitroOptions = false;
var exhaustOptions = false;
var exitBoxX = 650;
var exitBoxY = 530;
//Transmission
var transmissionBoxX = 155;
var transmissionBoxY = 325;
var transmissionPriceBoxX = transmissionBoxX;
var transmissionPriceBoxY = transmissionBoxY + 120;
var transmissionLevelX = transmissionBoxX + 125;
var transmissionLevelY = transmissionBoxY + 15;
var transmissionDisplayX = transmissionPriceBoxX + 30;
var transmissionDisplayY = transmissionPriceBoxY + 20;
var transmissionDisplay = "$1,000";
//tires
var tireBoxX = 625;
var tireBoxY = 163;
var tirePriceBoxX = tireBoxX;
var tirePriceBoxY = tireBoxY + 120;
var tireLevelX = tireBoxX + 125;
var tireLevelY = tireBoxY + 15;
var tireDisplayX = tirePriceBoxX + 30;
var tireDisplayY = tirePriceBoxY + 20;
var tireDisplay = "$500";
//engine
var engineBoxX = 345;
var engineBoxY = 365;
var enginePriceBoxX = engineBoxX;
var enginePriceBoxY = engineBoxY + 120;
var engineLevelX = engineBoxX + 125;
var engineLevelY = engineBoxY + 15;
var engineDisplayX = enginePriceBoxX + 30;
var engineDisplayY = enginePriceBoxY + 20;
var engineDisplay = "$1,000";
//Nitro
var nitroBoxX = 69;
var nitroBoxY = 163;
var nitroPriceBoxX = nitroBoxX;
var nitroPriceBoxY = nitroBoxY + 120;
var nitroLevelX = nitroBoxX + 125;
var nitroLevelY = nitroBoxY + 15;
var nitroDisplayX = nitroPriceBoxX + 30;
var nitroDisplayY = nitroPriceBoxY + 20;
var nitroDisplay = "$500";
//Exhaust
var exhaustBoxX = 535;
var exhaustBoxY = 325;
var exhaustPriceBoxX = exhaustBoxX;
var exhaustPriceBoxY = exhaustBoxY + 120;
var exhaustLevelX = exhaustBoxX + 125;
var exhaustLevelY = exhaustBoxY + 15;
var exhaustDisplayX = exhaustPriceBoxX + 30;
var exhaustDisplayY = exhaustPriceBoxY + 20;
var exhaustDisplay = "$500";


var purchaseItem;

function drawCarUpgradeScreen(cnv, ctx){
	colorRect(0,0,cnv.width * scaleWidth, cnv.height * scaleHeight, 'white', ctx);
	canvasContext.drawImage(bodyShopGaragePic, 0, 0, canvas.width / scaleWidth, canvas.height / scaleHeight); // can't use canvas.width /2 due to scaling wierdness
	canvasContext.drawImage(bodyShopPic,220, 0, 366, 289);
	canvasContext.drawImage(bodyShopOverLayPic,232,93, 342, 186);
	canvasContext.drawImage(priceBoxPic, 650, 25, 110, 34);
	colorText("Player 1", 100, 45, 'red')
	colorText("$" + vehicleList[0].cash, 680, 45, 'red')

	//exhaust
	canvasContext.drawImage(exhaustPic,exhaustBoxX,exhaustBoxY, 110, 110);
	canvasContext.drawImage(priceBoxPic, exhaustPriceBoxX, exhaustPriceBoxY, 110, 34);
	colorText(exhaustDisplay, exhaustDisplayX, exhaustDisplayY, 'white')
	if(vehicleList[0].exhaustVersion == 0){
		canvasContext.drawImage(bodyShopGarageLevel0Pic, exhaustLevelX, exhaustLevelY);
	} else if (vehicleList[0].exhaustVersion == 1){
		canvasContext.drawImage(bodyShopGarageLevel1Pic, exhaustLevelX, exhaustLevelY);
	} else if (vehicleList[0].exhaustVersion == 2){
		canvasContext.drawImage(bodyShopGarageLevel2Pic, exhaustLevelX, exhaustLevelY);
	} else if (vehicleList[0].exhaustVersion == 3){
		canvasContext.drawImage(bodyShopGarageLevel3Pic, exhaustLevelX, exhaustLevelY);
	} else if (vehicleList[0].exhaustVersion == 4){
		canvasContext.drawImage(bodyShopGarageLevel4Pic, exhaustLevelX, exhaustLevelY);
	}	
	//transmission
	canvasContext.drawImage(transmissionPic, transmissionBoxX, transmissionBoxY, 110, 110);
	canvasContext.drawImage(priceBoxPic, transmissionPriceBoxX, transmissionPriceBoxY, 110, 34);
	colorText(transmissionDisplay, transmissionDisplayX, transmissionDisplayY, 'white')
	if(vehicleList[0].transmissionVersion == 0){
		canvasContext.drawImage(bodyShopGarageLevel0Pic, transmissionLevelX, transmissionLevelY);
	} else if (vehicleList[0].transmissionVersion == 1){
		canvasContext.drawImage(bodyShopGarageLevel1Pic, transmissionLevelX, transmissionLevelY);
	} else if (vehicleList[0].transmissionVersion == 2){
		canvasContext.drawImage(bodyShopGarageLevel2Pic, transmissionLevelX, transmissionLevelY);
	} else if (vehicleList[0].transmissionVersion == 3){
		canvasContext.drawImage(bodyShopGarageLevel3Pic, transmissionLevelX, transmissionLevelY);
	} else if (vehicleList[0].transmissionVersion == 4){
		canvasContext.drawImage(bodyShopGarageLevel4Pic, transmissionLevelX, transmissionLevelY);
	}	
	//tire
	canvasContext.drawImage(tirePic, tireBoxX, tireBoxY, 110, 110);
	canvasContext.drawImage(priceBoxPic, tirePriceBoxX, tirePriceBoxY, 110, 34);	
	colorText(tireDisplay, tireDisplayX, tireDisplayY, 'white')
	if(vehicleList[0].tireVersion == 0){
		canvasContext.drawImage(bodyShopGarageLevel0Pic, tireLevelX, tireLevelY);
	} else if (vehicleList[0].tireVersion == 1){
		canvasContext.drawImage(bodyShopGarageLevel1Pic, tireLevelX, tireLevelY);
	} else if (vehicleList[0].tireVersion == 2){
		canvasContext.drawImage(bodyShopGarageLevel2Pic, tireLevelX, tireLevelY);
	} else if (vehicleList[0].tireVersion == 3){
		canvasContext.drawImage(bodyShopGarageLevel3Pic, tireLevelX, tireLevelY);
	} else if (vehicleList[0].tireVersion == 4){
		canvasContext.drawImage(bodyShopGarageLevel4Pic, tireLevelX, tireLevelY);
	}
	//engine
	canvasContext.drawImage(enginePic, engineBoxX, engineBoxY, 110, 110);
	canvasContext.drawImage(priceBoxPic, enginePriceBoxX, enginePriceBoxY, 110, 34);
	colorText(engineDisplay, engineDisplayX, engineDisplayY, 'white')
	if(vehicleList[0].engineVersion == 0){
		canvasContext.drawImage(bodyShopGarageLevel0Pic, engineLevelX, engineLevelY);
	} else if (vehicleList[0].engineVersion == 1){
		canvasContext.drawImage(bodyShopGarageLevel1Pic, engineLevelX, engineLevelY);
	} else if (vehicleList[0].engineVersion == 2){
		canvasContext.drawImage(bodyShopGarageLevel2Pic, engineLevelX, engineLevelY);
	} else if (vehicleList[0].engineVersion == 3){
		canvasContext.drawImage(bodyShopGarageLevel3Pic, engineLevelX, engineLevelY);
	} else if (vehicleList[0].engineVersion == 4){
		canvasContext.drawImage(bodyShopGarageLevel4Pic, engineLevelX, engineLevelY);
	}	
	//nitro
	canvasContext.drawImage(nitroPic, nitroBoxX, nitroBoxY, 110, 110);
	canvasContext.drawImage(priceBoxPic, nitroPriceBoxX, nitroPriceBoxY, 110, 34);
	colorText(nitroDisplay, nitroDisplayX, nitroDisplayY, 'white')
	colorText("QTY", nitroDisplayX+90, nitroBoxY+10, 'white')
	if(vehicleList[0].nitroBoostQuantity == 0){
		canvasContext.drawImage(bodyShopGarageLevel0Pic, nitroLevelX, nitroLevelY);	
	} else if (vehicleList[0].nitroBoostQuantity == 1){
		canvasContext.drawImage(bodyShopGarageLevel1Pic, nitroLevelX, nitroLevelY);	
	} else if (vehicleList[0].engnitroBoostQuantityineVersion == 2){
		canvasContext.drawImage(bodyShopGarageLevel2Pic, nitroLevelX, nitroLevelY);	
	} else if (vehicleList[0].nitroBoostQuantity == 3){
		canvasContext.drawImage(bodyShopGarageLevel3Pic, nitroLevelX, nitroLevelY);	
	} else if (vehicleList[0].nitroBoostQuantity == 4){
		canvasContext.drawImage(bodyShopGarageLevel4Pic, nitroLevelX, nitroLevelY);	
	} else {
		canvasContext.drawImage(bodyShopGarageLevel4Pic, nitroLevelX, nitroLevelY);
	}
}
	
function carUpgradeScreenMouseClick(mousePosX, mousePosY) {
	console.log(mousePosX * scaleWidth, mousePosY * scaleHeight);
	//Transmission
	if(		mousePosX > transmissionBoxX * scaleWidth && mousePosX < (transmissionBoxX + 110) * scaleWidth && 
			mousePosY > transmissionBoxY * scaleHeight && mousePosY < (transmissionBoxY + 110) * scaleHeight ){ 
		purchaseTransmission();
	// Tires  
	} else if(	mousePosX > tireBoxX * scaleWidth && mousePosX < (tireBoxX + 110) * scaleWidth && 
				mousePosY > tireBoxY * scaleHeight && mousePosY < (tireBoxY + 110) * scaleHeight ){  
		purchaseTires();
	//Engine
	} else if(	mousePosX > engineBoxX * scaleWidth && mousePosX < (engineBoxX + 110) * scaleWidth && 
				mousePosY > engineBoxY * scaleHeight  && mousePosY < (engineBoxY + 110) * scaleHeight ){ 
		purchaseEngine();
	//Nitro
	} else if(	mousePosX > nitroBoxX * scaleWidth && mousePosX < (nitroBoxX + 110) * scaleWidth && 
				mousePosY > nitroBoxY * scaleHeight && mousePosY < (nitroBoxY + 110) * scaleHeight ){ 
		purchaseNitro();
	//Exhaust
	} else if(	mousePosX > exhaustBoxX * scaleWidth && mousePosX < (exhaustBoxX + 110) * scaleWidth && 
				mousePosY > exhaustBoxY * scaleHeight  && mousePosY < (exhaustBoxY + 110) * scaleHeight ){ 
		purchaseExhaust();
	//Exit the shop
	} else if(	mousePosX > exitBoxX * scaleWidth && mousePosX < (exitBoxX + 130) * scaleWidth && 
				mousePosY > exitBoxY * scaleHeight  && mousePosY < (exitBoxY + 70) * scaleHeight ){ 
		updateState(STATE_PLAY);
//		carUpgradeScreen = false;
	}
}

function purchaseTransmission() {
	if(vehicleList[0].transmissionVersion == 0 && vehicleList[0].cash >= 1000){
		vehicleList[0].transmissionVersion++;
		vehicleList[0].cash = vehicleList[0].cash - 1000;
		transmissionDisplay = "$2,000"
	} else if(vehicleList[0].transmissionVersion == 1 && vehicleList[0].cash >= 2000){
		vehicleList[0].transmissionVersion++;
		vehicleList[0].cash = vehicleList[0].cash - 2000;
		transmissionDisplay = "$4,000"
	} else if(vehicleList[0].transmissionVersion == 2 && vehicleList[0].cash >= 4000){
		vehicleList[0].transmissionVersion++;
		vehicleList[0].cash = vehicleList[0].cash - 4000;
		transmissionDisplay = "$8,000"
	} else if(vehicleList[0].transmissionVersion == 3 && vehicleList[0].cash >= 8000){
		vehicleList[0].transmissionVersion++;
		vehicleList[0].cash = vehicleList[0].cash - 2000;
		transmissionDisplay = "MAXED"
	}
}

function purchaseTires() {
	if(vehicleList[0].tireVersion == 0 && vehicleList[0].cash >= 500){
		vehicleList[0].tireVersion++;
		vehicleList[0].cash = vehicleList[0].cash - 500;
		tireDisplay = "$1,000"
	} else if(vehicleList[0].tireVersion == 1 && vehicleList[0].cash >= 1000){
		vehicleList[0].tireVersion++;
		vehicleList[0].cash = vehicleList[0].cash - 1000;
		tireDisplay = "$2,000"
	} else if(vehicleList[0].tireVersion == 2 && vehicleList[0].cash >= 2000){
		vehicleList[0].tireVersion++;
		vehicleList[0].cash = vehicleList[0].cash - 2000;
		tireDisplay = "$3,000"
	} else if(vehicleList[0].tireVersion == 3 && vehicleList[0].cash >= 3000){
		vehicleList[0].tireVersion++;
		vehicleList[0].cash = vehicleList[0].cash - 3000;
		tireDisplay = "MAXED"
	}
}	

function purchaseEngine(){
	if(vehicleList[0].engineVersion == 0 && vehicleList[0].cash >= 1000){
		vehicleList[0].engineVersion++;
		vehicleList[0].cash = vehicleList[0].cash - 1000;
		engineDisplay = "$2,000"
	} else if(vehicleList[0].engineVersion == 1 && vehicleList[0].cash >= 2000){
		vehicleList[0].engineVersion++;
		vehicleList[0].cash = vehicleList[0].cash - 2000;
		engineDisplay = "$4,000"
	} else if(vehicleList[0].engineVersion == 2 && vehicleList[0].cash >= 4000){
		vehicleList[0].engineVersion++;
		vehicleList[0].cash = vehicleList[0].cash - 4000;
		engineDisplay = "$8,000";
	} else if(vehicleList[0].engineVersion == 3 && vehicleList[0].cash >= 8000){
		vehicleList[0].engineVersion++;
		vehicleList[0].cash = vehicleList[0].cash - 8000;
		engineDisplay = "MAXED";
	}
}

function purchaseExhaust(){	
	if(vehicleList[0].exhaustVersion == 0 && vehicleList[0].cash >= 500){
		vehicleList[0].exhaustVersion++;
		vehicleList[0].cash = vehicleList[0].cash - 500;
		exhaustDisplay = "$1,000"
	} else if(vehicleList[0].exhaustVersion == 1 && vehicleList[0].cash >= 1000){
		vehicleList[0].exhaustVersion++;
		vehicleList[0].cash = vehicleList[0].cash - 1000;
		exhaustDisplay = "$2,000"
	} else if(vehicleList[0].exhaustVersion == 2 && vehicleList[0].cash >= 2000){
		vehicleList[0].exhaustVersion++;
		vehicleList[0].cash = vehicleList[0].cash - 2000;
		exhaustDisplay = "$3,000"
	} else if(vehicleList[0].exhaustVersion == 3 && vehicleList[0].cash >= 3000){
		vehicleList[0].exhaustVersion++;
		vehicleList[0].cash = vehicleList[0].cash - 3000;
		exhaustDisplay = "MAXED"
	}
}

function purchaseNitro(){	
	if(vehicleList[0].nitroBoostQuantity == 0 && vehicleList[0].cash >= 500){
		vehicleList[0].nitroBoostQuantity++;
		vehicleList[0].cash = vehicleList[0].cash - 500;
		nitroDisplay = "$500"
	} else if(vehicleList[0].nitroBoostQuantity == 1 && vehicleList[0].cash >= 500){
		vehicleList[0].nitroBoostQuantity++;
		vehicleList[0].cash = vehicleList[0].cash - 500;
		nitroDisplay = "$500"
	} else if(vehicleList[0].nitroBoostQuantity == 2 && vehicleList[0].cash >= 500){
		vehicleList[0].nitroBoostQuantity++;
		vehicleList[0].cash = vehicleList[0].cash - 500;
		nitroDisplay = "$500"
	} else if(vehicleList[0].nitroBoostQuantity == 3 && vehicleList[0].cash >= 500){
		vehicleList[0].nitroBoostQuantity++;
		vehicleList[0].cash = vehicleList[0].cash - 500;
		nitroDisplay = "MAXED"
	}
}

