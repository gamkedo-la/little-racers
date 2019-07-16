(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }
 if(typeof module === 'object' && module && module.exports) {
  module.exports = data;
 }})("level2WaypointTest",
{ "height":15,
 "infinite":false,
 "layers":[
        {
         "data":[101, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 103, 104, 2, 2, 2, 2, 2, 2, 2, 2, 51, 2, 2, 2, 2, 2, 2, 2, 2, 2, 108, 104, 2, 2, 2, 2, 2, 2, 2, 2, 51, 2, 2, 2, 2, 2, 2, 2, 2, 2, 108, 104, 2, 2, 51, 52, 52, 52, 2, 2, 51, 2, 2, 52, 52, 52, 52, 51, 2, 2, 108, 104, 2, 2, 52, 52, 52, 52, 2, 2, 51, 2, 2, 52, 52, 52, 52, 52, 2, 2, 108, 104, 2, 2, 52, 52, 52, 52, 2, 2, 51, 2, 2, 52, 52, 52, 52, 52, 2, 2, 108, 104, 2, 2, 52, 52, 52, 52, 2, 2, 5, 2, 2, 52, 52, 52, 52, 52, 2, 2, 108, 104, 4, 4, 51, 51, 51, 51, 2, 2, 5, 2, 2, 51, 51, 51, 51, 51, 2, 2, 108, 104, 2, 2, 7, 8, 9, 51, 51, 51, 51, 51, 51, 51, 52, 52, 52, 52, 2, 2, 108, 104, 2, 2, 10, 11, 12, 52, 52, 52, 51, 52, 52, 52, 52, 52, 52, 52, 2, 2, 108, 104, 1, 1, 13, 14, 52, 52, 52, 52, 51, 52, 52, 52, 52, 52, 52, 52, 2, 2, 108, 104, 1, 1, 51, 52, 52, 52, 52, 52, 51, 52, 52, 52, 52, 52, 52, 51, 2, 2, 108, 104, 1, 1, 3, 2, 2, 2, 2, 2, 6, 2, 2, 2, 2, 2, 2, 2, 2, 2, 108, 104, 1, 1, 3, 2, 2, 2, 2, 2, 6, 2, 2, 2, 2, 2, 2, 2, 2, 2, 108, 105, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 107],
         "height":15,
         "name":"Race Track",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":20,
         "x":0,
         "y":0
        }, 
        {
         "color":"#ff0000",
         "draworder":"topdown",
         "name":"Race Waypoints",
         "objects":[
                {
                 "height":0,
                 "id":1,
                 "name":"",
                 "point":true,
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":82.6666666666667,
                 "y":165.333333333333
                }, 
                {
                 "height":0,
                 "id":2,
                 "name":"",
                 "point":true,
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":161.333333333333,
                 "y":82.6666666666667
                }, 
                {
                 "height":0,
                 "id":3,
                 "name":"",
                 "point":true,
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":258.666666666667,
                 "y":82.6666666666667
                }, 
                {
                 "height":0,
                 "id":4,
                 "name":"",
                 "point":true,
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":318.666666666667,
                 "y":161.333333333333
                }, 
                {
                 "height":0,
                 "id":5,
                 "name":"",
                 "point":true,
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":318.666666666667,
                 "y":226.666666666667
                }, 
                {
                 "height":0,
                 "id":6,
                 "name":"",
                 "point":true,
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":374.666666666667,
                 "y":286.666666666667
                }, 
                {
                 "height":0,
                 "id":7,
                 "name":"",
                 "point":true,
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":440,
                 "y":220
                }, 
                {
                 "height":0,
                 "id":8,
                 "name":"",
                 "point":true,
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":438.666666666667,
                 "y":158.666666666667
                }, 
                {
                 "height":0,
                 "id":9,
                 "name":"",
                 "point":true,
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":509.333333333333,
                 "y":86.6666666666667
                }, 
                {
                 "height":0,
                 "id":10,
                 "name":"",
                 "point":true,
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":662.666666666667,
                 "y":86.6666666666667
                }, 
                {
                 "height":0,
                 "id":11,
                 "name":"",
                 "point":true,
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":718.666666666667,
                 "y":160
                }, 
                {
                 "height":0,
                 "id":12,
                 "name":"",
                 "point":true,
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":721.333333333333,
                 "y":460
                }, 
                {
                 "height":0,
                 "id":13,
                 "name":"",
                 "point":true,
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":658.666666666667,
                 "y":522.666666666667
                }, 
                {
                 "height":0,
                 "id":14,
                 "name":"",
                 "point":true,
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":380,
                 "y":521.333333333333
                }, 
                {
                 "height":0,
                 "id":15,
                 "name":"",
                 "point":true,
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":182.666666666667,
                 "y":524
                }, 
                {
                 "height":0,
                 "id":16,
                 "name":"",
                 "point":true,
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":78.6666666666667,
                 "y":438.666666666667
                }, 
                {
                 "height":0,
                 "id":17,
                 "name":"",
                 "point":true,
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":82.6666666666667,
                 "y":301.333333333333
                }],
         "opacity":1,
         "type":"objectgroup",
         "visible":true,
         "x":0,
         "y":0
        }, 
        {
         "color":"#ffffff",
         "draworder":"topdown",
         "name":"Placement Waypoints",
         "objects":[
                {
                 "height":0,
                 "id":18,
                 "name":"",
                 "point":true,
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":80,
                 "y":478.666666666667
                }, 
                {
                 "height":0,
                 "id":19,
                 "name":"",
                 "point":true,
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":138.666666666667,
                 "y":324
                }],
         "opacity":1,
         "type":"objectgroup",
         "visible":true,
         "x":0,
         "y":0
        }],
 "nextobjectid":20,
 "orientation":"orthogonal",
 "renderorder":"right-down",
 "tiledversion":"1.1.2",
 "tileheight":40,
 "tilesets":[
        {
         "firstgid":1,
         "source":"..\/..\/maps\/road.tsx"
        }, 
        {
         "firstgid":51,
         "source":"..\/..\/maps\/obstacles.tsx"
        }, 
        {
         "firstgid":101,
         "source":"..\/..\/maps\/wall.tsx"
        }, 
        {
         "firstgid":151,
         "source":"..\/..\/maps\/city.tsx"
        }],
 "tilewidth":40,
 "type":"map",
 "version":1,
 "width":20
});