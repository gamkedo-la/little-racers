const FULL_CIRCLE = 2*Math.PI;

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

//Constrain an angle between 0 and -2PI.
function constrainAngleToNegativeRange(angle) {

    angle = angle % FULL_CIRCLE;

    if (angle > 0)
        angle -= FULL_CIRCLE;

    return angle;
}