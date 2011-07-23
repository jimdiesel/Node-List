var base = require("./base");

function create(user) {
	var client = base.init();
	var values = [user.email, user.password, user.name];
	client.query('INSERT INTO users (email, password, name, created, modified, last_login) VALUES (?, ?, ?, NOW(), NOW(), NOW())', values, function(error, results) {
		if(error) {
			console.log("Error creating user: " + error.message);
			client.end();
			return;
		}
		console.log("Inserted: " + results.affectedRows + " row");
		console.log("Id inserted: " + results.insertId);
		user.id = results.insertId;
	});
	return user;
}

function update(user) {

}

function deleteById(id) {

}

function deleteByEmail(email) {

}

function selectById(id) {

}

function selectByEmail(email) {

}

exports.create = create;
exports.update = update;
exports.deleteById = deleteById;
exports.deleteByEmail = deleteByEmail;
exports.selectById = selectById;
exports.selectByEmail = selectByEmail;
