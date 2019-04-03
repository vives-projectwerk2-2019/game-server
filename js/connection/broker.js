/*jshint esversion: 6 */

var mosca = require('mosca');

class Broker {
	//expects json settings with port, a function to execute after the broker has been set up may also be provided
	constructor(settings, onLoaded = null){
		this.server = new mosca.Server(settings);
		this.server.on('ready', function(){
			console.log("Broker ready");
			onLoaded();
		});	
	}
}

module.exports = Broker;