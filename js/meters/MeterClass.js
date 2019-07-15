const MIN_NEEDLE_ANGLE = -62;
const MAX_NEEDLE_ANGLE = 62;
const DEGREES_TO_RADIANS = Math.PI / 180;

function MeterClass(x = 0, 
                    y = 0, 
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
                    meterPic) {

    this.x = x;
    this.y = y;
    this.maxValue = maxValue;
    this.minValue = minValue;
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
                         needleOffsetY = this.needleOffsetY) {
        
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
        this.drawNeedle(canvasContext,
                        needlePic,
                        this.x + needleOffsetX,
                        this.y + needleOffsetY,
                        this.calculateNeedleAngle());
    }
}