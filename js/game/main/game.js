/*jshint esversion: 6 */
count = [0, 0, 0, 0, 0, 0, 0, 0];
spawnTilesOccupiedX = [0, 0, 0, 0, 0, 0, 0, 0];
spawnTilesOccupiedY = [0, 0, 0, 0, 0, 0, 0, 0];
var spawnTiles = [];
tankValues = 0;
var colors = [
  "tankblack",
  "tankblue",
  "tankcyan",
  "tankgreen",
  "tankgrey",
  "tankpurple",
  "tankred",
  "tankyellow"
];
var allTanks = [null];
const HexMap = require(__lib + "/game/map/hexmap.js");
const PlayerList = require(__lib + "/game/players/playerlist.js");
const Tank = require(__lib + "/game/world_objects/tank.js");
const TurnHandler = require(__lib + "/game/main/turnhandler.js");

class Game {
  constructor(gameConfiguration, mapConfiguration, jsonMap, client) {
    this.client = client;
    this.map = new HexMap(mapConfiguration, jsonMap);
    this.playerList = new PlayerList();
    this.turnHandler = new TurnHandler(
      gameConfiguration,
      () => this.run(),
      () => this.onTurnEnd(),
      client.mqtt
    );
  }
  createTank(receivedMessage) {
    this.dataInput = receivedMessage;

    if (!this.dataInput.Player.joined) {
      tankValues++;
      let tankName = this.dataInput.Player.username;
      allTanks.push(this.tankName);
      return new Tank(
        this.selectTankColor(),
        this,
        this.map,
        this.spawnTileX(),
        this.spawnTileY(),
        45,
        tankName
      );
    }
  }
  //expects string color and object spawnPosition {x: int, y: int} returns an object tank
  createTank(color, spawnPosition) {
    return new Tank(this.map, spawnPosition.x, spawnPosition.y, 40, null); //read size from config file and occupy addons with something usefull
  }

  run() {
    //console.log(this.turnHandler.getTimeLeft(1));
    //console.log(JSON.stringify(this.playerList.json()));
    //this.client.update(JSON.stringify({timeLeft: this.turnHandler.getTimeLeft(0)}));
  }

  onTurnEnd() {
    this.client.update(
      JSON.stringify({
        turn: this.turnHandler.turn,
        players: this.playerList.json()
      })
    );
    this.playerList.players.forEach(player => {
      player.moved = false;
    });
  }
  selectTankColor() {
    for (let i = 0; i < 8; i++) {
      const element = count[i];
      if (element == 0) {
        count[i]++;
        return colors[i];
      }
    }
  }

  setSpawnTiles() {
    for (let x = 0; x < this.map.jsonMap.length; x++) {
      const element = this.map.jsonMap[x];
      for (let y = 0; y < element.length; y++) {
        const tileValue = element[y];
        if (tileValue == 4) {
          spawnTiles.push([x, y]);
        }
      }
    }
  }
  spawnTileX() {
    //console.log(spawnTiles);
    for (let i = 0; i < spawnTiles.length; i++) {
      const element = spawnTiles[i];
      if (!spawnTilesOccupiedX[i]) {
        spawnTilesOccupiedX[i]++;
        //console.log(element);
        return element[0];
      }
    }
  }
  spawnTileY() {
    for (let i = 0; i < spawnTiles.length; i++) {
      const element = spawnTiles[i];
      if (!spawnTilesOccupiedY[i]) {
        spawnTilesOccupiedY[i]++;
        //console.log(element);
        return element[1];
      }
    }
  }
}

module.exports = Game;
