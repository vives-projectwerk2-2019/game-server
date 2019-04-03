/*jshint esversion: 6 */

class Tile {
    constructor(type, x, y, cubePosition, size){
        this.type = type;
        this.position = {x: x, y: y};
        this.cubePosition = cubePosition;
        this.size = size;
    }
}

module.exports = Tile;