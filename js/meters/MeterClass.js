const MIN_NEEDLE_ANGLE = -62;
const MAX_NEEDLE_ANGLE = 62;
const NITRO_DISLAY_XOFFSET = 16;
const NITRO_DISLAY_YOFFSET = 28;
const DEGREES_TO_RADIANS = Math.PI / 180;
const HEALTH_DISPLAY_XOFFSET = 28;
const HEALTH_DISPLAY_YOFFSET = 28;

function MeterClass(x = 0,
                    y = 0,
                    lowValueWarning = -1,
                    maxValue = 0,
                    minValue = 0,
                    currentValue = 0,
                    needleX = 4,
                    needleY = 35,
                    needleOffsetX = 36,
                    needleOffsetY = 50,
                    radiusInner = 30,
                    radiusOuter = 37,
                    outlineWidth = 5,
                    outlineColor = 'white',
                    color = 'white',
                    alpha = 0.5,
                    needlePic = gaugeNeedlePic,
                    meterPic,
                    meterOverlayPic = null,
                    meterOverlayX = 0,
                    meterOverlayY = 0,
                    healthBarOverlayPic = null,
                    healthBarOverlayX = 0,
                    healthBarOverlayY = 0) {

    this.x = x;
    this.y = y;
    this.maxValue = maxValue;
    this.minValue = minValue;
    this.lowValueWarning = lowValueWarning;
    this.currentValue = currentValue;
    this.needleX = needleX;
    this.needleY = needleY;
    this.needleOffsetX = needleOffsetX;
    this.needleOffsetY = needleOffsetY;
    this.radiusInner = radiusInner;
    this.radiusOuter = radiusOuter;
    this.outlineWidth = outlineWidth;
    this.outlineColor = outlineColor;
    this.color = color;
    this.alpha = alpha;
    this.meterPic = meterPic;
    this.needlePic = needlePic;
    this.meterOverlayPic = meterOverlayPic;
    this.meterOverlayX = meterOverlayX;
    this.meterOverlayY = meterOverlayY;
    this.healthBarOverlayPic = healthBarOverlayPic;
    this.healthBarOverlayX  = healthBarOverlayX;
    this.healthBarOverlayY  = healthBarOverlayY;

    this.healthGauge = function () {
        if (this.healthRemaining > 66) {
            //call out health100
            canvasContext.drawImage(health100, this.x, this.y);
        } else if (this.healthRemaining <= 66) {
            //call out health66
            canvasContext.drawImage(health66, this.x, this.y);
        } else if (this.healthRemaining <= 33) {
           // call out health33
           canvasContext.drawImage(health33, this.x, this.y);
        } else if (this.healthRemaining = 0) {
            //call out health0
            canvasContext.drawImage(health0, this.x, this.y);
        }
    }

    //Just returns the angle based on the % of max value based on the draw calls current value.
    this.calculateNeedleAngle = function() {
        var percentFull = this.currentValue / this.maxValue;
        var angleRange = MAX_NEEDLE_ANGLE - MIN_NEEDLE_ANGLE;
        var angleRemaining = angleRange * percentFull;
        var needleAngle = (MIN_NEEDLE_ANGLE + angleRemaining) * DEGREES_TO_RADIANS;
        return needleAngle;
    }

    this.drawNeedle = function(canvasContext, needlePic, atX, atY, withAngle){
    	canvasContext.save(); //allows undo translate movement and rotate spin
    	canvasContext.translate(atX,atY);
    	canvasContext.rotate(withAngle); //sets the rotation
    	canvasContext.drawImage(needlePic, -this.needleX, -this.needleY); //center
    	canvasContext.restore(); //undoes the translation movement and rotation since save()
    }

    this.draw = function(canvasContext,
                         needlePic = this.needlePic,
                         meterPic = this.meterPic,
                         color = this.color,
                         alpha = this.alpha,
                         outlineWidth = this.outlineWidth,
                         outlineColor = this.outlineColor,
                         needleOffsetX = this.needleOffsetX,
                         needleOffsetY = this.needleOffsetY,
                         meterOverlayPic = null,
                         overlayX = this.overlayX,
                         overlayY = this.overlayY,
                         healthBarOverlayPic = null,
                         healthBarOverlayX = this.healthBarOverlayX,
                         healthBarOverlayY = this.healthBarOverlayY) {

        if (meterPic) {
            canvasContext.drawImage(meterPic, this.x, this.y);
        }
        else {
            outlineCircle(this.x + needleOffsetX , this.y + needleOffsetY, this.radiusOuter, outlineColor, outlineWidth, canvasContext);
            canvasContext.save();
            canvasContext.globalAlpha = alpha;
            colorCircle(this.x + needleOffsetX , this.y + needleOffsetY, this.radiusInner, color, canvasContext);
            canvasContext.restore();
        }
        if(meterOverlayPic) {
            canvasContext.drawImage(meterOverlayPic, this.x+overlayX, this.y+overlayY);
        }
        if(healthBarOverlayPic) {
            canvasContext.drawImage(healthBarOverlayPic, this.x+healthBarOverlayX, this.y+healthBarOverlayY);
        }
        if(this.currentValue < this.lowValueWarning){
            canvasContext.drawImage(lowFuelPic, this.x + this.needleX + lowFuelPic.width/2,this.y + this.needleY + lowFuelPic.height);
        }
        this.drawNeedle(canvasContext,
                        needlePic,
                        this.x + needleOffsetX,
                        this.y + needleOffsetY,
                        this.calculateNeedleAngle());
    }
}
