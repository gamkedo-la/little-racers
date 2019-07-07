const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_GAP = 2;

const TRACK_CANVAS = document.createElement("canvas");
const TRACK_CONTEXT = TRACK_CANVAS.getContext('2d');
let terrainChanged = true;

//const MAP_MANAGER = new MapManager();

var levelOne = {
	cols:40,
	rows:30,
	data:[
   100,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,102,100,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,102,  
   103,  1,  1,  1,  1,  1,  1,  1,  3,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,107,
   103,  1,  1,  1, 55,  1,  1, 55,  3,  1,  1,  1, 55,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,107,
   103,  1,  1, 50,  6,  7,  8, 51, 51, 50, 50, 51, 51, 51, 51, 51, 50,  1,  1, 51,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,107,
   103,  1,  1, 51,  9, 10, 11, 51, 51, 50, 50, 51, 51, 51, 51, 51, 51,  1,  1, 51,  1,  1, 51, 51, 51, 51, 51, 50, 50, 51, 51, 51, 51, 51,  1,  1,  1,  1,  1,107,
   103,  1,  1, 51, 12, 13,  1, 51, 51, 50, 50, 51, 51, 51, 51, 51, 51,  1,  1, 51,  1,  1, 51, 51, 51, 51, 51, 50, 50, 51, 51, 51, 51, 51,  1,  1,  1,  1,  1,107,
   103, 52, 52, 51,  1,  1,  1, 51, 51, 50, 50, 51, 51, 51, 51, 51, 51,  1,  1, 51,  1,  1, 51, 51, 51, 51, 51, 50, 50, 51, 51, 51, 51, 51,  1,  1,  1,  1,  1,107,
   103, 53, 53, 50,  1,  1, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,  4,  4, 51,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,107,
   103,  1,  1, 51,  1,  1, 51, 51, 51, 50, 50, 51, 51, 51, 51, 51, 51, 63, 63, 51,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,107,
   103,  1,  1,  1,  1,  1, 51, 51, 51, 50, 50, 51, 51, 51, 51, 51, 51,  1,  1, 51,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,107,
   103,  1,  1,  1,  1, 51, 51, 51, 51, 50, 50, 51, 51, 51, 51, 51, 51,  1,  1, 51,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,107,
   103,  1,  1, 50, 51, 51, 51, 51, 51, 50, 50, 51, 51, 51, 51, 51, 50,  1,  1, 51,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,107,
   103,  1,  1,  2,  1,  1,  1,  1,  1,  1,  1,  1,  1,  5,  1,  1,  1,  1,  1, 51,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,107, 
   103,  1,  1,  2,  1, 54,  1,  1,  1,  1,  1,  1, 55,  5,  1,  1,  1,  1,  1, 51,  1,  1, 51, 51, 51, 51, 51, 50, 50, 51, 51, 51, 51, 51,  1,  1,  1,  1,  1,107,
   103,  0,  0, 50, 51, 51, 51, 51, 51, 50, 50, 51, 51, 51, 51, 51, 50,  1,  1, 51,  1,  1, 51, 51, 51, 51, 51, 50, 50, 51, 51, 51, 51, 51,  1,  1,  1,  1,  1,107, 
   103,  0,  0, 50, 51, 51, 51, 51, 51, 50, 50, 51, 51, 51, 51, 51, 51,  1,  1, 51,  1,  1, 51, 51, 51, 51, 51, 50, 50, 51, 51, 51, 51, 51,  1,  1,  1,  1,  1,107,  
   103,  0,  0, 50, 51, 51, 51, 51, 51, 50, 50, 51, 51, 51, 51, 51, 51,  1,  1, 51,  1,  1, 51, 51, 51, 51, 51, 50, 50, 51, 51, 51, 51, 51,  1,  1,  1,  1,  1,107,
   103,  0,  0, 50, 51, 51, 51, 51, 51, 50, 50, 51, 51, 51, 51, 51, 51,  1,  1, 51,  1,  1, 51, 51, 51, 51, 51, 50, 50, 51, 51, 51, 51, 51,  1,  1,  1,  1,  1,107,
   103,  3,  3, 50, 51, 51, 51, 51, 51, 50, 50, 51, 51, 51, 51, 51, 51,  1,  1, 51,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,107,
   103,  1,  1, 50, 51, 51, 51, 51, 51, 50, 50, 51, 51, 51, 51, 51, 51,  1,  1, 51,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,107,
   103,  1,  1, 50, 51, 51, 51, 51, 51, 50, 50, 51, 51, 51, 51, 51, 51,  1,  1, 51,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,107,
   103,  1, 52, 50, 51, 51, 51, 51, 51, 50, 50, 51, 51, 51, 51, 51, 51,  1,  1, 51,  1,  1, 51, 51, 51, 51, 51, 50, 50, 51, 51, 51, 51, 51,  1,  1,  1,  1,  1,107,
   103,  1, 53, 50, 51, 51, 51, 51, 51, 50, 50, 51, 51, 51, 51, 51, 51,  1,  1, 51,  1,  1, 51, 51, 51, 51, 51, 50, 50, 51, 51, 51, 51, 51,  1,  1,  1,  1,  1,107,
   103,  1,  1, 50, 51, 51, 51, 51, 51, 50, 50, 51, 51, 51, 51, 51, 51,  1,  1, 51,  1,  1, 51, 51, 51, 51, 51, 50, 50, 51, 51, 51, 51, 51,  1,  1,  1,  1,  1,107,
   103,  1,  1, 50, 51, 51, 51, 51, 51, 50, 50, 51, 51, 51, 51, 51, 51,  1,  1, 51,  1,  1, 51, 51, 51, 51, 51, 50, 50, 51, 51, 51, 51, 51,  1,  1,  1,  1,  1,107,
   103,  1,  1, 50, 51, 51, 51, 51, 51, 50, 50, 51, 51, 51, 51, 51, 51,  1,  1, 51,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,107,
   103,  1,  1, 50, 51, 51, 51, 51, 51, 50, 50, 51, 51, 51, 51, 51, 50,  1,  1, 51,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,107,
   103,  1,  1,  1,  1,  1,  1,  1,  1,  5,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,107, 
   103,  1,  1,  1,  1,  1,  1,  1,  1,  5,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,107,
   104,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105 
   ]
};
	
var levelTwo = {
	cols:20,
	rows:15,
	data:[
   100,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,102, 
   103,  1,  1,  1,  1,  1,  1,  1,  1, 50,  1,  1,  1,  1,  1,  1,  1,  1,  1,107,
   103,  1,  1,  1,  1,  1,  1,  1,  1, 50,  1,  1,  1,  1,  1,  1,  1,  1,  1,107,
   103,  1,  1, 50, 51, 51, 51,  1,  1, 50,  1,  1, 51, 51, 51, 51, 50,  1,  1,107,
   103,  1,  1, 51, 51, 51, 51,  1,  1, 50,  1,  1, 51, 51, 51, 51, 51,  1,  1,107,
   103,  1,  1, 51, 51, 51, 51,  1,  1, 50,  1,  1, 51, 51, 51, 51, 51,  1,  1,107,
   103,  1,  1, 51, 51, 51, 51,  1,  1,  4,  1,  1, 51, 51, 51, 51, 51,  1,  1,107,
   103,  3,  3, 50, 50, 50, 50,  1,  1,  4,  1,  1, 50, 50, 50, 50, 50,  1,  1,107,
   103,  1,  1, 51, 51, 51, 50, 50, 50, 50, 50, 50, 50, 51, 51, 51, 51,  1,  1,107,
   103,  1,  1, 51, 51, 51, 51, 51, 51, 50, 51, 51, 51, 51, 51, 51, 51,  1,  1,107,
   103,  0,  0, 51, 51, 51, 51, 51, 51, 50, 51, 51, 51, 51, 51, 51, 51,  1,  1,107,
   103,  0,  0, 50, 51, 51, 51, 51, 51, 50, 51, 51, 51, 51, 51, 51, 50,  1,  1,107,
   103,  0,  0,  2,  1,  1,  1,  1,  1,  5,  1,  1,  1,  1,  1,  1,  1,  1,  1,107,  
   103,  0,  0,  2,  1,  1,  1,  1,  1,  5,  1,  1,  1,  1,  1,  1,  1,  1,  1,107,	
   104,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105, 
   ]
};
	
var levelThree = {
	cols:20,
	rows:15,
	data:[
   100,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,102, 
    50, 51, 51,  1,  1,  1,  1,  1,  1, 50,  1,  1,  1,  1,  1,  1,  1,  1,  1,107,
    50, 51, 51,  1,  1,  1,  1,  1,  1, 50,  1,  1,  1,  1,  1,  1,  1,  1,  1,107,
    50, 51, 51,  1,  1, 50, 50,  1,  1, 50,  1,  1, 51, 51, 51, 51, 50,  1,  1,107,
   103,  1,  1,  1,  1, 51, 51,  1,  1, 50,  1,  1, 51, 51, 50, 50, 50,  1,  1,107,
   103,  1,  1,  1,  1, 51, 51,  1,  1, 50,  1,  1, 51, 51, 50,  1,  1,  1,  1,107,
   103,  1,  1, 50, 51, 51, 51,  1,  1, 50,  1,  1, 51, 51, 50,  1,  1,  1,  1,107,
   103,  3,  3, 51, 51, 51, 51,  1,  1, 50,  1,  1, 51, 51, 50,  1,  1, 51, 51, 50,
   103,  1,  1, 51, 51, 51, 51,  1,  1, 50,  1,  1, 51, 51, 50,  1,  1,  1,  1,107,
   103,  1,  1, 51, 51, 51, 51,  1,  1,  4,  1,  1, 51, 51, 50,  1,  1,  1,  1,107,
   103,  0,  0, 51, 51, 51, 50,  1,  1,  4,  1,  1, 50, 51, 50, 50, 50,  1,  1,107,
   103,  0,  0, 50, 51, 51, 50, 50, 50, 50, 50, 50, 50, 51, 51, 51, 50,  1,  1,107,
   103,  0,  0,  2,  1,  1,  1,  1,  1,  5,  1,  1,  1,  1,  1,  1,  1,  1,  1,107,  
   103,  0,  0,  2,  1,  1,  1,  1,  1,  5,  1,  1,  1,  1,  1,  1,  1,  1,  1,107,	
   104,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,
	]
};
	
//var levelList = [];
var levelList = [levelOne, levelTwo, levelThree];
var levelNow = 0;
//MAP_MANAGER.loadLevels();
var trackGrid = [];
// 0 through 49 are dedicated for road tiles				
const TRACK_PLAYER = 0;
const TRACK_ROAD = 1;
const TRACK_FINISH = 2;
const TRACK_ROAD_AAA = 3;
const TRACK_ROAD_BBB = 4;
const TRACK_ROAD_CCC = 5;
const TRACK_ROAD_FIRST = 6;
const TRACK_ROAD_SECOND = 7;
const TRACK_ROAD_THIRD = 8;
const TRACK_ROAD_FOURTH = 9;
const TRACK_ROAD_FIFTH = 10;
const TRACK_ROAD_SIXTH = 11;
const TRACK_ROAD_SEVENTH = 12;
const TRACK_ROAD_EIGHT = 13;

// 50 through 99 are dedicated for track obstacles
const TRACK_CONE = 50;
const TRACK_GRASS = 51;
const TRACK_OIL_SLICK = 52;
const TRACK_NORTH_RAMP = 53;
const TRACK_CASH = 54;
const TRACK_FUEL = 55;
const TRACK_KNOCKED_OVER_CONE = 60;
const TRACK_SOUTH_RAMP = 63;
const TRACK_WALL = 70; 

// 100 through 150 are dedicated for wallSpriteSheet
const TRACK_BRICK_WALL_TOP_LEFT_END = 100;
const TRACK_BRICK_WALL_TOP_MIDDLE = 101;
const TRACK_BRICK_WALL_TOP_RIGHT_END = 102;
const TRACK_BRICK_WALL_LEFT = 103;
const TRACK_BRICK_WALL_BOT_LEFT_END = 104;
const TRACK_BRICK_WALL_BOT_MIDDLE = 105;
const TRACK_BRICK_WALL_BOT_RIGHT_END = 106;
const TRACK_BRICK_WALL_RIGHT = 107;
	// 108, and 109 are available
const TRACK_BRICK_WALL_TOP_LEFT_END_GRASS = 110;
const TRACK_BRICK_WALL_TOP_MIDDLE_GRASS = 111;
const TRACK_BRICK_WALL_TOP_RIGHT_END_GRASS = 112;
const TRACK_BRICK_WALL_LEFT_GRASS = 113;
const TRACK_BRICK_WALL_BOT_LEFT_END_GRASS = 114;
const TRACK_BRICK_WALL_BOT_MIDDLE_GRASS = 115;
const TRACK_BRICK_WALL_BOT_RIGHT_END_GRASS = 116;
const TRACK_BRICK_WALL_RIGHT_GRASS = 117;

function getCurrentTrackCols() {
	return levelList[levelNow].cols;
}

function getCurrentTrackRows() {
	return levelList[levelNow].rows;
}

function nextLevel() {
	terrainChanged = true;
	levelNow++;
	if(levelNow >= levelList.length) {
		levelNow = 0;
	}

	loadLevel(levelList[levelNow]);
	//make into a list
	//updates wayPoints
	for (var i = 0; i < vehicleList.length; i++) {  	
		vehicleList[i].updateWayPoints(); 
	}
	winScreen = true;
	
}

function loadLevel(whichLevel) {	
	trackGrid = whichLevel.data.slice();
	for (var i = 0; i < vehicleList.length; i++) {  
		vehicleList[i].carReset(window['carPic'+(i+1)], 'Car '+(i+1), true);
	} 	
}

function drawTrackByCanvas() {
	canvasContext.drawImage(TRACK_CANVAS, 0, 0);
}

function addTrackImageAtPixelPos(trackCode, x, y) {
	const tileData = findTrackType_YOffset_SpriteSheetForTileType(trackCode);
	tileData.transparency = trackCode;
	tileData.x = x;
	tileData.y = y;

	drawWithTileData(tileData);
}

function addTrackImageAtTileCoords(trackCode, col, row) {
	const pixelPos = trackCoordToPixelPos(col, row);
	addTrackImageAtPixelPos(trackCode, pixelPos.x, pixelPos.y);
}

function addTrackImageAtTileIndex(trackCode, index) {
	const pixelPos = tileIndexToPixelPos(index);
	addTrackImageAtPixelPos(trackCode, pixelPos.x, pixelPos.y);
}

function drawTracks() {
	if(terrainChanged) {
		drawTracksByTile();
	} else {
		drawTrackByCanvas();
	}
}

//TODO: Fix this.  Only works correctly when drawing entire track (0, 0) to ('maxCol', 'maxRow')
function drawTrackByTileAtCoords(startCol, startRow, endCol, endRow) {
	var trackIndex = 0;
	var trackLeftEdgeX = 0;
	var trackTopEdgeY = 0;

	for(var eachRow = startRow; eachRow < endRow; eachRow++){
		
		trackLeftEdgeX = 0;
		
		for(var eachCol = startCol; eachCol < endCol; eachCol++) {
			const tileData = findTrackType_YOffset_SpriteSheetForTileType(trackGrid[trackIndex]);
			tileData.transparency = trackGrid[trackIndex];
			tileData.x = Math.floor(trackLeftEdgeX);
			tileData.y = trackTopEdgeY;
			
			drawWithTileData(tileData);
			
			trackIndex++;
			trackLeftEdgeX += TRACK_W;
				
		} // end of each col
		
		trackTopEdgeY += TRACK_H;
		
	} // end of each row
}

function drawWithTileData(tileData) {
	if (tileTypeHasRoadTransparency(tileData.transparency)) {
		TRACK_CONTEXT.drawImage( roadSpriteSheet, 0, 0, TRACK_W, TRACK_H, tileData.x, tileData.y, TRACK_W, TRACK_H);
	} else if (tileTypeHasgGrassTransparency(tileData.transparency)) {
		TRACK_CONTEXT.drawImage( trackobstaclesSpriteSheet, 40, 0, TRACK_W, TRACK_H, tileData.x, tileData.y, TRACK_W, TRACK_H);
	}

	TRACK_CONTEXT.drawImage( tileData.spriteSheet, tileData.type * TRACK_W, tileData.offset, TRACK_W, TRACK_H, tileData.x, tileData.y, TRACK_W, TRACK_H);
}

function findTrackType_YOffset_SpriteSheetForTileType(tileType) {
	let trackTypeHere = tileType;
	let imageOffsetY = 0;
	let spriteSheet = roadSpriteSheet;

	if (trackTypeHere >= 50 && trackTypeHere < 100){
		spriteSheet = trackobstaclesSpriteSheet;
		trackTypeHere -= 50;
	} else if (trackTypeHere >= 100 && trackTypeHere < 150){
		spriteSheet = wallSpriteSheet;
		trackTypeHere -= 100;
	}

	const resultType = trackTypeHere % 10;
	imageOffsetY = TRACK_H * Math.floor(trackTypeHere / 10);

	return {type:resultType, offset:imageOffsetY, spriteSheet:spriteSheet};
}

function drawTileAtPixelPos(x, y, roadTransparency, grassTransparency) {
	if (roadTransparency) {
		TRACK_CONTEXT.drawImage( roadSpriteSheet, 0, 0, TRACK_W, TRACK_H, x, y, TRACK_W, TRACK_H);
	} else if (grassTransparency) {
		TRACK_CONTEXT.drawImage( trackobstaclesSpriteSheet, 40, 0, TRACK_W, TRACK_H, x, y, TRACK_W, TRACK_H);
	}			

	TRACK_CONTEXT.drawImage( spriteSheet, trackTypeHere * TRACK_W, imageOffsetY, TRACK_W, TRACK_H, x, y, TRACK_W, TRACK_H);
}
		
function drawTracksByTile() {
	const currentCols = getCurrentTrackCols();
	const currentRows = getCurrentTrackRows();
	TRACK_CANVAS.width = TRACK_W * currentCols;
	TRACK_CANVAS.height = TRACK_H * currentRows;

	//Draw the whole track
	drawTrackByTileAtCoords(0, 0, currentCols, currentRows);

	terrainChanged = false;
	drawTrackByCanvas();
}

function tileTypeHasRoadTransparency(transparencyCheckTypeHere){
	 return (
			transparencyCheckTypeHere == TRACK_OIL_SLICK ||
			transparencyCheckTypeHere == TRACK_BRICK_WALL_TOP_LEFT_END ||
			transparencyCheckTypeHere == TRACK_BRICK_WALL_TOP_MIDDLE ||
			transparencyCheckTypeHere == TRACK_BRICK_WALL_TOP_RIGHT_END ||
			transparencyCheckTypeHere == TRACK_BRICK_WALL_BOT_LEFT_END ||
			transparencyCheckTypeHere == TRACK_BRICK_WALL_BOT_MIDDLE ||
			transparencyCheckTypeHere == TRACK_BRICK_WALL_BOT_RIGHT_END ||
			transparencyCheckTypeHere == TRACK_BRICK_WALL_LEFT ||
			transparencyCheckTypeHere == TRACK_BRICK_WALL_RIGHT ||
			transparencyCheckTypeHere == TRACK_CONE ||
			transparencyCheckTypeHere == TRACK_KNOCKED_OVER_CONE ||
			transparencyCheckTypeHere == TRACK_CASH  ||
			transparencyCheckTypeHere == TRACK_FUEL  ||
			transparencyCheckTypeHere == TRACK_NORTH_RAMP  ||
			transparencyCheckTypeHere == TRACK_SOUTH_RAMP  			
			);
}

function tileTypeHasgGrassTransparency(transparencyCheckTypeHere){
	 return (
			transparencyCheckTypeHere == TRACK_BRICK_WALL_TOP_LEFT_END_GRASS ||
			transparencyCheckTypeHere == TRACK_BRICK_WALL_TOP_MIDDLE_GRASS ||
			transparencyCheckTypeHere == TRACK_BRICK_WALL_TOP_RIGHT_END_GRASS ||
			transparencyCheckTypeHere == TRACK_BRICK_WALL_BOT_LEFT_END_GRASS ||
			transparencyCheckTypeHere == TRACK_BRICK_WALL_BOT_MIDDLE_GRASS ||
			transparencyCheckTypeHere == TRACK_BRICK_WALL_BOT_RIGHT_END_GRASS ||
			transparencyCheckTypeHere == TRACK_BRICK_WALL_LEFT_GRASS ||
			transparencyCheckTypeHere == TRACK_BRICK_WALL_RIGHT_GRASS			
			);
}



function isWallAtTileCoord(trackTileCol, trackTileRow){
	var trackIndex = trackTileCol + getCurrentTrackCols()*trackTileRow;
	return (trackGrid[trackIndex] == TRACK_WALL);
}

function rowColToArrayIndex(col, row) {
	return col + getCurrentTrackCols() * row;
}			

function getIndexAtPixelCoord(pixelX,pixelY){
	var tileCol = pixelX / TRACK_W;		
	var tileRow = pixelY / TRACK_H;
				
	tileCol = Math.floor(tileCol);
	tileRow = Math.floor(tileRow);
	return rowColToArrayIndex(tileCol,tileRow);
}

function pixelCoordToTrackCoords(pixelX, pixelY) {
	var tileCol = pixelX / TRACK_W;		
	var tileRow = pixelY / TRACK_H;
				
	tileCol = Math.floor(tileCol);
	tileRow = Math.floor(tileRow);

	return {col: tileCol, row:tileRow};
}

function trackCoordToPixelPos(col, row) {
	const xPos = col * TRACK_W;
	const yPos = row * TRACK_H;

	return {x:xPos, y:yPos};
}
			
function getTrackAtPixelCoord(pixelX,pixelY){
	const tileCoords = pixelCoordToTrackCoords(pixelX, pixelY);
	const tileCol = tileCoords.col;
	const tileRow = tileCoords.row;
				
	if(tileCol < 0 || tileCol >= getCurrentTrackCols() || tileRow < 0 || tileRow >= getCurrentTrackRows()) {
		return TRACK_WALL; // This returns Track Wall to prevent out of bounds as a wall.
	}
				
	var trackIndex = trackTileToIndex(tileCol, tileRow);
	return (trackGrid[trackIndex]);
}		

function getTileTypeAtPixelCoord(atX, atY) {
	var trackCol = Math.floor(atX / TRACK_W);
	var trackRow = Math.floor(atY / TRACK_H);
	var trackIndexUnderVehicle = rowColToArrayIndex(trackCol, trackRow);

	return trackIndexUnderVehicle;
}
			
function trackTileToIndex(tileCol, tileRow) {
	return(tileCol + getCurrentTrackCols()*tileRow);
}

function tileIndexToTileCoords(index) {
	const trackCol = index % getCurrentTrackCols();//remainder

	const trackRow = Math.floor(index / getCurrentTrackCols());

	return {col:trackCol, row:trackRow};
}

function tileIndexToPixelPos(index) {
	const tileCoords = tileIndexToTileCoords(index);

	return trackCoordToPixelPos(tileCoords.col, tileCoords.row);
}
			
