require('dotenv').config();

module.exports = {
    "settings": {
      "port": parseInt(process.env.PORT) || 1884,
      "http": {"port": 9001, "bundle": true, "static": './'}
    },
    "broker": process.env.BROKER || "mqtt://labict.be",
    "topics": {
      "main": process.env.MAIN_TOPIC || "game3",
      "scoreboard": "scoreboard",
      "serverLogs": "/log",
      "replicated": "/replicated",
      "clients": "/clients/",
      "admin": "/admin"
    }
  }
  