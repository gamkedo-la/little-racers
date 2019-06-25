var transmissionOptions = false;
var tireOptions = false;
var engineOptions = false;
var nitroOptions = false;


function drawCarUpgradeScreen(){
	colorRect(0,0,canvas.width,canvas.height, 'white');	
	canvasContext.drawImage(bodyShopPic, 0, 0);
	colorText("Body Shop", 200, 200, 'black', font = "24px Arial Black");
	colorRect(60,360,100,50, 'blue'); //transmission	
	colorRect(60,460,100,50, 'blue');	//tires
	colorRect(375,290,100,50, 'blue');	//engine
	colorRect(60,290,100,50, 'blue');	//nitro
	colorRect(210,540,100,50,'red'); //done
	colorText("Transmission", 62, 390, 'white', font = "12px Arial Black");
	colorText("Tires", 88, 490, 'white', font = "14px Arial Black");
	colorText("Engine", 395, 320, 'white', font = "14px Arial Black");
	colorText("Nitro", 88, 320, 'white', font = "14px Arial Black");
	colorText("Exit Shop", 225, 570, 'black', font = "14px Arial Black");
	
	if(transmissionOptions){
		colorRect(500, 20,100,100, 'blue'); 
		colorRect(500,175,100,100, 'blue'); 
		colorRect(500,325,100,100, 'blue'); 
		colorRect(500,475,100,100, 'blue');
		colorText("Tx Option 1", 505, 50, 'white', font = "12px Arial Black"); // To be replaced with a pic
		colorText("Tx Option 2", 505, 205, 'white', font = "12px Arial Black"); 
		colorText("Tx Option 3", 505, 355, 'white', font = "12px Arial Black");
		colorText("Tx Option 4", 505, 505, 'white', font = "12px Arial Black");
	} else if(tireOptions){
		colorRect(500, 20,100,100, 'blue'); 
		colorRect(500,175,100,100, 'blue'); 
		colorRect(500,325,100,100, 'blue'); 
		colorRect(500,475,100,100, 'blue'); 
		colorText("Ti Option 1", 505, 50, 'white', font = "12px Arial Black"); // To be replaced with a pic
		colorText("Ti Option 2", 505, 205, 'white', font = "12px Arial Black");
		colorText("Ti Option 3", 505, 355, 'white', font = "12px Arial Black");
		colorText("Ti Option 4", 505, 505, 'white', font = "12px Arial Black");
	} else if(engineOptions){
		colorRect(500, 20,100,100, 'blue'); 
		colorRect(500,175,100,100, 'blue'); 
		colorRect(500,325,100,100, 'blue'); 
		colorRect(500,475,100,100, 'blue');
		colorText("E Option 1", 505, 50, 'white', font = "12px Arial Black"); // To be replaced with a pic
		colorText("E Option 2", 505, 205, 'white', font = "12px Arial Black");
		colorText("E Option 3", 505, 355, 'white', font = "12px Arial Black");
		colorText("E Option 4", 505, 505, 'white', font = "12px Arial Black");
	} else if(nitroOptions){
		colorRect(500, 20,100,100, 'blue'); 
		colorRect(500,175,100,100, 'blue'); 
		colorRect(500,325,100,100, 'blue'); 
		colorRect(500,475,100,100, 'blue');
		colorText("N Option 1", 505, 50, 'white', font = "12px Arial Black"); // To be replaced with a pic
		colorText("N Option 2", 505, 205, 'white', font = "12px Arial Black");
		colorText("N Option 3", 505, 355, 'white', font = "12px Arial Black");
		colorText("N Option 5", 505, 505, 'white', font = "12px Arial Black");
	}
}
	
function carUpgradeScreenMouseClick(mousePosX, mousePosY) {
	console.log(mousePosX, mousePosY);
	if(mousePosX > 60 && mousePosX < 160 && mousePosY > 360 && mousePosY < 410){ //Transmission
		turnOffOtherOptions();
		transmissionOptions = true;
	} else if(mousePosX > 60 && mousePosX < 160 && mousePosY > 460 && mousePosY < 510){  // Tires  
		turnOffOtherOptions();
		tireOptions = true;
	} else if(mousePosX > 375 && mousePosX < 475 && mousePosY > 290 && mousePosY < 340){ //Engine
		turnOffOtherOptions();
		engineOptions = true;
	} else if(mousePosX > 88 && mousePosX < 188 && mousePosY > 290 && mousePosY < 340){ //Nitro
		turnOffOtherOptions();
		nitroOptions = true;
	} else if(mousePosX > 210 && mousePosX < 310 && mousePosY > 540 && mousePosY < 590){ //Exit the shop
		carUpgradeScreen = false;
	}
}

function turnOffOtherOptions(){
	transmissionOptions = false;
	tireOptions = false;
	engineOptions = false;
	nitroOptions = false;
}

