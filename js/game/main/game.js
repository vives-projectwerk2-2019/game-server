/*jshint esversion: 6 */

const HexMap = require(__lib + "/game/map/hexmap.js");
const PlayerList = require(__lib + "/game/players/playerlist.js");
const Tank = require(__lib + "/game/world_objects/tank.js");
const TurnHandler = require(__lib + "/game/main/turnhandler.js");
const AnimationEventList = require(__lib + "/game/animation/animationeventList.js");

class Game {
  constructor(gameConfiguration, mapConfiguration, jsonMap, client) {
    this.client = client;
    this.map = new HexMap(mapConfiguration, jsonMap);
    this.count = [0, 0, 0, 0, 0, 0, 0, 0];
    this.spawnTilesOccupiedX = [0, 0, 0, 0, 0, 0, 0, 0];
    this.spawnTilesOccupiedY = [0, 0, 0, 0, 0, 0, 0, 0];
    this.spawnTiles = [];
    this.tankValues = 0;
    this.colors = [
      "tankblack",
      "tankblue",
      "tankcyan",
      "tankgreen",
      "tankgrey",
      "tankpurple",
      "tankred",
      "tankyellow"
    ];
    this.allTanks = [];
    this.setSpawnTiles();
    this.playerList = new PlayerList();
    this.animationEventList = new AnimationEventList();
    this.turnHandler = new TurnHandler(
      gameConfiguration,
      () => this.run(),
      () => this.onTurnEnd(),
      client.mqtt
    );
  }
  createTank(receivedMessage) {
    this.dataInput = receivedMessage;

    this.tankValues++;
    let tankName = this.dataInput.Player.username;
    let newTank = new Tank(
      this.map,
      this.spawnTileX(),
      this.spawnTileY(),
      45,
      this.selectTankColor(),
      this.dataInput.Controller.addons,
      this.dataInput.Player.username
    );
    this.allTanks.push(newTank);
    return newTank;
  }
  //expects string color and object spawnPosition {x: int, y: int} returns an object tank
  //   createTank(color, spawnPosition) {
  //     return new Tank(this.map, spawnPosition.x, spawnPosition.y, 40, null); //read size from config file and occupy addons with something usefull
  //   }

  run() {
    //console.log(this.turnHandler.getTimeLeft(1));
    //console.log(JSON.stringify(this.playerList.json()));
    //this.client.update(JSON.stringify({timeLeft: this.turnHandler.getTimeLeft(0)}));
  }

  onTurnEnd() {
    this.client.update(
      JSON.stringify({
        turn: this.turnHandler.turn,
        players: this.playerList.json(),
        animationEvents: this.animationEventList.json()
      })
    );
    this.animationEventList.clear();
    this.playerList.players.forEach(player => {
      player.moved = false;
    });
    try {
      this.postScoreboard(this.allTanks);
    }
    catch(err) {
       console.log("Could not connect to image display");
    }
  }

  postScoreboard(tanks) {
    var bodyObj = {};
    bodyObj.title = "Scoreboard";
    if (tanks.length == 1) {
      bodyObj.player1 = {
        active: true,
        shortName: tanks[0].username,
        bars: [tanks[0].health, tanks[0].armor]
      }
    }
    if (tanks.length == 2) {
      bodyObj.player2 = {
        active: true,
        shortName: tanks[1].username,
        bars: [tanks[1].health, tanks[1].armor]
      };
    }
    if (tanks.length == 3) {
      bodyObj.player3 = {
        active: true,
        shortName: tanks[2].username,
        bars: [tanks[2].health, tanks[2].armor]
      };
    }
    if (tanks.length >= 4) {
      bodyObj.player4 = {
        active: true,
        shortName: tanks[3].username,
        bars: [tanks[3].health, tanks[3].armor]
      };
    }
    var http = require('http');

    var options = {
      host: '172.16.101.167',
      port: '8080',
      path: '/',
      method: 'POST',
      headers: {
        'User-Agent':   'Yeet/0.0.1',
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options);
    req.write(JSON.stringify(bodyObj));
    req.end();
  }

  selectTankColor() {
    for (let i = 0; i < 8; i++) {
      const element = this.count[i];
      if (element == 0) {
        this.count[i]++;
        return this.colors[i];
      }
    }
  }

  setSpawnTiles() {
    for (let x = 0; x < this.map.jsonMap.length; x++) {
      const element = this.map.jsonMap[x];
      for (let y = 0; y < element.length; y++) {
        const tileValue = element[y];
        if (tileValue == 4) {
          //console.log(x);
          //console.log(y);
          this.spawnTiles.push([x, y]);
        }
      }
      //console.log(spawnTiles);
    }
  }

  spawnTileX() {
    //console.log(spawnTiles);
    for (let i = 0; i < this.spawnTiles.length; i++) {
      const element = this.spawnTiles[i];
      if (!this.spawnTilesOccupiedX[i]) {
        this.spawnTilesOccupiedX[i]++;
        //console.log(element);
        return element[0];
      }
    }
  }

  spawnTileY() {
    for (let i = 0; i < this.spawnTiles.length; i++) {
      const element = this.spawnTiles[i];
      if (!this.spawnTilesOccupiedY[i]) {
        this.spawnTilesOccupiedY[i]++;
        //console.log(element);
        return element[1];
      }
    }
  }
}
module.exports.variableName = "variableValue";
module.exports = Game;
