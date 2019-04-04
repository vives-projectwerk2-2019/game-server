/*jshint esversion: 6 */

var Stopwatch = require("timer-stopwatch");

class TurnHandler {
    //onHeartbeat: a method that gets called on every update
    //onTurnEnd: a method that gets called onevery end of the turn
    constructor (configuration, onHeartbeat, onTurnEnd, mqtt,startTurn = 0) {
        this.mqtt = mqtt;
        this.heartbeat = configuration.heartbeat;
        this.turnLength = configuration.turnLength * 1000;
        this.onHeartbeat = onHeartbeat;
        this.onTurnEnd = onTurnEnd;
        this.timer = null;
        this.turn = startTurn;
        this.startTurn();
    }

    startTurn() {
        this.timer = new Stopwatch(this.turnLength, {refreshRateMS: this.heartbeat});  //stopping or reseting timer is to buggy
        this.timer.start();
        this.timer.onTime( (time) => this.onHeartbeat() )
                  .onDone( () => this.endTurn() );
    }
      
    endTurn() {
        this.mqtt.log("Turn " + this.turn + " is over");
        this.turn++;
        this.timer.stop();
        this.onTurnEnd();
        this.startTurn();
    }

    //returns the time left untill the round auto ends, can accept int resolution (a number between 0 and 3) this refers to the ammount of numbers after the point
    getTimeLeft(resolution = 0) {
        return Math.floor(this.timer.ms / Math.pow(10, 3 - resolution))/ Math.pow(10, resolution);
    }
}

module.exports = TurnHandler;