/*jshint esversion: 6 */

var mosca = require('mosca');

class Broker {
	//expects json settings with port, a function to execute after the broker has been set up may also be provided
	constructor(settings, onLoaded = null){
		this.server = new mosca.Server(settings);
		this.server.on("clientConnected", (client) => { console.log(`Client connected: ${client.id}`)});
		this.server.on("clientDisconnected", (client) => { console.log(`Client disconnected: ${client.id}`)});
		this.server.on("published", (packet, client) => { console.log(`Client (${client.id}) published packet`)});
		this.server.on('ready', function(){
			console.log("Broker ready");
			onLoaded();
		});	
	}
}

module.exports = Broker;