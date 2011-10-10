var base = require("./base");

function create(task, callback) {
	var client = base.init();
	// TODO: currently assigning order_by to 0
	// modify once dynamic orders are added
	var values = [task.listId, task.name, task.note, "0"];
	client.query('INSERT INTO tasks (list_id, name, note, complete, created, modified) VALUES (?, ?, ?, ?, NOW(), NOW())', values, function(error, results) {
		if (error) {
			console.log("Error creating task: " + error.message);
			client.end();
			return;
		}
		if (callback && typeof(callback) == "function") {
			client.end();
			callback(true);
		}
	});
}

function update(task, callback) {
	var client = base.init();
	var values = [task.name, task.note, task.id];
	client.query('UPDATE tasks SET name = ?, note = ?, modified = NOW() WHERE id = ?', values, function(error, results) {
		if (error) {
			console.log("Error creating task: " + error.message);
			client.end();
			return;
		}
		if (callback && typeof(callback) == 'function') {
			callback();
		}
	});
	client.end();
}

function updateComplete(tasks, callback) {
	var client = base.init();
	var query = 'INSERT INTO tasks (id, complete, modified) VALUES ';
	for(var i = 0; i < tasks.length; i++) {
		query = query + '(' + tasks[i].id + ', ' + tasks[i].complete + ', NOW())';
		if (i < tasks.length - 1) {
			query = query + ',';
		}
	}
	query = query + ' ON DUPLICATE KEY UPDATE complete=VALUES(complete), modified=VALUES(modified)';
	var values = [];
	client.query(query, values, function(error, results) {
		if (error) {
			console.log("Error updating task: " + error.message);
			client.end();
			return;
		}
		if (callback && typeof(callback) == 'function') {
			callback();
		}
		client.end();
	});
}

function deleteById(id, callback) {

}

function deleteByListId(listId, callback) {

}

function selectById(id, callback) {
	var client = base.init();
	var values = [id];
	var task;

	client.query('SELECT id, list_id, name, note, complete, order_by, created, modified FROM tasks WHERE id = ?', values, function(error, results) {
		if (error) {
			console.log("Error selecting task: " + error.message);
			client.end();
			return;
		}
		if (results.length > 0) {
			task = results[0];
		} else {
			client.end();
			return;
		}
		// TODO: make callback check into helper method
		if (callback && typeof(callback) == "function") {
			client.end();
			callback(task);
		}
	});
}

function selectByListId(listId, callback) {
	var client = base.init();
	var values = [listId];
	var tasks;
	client.query('SELECT id,list_id,name,note,complete,order_by,created,modified FROM tasks WHERE list_id = ?', values, function(error, results) {
		if (error) {
			console.log("Error selecting tasks: " + error.message);
			client.end();
			return;
		}
		if (results.length > 0) {
			tasks = results;
		}
		if (callback && typeof(callback) == "function") {
			client.end();
			callback(tasks);
		}
	});
}

exports.create = create;
exports.update = update;
exports.updateComplete = updateComplete;
exports.deleteById = deleteById;
exports.deleteByListId = deleteByListId;
exports.selectById = selectById;
exports.selectByListId = selectByListId;
