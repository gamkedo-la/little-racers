(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }
 if(typeof module === 'object' && module && module.exports) {
  module.exports = data;
 }})("level1Test",
{ "compressionlevel":0,
 "height":30,
 "infinite":false,
 "layers":[
        {
         "data":[101, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 103, 104, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 57, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 108, 104, 2, 2, 2, 2, 2, 2, 56, 2, 2, 2, 2, 56, 2, 2, 2, 2, 2, 2, 57, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 108, 104, 2, 2, 51, 7, 8, 9, 51, 52, 52, 51, 52, 52, 52, 52, 52, 51, 2, 2, 52, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 108, 104, 2, 2, 52, 10, 11, 12, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 2, 2, 52, 2, 2, 52, 52, 52, 52, 52, 51, 51, 52, 52, 52, 52, 52, 2, 2, 2, 2, 2, 108, 104, 2, 2, 52, 13, 14, 2, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 2, 2, 52, 2, 2, 52, 52, 52, 52, 52, 51, 51, 52, 52, 52, 52, 52, 2, 2, 2, 2, 2, 108, 104, 53, 53, 52, 2, 2, 2, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 2, 2, 52, 2, 2, 52, 52, 52, 52, 52, 51, 51, 52, 52, 52, 52, 52, 2, 2, 2, 2, 2, 108, 104, 54, 54, 51, 2, 2, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 51, 5, 5, 52, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 108, 104, 2, 2, 52, 2, 2, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 64, 64, 52, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 108, 104, 2, 2, 2, 2, 2, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 2, 2, 52, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 108, 104, 2, 2, 2, 2, 51, 51, 51, 51, 51, 51, 52, 153, 154, 52, 52, 52, 2, 2, 52, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 108, 104, 2, 2, 51, 51, 2, 2, 15, 2, 2, 51, 52, 163, 164, 52, 52, 51, 2, 2, 52, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 108, 104, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 52, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 108, 104, 2, 2, 3, 1, 55, 1, 1, 1, 1, 1, 1, 56, 1, 2, 2, 2, 2, 1, 52, 2, 2, 52, 52, 52, 52, 52, 51, 51, 52, 52, 52, 52, 52, 2, 2, 2, 2, 2, 108, 104, 57, 57, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 57, 57, 52, 2, 2, 52, 52, 52, 52, 52, 51, 51, 52, 52, 52, 52, 52, 2, 2, 2, 2, 2, 108, 104, 1, 1, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 2, 2, 52, 2, 2, 52, 52, 52, 52, 52, 51, 51, 52, 52, 52, 52, 52, 2, 2, 2, 2, 2, 108, 104, 1, 1, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 2, 2, 52, 2, 2, 52, 52, 52, 52, 52, 51, 51, 52, 52, 52, 52, 52, 2, 2, 2, 2, 2, 108, 104, 1, 1, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 2, 2, 52, 2, 2, 52, 52, 52, 52, 52, 51, 51, 52, 52, 52, 52, 52, 2, 2, 2, 2, 2, 108, 104, 4, 4, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 2, 2, 52, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 108, 104, 53, 2, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 2, 2, 52, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 108, 104, 2, 2, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 2, 2, 52, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 108, 104, 2, 53, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 2, 2, 52, 2, 2, 52, 52, 52, 52, 52, 51, 51, 52, 52, 52, 52, 52, 2, 2, 2, 2, 2, 108, 104, 2, 54, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 2, 2, 52, 2, 2, 52, 52, 52, 52, 52, 51, 51, 52, 52, 52, 52, 52, 2, 2, 2, 2, 2, 108, 104, 2, 2, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 2, 2, 52, 2, 2, 52, 52, 52, 52, 52, 51, 51, 52, 52, 52, 52, 52, 2, 2, 2, 2, 2, 108, 104, 2, 2, 52, 151, 152, 52, 52, 52, 52, 151, 152, 52, 151, 152, 52, 52, 2, 2, 52, 2, 2, 52, 52, 52, 52, 52, 51, 51, 52, 52, 52, 52, 52, 2, 2, 2, 2, 2, 108, 104, 2, 2, 52, 161, 162, 52, 153, 154, 52, 161, 162, 52, 161, 162, 52, 52, 2, 2, 52, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 108, 104, 2, 2, 52, 171, 52, 52, 163, 164, 52, 171, 52, 52, 171, 52, 52, 52, 2, 2, 52, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 108, 104, 2, 2, 2, 2, 2, 2, 2, 2, 6, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 108, 104, 2, 2, 2, 2, 2, 2, 2, 2, 6, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 108, 105, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 107],
         "height":30,
         "id":1,
         "name":"Tile Layer 1",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":40,
         "x":0,
         "y":0
        }],
 "nextlayerid":3,
 "nextobjectid":1,
 "orientation":"orthogonal",
 "renderorder":"right-down",
 "tiledversion":"2019.07.24",
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
 "version":1.2,
 "width":40
});