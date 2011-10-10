var base = require("./base");

function create(list, user_id, callback) {
	var client = base.init();
	var values = [user_id, list.name, list.order_by];
	client.query('INSERT INTO lists (user_id, name, order_by, created, modified) VALUES (?, ?, ?, NOW(), NOW())', values, function(error, results) {
		if (error) {
			console.log("Error creating list: " + erorr.message);
			client.end();
			return;
		}
		console.log("Inserted: " + results.affectedRows + " row");
		console.log("Id inserted: " + results.insertId);
		list.id = results.insertId;
		if (callback && typeof(callback) == "function") {
			client.end();
			callback(list);
		}
	});
}

function update(list, callback) {
	var client = base.init();
	var values = [list.name, list.order_by, list.id];
	client.query('UPDATE lists SET name = ?, order_by = ?, modified = NOW() WHERE id = ?', values, function(error, results) {
		if (error) {
			console.log("Error updating list: " + error.message);
			client.end();
			return;
		}
		console.log("Updated: " + results.affectedRows + " row(s)");
		if (callback && typeof(callback) == "function") {
			client.end();
			callback(true);
		}
	});
}

function deleteById(id, callback) {
	var client = base.init();
	var values = [id];
	client.query('DELETE FROM lists WHERE id = ?', values, function(error, results) {
		if (error) {
			console.log("Error deleting list: " + error.message);
			client.end();
			return;
		}
		console.log("Deleted: " + results.affectedRows + " row(s)");
		if (callback && typeof(callback) == "function") {
			client.end();
			callback(true);
		}
	});
}

function selectById(id, callback) {
	var client = base.init();
	var values = [id];
	var list;
	client.query('SELECT id,user_id,name,order_by,created,modified FROM lists WHERE id = ?', values, function(error, results) {
		if (error) {
			console.log("Error selecting list: " + error.message);
			client.end();
			return;
		}
		if (results.length > 0) {
			list = results[0];
		}
		if (callback && typeof(callback) == "function") {
			client.end();
			callback(list);
		}
	});
	client.end();
}

function selectByUserId(userId, callback) {
	var client = base.init();
	var values = [userId];
	var lists;
	client.query('SELECT id,user_id,name,order_by,created,modified FROM lists WHERE user_id = ?', values, function(error, results) {
		if (error) {
			console.log("Error selecting lists: " + error.message);
			client.end();
			return;
		}
		if (results.length > 0) {
			lists = results;
		}
		if (callback && typeof(callback) == "function") {
			client.end();
			callback(lists);
		}
	});
}

exports.create = create;
exports.update = update;
exports.deleteById = deleteById;
exports.selectById = selectById;
exports.selectByUserId = selectByUserId;
