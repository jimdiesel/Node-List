var base = require("../base");

function create(list, callback) {
	var client = base.init();
	var values = [list.name, list.order];
	client.query('INSERT INTO lists (name, order, created, modified) VALUES (?, ?, NOW(), NOW())', values, function(error, results) {
		if (error) {
			console.log("Error creating list: " + erorr.message);
			client.end();
			return;
		}
		console.log("Inserted: " + results.affectedRows + " row");
		console.log("Id inserted: " + results.insertId);
		list.id = results.insertId;
		if (callback && typeof(callback) == "function") {
			callback(list);
		}
	});
}

function update(list, callback) {
	var client = base.init();
	var values = [list.name, list.order, list.id];
	client.query('UPDATE lists SET name = ?, order = ?, modified = NOW() WHERE id = ?', values, function(error, results) {
		if (error) {
			console.log("Error updating list: " + error.message);
			client.end();
			return;
		}
		console.log("Updated: " + results.affectedRows + " row(s)");
		if (callback && typeof(callback) == "function") {
			callback(true);
		}
	});
}

function deleteById(id, callback) {
	var client = base.init();
	var values = [id];
	// future enhancement:
	// modify query to also delete tasks
	// associated with the deleted list
	client.query('DELETE FROM lists WHERE id = ?', values, function(error, results) {
		if (error) {
			console.log("Error deleting user: " + error.message);
			client.end();
			return;
		}
		console.log("Deleted: " + results.affectedRows + " row(s)");
		if (callback && typeof(callback) == "function") {
			callback(true);
		}
	});
}

function selectById(id, callback) {
	var client = base.init();
	var values = [id];
	var list;
	client.query('SELECT id,user_id,name,order,created,modified FROM lists WHERE id = ?', values, function(error, results) {
		if (error) {
			console.log("Error selecting list: " + error.message);
			client.end();
			return;
		}
		if (results.length > 0) {
			list = results[0];
		}
		if (callback && typeof(callback) == "function") {
			callback(list);
		}
	});
}

function selectByUserId(userId, callback) {
	var client = base.init();
	var values = [userId];
	var lists;
	client.query('SELECT id,user_id,name,order,created,modified FROM lists WHERE user_id = ?', values, function(error, results) {
		if (error) {
			console.log("Error selecting lists: " + error.message);
			client.end();
			return;
		}
		if (results.length > 0) {
			lists = results;
		}
		if (callback && typeof(callback) == "function") {
			callback(lists);
		}
	});
}

exports.create = create;
exports.update = update;
exports.deleteById = deleteById;
exports.selectById = selectById;
exports.selectByUserId = selectByUserId;
