const MIN_NEEDLE_ANGLE = -62;
const MAX_NEEDLE_ANGLE = 62;
const DEGREES_TO_RADIANS = Math.PI / 180;

function fuelGaugeClass() {
    this.positionX = 0;
    this.positionY = 0;
    this.needleOffsetX = 36;
    this.needleOffsetY = 50;
    this.needleCenterX = 4;
    this.needleCenterY = 35;
    this.minValue = 0;
    this.maxValue = 0;
    this.currentValue = 0;

    this.calculateNeedleAngle = function() {
        var percentFull = this.currentValue / this.maxValue;
        var angleRange = MAX_NEEDLE_ANGLE - MIN_NEEDLE_ANGLE;
        var angleRemaining = angleRange * percentFull;
        var needleAngle = (MIN_NEEDLE_ANGLE + angleRemaining) * DEGREES_TO_RADIANS;
        return needleAngle;
    }

    this.drawNeedle = function(graphic, atX, atY, withAngle){
    	canvasContext.save(); //allows undo translate movement and rotate spin
    	canvasContext.translate(atX,atY);
    	canvasContext.rotate(withAngle); //sets the rotation
    	canvasContext.drawImage(graphic, -this.needleCenterX, -this.needleCenterY); //center, draws car
    	canvasContext.restore(); //undoes the translation movement and rotation since save()
    }

    this.draw = function() {
        canvasContext.drawImage(fuelGaugePic, this.positionX, this.positionY);
        // TODO: Math for ratio between 0-100 and min/max angles for needle
        this.drawNeedle(gaugeNeedlePic,
            this.positionX + this.needleOffsetX,
            this.positionY + this.needleOffsetY,
            this.calculateNeedleAngle());
    }
}
