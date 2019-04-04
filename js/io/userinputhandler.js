/*jshint esversion: 6 */

class UserInputHandler {
  constructor(game, mqtt) {
    this.game = game;
    this.mqtt = mqtt;
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
  onUserInput(topic, message) {
    let input = this.parseJson(message);
    if (input) {
      if (input.Player) {
        //console.log(input);
        let player = this.game.playerList.getPlayer(input.Player.username);
        if (player) {
          this.handleInput(player, input);
        } else {
          this.onNewPlayerConnected(message);
        }
      }
    } else if (topic == this.mqtt.topics.replicated) {
      this.mqtt.log("the given input was invalid");
    }
  }

  handleInput(player, input) {
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
        player.moved = true;
      } else {
        this.mqtt.log(player.name + " is trying to move again !");
      }
    } else {
      this.mqtt.log("this movement type is invalid");
    }
  }

  onNewPlayerConnected(message) {
    var input = message;
    var name = input.Player.username;
    this.mqtt.log(name + " has connected !");
    //let spawnPosition = {"x": Math.floor(Math.random() * this.game.map.width), "y": Math.floor(Math.random() * this.game.map.length)};
    this.game.playerList.addPlayer(name, this.game.createTank(input));
    this.mqtt.setupClientConnection(name);
    this.mqtt.sendToClient(
      name,
      JSON.stringify({ map: this.game.map.jsonMap })
    );
  }
}

module.exports = UserInputHandler;
