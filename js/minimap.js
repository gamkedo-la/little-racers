function miniMap() {
    let miniMapX = 654;
    let miniMapY = 36;
    let miniMapScale = 0.2;

    let interpX = 0;
    let interpY = 0;
    this.interpPt = function(fromX,fromY,toX,toY, atT, beforeX, beforeY, afterX, afterY)
    {
        var deltaBeforeX = fromX - beforeX;
        var deltaBeforeY = fromY - beforeY;
        var deltaAfterX = toX - afterX;
        var deltaAfterY = toX - afterY;

        var anchorFrontX = fromX+deltaBeforeX *0.15;
        var anchorFrontY = fromY+deltaBeforeY *0.15;
        var anchorEndX = toX-deltaAfterX*0.15;
        var anchorEndY = toY-deltaAfterY*0.15;
        var antiT = 1.0 - atT;
        var termAX = Math.pow(antiT, 3.0) * fromX;
        var termAY = Math.pow(antiT, 3.0) * fromY;
        var termBX = 3.0 * Math.pow(antiT, 2.0) * atT * anchorFrontX;
        var termBY = 3.0 * Math.pow(antiT, 2.0) * atT * anchorFrontY;
        var termCX = 3.0 * (antiT) *Math.pow(atT, 2.0) * anchorEndX;
        var termCY = 3.0 * (antiT) *Math.pow(atT, 2.0) * anchorEndY;
        var termDX = Math.pow(atT, 3.0) * toX;
        var termDY = Math.pow(atT, 3.0) * toY;
        interpX = termAX + termBX + termCX + termDX;
        interpY = termAY + termBY + termCY + termDY;
    }


    this.init = function(){
        console.log("mapScale can recalculate if needed");
    }

    this.draw = function() {
        canvasContext.save();
        canvasContext.translate(miniMapX, miniMapY);
        canvasContext.scale(miniMapScale, miniMapScale);
        for (var i = 0; i < levelList[levelNow].wayPointsX.length; i++){
            var prevI = i-1;
            if(prevI < 0) {
                prevI = levelList[levelNow].wayPointsX.length-1;
            }
            var nextI = i+1;
            if (nextI >= levelList[levelNow].wayPointsX.length){
                nextI -= levelList[levelNow].wayPointsX.length;
            }
            var afterI = nextI+1;
            if (afterI >= levelList[levelNow].wayPointsX.length){
                afterI -= levelList[levelNow].wayPointsX.length;
            }
            /*
            colorLine(levelList[levelNow].wayPointsX[i], levelList[levelNow].wayPointsY[i],
                    levelList[levelNow].wayPointsX[nextI] , levelList[levelNow].wayPointsY[nextI], 'orange', canvasContext, 10);
            */
            var prevX = levelList[levelNow].wayPointsX[i];
            var prevY = levelList[levelNow].wayPointsY[i];
            for(var ii=0;ii<=10;ii++) {
                this.interpPt(levelList[levelNow].wayPointsX[i], levelList[levelNow].wayPointsY[i],
                    levelList[levelNow].wayPointsX[nextI] , levelList[levelNow].wayPointsY[nextI], ii/10.0,
                    levelList[levelNow].wayPointsX[prevI], levelList[levelNow].wayPointsY[prevI],
                    levelList[levelNow].wayPointsX[afterI], levelList[levelNow].wayPointsY[afterI]);
                colorLine(prevX, prevY, interpX, interpY, 'white', canvasContext, 15);
                prevX = interpX;
                prevY = interpY;
            }
        }
        canvasContext.restore();
    }

}