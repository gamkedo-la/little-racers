(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }
 if(typeof module === 'object' && module && module.exports) {
  module.exports = data;
 }})("deathArena",
{ "height":31,
 "infinite":false,
 "layers":[
        {
         "data":[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 101, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 101, 107, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 105, 103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 101, 107, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 105, 103, 2, 2, 2, 2, 2, 2, 2, 2, 101, 107, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 53, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 17, 2, 2, 2, 2, 2, 105, 103, 2, 2, 2, 2, 2, 2, 2, 104, 2, 2, 2, 2, 25, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 25, 2, 2, 2, 2, 2, 2, 2, 2, 17, 2, 2, 2, 2, 2, 2, 104, 2, 2, 2, 2, 2, 2, 2, 104, 2, 2, 2, 2, 53, 2, 2, 2, 2, 2, 2, 2, 2, 101, 103, 57, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 19, 19, 4, 18, 18, 2, 2, 2, 2, 104, 2, 2, 2, 2, 2, 2, 2, 104, 2, 2, 2, 2, 2, 101, 102, 102, 102, 102, 102, 102, 102, 102, 107, 57, 57, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 16, 2, 2, 2, 2, 2, 2, 104, 2, 2, 2, 2, 2, 2, 2, 104, 2, 2, 2, 2, 101, 107, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 16, 2, 2, 2, 2, 2, 2, 104, 28, 2, 2, 2, 2, 2, 2, 104, 2, 2, 2, 101, 107, 2, 2, 21, 2, 2, 2, 2, 2, 2, 2, 2, 2, 28, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 26, 26, 2, 104, 2, 2, 2, 2, 2, 2, 2, 104, 2, 2, 2, 104, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 24, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 104, 2, 2, 2, 2, 2, 2, 2, 104, 2, 2, 2, 104, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 28, 2, 58, 2, 2, 2, 2, 24, 57, 101, 103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 28, 2, 104, 2, 2, 2, 2, 2, 2, 2, 104, 2, 2, 2, 104, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 29, 2, 2, 2, 2, 2, 2, 2, 2, 105, 107, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 104, 2, 2, 2, 2, 2, 2, 2, 104, 2, 2, 2, 104, 2, 2, 2, 2, 2, 17, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 104, 2, 2, 2, 2, 2, 2, 2, 104, 2, 2, 2, 104, 2, 2, 2, 2, 2, 17, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 104, 2, 2, 2, 2, 2, 2, 2, 104, 2, 2, 2, 104, 2, 2, 2, 19, 19, 6, 18, 18, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 51, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 104, 2, 2, 2, 2, 2, 2, 2, 104, 2, 2, 2, 104, 2, 2, 2, 2, 2, 16, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 104, 2, 2, 2, 2, 2, 2, 2, 104, 2, 2, 2, 104, 2, 21, 2, 2, 2, 16, 2, 2, 2, 2, 2, 53, 2, 2, 2, 2, 2, 2, 2, 58, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 104, 2, 2, 2, 2, 2, 2, 2, 104, 2, 2, 2, 104, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 24, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 17, 2, 2, 2, 2, 2, 2, 2, 2, 2, 104, 2, 2, 2, 2, 2, 2, 2, 104, 1, 1, 1, 104, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 23, 2, 2, 2, 2, 23, 17, 2, 2, 2, 2, 2, 2, 2, 2, 2, 104, 2, 2, 2, 2, 2, 2, 2, 104, 1, 1, 1, 104, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 19, 19, 5, 18, 18, 2, 2, 2, 2, 2, 2, 2, 104, 2, 2, 2, 2, 2, 2, 2, 104, 1, 1, 2, 104, 2, 2, 24, 2, 2, 2, 2, 2, 2, 2, 57, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 16, 2, 2, 2, 2, 2, 2, 2, 2, 2, 104, 2, 2, 2, 2, 2, 2, 2, 104, 2, 2, 2, 105, 103, 2, 27, 2, 2, 2, 26, 2, 2, 2, 101, 103, 64, 64, 64, 101, 103, 2, 2, 2, 2, 2, 2, 2, 2, 16, 2, 2, 2, 2, 2, 2, 2, 2, 2, 104, 2, 2, 2, 2, 2, 2, 22, 104, 26, 2, 2, 2, 105, 103, 2, 2, 2, 2, 2, 2, 2, 2, 108, 107, 53, 53, 53, 105, 108, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 104, 2, 2, 2, 2, 2, 2, 2, 104, 2, 2, 2, 2, 2, 105, 103, 55, 57, 2, 2, 2, 2, 101, 107, 2, 2, 2, 2, 2, 108, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 104, 2, 2, 2, 2, 2, 2, 2, 105, 103, 51, 51, 2, 2, 2, 105, 106, 106, 106, 106, 106, 106, 107, 2, 2, 2, 2, 2, 2, 105, 103, 2, 21, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 27, 23, 2, 101, 107, 2, 2, 2, 2, 2, 2, 2, 2, 105, 103, 2, 8, 10, 12, 14, 2, 3, 15, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 57, 105, 103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 26, 101, 107, 2, 2, 2, 2, 2, 2, 2, 27, 2, 2, 105, 103, 7, 9, 11, 13, 2, 3, 15, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 55, 56, 105, 103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 57, 57, 101, 107, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 105, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 105, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 107, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
         "height":31,
         "id":4,
         "name":"Race Track",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":48,
         "x":0,
         "y":0
        }, 
        {
         "color":"#ff0000",
         "draworder":"topdown",
         "id":2,
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
                 "x":139,
                 "y":597
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
                 "x":157,
                 "y":282
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
                 "x":329.667,
                 "y":173.333
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
                 "x":638.333,
                 "y":168.667
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
                 "x":1378.67,
                 "y":272.667
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
                 "x":1257.67,
                 "y":836.333
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
                 "x":459,
                 "y":636.667
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
                 "x":778,
                 "y":876
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
                 "x":732,
                 "y":1070
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
                 "x":302,
                 "y":1096
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
                 "x":139,
                 "y":909
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
         "id":3,
         "name":"Placement Waypoints",
         "objects":[
                {
                 "height":0,
                 "id":9,
                 "name":"",
                 "point":true,
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":222.667,
                 "y":1118.67
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
                 "x":224.334,
                 "y":1070
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
                 "x":258,
                 "y":1119
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
                 "x":258,
                 "y":1071
                }],
         "opacity":1,
         "type":"objectgroup",
         "visible":true,
         "x":0,
         "y":0
        }],
 "nextlayerid":5,
 "nextobjectid":23,
 "orientation":"orthogonal",
 "renderorder":"right-down",
 "tiledversion":"1.2.4",
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
         "source":"..\/..\/maps\/lake.tsx"
        }, 
        {
         "firstgid":201,
         "source":"..\/..\/maps\/city.tsx"
        }],
 "tilewidth":40,
 "type":"map",
 "version":1.2,
 "width":48
});