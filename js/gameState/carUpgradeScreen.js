function drawCarUpgradeScreen(){
	colorRect(0,0,canvas.width,canvas.height, 'white');	
	canvasContext.drawImage(bodyShopPic, 0, 0);
	colorText("Body Shop", 200, 200, 'black', font = "24px Arial Black");
	colorRect(60,360,100,50, 'blue'); //transmission	
	colorRect(60,460,100,50, 'blue');	//tires
	colorRect(375,290,100,50, 'blue');	//engine
	colorRect(60,290,100,50, 'blue');	//nitro
	colorText("Transmission", 62, 390, 'white', font = "12px Arial Black");
	colorText("Tires", 88, 490, 'white', font = "14px Arial Black");
	colorText("Engine", 395, 320, 'white', font = "14px Arial Black");
	colorText("Nitro", 88, 320, 'white', font = "14px Arial Black");
}

function carUpgradeScreenMouseClick(mousePosX, mousePosY) {
	console.log(mousePosX, mousePosY);
	if(mousePosX > 60 && mousePosX < 160 && mousePosY > 360 && mousePosY < 410){ //Transmission
		console.log('Transmission Screen');
		carUpgradeScreen = false;
	} else if(mousePosX > 60 && mousePosX < 160 && mousePosY > 460 && mousePosY < 510){  // Tires  
		console.log('Tire Screen');
		carUpgradeScreen = false;
	} else if(mousePosX > 375 && mousePosX < 475 && mousePosY > 290 && mousePosY < 340){ //Engine
		console.log('Engine Screen');
		carUpgradeScreen = false;
	} else if(mousePosX > 88 && mousePosX < 188 && mousePosY > 290 && mousePosY < 340){ //Nitro
		console.log('Nitro Screen');
		carUpgradeScreen = false;
	}
}
