raining = true;

function randomizeIfItWillRain() {
  let randomizedNumber = Math.random();
  if (randomizedNumber <= 0.3) {
    raining = true;
  } else {
    raining = false;
  }
  console.log("raining ",raining)
}

let arrayOfRain = [];

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function RainClass(column) {
  this.columnLeftMostPixel = column*TRACK_W;
  this.positionWithinColumn = getRandomInteger(0, 40);
  this.startingX = this.columnLeftMostPixel + this.positionWithinColumn;
  this.x = this.startingX;
  this.startingY = getRandomInteger(0,300);
  this.y = this.startingY;
  this.startingLength = getRandomInteger(0, 60);
  this.lineLength = this.startingLength;
  this.lineWidth = getRandomInteger(1, 3);
  this.redValue = getRandomInteger(147, 196);
  this.greenValue = getRandomInteger(204, 248);
  this.blueValue = 255;
  this.alpha = getRandomInteger(6, 10);
  this.alpha = this.alpha/10;

  this.rgbaString = 'rgba(' + this.redValue.toString() + ',' + this.greenValue.toString() + ',' +
  this.blueValue.toString() + ',' + this.alpha.toString() + ')';

  this.draw = function(ctx = canvasContext) {
    //console.log("hello individual rain class draw method");
    
    // note: cam scroll is not yet per-player
    var camScrolledX = (this.x - cameraP1.panX);
    var camScrolledY = (this.y - cameraP1.panY);
    // attempting a mod workaround to better handle negative cases
    camScrolledX = (camScrolledX%canvas.width + canvas.width)%canvas.width;
    camScrolledY = (camScrolledY%canvas.height + canvas.height)%canvas.height;
    colorRGBALine(camScrolledX, camScrolledY, camScrolledX, camScrolledY + this.lineLength, this.lineWidth, this.rgbaString, ctx);
  }

  this.update = function() {
    this.y += 5;
    this.lineLength -= 1;
    this.alpha -= 0.2;
  }
}

function addRainToArray() {
  let numberOfColumnsInLevel = getCurrentTrackCols();
  //console.log(numberOfColumnsInLevel);
  for (let i = 0; i < numberOfColumnsInLevel - 1; i++) {
    let randomizedNumber = Math.random();
    let column = i;
    if (randomizedNumber <= 0.4) {
      let rainDrop = new RainClass(column);
      let startTimeOffSetForDrawing = getRandomInteger(0, 1250);

      setTimeout(function() {
        arrayOfRain.push(rainDrop);
      }, startTimeOffSetForDrawing)
    }//end of adding rain drop if within probability

  }//end of for loop through all columns

}//end of parent function

function deleteRainThatShouldBeInvisible() {//prevent -y length values from being seen
  for (let i = 0; i < arrayOfRain.length - 1; i++) {
    if (arrayOfRain[i].lineLength <= 0) {
      arrayOfRain.splice(i,1);
    }
  }
}

function drawRain(canvasContext) {
  for (let i = 0; i < arrayOfRain.length - 1; i++) {
    arrayOfRain[i].draw(canvasContext);
  }
  //arrayOfRain[0].draw();
  //colorRect(CANVAS_WIDTH/2, CANVAS_HEIGHT/2, 200,200, 'purple');
  //console.log("hello draw rain");
  //console.log("arrayOfRain ", arrayOfRain);
}

function updateRain() {
  for (let i = 0; i < arrayOfRain.length - 1; i++) {
    arrayOfRain[i].update();
  }
}
