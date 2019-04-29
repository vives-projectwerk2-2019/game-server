/*jshint esversion: 6 */

class ClientUpdater {
    constructor (mqtt) {
        this.mqtt = mqtt;
    }

    update(gameState){
        this.mqtt.replicate(gameState);
    }
}

module.exports = ClientUpdater;
