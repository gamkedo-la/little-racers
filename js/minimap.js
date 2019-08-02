function miniMap() {
    let miniMapX = 654;
    let miniMapY = 36;
    let miniMapScale = 0.2;


    this.init = function(){
        console.log("mapScale can recalculate if needed");
    }

    this.draw = function() {
        canvasContext.save();
        canvasContext.translate(miniMapX, miniMapY);
        canvasContext.scale(miniMapScale, miniMapScale);
        for (var i = 0; i < levelList[levelNow].wayPointsX.length; i++){
            var nextI = i+1;
            if (nextI == levelList[levelNow].wayPointsX.length){
                nextI = 0;
            }
            colorLine(levelList[levelNow].wayPointsX[i], levelList[levelNow].wayPointsY[i],
                levelList[levelNow].wayPointsX[nextI] , levelList[levelNow].wayPointsY[nextI], 'white')
        }
        canvasContext.restore();
    }

}