(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }
 if(typeof module === 'object' && module && module.exports) {
  module.exports = data;
 }})("level3Test",
{ "height":15,
 "infinite":false,
 "layers":[
        {
         "data":[101, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 103, 51, 52, 52, 2, 2, 2, 2, 2, 2, 51, 2, 2, 2, 2, 2, 2, 2, 2, 2, 108, 51, 52, 52, 2, 2, 2, 2, 2, 2, 51, 2, 2, 2, 2, 2, 2, 2, 2, 2, 108, 51, 52, 52, 2, 2, 51, 51, 2, 2, 51, 2, 2, 52, 52, 52, 52, 51, 2, 2, 108, 104, 2, 2, 2, 2, 52, 52, 2, 2, 51, 2, 2, 52, 52, 51, 51, 51, 2, 2, 108, 104, 2, 2, 2, 2, 52, 52, 2, 2, 51, 2, 2, 52, 52, 51, 2, 2, 2, 2, 108, 104, 2, 2, 51, 52, 52, 52, 2, 2, 51, 2, 2, 52, 52, 51, 2, 2, 2, 2, 108, 104, 2, 2, 52, 52, 52, 52, 2, 2, 51, 2, 2, 52, 52, 51, 2, 2, 52, 52, 51, 104, 2, 2, 52, 52, 52, 52, 2, 2, 51, 2, 2, 52, 52, 51, 2, 2, 2, 2, 108, 104, 2, 2, 52, 52, 52, 52, 2, 2, 2, 2, 2, 52, 52, 51, 2, 2, 2, 2, 108, 104, 2, 2, 52, 52, 52, 51, 2, 2, 2, 2, 2, 51, 52, 51, 51, 51, 2, 2, 108, 104, 2, 2, 51, 52, 52, 51, 51, 51, 51, 51, 51, 51, 52, 52, 52, 51, 2, 2, 108, 104, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 108, 104, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 108, 105, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 107],
         "height":15,
         "id":1,
         "name":"Tile Layer 1",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":20,
         "x":0,
         "y":0
        }],
 "nextlayerid":2,
 "nextobjectid":1,
 "orientation":"orthogonal",
 "renderorder":"right-down",
 "tiledversion":"1.2.1",
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
        }],
 "tilewidth":40,
 "type":"map",
 "version":1.2,
 "width":20
});