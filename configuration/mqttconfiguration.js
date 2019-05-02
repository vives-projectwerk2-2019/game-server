require("dotenv").config();

module.exports = {
  settings: {
    port: parseInt(process.env.PORT) || 1883,
    http: { port: 9001, bundle: true, static: "./" }
  },
  broker: process.env.BROKER || "wss://game.bug.labict.be/broker",
  apiBroker: "wss://api.bug.labict.be/broker",
  topics: {
    main: process.env.MAIN_TOPIC || "game64",
    api: "game64",
    scoreboard: "scoreboard",
    serverLogs: "/log",
    replicated: "/replicated",
    clients: "/clients/",
    admin: "/admin"
  }
};
