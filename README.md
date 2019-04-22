# game-server

Server of the BUG game.

## layout of server
![server layout](images/game_server.png "Server layout")

## running the server

1. Change the name of the broker at mqttconfig.json to mqtt://<YOUR_IP_ADDRESS>

2. Run `npm start` in the root directory.

### connecting as client

You can connect to the broker through mqttbox for troubleshooting (protocol : mqtt / tcp, host: <IP_OF_DEVICE_RUNNING_THE_BROKER>)

topics of interest:
-`game/logs` : Where the server places logging messages.
-`game/replicated` : Where the server places information meant for all clients.
-`game/clients/*` : Where the server places information meant for one specific client.

### imitating client

to imitate a potential client you will have to send a message to `game/` in the following format:
```json
{
  "Player": {
    "username": "playerName",
    "movement": "movement_type",
    "dev_id": "",
    "action": "A",
    "joined": true
  },
  "Controller": { "addons": [null, null, null], "dev_id": "" }
}
```

The movement input of the first packet will be ignored while the server is adding you as a new player.
