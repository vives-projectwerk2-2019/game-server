//enum state of the next tile based on the tank direction if the path is blocked or not 
var tankPathEnum = {
	UNBLOCKED: 0, 
	BLOCKED: 1
}; 

//enum type of terrain tiles
//the tile id's should match the ones from the json
var tankTileEnum  = {
	WATER: 0,
	GRASS: 1,
	MOUNTAIN: 2,
	SWAMP: 3,
	SPAWN_POINT: 4,
	OTHER_TANK: 5,
};

class TankTerrain {
	getNextTileType(newCubeLocation, jsonMap, allTanks = 0)
	{
		let nextTile = tankTileEnum.GRASS;
		nextTile = jsonMap[newCubeLocation.x][newCubeLocation.y];
		
		return nextTile;
	}

	//looks if the path of the tank is blocked 
	setTankPathState(nextTile)
	{
		let tankState = tankPathEnum.UNBLOCKED;

		switch(nextTile) {
		case tankTileEnum.MOUNTAIN:
		case tankTileEnum.WATER:
		case tankTileEnum.OTHER_TANK:
				tankState = tankPathEnum.BLOCKED;
				break;
		default:
				tankState = tankPathEnum.UNBLOCKED;
				break;
		}

		return tankState;
	}
	
};

module.exports = TankTerrain;
