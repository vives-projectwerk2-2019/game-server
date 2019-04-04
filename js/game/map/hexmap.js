/*jshint esversion: 6 */

const Tile = require(__lib + '/game/map/tile.js');

class HexMap {
    constructor(configuration, jsonMap){
        this.tileSize = configuration.tileSize;
        this.xOffset = configuration.offset.x;
        this.yOffset = configuration.offset.y;
        this.width = configuration.size.width;
        this.length = configuration.size.length;
        this.tileGroup = this.loadTiles(configuration.tiles);  //holds the names of each tile specified in the json file, the index of each element corresponds to the numbers in the map of the json file
        this.jsonMap = jsonMap.map;
        this.body = this.generateMap();
    }

    loadTiles(tileList) {
        let tileGroup = [];
        tileList.forEach(element => {
            tileGroup.push(element.name);
        });
        return tileGroup;
    }

    generateMap() {
        let tileWidth = Math.sqrt(3) * (this.tileSize / 2);
        let tileHeight = ( 2 * (this.tileSize / 2) );
        let map = [];
        // console.log(this.width)
        for (let xIndex = 0; xIndex < this.width; xIndex++) {
            map[xIndex] = [];
            for (let yIndex = 0; yIndex < this.length; yIndex++) {
                let ySpacing = tileHeight * 0.75 * yIndex;
                if (yIndex%2 == 0) {
                    let xSpacing = (tileWidth * xIndex);
                    map[xIndex][yIndex] = new Tile(this.tileGroup[this.jsonMap[xIndex][yIndex]], xSpacing + this.xOffset, ySpacing + this.yOffset, this.oddrToCube(xIndex, yIndex), this.tileSize);
                } else {
                    let xSpacing = (tileWidth * xIndex) + (tileWidth /2);
                    map[xIndex][yIndex] = new Tile(this.tileGroup[this.jsonMap[xIndex][yIndex]], xSpacing + this.xOffset, ySpacing + this.yOffset, this.oddrToCube(xIndex, yIndex), this.tileSize);
                }
            }
        }
        return map;
    }
    
    cubeToOddr(cubePosition){
        var collum = cubePosition.x + (cubePosition.z - (cubePosition.z&1)) / 2;
        var row = cubePosition.z;
        return {x: collum, y: row};
    }

    oddrToCube(collum, row) {
        var x = collum - (row - (row&1)) / 2;
        var z = row;
        var y = -x-z;
        return {x: x, y: y, z: z};
    }

    getTile(position) {
        if (position.x < this.width && position.y < this.length && position.x >= 0 && position.y >= 0){
            return this.body[position.x][position.y];
        } else {
            console.log("out of bounds");
            return null;
        }
    }
    //will return a jsonMap with the width and length specified in the constructor
    generateDefaultMap(){
        let hexMap = this;
        let map = Array.apply(null, {length: hexMap.width}).map(Number.call, Number);
        map.forEach(function(element) {
            map[element] = Array.apply(null, {length: hexMap.length}).map(Number.call, function(){return 0;});
        });
        console.log(map);
        return map;
    }
}

module.exports = HexMap;