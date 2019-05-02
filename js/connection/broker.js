/*jshint esversion: 6 */

var mosca = require('mosca');

class Broker {
	//expects json settings with port, a function to execute after the broker has been set up may also be provided
	constructor(settings, onLoaded = null){
		this.server = new mosca.Server(settings);
		this.server.on("clientConnected", function(client) {
			console.log('Client Connected:', client.id);
			});
		this.server.on("clientDisconnected",function(client) {
			console.log('Client Disconnected:', client.id);
			});
		this.server.on("published", function(packet, client) {
			console.log('Client published message:', client.id);
			});
		this.server.on('ready', function(){
			console.log("Broker ready");
			onLoaded();
		});	
	}
}

module.exports = Broker;