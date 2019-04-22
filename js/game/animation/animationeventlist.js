/*jshint esversion: 6 */

const AnimationEvent = require(__lib + '/game/animation/animationevent.js');
const MovementAnimationEvent = require(__lib + '/game/animation/movementanimationevent.js');

class AnimationEventList {
    constructor(){
        this.list = [];
    }

    add(type, player, endTile = null){      //adds a new animation event to the list, endTile is optional in case a movement animation is requested
        if (endTile) {
            this.list.push( new MovementAnimationEvent(type, player, endTile) );
        } else {
            this.list.push( new AnimationEvent(type, player) );
        }
    }

    clear(){        //clears all the animation events in the list
        this.list = [];
    }

    json(){     //gets replicated to client
        let output = [];
        console.log(this.list);
        this.list.forEach(event => {
            output.push(event.json());
        });
        return output;
    }
}

module.exports = AnimationEventList;