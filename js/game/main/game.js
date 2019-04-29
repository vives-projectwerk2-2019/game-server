/*jshint esversion: 6 */

const HexMap = require(__lib + "/game/map/hexmap.js");
const PlayerList = require(__lib + "/game/players/playerlist.js");
const Tank = require(__lib + "/game/world_objects/tank.js");
const TurnHandler = require(__lib + "/game/main/turnhandler.js");
const AnimationEventList = require(__lib +
  "/game/animation/animationeventlist.js");

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
    if (this.allTanks.length < 8) {
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
    this.client.mqtt.sendToScoreboard(
      this.scoreboardJsonString(this.allTanks)
    );
  }

  scoreboardJsonString(tanks) {
    var payloadObj = {
      title: "Scoreboard",
      player1: {
        active: false,
        shortName: "",
        bars: [0, 0]
      },
      player2: {
        active: false,
        shortName: "",
        bars: [0, 0]
      },
      player3: {
        active: false,
        shortName: "",
        bars: [0, 0]
      },
      player4: {
        active: false,
        shortName: "",
        bars: [0, 0]
      }
    };

    if (tanks.length >= 1) {
      payloadObj.player1 = {
        active: true,
        shortName: tanks[0].username,
        bars: [tanks[0].health, tanks[0].armor]
      };
    }
    if (tanks.length >= 2) {
      payloadObj.player2 = {
        active: true,
        shortName: tanks[1].username,
        bars: [tanks[1].health, tanks[1].armor]
      };
    }
    if (tanks.length >= 3) {
      payloadObj.player3 = {
        active: true,
        shortName: tanks[2].username,
        bars: [tanks[2].health, tanks[2].armor]
      };
    }
    if (tanks.length >= 4) {
      payloadObj.player4 = {
        active: true,
        shortName: tanks[3].username,
        bars: [tanks[3].health, tanks[3].armor]
      };
    }
    return JSON.stringify(payloadObj);
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
