/*jshint esversion: 6 */
const TankTerrain = require(__lib + "/game/map/terrain.js");

class HexMover {
  constructor(map, x, y) {
    this.map = map;
    this.currentTile = this.map.getTile({ x: x, y: y });
    this.previousRotation = this.currentPosition;
    this.currentPosition = this.updateCurrentPosition();
    this.currentRotation = 1;
    this.weapons = {
      // base weapon always equiped
      weaponName: ["gatling gun"],
      weaponDamage: [4],
      weaponRange: [20]
    };
    this.addons = [null, null, null];
    this.addonUses = [0, 0, 0, 0];
    this.health = 20;
    this.canEnterWater = false;
    this.tankMovementRange = 1;
  }

  //movement
  forward() {
    let newCubeLocation = {};

    if (this.currentRotation == 1) {
      //y ==, z-1,x+1
      newCubeLocation = {
        x: this.currentTile.cubePosition.x + 1,
        y: this.currentTile.cubePosition.y,
        z: this.currentTile.cubePosition.z - 1
      };
    } else if (this.currentRotation == 2) {
      //y - 1, z ==; x + 1
      newCubeLocation = {
        x: this.currentTile.cubePosition.x + 1,
        y: this.currentTile.cubePosition.y - 1,
        z: this.currentTile.cubePosition.z
      };
    } else if (this.currentRotation == 3) {
      //y - 1, z + 1, x ==
      newCubeLocation = {
        x: this.currentTile.cubePosition.x,
        y: this.currentTile.cubePosition.y + 1,
        z: this.currentTile.cubePosition.z + 1
      };
    } else if (this.currentRotation == 4) {
      //y ==, z + 1, x - 1
      newCubeLocation = {
        x: this.currentTile.cubePosition.x - 1,
        y: this.currentTile.cubePosition.y,
        z: this.currentTile.cubePosition.z + 1
      };
    } else if (this.currentRotation == 5) {
      //y +1, z ==, x -1
      newCubeLocation = {
        x: this.currentTile.cubePosition.x - 1,
        y: this.currentTile.cubePosition.y + 1,
        z: this.currentTile.cubePosition.z
      };
    } else if (this.currentRotation == 6) {
      //y + 1, z - 1, x ==
      newCubeLocation = {
        x: this.currentTile.cubePosition.x,
        y: this.currentTile.cubePosition.y + 1,
        z: this.currentTile.cubePosition.z - 1
      };
    }
/*
    let nextTile = TankTerrain.getNextTileType(this.map.cubeToOddr(newCubeLocation), this.map.jsonMap);
    let tankPath = TankTerrain.setTankPathState(nextTile);
    if(tankPath == tankPathEnum.UNBLOCKED) { */
        let newPosition = this.map.cubeToOddr(newCubeLocation);
        this.setPosition(newPosition.x, newPosition.y);
/*  }	*/
  }

  backward() {
    let newCubeLocation = {};

    if (this.currentRotation == 1) {
      //y ==, z-1,x+1
      newCubeLocation = {
        x: this.currentTile.cubePosition.x - 1,
        y: this.currentTile.cubePosition.y,
        z: this.currentTile.cubePosition.z + 1
      };
    } else if (this.currentRotation == 2) {
      //y - 1, z ==; x + 1
      newCubeLocation = {
        x: this.currentTile.cubePosition.x - 1,
        y: this.currentTile.cubePosition.y + 1,
        z: this.currentTile.cubePosition.z
      };
    } else if (this.currentRotation == 3) {
      //y - 1, z + 1, x ==
      newCubeLocation = {
        x: this.currentTile.cubePosition.x,
        y: this.currentTile.cubePosition.y - 1,
        z: this.currentTile.cubePosition.z - 1
      };
    } else if (this.currentRotation == 4) {
      //y ==, z + 1, x - 1
      newCubeLocation = {
        x: this.currentTile.cubePosition.x + 1,
        y: this.currentTile.cubePosition.y,
        z: this.currentTile.cubePosition.z - 1
      };
    } else if (this.currentRotation == 5) {
      //y +1, z ==, x -1
      newCubeLocation = {
        x: this.currentTile.cubePosition.x + 1,
        y: this.currentTile.cubePosition.y - 1,
        z: this.currentTile.cubePosition.z
      };
    } else if (this.currentRotation == 6) {
      //y + 1, z - 1, x ==
      newCubeLocation = {
        x: this.currentTile.cubePosition.x,
        y: this.currentTile.cubePosition.y - 1,
        z: this.currentTile.cubePosition.z + 1
      };
    }
/*
    let nextTile = TankTerrain.getNextTileType(this.map.cubeToOddr(newCubeLocation), this.map.jsonMap);
    let tankPath = TankTerrain.setTankPathState(nextTile);
    if(tankPath == tankPathEnum.UNBLOCKED) { */
        let newPosition = this.map.cubeToOddr(newCubeLocation);
        this.setPosition(newPosition.x, newPosition.y);
/*  }	*/
  }

  left() {
    if (this.currentRotation != 1) {
      this.currentRotation = this.currentRotation - 1;
    } else {
      this.currentRotation = 6;
    }
  }

  right() {
    if (this.currentRotation != 6) {
      this.currentRotation = this.currentRotation + 1;
    } else {
      this.currentRotation = 1;
    }
  }

  setPosition(x, y) {
    if (this.map.getTile({ x: x, y: y })) {
      this.currentTile = this.map.getTile({ x: x, y: y });
      this.currentPosition = this.updateCurrentPosition();
    }
  }

  updateCurrentPosition() {
    return this.map.cubeToOddr(this.currentTile.cubePosition);
  }
}

module.exports = HexMover;
