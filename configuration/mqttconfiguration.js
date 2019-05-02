require("dotenv").config();

module.exports = {
  settings: {
    port: parseInt(process.env.PORT) || 1884,
    http: { port: 9001, bundle: true, static: "./" }
  },
  broker: process.env.BROKER || "wss://game.bug.labict.be/broker",
  apiBroker: "wss://api.bug.labict.be/broker",
  topics: {
    main: process.env.MAIN_TOPIC || "game5",
    api: "game",
    scoreboard: "scoreboard",
    serverLogs: "/log",
    replicated: "/replicated",
    clients: "/clients/",
    admin: "/admin"
  }
};
