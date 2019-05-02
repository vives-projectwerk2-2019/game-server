/*jshint esversion: 6 */

class UserInputHandler {
  constructor(game, mqtt) {
    this.game = game;
    this.mqtt = mqtt;
    this.joinedPlayers = [];
    this.addonhashes = [
      "01a2f560d6df03bb",
      "0140c29c8357f2ce",
      "0155cf8199f0245b",
      "016bc4464286f3fb",
      "0148eef363dff533",
      "0164a54798d7d27a",
      "0136edcaaf285d1d",
      "011d5ba90ce241e6",
      "01a2eb344edc7c5a",
      "01d9643e2bf10134",
      "0100548e2b3038f5",
      "01ff7ab8c2155e57",
      "0122e76e424f7c79",
      "01f94b5e5d4277b5"
    ];
    this.addonNames = [
      "rocketEngine",
      "amphibious",
      "harrier",
      "adamantium",
      "gravyShield",
      "nanobots",
      "structuralStrengthening",
      "Flammenwerpfer",
      "laser",
      "mines",
      "plasmaGun",
      "empBomb",
      "ram",
      "gatling gun"
    ];
  }

  //expects a json string, will a json object if the given string is a valid json or else null
  parseJson(json) {
    try {
      return JSON.parse(json);
    } catch (error) {
      return null;
    }
  }

  //expects a string topic and a json string message, will determine what to update in the game state with the given input
  //special case: if the given player name does not exist yet, will create this new player and will ignore this new players movement input for that instance
  onUserGameInput(topic, message) {
    let input = this.parseJson(message);
    console.log(`[Broker] received message (topic: ${topic})`);
    // console.log(input);
    if (input) {
      if (topic == this.mqtt.adminTopic) {
        this.handleAdminInput(input);
      }
    } else if (topic == this.mqtt.topics.replicated) {
      this.mqtt.log("the given input was invalid");
    }
  }

  onUserApiInput(topic, message) {
    let input = this.parseJson(message);
    console.log(`[API] received message (topic: ${topic})`);
    // console.log("received message on api");
    // console.log(input);
    if (input) {
      if (input.Player) {
        //console.log(input);
        let player = this.game.playerList.getPlayer(input.Player.username);
        for (let index = 0; index < input.Controller.addons.length; index++) {
          const currentaddon = input.Controller.addons[index];
          for (let i = 0; i < this.addonhashes.length; i++) {
            const element = this.addonhashes[i];

            if (currentaddon == element) {
              input.Controller.addons[index] = this.addonNames[i];
            }
          }
        }
        if (this.joinedPlayers.includes(input.Player.username)) {
          if (player) {
            this.handlePlayerInput(player, input);
          } else {
            this.mqtt.log("the player " + input.Player + " does not exist");
          }
        } else if (!player) {
          this.onNewPlayerConnected(input);
        } else {
          this.mqtt.log(
            "a new player " +
              input.Player.username +
              " wants to connect, but his name is already in use"
          );
        }
      }
    } else if (topic == this.mqtt.topics.replicated) {
      this.mqtt.log("the given input was invalid");
    }
  }

  handleAdminInput(input) {
    if (input.admin && input.command) {
      if (input.command == "reset") {
        this.mqtt.log("restarting server");
        this.game.reset();
      }
    }
  }

  handlePlayerInput(player, input) {
    // console.log(player, input)
    if (
      player.tank[input.Player.movement] &&
      typeof player.tank[input.Player.movement] == "function"
    ) {
      if (!player.moved) {
        this.game.client.mqtt.log(
          "the player " +
            player.name +
            " wants his tank to move to the " +
            input.Player.movement
        );
        player.tank[input.Player.movement]();
        this.game.animationEventList.add(
          input.Player.movement,
          player,
          player.tank.currentTile
        );
        player.moved = true;
      } else {
        this.mqtt.log(player.name + " is trying to move again !");
      }
    } else {
      this.mqtt.log("this movement type is invalid");
    }
    let returnData = player.tank.tankAction(input, this.game.allTanks);
    console.log("Return data: ", returnData);
    if (returnData != null) {
      this.game.animationEventList.addAction(
        returnData.firedWeapon,
        returnData.damageDealer,
        returnData.damageTaker
      );
    }
  }

  onNewPlayerConnected(message) {
    var input = message;
    var name = input.Player.username;
    this.mqtt.log(name + " has connected !");
    //let spawnPosition = {"x": Math.floor(Math.random() * this.game.map.width), "y": Math.floor(Math.random() * this.game.map.length)};
    if (this.joinedPlayers.length < 8) {
      this.game.playerList.addPlayer(name, this.game.createTank(input));
      this.joinedPlayers.push(input.Player.username);
      let player = this.game.playerList.getPlayer(input.Player.username);
      this.game.animationEventList.add("spawnAnimation", player);
      this.mqtt.setupClientConnection(name);
      this.mqtt.sendToClient(
        name,
        JSON.stringify({ map: this.game.map.jsonMap })
      );
    }
  }
}

module.exports = UserInputHandler;
