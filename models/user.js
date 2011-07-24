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
	var client = base.init();
	var values = [user.email, user.password, user.name, user.id];
	client.query('UPDATE users SET email = ?, password = ?, name = ?, modified = NOW() WHERE id = ?', values, function(error, results) {
		if(error) {
			console.log("Error updating user: " + error.message);
			client.end();
			return;
		}
		console.log("Updated: " + results.affectedRows + " row(s)");
	});
	return user;
}

function deleteById(id) {
	var client = base.init();
	var values = [id];
	// future enhancement:
	// modify query to also delete lists and tasks 
	// associated with the deleted user
	client.query('DELETE FROM users WHERE id = ?', values, function(error, results) {
		if(error) {
			console.log("Error deleting user: " + error.message);
			client.end();
			return false;
		}
		console.log("Deleted: " + results.affectedRows + " row(s)");
	});
	return true;
}

function deleteByEmail(email) {
	var client = base.init();
	var values = [email];
	// future enhancement:
	// modify query to also delete lists and tasks
	// associated with the deleted user
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

function selectById(id) {
	var client = base.init();
	var values = [id];
	client.query('SELECT id,email,password,name,created,modified,last_login FROM users WHERE id = ?', values, function(error, results) {
		if(error) {
			console.log("Error selecting user: " + error.message);
			client.end();
			return;
		}
		console.log("Selected: " + results.affectedRows + " row(s)");
		console.log("Object:");
		console.log(results);
	});
	return true;
}

function selectByEmail(email) {

}

exports.create = create;
exports.update = update;
exports.deleteById = deleteById;
exports.deleteByEmail = deleteByEmail;
exports.selectById = selectById;
exports.selectByEmail = selectByEmail;
