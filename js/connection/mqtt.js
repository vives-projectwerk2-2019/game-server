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

    subscribeTopic (topicName) {
        this.client.subscribe(topicName, (err) => {
            if(!err){
                this.send(topicName, 'The server is listening to ' + topicName);
            }
        });
    }

    unsubscribeTopic (topicName) {
        this.client.unsubscribe(topicName, (err) => {
            if(!err){
                this.send(topicName, 'topic' + topicName + 'was removed');
            }
        });
    }

    setupClientConnection(clientName) {
        this.subscribeTopic(this.mainTopic + this.topics.clients + clientName);
        this.log("established private connection with " + clientName);
    }

    send (topicName, message) {
        this.client.publish(topicName, message);
    }

    log (message) {
        this.send(this.mainTopic + this.topics.serverLogs, message);
    }

    replicate (message) {
        this.send(this.mainTopic + this.topics.replicated, message);
    }

    sendToClient(clientName, message) {
        this.send(this.mainTopic + this.topics.clients + clientName, message);
    }

    sendToScoreboard(jsonString) {
        this.send(this.topics.scoreboard, jsonString);
    }

}

module.exports = Mqtt;
