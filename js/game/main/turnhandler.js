/*jshint esversion: 6 */

var Stopwatch = require("timer-stopwatch");

class TurnHandler {
    //onHeartbeat: a method that gets called on every update
    constructor (configuration, onHeartbeat, mqtt,startTurn = 0) {      //TODO: remove mqtt when troubleshooting is over
        this.mqtt = mqtt;
        this.heartbeat = configuration.heartbeat;
        this.turnLength = configuration.turnLength * 1000;
        this.onHeartbeat = onHeartbeat;
        this.timer = null;
        this.turn = startTurn;
        this.startTurn();
    }
}

module.exports = TurnHandler;