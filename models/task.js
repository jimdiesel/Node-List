var base = require("./base");

function create(task, callback) {
	var client = base.init();
	
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
