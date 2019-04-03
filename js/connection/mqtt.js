/*jshint esversion: 6 */

const mqtt = require('mqtt');

class Mqtt {
    constructor(configuration, messageHandler) {
        this.client = mqtt.connect(configuration.broker);
        this.topics = configuration.topics;
        this.mainTopic = configuration.topics.main;
        this.messageHandler = messageHandler;
        this.connected = false;
    }
}

module.exports = Mqtt;