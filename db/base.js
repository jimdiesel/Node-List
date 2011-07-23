// based on the example provided at:
// http://www.giantflyingsaucer.com/blog/?p=2596

var sys = require("sys");
var Client = require("mysql").Client;

function init() {
	var client = new Client();

	client.user = 'root';
	client.password = 'password';

	client.connect(function(error, results) {
		if(error) {
			console.log("Connection Error: " + error.message);
			return;
		}
		console.log("Connected to MySQL");
	});
	client.query("USE node_list", function(error, results) {
		if(error) {
			console.log("Could not connect to database: " + error.message);
			client.end();
			return;
		}
	});
	return client;
}

exports.init = init;
