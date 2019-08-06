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
        canvasContext.globalAlpha = 0.7;
        canvasContext.translate(miniMapX, miniMapY);
        canvasContext.scale(miniMapScale, miniMapScale);
        canvasContext.beginPath();
        canvasContext.strokeStyle = '#999999';
        canvasContext.lineWidth = 115;
        // the +1 overdraw covers a gap at the track start/end loop connection
        var wayPointCount = levelList[levelNow].wayPointsX.length;
        for (var i = 0; i < wayPointCount+1; i++){
            var prevI = i-1;
            if(prevI < 0) {
                prevI = wayPointCount-1;
            }
            var nextI = i+1;
            nextI %= wayPointCount;
            var afterI = nextI+1;
            afterI %= wayPointCount;
            var loopedI = i; // needed to support the +1 overdraw segment
            loopedI %= wayPointCount;

            /*
            colorLine(levelList[levelNow].wayPointsX[i], levelList[levelNow].wayPointsY[i],
                    levelList[levelNow].wayPointsX[nextI] , levelList[levelNow].wayPointsY[nextI], 'orange', canvasContext, 10);
            */
            var prevX = levelList[levelNow].wayPointsX[loopedI];
            var prevY = levelList[levelNow].wayPointsY[loopedI];
            var segmentSplit = 10;

            if(i==0) {
                canvasContext.moveTo(prevX, prevY);
            } else {
                canvasContext.lineTo(prevX, prevY);
            }
            for(var ii=0;ii<=segmentSplit;ii++) {
                this.interpPt(levelList[levelNow].wayPointsX[prevI], levelList[levelNow].wayPointsY[prevI],
                    levelList[levelNow].wayPointsX[loopedI], levelList[levelNow].wayPointsY[loopedI],
                    levelList[levelNow].wayPointsX[nextI] , levelList[levelNow].wayPointsY[nextI],
                    levelList[levelNow].wayPointsX[afterI], levelList[levelNow].wayPointsY[afterI],
                    ii/segmentSplit);
                canvasContext.lineTo(interpX, interpY);

                //colorLine(prevX, prevY, interpX, interpY, '#cccccc', canvasContext, 45);
                prevX = interpX;
                prevY = interpY;
            }
        }
        canvasContext.stroke();

        // draw little cars

        canvasContext.translate(cameraP1.panX * miniMapScale, 
                                cameraP1.panY * miniMapScale);

        for (var i = 0; i < vehicleList.length; i++) {
            vehicleList[i].drawCar(canvasContext);
        }

        // undo all the scaling and offsets        
        canvasContext.restore();
    }

}