var base = require("./base");

function create(task, callback) {
	console.log("/models/task.js:3 - calling create function");
	var client = base.init();
	// currently assigning order_by to 0
	// modify once dynamic orders are added
	var values = [task.listId, task.name, task.note, "0"];
	client.query('INSERT INTO tasks (list_id, name, note, complete, created, modified) VALUES (?, ?, ?, ?, NOW(), NOW())', values, function(error, results) {
		console.log("/models/task.js:9 - database query complete");
		if (error) {
			console.log("Error creating task: " + error.message);
			client.end();
			return;
		}
		console.log("/models/task.js:15 - database query successful, about to run callback");
		if (callback && typeof(callback) == "function") {
			client.end();
			callback(true);
		}
	});
}

function update(task, callback) {

}

function deleteById(id, callback) {

}

function deleteByListId(listId, callback) {

}

function selectById(id, callback) {

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
exports.deleteById = deleteById;
exports.deleteByListId = deleteByListId;
exports.selectById = selectById;
exports.selectByListId = selectByListId;
