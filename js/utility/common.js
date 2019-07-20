const RADIANS_360_DEGREES_POSITIVE = 2 * Math.PI;
const RADIANS_270_DEGREES_NEGATIVE = -Math.PI * 3 / 2;
const RADIANS_240_DEGREES_NEGATIVE = -Math.PI * 4 / 3;
const RADIANS_180_DEGREES_NEGATIVE = -Math.PI;
const RADIANS_120_DEGREES_NEGATIVE = -Math.PI * 2 / 3;
const RADIANS_90_DEGREES_NEGATIVE = -Math.PI / 2;
const RADIANS_45_DEGREES_POSITIVE = Math.PI / 4;
const RADIANS_0_DEGREES = 0;

//Calculates a point in world space from a center when rotated by an angle.
function getRotatedPoint(centerX, centerY, pX, pY, angle) {
    var xLen = pX - centerX;
    var yLen = pY - centerY;
    var hypLength = Math.sqrt(xLen * xLen + yLen * yLen);
    var angleCenterToPoint = Math.atan2(yLen, xLen);

    angle += angleCenterToPoint;

    var newX = centerX + hypLength * Math.cos(angle);
    var newY = centerY + hypLength * Math.sin(angle);

    return { x: newX, y: newY }; //Return values as an object; they can be accessed as varName.x and varName.y
}

function dotProduct(x1, y1, x2, y2)
{
    return (x1 * x2 + y1 * y2);
}

function normalizeVector(x1, y1)
{
    var hyp = Math.sqrt(x1*x1 + y1*y1);
    var newX=x1/hyp;
    var newY=y1/hyp;

    return { x: newX, y:newY };
}

function vectorMagnitude(x, y)
{
    return Math.sqrt(x * x + y * y);
}

function dist(x1, y1, x2, y2, forComparisonOnly = false) {
    var xd = x2 - x1;
    var yd = y2 - y1;
    var dist;
    if (forComparisonOnly) {
        dist = xd * xd + yd * yd;
    } else {
        dist = Math.sqrt(xd * xd + yd * yd);
    }
    return dist;
}

//Constrain an angle between 0 and -2PI.
function constrainAngleToNegativeRange(angle) {

    angle = angle % RADIANS_360_DEGREES_POSITIVE;

    if (angle > 0)
        angle -= RADIANS_360_DEGREES_POSITIVE;

    return angle;
}