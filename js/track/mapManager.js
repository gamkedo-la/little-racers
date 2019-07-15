const MAPS_TO_LOAD = [
	'level1WaypointTest'
	// 'level1Test',
	// 'OneBigTrack',
	// 'level2Test',
	// 'level3Test'
];

//MapManager
function MapManager() {
	function processData(data) {
		const processedData = [];
		for(let i = 0; i < data.length; i++) {
			processedData.push(data[i] - 1);
		}

		return processedData;
	}

	for(let i = 0; i < MAPS_TO_LOAD.length; i++) {
		levelList.push({
			cols:TileMaps[MAPS_TO_LOAD[i]].width,
			rows:TileMaps[MAPS_TO_LOAD[i]].height,
			data:processData(TileMaps[MAPS_TO_LOAD[i]].layers[0].data),
			wayPointsX: [],
			wayPointsY: [],
			placementWayPointsX: [],
			placementWayPointsY: []
		});
		let numOfWayPoints = TileMaps[MAPS_TO_LOAD[i]].layers[1].objects.length;
		for (let j = 0; j < numOfWayPoints; j++) {
			let wayPoint = TileMaps[MAPS_TO_LOAD[i]].layers[1].objects[j];
			levelList[i].wayPointsX.push(wayPoint.x);
			levelList[i].wayPointsY.push(wayPoint.y);
		}
		numOfWayPoints = TileMaps[MAPS_TO_LOAD[i]].layers[2].objects.length;
		for (let j = 0; j < numOfWayPoints; j++) {
			let wayPoint = TileMaps[MAPS_TO_LOAD[i]].layers[2].objects[j];
			levelList[i].placementWayPointsX.push(wayPoint.x);
			levelList[i].placementWayPointsY.push(wayPoint.y);
		}
	}
}