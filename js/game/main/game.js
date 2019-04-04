/*jshint esversion: 6 */

const HexMap = require(__lib + '/game/map/hexmap.js');
const PlayerList = require(__lib + '/game/players/playerlist.js');
const Tank = require(__lib + '/game/world_objects/tank.js');
const TurnHandler = require(__lib + '/game/main/turnhandler.js');

class Game {
    constructor (gameConfiguration, mapConfiguration, jsonMap, client) {
        this.client = client;
        this.map = new HexMap(mapConfiguration, jsonMap);
        this.playerList = new PlayerList();
        this.turnHandler = new TurnHandler( gameConfiguration, () => this.run(), () => this.onTurnEnd(), client.mqtt );
    }

    //expects string color and object spawnPosition {x: int, y: int} returns an object tank
    createTank (color, spawnPosition) {
        return new Tank(this.map, spawnPosition.x, spawnPosition.y, 40, null); //read size from config file and occupy addons with something usefull
    }

    run () {
        //console.log(this.turnHandler.getTimeLeft(1));
        //console.log(JSON.stringify(this.playerList.json()));
        //this.client.update(JSON.stringify({timeLeft: this.turnHandler.getTimeLeft(0)}));
    }

    onTurnEnd() {
        this.client.update(JSON.stringify(this.playerList.json()));
    }
}

module.exports = Game;