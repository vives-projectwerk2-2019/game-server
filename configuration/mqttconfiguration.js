require("dotenv").config();

var mosca = require('mosca');

var pubsubsettings = {
  //using ascoltatore
  type: 'mongo',		
  url: process.env.MONGO_DB, //'mongodb://localhost:27017/mqtt',
  pubsubCollection: 'ascoltatori',
  mongo: {}
};

module.exports = {
  settings: {
    port: parseInt(process.env.PORT) || 1883,
    backend: process.env.MONGO_DB ? pubsubsettings : undefined,
    http: { port: 9001, bundle: true, static: "./" }
  },
  gameBroker: process.env.GAME_BROKER || "wss://game.bug.labict.be/broker",
  apiBroker: process.env.API_BROKER || "wss://api.bug.labict.be/broker",
  topics: {
    game: process.env.GAME_TOPIC || "game64",
    api: process.env.API_TOPIC || "game64",
    scoreboard: "scoreboard",
    serverLogs: "/log",
    replicated: "/replicated",
    clients: "/clients/",
    admin: "/admin"
  }
};
