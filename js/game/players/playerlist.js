/*jshint esversion: 6 */

const Player = require(__lib + '/game/players/player.js');

class PlayerList {
    constructor () {
        this.players = [];
    }

    //will add a new player to the end of the list with specified string name and Tank tank
    addPlayer(name, tank){
        if (!this.getPlayer(name)){
            this.players.push(new Player(name, tank));
        } else {
            console.log("the specified name is already in use");
        }
    }
}

module.exports = PlayerList;