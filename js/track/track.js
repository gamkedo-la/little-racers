const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_GAP = 2;


const TRACK_CANVAS = document.createElement("canvas");
const TRACK_CONTEXT = TRACK_CANVAS.getContext('2d');
let terrainChanged = true;

var levelList = [];//[levelOne, levelTwo, levelThree];
var levelNow = 0;
const MAP_MANAGER = new MapManager();
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
const TRACK_ROAD_PITSTOP = 14;
const TRACK_ROAD_UP_ARROW = 15;
const TRACK_ROAD_DWN_ARROW = 16;
const TRACK_ROAD_LFT_ARROW = 17;
const TRACK_ROAD_RIT_ARROW = 18;
const TRACK_ROAD_OIL_SPOT = 19;
const TRACK_ROAD_H_CRACK1 = 20;
const TRACK_ROAD_H_CRACK2 = 21;
const TRACK_ROAD_LFT_TO_BOT = 22;
const TRACK_ROAD_V_CRACK1 = 23;
const TRACK_ROAD_V_CRACK2 = 24;
const TRACK_ROAD_TOP_TO_LFT = 25;
const TRACK_ROAD_TOP_TO_RIT = 26;
const TRACK_ROAD_BOT_TO_RIT = 27;
const TRACK_ROAD_TOP_STUB = 28;
const TRACK_ROAD_BOT_STUB = 29;
const TRACK_ROAD_RIT_STUB = 30;
const TRACK_ROAD_LFT_STUB = 31;

// 50 through 99 are dedicated for track obstacles
const TRACK_CONE = 50;
const TRACK_GRASS = 51;
const TRACK_OIL_SLICK = 52;
const TRACK_NORTH_RAMP = 53;
const TRACK_CASH = 54;
const TRACK_FUEL = 55;
const TRACK_OIL_BARREL = 56;
const TRACK_ICE_SLICK = 57;
const TRACK_KNOCKED_OVER_CONE = 60;
const TRACK_SOUTH_RAMP = 63;
const TRACK_WALL = 70;
const TRACK_EAST_RAMP = 73;
const TRACK_WEST_RAMP = 83;

// 100 through 149 are dedicated for wallSpriteSheet
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

//151 through 200 are dedicated for city objects
const TRACK_L_SHAPE_HOUSE_A = 151;
const TRACK_L_SHAPE_HOUSE_B = 152;
const TRACK_LONG_HOUSE_A = 153;
const TRACK_LONG_HOUSE_B = 154;
const TRACK_TOWN_RESIDENTIAL_ONE_A = 155;
const TRACK_TOWN_RESIDENTIAL_TWO_A = 156;
const TRACK_TOWN_OFFICE_BUILDING_ONE_A = 157;
const TRACK_TOWN_OFFICE_BUILDING_ONE_B = 158;

//155 TO 160 are available
const TRACK_L_SHAPE_HOUSE_C = 161;
const TRACK_L_SHAPE_HOUSE_D = 162;
const TRACK_LONG_HOUSE_C = 163;
const TRACK_LONG_HOUSE_D = 164;
const TRACK_TOWN_RESIDENTIAL_ONE_B = 165;
const TRACK_TOWN_RESIDENTIAL_TWO_B = 166;
const TRACK_TOWN_OFFICE_BUILDING_ONE_C = 167;
const TRACK_TOWN_OFFICE_BUILDING_ONE_D = 168;
const TRACK_L_SHAPE_HOUSE_E = 170;
const TRACK_SIDEWALK = 173;
const TRACK_TOWN_RESIDENTIAL_ONE_C = 175;
const TRACK_TOWN_RESIDENTIAL_TWO_C = 176;
const TRACK_TOWN_OFFICE_BUILDING_ONE_E = 177;
const TRACK_TOWN_OFFICE_BUILDING_ONE_F = 178;
const TRACK_TOWN_TREE_ONE = 190;
const TRACK_TOWN_TREE_TWO = 191;
const TRACK_TOWN_TREE_THREE = 192;
const TRACK_TOWN_TREE_FOUR = 193;
const TRACK_TOWN_TREE_FIVE = 194;
const TRACK_TOWN_TREE_SIX = 195;
const TRACK_TOWN_TREE_SEVEN = 196;
const TRACK_TOWN_TREE_EIGHT = 197;
const TRACK_TOWN_TREE_NINE = 198;
const TRACK_TOWN_TREE_TEN = 199;

//201 through 250 are dedicated for Lake tile set
const LAKE_GRASS_1 = 200;
const LAKE_TOP_LEFT_OUTER_1 = 201;
const LAKE_BANK_TOP = 202;
const LAKE_TOP_RIGHT_OUTER_1 = 203;
const LAKE_GRASS_2 = 204;
const LAKE_TOP_LEFT_OUTER_2 = 205;
const LAKE_TOP_LEFT_INNER = 206;
const LAKE_WATER_1 = 207;
const LAKE_TOP_RIGHT_INNER = 208;
const LAKE_TOP_RIGHT_OUTER_2 = 209;
const LAKE_BANK_LEFT = 210;
const LAKE_WATER_2 = 211;
const LAKE_WATER_3 = 212;
const LAKE_WATER_4 = 213;
const LAKE_BANK_RIGHT = 214;
const LAKE_BOT_LEFT_OUTER_1 = 215;
const LAKE_BOT_LEFT_INNER = 216;
const LAKE_WATER_5 = 217;
const LAKE_BOT_RIGHT_INNER = 218;
const LAKE_BOT_RIGHT_OUTER_1 = 219;
const LAKE_GRASS_3 = 220;
const LAKE_BOT_LEFT_OUTER_2 = 221;
const LAKE_BANK_BOTTOM = 222;
const LAKE_BOT_RIGHT_OUTER_2 = 223;
const LAKE_GRASS_4 = 224;
//226 through 250 are available

function getCurrentTrackCols() {
	return levelList[levelNow].cols;
}

function getCurrentTrackRows() {
	return levelList[levelNow].rows;
}

function resetLevel(){
 	terrainChanged = true;
	loadLevel(levelList[levelNow]);
	for (var i = 0; i < vehicleList.length; i++) {
		vehicleList[i].updateWayPoints();
	}
	updateState(STATE_PLAY);
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
	updateState(STATE_WIN_SCREEN);
}

function loadLevel(whichLevel) {
	trackGrid = whichLevel.data.slice();
	console.log("Load Level");
	//carPlaces = [];
	
	for (var i = 0; i < vehicleList.length; i++) {
		vehicleList[i].carReset(window['carPic'+(i+1)], 'Car '+(i+1), true);
	}
	trackMap.init();
	//randomizeIfItWillRain();
	//addRainToArray();
}

function drawTrackByCanvas(canvasContext) {
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

function drawTracks(canvasContext) {
	if(terrainChanged) {
		drawTracksByTile();
	} 

	drawTrackByCanvas(canvasContext);
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
		TRACK_CONTEXT.drawImage( roadSpriteSheet, TRACK_W, 0, TRACK_W, TRACK_H, tileData.x, tileData.y, TRACK_W, TRACK_H);
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
	} else if (trackTypeHere >= 150 && trackTypeHere < 200){
		spriteSheet = cityScapeSpriteSheet;
		trackTypeHere -= 150;
	} else if (trackTypeHere >= 200 && trackTypeHere < 250){
		spriteSheet = lakeSpriteSheet;
		trackTypeHere -= 200;
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
}

function tileTypeHasRoadTransparency(transparencyCheckTypeHere){
	 return (
			transparencyCheckTypeHere == TRACK_OIL_SLICK ||
			transparencyCheckTypeHere == TRACK_ICE_SLICK ||
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
			transparencyCheckTypeHere == TRACK_SOUTH_RAMP ||
			transparencyCheckTypeHere == TRACK_EAST_RAMP  ||
			transparencyCheckTypeHere == TRACK_WEST_RAMP ||
			transparencyCheckTypeHere == TRACK_ROAD_PITSTOP ||
			transparencyCheckTypeHere == TRACK_OIL_BARREL
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
			transparencyCheckTypeHere == TRACK_BRICK_WALL_RIGHT_GRASS ||
			transparencyCheckTypeHere == TRACK_L_SHAPE_HOUSE_A ||
			transparencyCheckTypeHere == TRACK_L_SHAPE_HOUSE_B ||
			transparencyCheckTypeHere == TRACK_L_SHAPE_HOUSE_C ||
			transparencyCheckTypeHere == TRACK_L_SHAPE_HOUSE_D ||
			transparencyCheckTypeHere == TRACK_L_SHAPE_HOUSE_E ||
			transparencyCheckTypeHere == TRACK_LONG_HOUSE_A ||
			transparencyCheckTypeHere == TRACK_LONG_HOUSE_B ||
			transparencyCheckTypeHere == TRACK_LONG_HOUSE_C ||
			transparencyCheckTypeHere == TRACK_LONG_HOUSE_D ||
			transparencyCheckTypeHere == TRACK_TOWN_RESIDENTIAL_ONE_A  ||
			transparencyCheckTypeHere == TRACK_TOWN_RESIDENTIAL_ONE_B  ||
			transparencyCheckTypeHere == TRACK_TOWN_RESIDENTIAL_ONE_C  ||
			transparencyCheckTypeHere == TRACK_TOWN_RESIDENTIAL_TWO_A  ||
			transparencyCheckTypeHere == TRACK_TOWN_RESIDENTIAL_TWO_B  ||
			transparencyCheckTypeHere == TRACK_TOWN_RESIDENTIAL_TWO_C  ||
			transparencyCheckTypeHere == TRACK_TOWN_TREE_ONE ||
			transparencyCheckTypeHere == TRACK_TOWN_TREE_TWO ||
			transparencyCheckTypeHere == TRACK_TOWN_TREE_THREE ||
			transparencyCheckTypeHere == TRACK_TOWN_TREE_FOUR ||
			transparencyCheckTypeHere == TRACK_TOWN_TREE_FIVE ||
			transparencyCheckTypeHere == TRACK_TOWN_TREE_SIX ||
			transparencyCheckTypeHere == TRACK_TOWN_TREE_SEVEN ||
			transparencyCheckTypeHere == TRACK_TOWN_TREE_EIGHT ||
			transparencyCheckTypeHere == TRACK_TOWN_TREE_NINE ||
			transparencyCheckTypeHere == TRACK_TOWN_TREE_TEN ||
			transparencyCheckTypeHere == TRACK_SIDEWALK ||
			transparencyCheckTypeHere == TRACK_TOWN_OFFICE_BUILDING_ONE_A ||
			transparencyCheckTypeHere == TRACK_TOWN_OFFICE_BUILDING_ONE_B ||
			transparencyCheckTypeHere == TRACK_TOWN_OFFICE_BUILDING_ONE_C ||
			transparencyCheckTypeHere == TRACK_TOWN_OFFICE_BUILDING_ONE_D ||
			transparencyCheckTypeHere == TRACK_TOWN_OFFICE_BUILDING_ONE_E ||
			transparencyCheckTypeHere == TRACK_TOWN_OFFICE_BUILDING_ONE_F 
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

function getTileEdgeDistances(atX, atY)
{
    trackCoord = pixelCoordToTrackCoords(atX, atY);
    trackPixelCoord = trackCoordToPixelPos(trackCoord.col, trackCoord.row);

    var west, north;

    west = atX - trackPixelCoord.x;
    east = TRACK_W - west;
    north = atY - trackPixelCoord.y;
    south = TRACK_H - north;

    return { north: north, south: south, west: west, east: east };
}

