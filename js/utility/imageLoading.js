//cars
var carPic1 = document.createElement("img");
var carPic2 = document.createElement("img");
var carPic3 = document.createElement("img");
var carPic4 = document.createElement("img");
var carPic5 = document.createElement("img");
var carPic6 = document.createElement("img");
var carPic7 = document.createElement("img");
var carPic8 = document.createElement("img");
var carShadowPic = document.createElement("img");
//Backgrounds
var resultScreenPic = document.createElement("img");
//var titlepagePic = document.createElement("img");
var bodyShopPic = document.createElement("img");
var bodyShopGaragePic = document.createElement("img");
//upgrades
var tireTrackPic = document.createElement("img");
var tireOptionOnePic = document.createElement("img");
var tireOptionTwoPic = document.createElement("img");
var tireOptionThreePic = document.createElement("img");
var tireOptionFourPic = document.createElement("img");
var nitrosOptionOnePic = document.createElement("img");
var nitrosOptionTwoPic = document.createElement("img");
//misc
var arrowPic = document.createElement("img");
var roadSpriteSheet =  document.createElement("img");
var trackobstaclesSpriteSheet = document.createElement("img");
var wallSpriteSheet = document.createElement("img");
var cityScapeSpriteSheet = document.createElement("img");
var clockPic = document.createElement("img");
var trackPics = [];
// Gauges
var gaugeNeedlePic = document.createElement("img");
var fuelGaugePic = document.createElement("img");
var lowFuelPic = document.createElement("img");
// trophies
var firstPlaceTrophyPic = document.createElement("img");
var logoPic = document.createElement("img");
//var titlescreenPic = document.createElement("img");

var picsToLoad = 0;

function countLoadedImagesAndLaunchIfReady(){
		picsToLoad--;
//		console.log(picsToLoad);
		if(picsToLoad == 0) {
			imageLoadingDoneSoStartGame();
	}
}

function beginLoadingImage(imgVar, fileName) {
	imgVar.onload = countLoadedImagesAndLaunchIfReady;
	imgVar.src = "images/" + fileName;
}

function loadImageForTrackCode(trackCode, fileName)  {
	trackPics[trackCode] = document.createElement("img");
	beginLoadingImage(trackPics[trackCode], fileName);
}

function loadImages() {

		var imageList = [
			{varName: carPic1, theFile: "vehicles/player1.png"},
			{varName: carPic2, theFile: "vehicles/player2.png"},
			{varName: carPic3, theFile: "vehicles/player3.png"},
			{varName: carPic4, theFile: "vehicles/player4.png"},
			{varName: carPic5, theFile: "vehicles/player5.png"},
			{varName: carPic6, theFile: "vehicles/player6.png"},
			{varName: carPic7, theFile: "vehicles/player7.png"},
			{varName: carPic8, theFile: "vehicles/player8.png"},
			{varName: tireTrackPic, theFile: "vehicles/tireTracks.png"},
			{varName: carShadowPic, theFile: "vehicles/car_shadow.png"},
			{varName: bodyShopPic, theFile: "backdrops/bodyShop.png"},
			{varName: bodyShopGaragePic, theFile: "backdrops/bodyShopGarage.png"},
			{varName: resultScreenPic, theFile: "backdrops/resultScreenBackground.png"},
			{varName: tireOptionOnePic, theFile: "upgrades/tireOptionOne.png"},
			{varName: tireOptionTwoPic, theFile: "upgrades/tireOptionTwo.png"},
			{varName: tireOptionThreePic, theFile: "upgrades/tireOptionThree.png"},
			{varName: tireOptionFourPic, theFile: "upgrades/tireOptionFour.png"},
			{varName: nitrosOptionOnePic, theFile: "upgrades/nitrosOptionOne.png"},
			{varName: nitrosOptionTwoPic, theFile: "upgrades/nitrosOptionTwo.png"},
			{varName: clockPic, theFile: "system_clock.png"},
			{varName: arrowPic, theFile: "leftArrow.png"},
			{varName: roadSpriteSheet, theFile: "spriteSheet/roadSpriteSheet.png"},
			{varName: trackobstaclesSpriteSheet, theFile: "spriteSheet/trackobstaclesSpriteSheet.png"},
			{varName: wallSpriteSheet, theFile: "spriteSheet/wallSpriteSheet.png"},
			{varName: cityScapeSpriteSheet, theFile: "spriteSheet/cityScapeSpriteSheet.png"},
			{varName: gaugeNeedlePic, theFile: "gauges/GaugeNeedle.png"},
			{varName: fuelGaugePic, theFile: "gauges/FuelGauge.png"},
			{varName: firstPlaceTrophyPic, theFile: "trophy.png"},
			{varName: lowFuelPic, theFile: "lowFuelLight.png"},
            //{varName: titlescreenPic, theFile: "background.jpg"},
            {varName: logoPic, theFile: "logo.png"}
		];

	picsToLoad = imageList.length;

	for(var i=0; i<imageList.length; i++) {
		if(imageList[i].trackType != undefined){
			loadImageForTrackCode(imageList[i].trackType, imageList[i].theFile);
		}
		else {
			beginLoadingImage(imageList[i].varName, imageList[i].theFile);
		}
	}
}
