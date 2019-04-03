/*jshint esversion: 6 */

class Player {
    constructor(name, tank) {
        this.name = name;
        this.tank = tank;
    }

    //gets replicated to client
    json() {
        return {
            "name": this.name,
            "tank": this.tank.json()
        };
    }
}

module.exports = Player;