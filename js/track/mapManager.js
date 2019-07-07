//MapManager
function MapManager() {
	const PATH_TO_MAPS = '/js/track/';
	const MAPS_TO_LOAD = [
		'level1Test',
		'OneBigTrack',
		'level2Test',
		'level3Test'
	];

	function loadJSON(callback) {
		for(let i = 0; i < MAPS_TO_LOAD.length; i++) {
			const xobj = new XMLHttpRequest();
			xobj.overrideMimeType("application/json");
			
			xobj.open('GET', (PATH_TO_MAPS + MAPS_TO_LOAD[i] + '.json'), true); 
			xobj.onreadystatechange = function () {
				if (xobj.readyState == 4 && xobj.status == "200") {
					// Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
					callback(xobj.responseText, i);
				}
			};

			xobj.send(null);
		}
	}

	function processData(data) {
		const processedData = [];
		for(let i = 0; i < data.length; i++) {
			processedData.push(data[i] - 1);
		}

		return processedData;
	}

	this.loadLevels = function() {
		loadJSON(function (response, index) {
			var actual_JSON = JSON.parse(response);
			levelList.splice(index, 0, {//files are loaded asynchronously, so need to insert to ensure correct order
				cols:actual_JSON.width,
				rows:actual_JSON.height,
				data:processData(actual_JSON.layers[0].data)
			});
		});
	}
}