/*jshint esversion: 6 */

const AnimationEvent = require(__lib + '/game/animation/animationevent.js');

//inherits from AnimationEvent, adds start and end position information to make position interpolation possible client side
class MovementAnimationEvent extends AnimationEvent {
    constructor(type, player, endTile){      //extends animationevent, adds Tile, endtile
        super(type, player);
        this.endTile = endTile;
    }

    json(){     //gets replicated to the client
        return {
            "type": this.type,
            "player": this.player.name,
            "end": this.endTile.position
        };
    }
}

module.exports = MovementAnimationEvent;