/*jshint esversion: 6 */

global.__lib = __dirname + "/js";

const Mqtt = require(__lib + '/connection/mqtt.js');
const Broker = require(__lib + '/connection/broker.js');
const UserInputHandler = require(__lib + '/io/userinputhandler.js');
const ClientUpdater = require(__lib + '/io/clientupdater.js');
const Game = require(__lib + '/game/main/game.js');
const fsManipulator = require(__lib + '/io/fsmanipulator.js');

let mapConfiguration = require('./configuration/mapconfiguration.js');
let gameConfiguration = require('./configuration/gameconfiguration.js');
let mqttConfiguration = require('./configuration/mqttconfiguration.js');
let jsonMap = require('./configuration/map.js');

let broker = new Broker(mqttConfiguration.settings, () => {
    let mqtt = new Mqtt(mqttConfiguration, (topic, message) => userInputHandler.onUserInput(topic, message) );
    let client = new ClientUpdater(mqtt);
    let game = new Game(gameConfiguration, mapConfiguration, jsonMap, client);
    let userInputHandler = new UserInputHandler(game, mqtt);
    mqtt.log("the game server is ready !");
});