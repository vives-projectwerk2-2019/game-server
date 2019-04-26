/*jshint esversion: 6 */

const AnimationEvent = require(__lib + '/game/animation/animationevent.js');

//inherits from AnimationEvent, adds start and end position information to make position interpolation possible client side
class ActionAnimationEvent extends AnimationEvent {
    constructor(type, player, target){      //extends animationevent, adds Tile, endtile
        super(type, player);
        this.target = target;
    }

    json(){     //gets replicated to the client
        return {
            "type": this.type,
            "player": this.player.name,
            "target": this.target.name
        };
    }
}

module.exports = ActionAnimationEvent;