// based on the example provided at:
// http://www.giantflyingsaucer.com/blog/?p=2596

var sys = require("sys");
var Client = require("mysql");
console.log("Client:");
console.log(Client);

function init() {
	var client = Client;

	var user = 'node_list';
	var password = 'd!rty4ndst1nk1n';

	var connection = client.createConnection({
	    host: 'localhost',
	    user: user,
	    password: password
	});
	connection.connect();
	connection.query("USE node_list", function(error, results) {
		if(error) {
			console.log("Could not connect to database: " + error.message);
			connection.end();
			return;
		}
	});
	return connection;
}

exports.init = init;
