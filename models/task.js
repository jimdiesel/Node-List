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

}

function updateComplete(taskId, complete) {
	var client = base.init();
	var values = [complete, taskId];
	client.query('UPDATE tasks SET complete = ?, modified = NOW() WHERE id = ?', values, function(error, results) {
		if (error) {
			console.log("Error updating task: " + error.message);
			client.end();
			return;
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
