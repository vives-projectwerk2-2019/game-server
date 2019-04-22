/*jshint esversion: 6 */

const AnimationEvent = require(__lib + '/game/animation/animationevent.js');
const MovementAnimationEvent = require(__lib + '/game/animation/movementanimationevent.js');

class AnimationEventList {
    constructor(){
        this.list = [];
    }
}

module.exports = AnimationEventList;