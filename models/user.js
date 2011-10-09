var base = require("./base");

function create(user, callback) {
	var client = base.init();
	var values = [user.email, user.password, user.name];
	client.query('INSERT INTO users (email, password, name, created, modified, last_login) VALUES (?, ?, ?, NOW(), NOW(), NOW())', values, function(error, results) {
		if(error) {
			console.log("Error creating user: " + error.message);
			client.end();
			return;
		}
		if (callback && typeof(callback) == 'function') {
			user.id = results.insertId;
			callback(user);
		}
	});
}

function update(user, callback) {
	var client = base.init();
	var values = [user.email, user.name, user.id];
	var query = 'UPDATE users SET email = ?, name = ?, modified = NOW() WHERE id = ?';
	if (user.password != '') {
		var values = [user.email, user.password, user.name, user.id];
		var query = 'UPDATE users SET email = ?, password = ?, name = ?, modified = NOW() WHERE id = ?';
	}
	client.query(query, values, function(error, results) {
		if(error) {
			console.log("Error updating user: " + error.message);
			client.end();
			return;
		}
		console.log("Updated: " + results.affectedRows + " row(s)");
	});
	if (callback && typeof(callback) == "function") {
		callback(true);
	}
}

function deleteById(id, callback) {
	var client = base.init();
	var values = [id];
	client.query('DELETE FROM users WHERE id = ?', values, function(error, results) {
		if(error) {
			console.log("Error deleting user: " + error.message);
			client.end();
			return false;
		}
		if (callback && typeof(callback) == 'function') {
			callback();
		}
	});
	return true;
}

function deleteByEmail(email) {
	var client = base.init();
	var values = [email];
	client.query('DELETE FROM users WHERE email = ?', values, function(error, results) {
		if(error) {
			console.log("Error deleting user: " + error.message);
			client.end();
			return false;
		}
		console.log("Deleted: " + results.affectedRows + " row(s)");
	});
	return true;
}

function selectById(id, callback) {
	var client = base.init();
	var values = [id];
	var user;
	client.query('SELECT id,email,password,name,created,modified,last_login FROM users WHERE id = ?', values, function(error, results) {
		if(error) {
			console.log("Error selecting user: " + error.message);
			client.end();
			return;
		}
		if (results.length > 0) {
			user = results[0];
		}
		if (callback && typeof(callback) == "function") {
			callback(user);
		}
	});
}

function selectByEmail(email, callback) {
	var client = base.init();
	var values = [email];
	var user;
	client.query('SELECT id,email,password,name,created,modified,last_login FROM users WHERE email = ?', values, function(error, results) {
		if(error) {
			console.log("Error selecting user: " + error.message);
			client.end();
			return;
		}
		if (results.length > 0) {
			user = results[0];
		}
		if (callback && typeof(callback) == "function") {
			client.end();
			callback(user);
		}
	});
}

exports.create = create;
exports.update = update;
exports.deleteById = deleteById;
exports.deleteByEmail = deleteByEmail;
exports.selectById = selectById;
exports.selectByEmail = selectByEmail;
