var boxTopLeft = 540;

function drawLevelEditor(){
	colorRect(0,0,canvas.width,canvas.height, 'green');	
	shiftForCameraPan();
	drawTracksByTile();
	finishedCameraPan();
	for(var i = 0; i < 7; i++) {
		colorRect((i * 100 + 75), 540, 50, 50, 'grey')
	}
	drawBitmapCenteredAtLocationWithRotation(arrowPic, 100, boxTopLeft+25, 0);
	drawBitmapCenteredAtLocationWithRotation(arrowPic, 700, boxTopLeft+25, 3.14);
	colorText('Left', 90, boxTopLeft - 10, 'black', font = "14px Arial Black");
	colorText('Right', 685, boxTopLeft - 10, 'black', font = "14px Arial Black");
	for(var i = 1; i < 6; i++) {
		colorText(i, i * 100 + 95, boxTopLeft - 10, 'black', font = "14px Arial Black");
	}
}

function mouseClick(mousePosX, mousePosY) {
	var underMouseIndex = getIndexAtPixelCoord(mousePosX/scaleWidth + camPanX, mousePosY/scaleHeight  + camPanY);
	trackGrid[underMouseIndex] = 0;
	
	if(mousePosX > 75 && mousePosX < 125 && mousePosY > 540 && mousePosY < 590){
		console.log('LEFT');
	} else if(mousePosX > 175 && mousePosX < 225 && mousePosY > 540 && mousePosY < 590){
		console.log('Box 1');
	} else if(mousePosX > 275 && mousePosX < 325 && mousePosY > 540 && mousePosY < 590){
		console.log('Box 2');
	} else if(mousePosX > 375 && mousePosX < 425 && mousePosY > 540 && mousePosY < 590){
		console.log('Box 3');
	} else if(mousePosX > 475 && mousePosX < 525 && mousePosY > 540 && mousePosY < 590){
		console.log('Box 4');
	} else if(mousePosX > 575 && mousePosX < 625 && mousePosY > 540 && mousePosY < 590){
		console.log('Box 5');
	} else if(mousePosX > 675 && mousePosX < 725 && mousePosY > 540 && mousePosY < 590){
		console.log('RIGHT');
	}
}

function downloadMap(text, fileType, fileName){
	
  var blob = new Blob([ text ], { type: fileType });

  var a = document.createElement('a');
  a.download = fileName;
  a.href = URL.createObjectURL(blob);
  a.dataset.downloadurl = [ fileType, a.download, a.href ].join(':');
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(function () {
    URL.revokeObjectURL(a.href);
  }, 1500);
}

