var carPic1 = document.createElement("img");
var carPic2 = document.createElement("img");
var carPic3 = document.createElement("img");
var carPic4 = document.createElement("img");
var carPic5 = document.createElement("img");
var carPic6 = document.createElement("img");
var carPic7 = document.createElement("img");
var carPic8 = document.createElement("img");
var carShadowPic = document.createElement("img");
var clockPic = document.createElement("img");
//var titlepagePic = document.createElement("img");
var bodyShopPic = document.createElement("img");
var bodyShopGaragePic = document.createElement("img");
var arrowPic = document.createElement("img");
var roadSpriteSheet =  document.createElement("img");
var trackobstaclesSpriteSheet = document.createElement("img");
var wallSpriteSheet = document.createElement("img");
var tireTrackPic = document.createElement("img");
var tireOptionOnePic = document.createElement("img");
var tireOptionTwoPic = document.createElement("img");
var tireOptionThreePic = document.createElement("img");
var tireOptionFourPic = document.createElement("img");
var nitrosOptionOnePic = document.createElement("img");
var nitrosOptionTwoPic = document.createElement("img");

var trackPics = [];

var picsToLoad = 0;

function countLoadedImagesAndLaunchIfReady(){
		picsToLoad--;
		console.log(picsToLoad);
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
			{varName: carPic1, theFile: "player1.png"},
			{varName: carPic2, theFile: "player2.png"},
			{varName: carPic3, theFile: "player3.png"},
			{varName: carPic4, theFile: "player4.png"},
			{varName: carPic5, theFile: "player5.png"},
			{varName: carPic6, theFile: "player6.png"},
			{varName: carPic7, theFile: "player7.png"},
			{varName: carPic8, theFile: "player8.png"},
			{varName: bodyShopPic, theFile: "bodyShop.png"},
			{varName: bodyShopGaragePic, theFile: "bodyShopGarage.png"},
			{varName: clockPic, theFile: "system_clock.png"},
			{varName: carShadowPic, theFile: "car_shadow.png"},
			{varName: arrowPic, theFile: "leftArrow.png"},
			{varName: roadSpriteSheet, theFile: "roadSpriteSheet.png"},
			{varName: trackobstaclesSpriteSheet, theFile: "trackobstaclesSpriteSheet.png"},
			{varName: wallSpriteSheet, theFile: "wallSpriteSheet.png"},
			{varName: tireTrackPic, theFile: "tireTracks.png"},
			{varName: tireOptionOnePic, theFile: "tireOptionOne.png"},			
			{varName: tireOptionTwoPic, theFile: "tireOptionTwo.png"},	
			{varName: tireOptionThreePic, theFile: "tireOptionThree.png"},	
			{varName: tireOptionFourPic, theFile: "tireOptionFour.png"},
			{varName: nitrosOptionOnePic, theFile: "nitrosOptionOne.png"},
			{varName: nitrosOptionTwoPic, theFile: "nitrosOptionTwo.png"}					
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