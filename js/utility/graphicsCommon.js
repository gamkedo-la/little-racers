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

function colorTextCentered(showWords, textX, textY, fillColor, font = "14px Arial Black", ctx = canvasContext) {
    ctx.textAlign = "center";
    ctx.fillStyle = fillColor;
    ctx.font = font;
    ctx.fillText(showWords, textX, textY);
}


function colorLine(x1, y1, x2, y2, color, ctx = canvasContext, lineThickness = 1){
	ctx.beginPath();
	ctx.strokeStyle = color;
	ctx.lineWidth = lineThickness;
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

function fireParticleClass(startingX, startingY, ctx = canvasContext) {
	// Created using http://nibunan.com/articles/article/how-to-create-realistic-fire-effect-in-html5-canvas-using-javascript as reference
	this.speed = randomIntFromInterval(1,5);
	this.radius = 5;
	this.opacity = 0.1;
	this.baseGreen = 50;
	this.currentGreen = this.baseGreen;
	this.color = "rgb(255," + this.baseGreen + ",0)";
	this.location = { x: startingX + randomIntFromInterval(1,5), y: startingY};
	this.readyToRemove = false;
	this.startingX = this.location.x;
	this.startingY = this.location.y;
	this.maxHeight = 200;

	this.move = function () {
		if (this.location.y < this.startingY - this.maxHeight || this.radius <= 1 || this.opacity == 0.0) {
            this.readyToRemove = true;
        }

		this.radius -= Math.random() * 0.1;

		if (this.opacity > 0.0) {
			this.opacity -= Math.random() * 0.01;
		}

		if (this.opacity < 0.0) {
			this.opacity = 0.0;
		}

		if (this.currentGreen < 255) {
			this.currentGreen += 10;
		} else if (this.currentGreen > 255) {
			this.currentGreen = 255;
		}

		this.color = "rgb(255,"+ this.currentGreen +",0)";
        this.location.y -= this.speed;
	}

	this.draw = function (ctx = canvasContext) {
		ctx.save()
		ctx.beginPath();
		ctx.arc(this.location.x, this.location.y, this.radius, 0, 2 * Math.PI, false);
		ctx.fillStyle = this.color;
		ctx.globalAlpha = this.opacity;
		ctx.fill();
		ctx.closePath();
		ctx.restore();
	}
}
