require('dotenv').config();

module.exports = {
    "tiles": [
      { "name": "water", "link": "assets/Tiles/waterTile.png" },
      { "name": "grass", "link": "assets/Tiles/grassTile.png" },
      { "name": "mountain", "link": "assets/Tiles/mountainTile.png" },
      { "name": "swamp", "link": "assets/Tiles/swampTile.png" },
      { "name": "spawnPoint", "link": "assets/Tiles/spawnTile.png" }
    ],
    "size": {
      "width": parseInt(process.env.WIDTH) || 22,
      "length": parseInt(process.env.LENGTH) || 17
    },
    "offset": {
      "x": 10,
      "y": 10
    },
    "tileSize": process.env.TILE_SIZE || 40
  }
  