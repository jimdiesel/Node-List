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
	});
	if (callback && typeof(callback) == "function") {
		callback(list);
	}
}

function update(list, callback) {
	
}

function deleteById(id, callback) {

}

function selectById(id, callback) {

}

exports.create = create;
exports.update = update;
exports.deleteById = deleteById;
exports.selectById = selectById;
