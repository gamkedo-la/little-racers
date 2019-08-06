function miniMap() {
    let miniMapX = 624;
    let miniMapY = 36;
    let miniMapScale = 0.2;

    let interpX = 0;
    let interpY = 0;
    this.interpPt = function(beforeX,beforeY, fromX,fromY, toX,toY, afterX,afterY, atT)
    {
        var deltaBeforeX = fromX - beforeX;
        var deltaBeforeY = fromY - beforeY;
        var deltaAfterX = toX - afterX;
        var deltaAfterY = toY - afterY;
        var lenBefore = Math.sqrt(deltaBeforeX*deltaBeforeX + deltaBeforeY*deltaBeforeY);
        var lenAfter = Math.sqrt(deltaAfterX*deltaAfterX + deltaAfterY * deltaAfterY);

        var curveLen = 30;
        var anchorFrontX = fromX+(deltaBeforeX / lenBefore) *curveLen;
        var anchorFrontY = fromY+(deltaBeforeY / lenBefore) *curveLen;
        var anchorEndX = toX+(deltaAfterX / lenAfter) *curveLen;
        var anchorEndY = toY+(deltaAfterY / lenAfter) *curveLen;

         // to visualize curve weights
        /*colorLine(fromX, fromY,
                    anchorFrontX, anchorFrontY, 'cyan', canvasContext, 15);
        colorLine(toX, toY,
                    anchorEndX, anchorEndY, 'yellow', canvasContext, 5);*/

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
                this.interpPt(levelList[levelNow].wayPointsX[prevI], levelList[levelNow].wayPointsY[prevI],
                    levelList[levelNow].wayPointsX[i], levelList[levelNow].wayPointsY[i],
                    levelList[levelNow].wayPointsX[nextI] , levelList[levelNow].wayPointsY[nextI],
                    levelList[levelNow].wayPointsX[afterI], levelList[levelNow].wayPointsY[afterI],
                    ii/10.0);
                colorLine(prevX, prevY, interpX, interpY, 'white', canvasContext, 15);
                prevX = interpX;
                prevY = interpY;
            }
        }
        canvasContext.restore();
    }

}