function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor){
	canvasContext.fillStyle = fillColor;
	canvasContext.fillRect(topLeftX,topLeftY,boxWidth,boxHeight);
}

function colorCircle(centerX, centerY, radius, fillColor){
	canvasContext.fillStyle = fillColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX,centerY,radius,0,Math.PI*2,true);
	canvasContext.fill();
}

function outlineCircle (centerX, centerY, radius, strokeColor, lineWidth = 1) {
  canvasContext.strokeStyle = strokeColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  canvasContext.setLineDash([]);
  canvasContext.lineWidth = lineWidth;
  canvasContext.stroke();
}

function drawBitmapCenteredAtLocationWithRotation(graphic, atX, atY, withAngle){
	canvasContext.save(); //allows undo translate movement and rotate spin
	canvasContext.translate(atX,atY); //sets the point where the car graphic goes
	canvasContext.rotate(withAngle); //sets the rotation
	canvasContext.drawImage(graphic, -graphic.width/2, -graphic.height/2); //center, draws car
	canvasContext.restore(); //undoes the translation movement and rotation since save()
}

//While this function could rotate the context to draw a rotated rect, it's a work in progress being used to determine if
//calculating the corners of the car graphic is possible for use in collisions.
function drawRotatedRectWithLines(atX, atY, width, height, angle)
{
    xOffset=width/2;
    yOffset=height/2;
    var hypLength = Math.sqrt(yOffset*yOffset + xOffset*xOffset);
    canvasContext.beginPath();
    canvasContext.strokeStyle="red";
    canvasContext.lineWidth = 2;

    var tl, tr, br, bl = {};
    tl=getRotatedPoint(atX, atY, atX-xOffset, atY-yOffset, angle);
    tr=getRotatedPoint(atX, atY, atX+xOffset, atY-yOffset, angle);
    br=getRotatedPoint(atX, atY, atX+xOffset, atY+yOffset, angle);
    bl=getRotatedPoint(atX, atY, atX-xOffset, atY+yOffset, angle);

    canvasContext.moveTo(tl.x, tl.y);
    canvasContext.lineTo(tr.x, tr.y);
    canvasContext.lineTo(br.x, br.y);
    canvasContext.lineTo(bl.x, bl.y);
    canvasContext.lineTo(tl.x, tl.y);

    canvasContext.stroke();
}


function colorText(showWords, textX, textY, fillColor, font = "14px Arial Black") {
  canvasContext.textAlign = "left";
  canvasContext.fillStyle = fillColor;
  canvasContext.font = font;
  canvasContext.fillText(showWords, textX, textY);
}

function colorLine(x1, y1, x2, y2, color){
	canvasContext.beginPath();
	canvasContext.strokeStyle = color;
	canvasContext.lineWidth = 1;
	canvasContext.moveTo(x1, y1);
	canvasContext.lineTo(x2, y2);
	canvasContext.stroke();
}

function colorRGBALine(xStartingPoint, yStartingPoint, xFinishingPoint, yFinishingPoint, lineWidth, rGBAString){
	canvasContext.strokeStyle = rGBAString;
	canvasContext.lineWidth = lineWidth;
	canvasContext.beginPath();
	canvasContext.moveTo(xStartingPoint, yStartingPoint);
	canvasContext.lineTo(xFinishingPoint, yFinishingPoint);

	canvasContext.stroke();
}
