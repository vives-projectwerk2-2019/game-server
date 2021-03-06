require("dotenv").config();

module.exports = {
  settings: {
    port: parseInt(process.env.PORT) || 1883,
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
