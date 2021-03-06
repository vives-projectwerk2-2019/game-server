/*jshint esversion: 6 */

const AnimationEvent = require(__lib + "/game/animation/animationevent.js");
const MovementAnimationEvent = require(__lib +
  "/game/animation/movementanimationevent.js");
const ActionAnimationEvent = require(__lib +
  "/game/animation/actionanimationevent.js");

class AnimationEventList {
  constructor() {
    this.list = [];
  }

  add(type, player) {
    //adds a new animation event to the list, endTile is optional in case a movement animation is requested
    this.list.push(new AnimationEvent(type, player));
  }

  addMovement(type, player, endTile) {
    this.list.push(new MovementAnimationEvent(type, player, endTile));
  }

  addAction(type, player, target) {
    this.list.push(new ActionAnimationEvent(type, player, target));
  }

  clear() {
    //clears all the animation events in the list
    this.list = [];
  }

  json() {
    //gets replicated to client
    let output = [];
    this.list.forEach(event => {
      output.push(event.json());
    });
    return output;
  }
}

module.exports = AnimationEventList;
