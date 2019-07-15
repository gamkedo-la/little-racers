function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor, ctx = canvasContext){
	ctx.fillStyle = fillColor;
	ctx.fillRect(topLeftX,topLeftY,boxWidth,boxHeight);
}

function colorCircle(centerX, centerY, radius, fillColor, ctx = canvasContext){
	ctx.fillStyle = fillColor;
	ctx.beginPath();
	ctx.arc(centerX,centerY,radius,0,Math.PI*2,true);
	ctx.fill();
}

function outlineCircle (centerX, centerY, radius, strokeColor, lineWidth = 1, ctx = canvasContext) {
  ctx.strokeStyle = strokeColor;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  ctx.setLineDash([]);
  ctx.lineWidth = lineWidth;
  ctx.stroke();
}

function drawBitmapCenteredAtLocationWithRotation(graphic, atX, atY, withAngle, ctx = canvasContext){
	ctx.save(); //allows undo translate movement and rotate spin
	ctx.translate(atX,atY); //sets the point where the car graphic goes
	ctx.rotate(withAngle); //sets the rotation
	ctx.drawImage(graphic, -graphic.width/2, -graphic.height/2); //center, draws car
	ctx.restore(); //undoes the translation movement and rotation since save()
}

//While this function could rotate the context to draw a rotated rect, it's a work in progress being used to determine if
//calculating the corners of the car graphic is possible for use in collisions.
function drawRotatedRectWithLines(atX, atY, width, height, angle, ctx = canvasContext)
{
    xOffset=width/2;
    yOffset=height/2;
    var hypLength = Math.sqrt(yOffset*yOffset + xOffset*xOffset);
    ctx.beginPath();
    ctx.strokeStyle="red";
    ctx.lineWidth = 2;

    var tl, tr, br, bl = {};
    tl=getRotatedPoint(atX, atY, atX-xOffset, atY-yOffset, angle);
    tr=getRotatedPoint(atX, atY, atX+xOffset, atY-yOffset, angle);
    br=getRotatedPoint(atX, atY, atX+xOffset, atY+yOffset, angle);
    bl=getRotatedPoint(atX, atY, atX-xOffset, atY+yOffset, angle);

    ctx.moveTo(tl.x, tl.y);
    ctx.lineTo(tr.x, tr.y);
    ctx.lineTo(br.x, br.y);
    ctx.lineTo(bl.x, bl.y);
    ctx.lineTo(tl.x, tl.y);

    ctx.stroke();
}


function colorText(showWords, textX, textY, fillColor, font = "14px Arial Black", ctx = canvasContext) {
  ctx.textAlign = "left";
  ctx.fillStyle = fillColor;
  ctx.font = font;
  ctx.fillText(showWords, textX, textY);
}

function colorLine(x1, y1, x2, y2, color, ctx = canvasContext){
	ctx.beginPath();
	ctx.strokeStyle = color;
	ctx.lineWidth = 1;
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}

function colorRGBALine(xStartingPoint, yStartingPoint, xFinishingPoint, yFinishingPoint, lineWidth, rGBAString, ctx = canvasContext){
	ctx.strokeStyle = rGBAString;
	ctx.lineWidth = lineWidth;
	ctx.beginPath();
	ctx.moveTo(xStartingPoint, yStartingPoint);
	ctx.lineTo(xFinishingPoint, yFinishingPoint);

	ctx.stroke();
}
