function miniMap() {
    let miniMapX = 654;
    let miniMapY = 36;
    let miniMapH = 106;
    let miniMapW = 106;

    this.draw = function() {
        colorLine(miniMapX, miniMapY, miniMapX + miniMapW , miniMapY + miniMapH , 'white')
        for (var i = 0; i < levelList[levelNow].wayPointsX.length; i++){
            var nextI = i+1;
            if (nextI == levelList[levelNow].wayPointsX.length){
                nextI = 0;
            }
            colorLine(levelList[levelNow].wayPointsX[i], levelList[levelNow].wayPointsY[i],
                levelList[levelNow].wayPointsX[nextI] , levelList[levelNow].wayPointsY[nextI], 'white')
        }
        
    }

}