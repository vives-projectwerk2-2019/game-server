/*jshint esversion: 6 */

const mqtt = require('mqtt');

class Mqtt {
    constructor(configuration, messageHandler) {
        this.client = mqtt.connect(configuration.broker);
        this.topics = configuration.topics;
        this.mainTopic = configuration.topics.main;
        this.messageHandler = messageHandler;
        this.connected = false;

        this.client.on('connect', () => {
            this.client.subscribe(this.mainTopic, (err) => {
                if (!err) {
                    this.subscribeTopic(this.mainTopic);
                }
            });
        });
    
        this.client.on('message', (topic, message) => {
            // message is Buffer
            this.messageHandler(topic, message.toString());
        });
    }

    end () {
        if (this.connected) {
            client.end();
        }
    }

    send (topicName, message) {
        this.client.publish(topicName, message);
    }

}

module.exports = Mqtt;