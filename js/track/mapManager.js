const MAPS_TO_LOAD = [
    
	'level1WaypointTest',
    'level2WaypointTest',
	'deathArena', // a big open battle area
	'guerrillaLevel', // Simon's epic level
	'level3WaypointTest',
	'level4WaypointTest'
];

//MapManager
function MapManager() {
	function processData(data) {
        if (!data) { 
            console.log("ERROR: empty map data. Nothing to process."); 
            return;
        }
		const processedData = [];
		for(let i = 0; i < data.length; i++) {
			processedData.push(data[i] - 1);
		}

		return processedData;
	}

	for(let i = 0; i < MAPS_TO_LOAD.length; i++) {
        console.log("Parsing map data: " + MAPS_TO_LOAD[i]);
        
        var looksgood = true;
        // do some quick data integrity checks
        if (!TileMaps[MAPS_TO_LOAD[i]]) {
            console.log("ERROR: missing map data. Skipping map.");
            looksgood = false;
        }
        console.log("Map layer count: " + TileMaps[MAPS_TO_LOAD[i]].layers.length);        
        if (TileMaps[MAPS_TO_LOAD[i]].layers.length != 3) {
            console.log("ERROR: we need 3 layers, skipping map.");
            looksgood = false;
        }

        // looks good, let's process
        if (looksgood) {
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
                if (!levelList[i]) console.log("ERROR?!? levelList["+i+"] is undefined.");
                levelList[i].wayPointsX.push(wayPoint.x);
                levelList[i].wayPointsY.push(wayPoint.y);
            }
            numOfWayPoints = TileMaps[MAPS_TO_LOAD[i]].layers[2].objects.length;
            for (let j = 0; j < numOfWayPoints; j++) {
                let wayPoint = TileMaps[MAPS_TO_LOAD[i]].layers[2].objects[j];
                levelList[i].placementWayPointsX.push(wayPoint.x);
                levelList[i].placementWayPointsY.push(wayPoint.y);
            }
        } // looked good?
        else { // we ignored invalid data
            // FIXME - is a bad map comes FIRST, i is wrong for waypoints
        }

	}
}