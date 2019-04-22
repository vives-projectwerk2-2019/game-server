/*jshint esversion: 6 */

class AnimationEvent {
    constructor(type, player){      //expects string type (the kind of animation) and Player player (used to know on what tank the animation should be played)
        this.type = type;
        this.player = player;
    }

    json(){     //gets replicated to the client
        return {
            "type": this.type,
            "player": this.player.name
        };
    }
}

module.exports = AnimationEvent;