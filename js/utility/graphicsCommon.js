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

function drawBitmapCenteredAtLocationWithRotation(graphic, atX, atY, withAngle){
	canvasContext.save(); //allows undo translate movement and rotate spin
	canvasContext.translate(atX,atY); //sets the point where the car graphic goes
	canvasContext.rotate(withAngle); //sets the rotation
	canvasContext.drawImage(graphic, -graphic.width/2, -graphic.height/2); //center, draws car
	canvasContext.restore(); //undoes the translation movement and rotation since save()
}

//While this function could rotate the context to draw a rotated rect, it's a work in progress being used to determine if
//calculating the corners of the car graphic is possible for use in collisions.
function drawRotatedRect(graphic, atX, atY, width, height, angle)
{
    xOffset=width/2;
    yOffset=height/2;
    var hypLength = Math.sqrt(yOffset*yOffset + xOffset*xOffset);
    canvasContext.beginPath();
    canvasContext.strokeStyle="#FF0000";

    var tl, tr, br, bl = {};
    tl=getRotatedPoint(atX, atY, atX-xOffset, atY-yOffset, angle);
    tr=getRotatedPoint(atX, atY, atX+xOffset, atY-yOffset, angle);
    br=getRotatedPoint(atX, atY, atX+xOffset, atY+yOffset, angle);
    bl=getRotatedPoint(atX, atY, atX-xOffset, atY+yOffset, angle);

    canvasContext.moveTo(tl.newX, tl.newY);
    canvasContext.lineTo(tr.newX, tr.newY);
    canvasContext.lineTo(br.newX, br.newY);
    canvasContext.lineTo(bl.newX, bl.newY);
    canvasContext.lineTo(tl.newX, tl.newY);

    canvasContext.stroke();
}

//Work in progress; being used with drawRotatedRect to prove calculation of rotated car bounding box.
function getRotatedPoint(centerX, centerY, pX, pY, angle)
{
    var xLen=pX-centerX;
    var yLen=pY-centerY;
    var hypLength = Math.sqrt(xLen*xLen + yLen*yLen);
    var angleCenterToPoint=Math.atan2(yLen, xLen);
//    console.log(angle);
    angle += angleCenterToPoint;

    var x=centerX + hypLength*Math.cos(angle);
    var y=centerY + hypLength*Math.sin(angle);

//    console.log(x + ":" + y);
    return {newX:x, newY:y};
}

function colorText(showWords, textX, textY, fillColor, font = "14px Arial Black") {
  canvasContext.textAlign = "left";
  canvasContext.fillStyle = fillColor;
  canvasContext.font = font;
  canvasContext.fillText(showWords, textX, textY);
}

function colorLine(x1, y1, x2, y2, color){
	canvasContext.beginPath();
	canvasContext.moveTo(x1, y1);
	canvasContext.lineTo(x2, y2);
	canvasContext.strokeStyle = color;
	canvasContext.stroke();
}

