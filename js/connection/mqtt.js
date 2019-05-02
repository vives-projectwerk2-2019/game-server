/*jshint esversion: 6 */

const mqtt = require("mqtt");

class Mqtt {
  constructor(configuration, messageApiHandler, messageGameHandler) {
    this.client = mqtt.connect(configuration.broker);
    this.apiClient = mqtt.connect(configuration.apiBroker);
    this.topics = configuration.topics;
    this.mainTopic = configuration.topics.main;
    this.apiTopic = configuration.topics.api;
    this.adminTopic = this.mainTopic + this.topics.admin;
    this.messageApiHandler = messageApiHandler;
    this.messageGameHandler = messageGameHandler;
    this.connected = false;

    this.client.on("connect", () => {
      this.client.subscribe(this.mainTopic, err => {
        if (!err) {
          this.subscribeTopic(this.mainTopic);
          this.subscribeTopic(this.adminTopic);
        }
      });
    });
    this.apiClient.on("connect", () => {
      this.apiClient.subscribe(this.apiTopic, err => {
        if (!err) {
          this.subscribeTopic(this.apiTopic);
          console.log(
            "connected to Broker: " +
              configuration.apiBroker +
              " topic: " +
              this.apiTopic
          );
        }
      });
    });
    // this.client.on("message", (topic, message) => {
    //   // message is Buffer
    //   this.messageHandler(topic, message.toString());
    // });
    this.client.on("message", (topic, message) => {
        console.log(`[Broker] received message (topic: ${topic})`);
        this.messageGameHandler(topic, message.toString());
    });
    this.apiClient.on("message", (topic, message) => {
        console.log(`[API] received message (topic: ${topic})`);
        this.messageApiHandler(topic, message.toString());
    });
  }

  end() {
    if (this.connected) {
      client.end();
    }
  }

  subscribeTopic(topicName) {
    this.client.subscribe(topicName, err => {
      if (!err) {
        this.send(topicName, "The server is listening to " + topicName);
      }
    });
  }

  unsubscribeTopic(topicName) {
    this.client.unsubscribe(topicName, err => {
      if (!err) {
        this.send(topicName, "topic" + topicName + "was removed");
      }
    });
  }

  setupClientConnection(clientName) {
    this.subscribeTopic(this.mainTopic + this.topics.clients + clientName);
    this.log("established private connection with " + clientName);
  }

  send(topicName, message) {
    this.client.publish(topicName, message);
  }

  log(message) {
    console.log(`[LOG] ${message}`);
    this.send(this.mainTopic + this.topics.serverLogs, message);
  }

  replicate(message) {
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
