/*jshint esversion: 6 */

class UserInputHandler {
    constructor (game, mqtt) {
        this.game = game;
        this.mqtt = mqtt;
    }

     //expects a json string, will a json object if the given string is a valid json or else null
     parseJson (json) {
        try {
            return JSON.parse(json);
        } catch (error) {
            return null;
        }
    }
}

module.exports = UserInputHandler;