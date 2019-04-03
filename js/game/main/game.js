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
        this.turnHandler = new TurnHandler( gameConfiguration, () => this.run(), client.mqtt );
    }
}

module.exports = Game;