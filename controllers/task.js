var taskPage = require("../views/task/index"),
	createPage = require("../views/task/create"),
	//updatePage = require("../views/task/update"),
	base = require("./base"),
	taskDb = require("../models/task"),
	listDb = require("../models/list"),
	formidable = require("formidable"),
	http = require("http"),
	session = require("../node_modules/sesh/lib/core").magicSession();

function create(response, request, listId) {
	var pageData = new base.PageData();
	var task = new Task();
	var form = new formidable.IncomingForm();

	pageData.title = "Add Task - Node List";
	form.parse(request, function(error, fields, files) {
		// TODO: add form validation
		// name is required
		task.listId = listId;
		task.name = fields["name"];
		task.note = fields["note"];
		taskDb.create(task, function(success) {
			if (success) {
				response.writeHead(302, {"Location": "/lists/" + listId});
				response.end();
			} else {
				pageData.message = "Error creating task. Please try again";
				createPgae.build(response, request, pageData, listId);
			}
		});
	});
}

function update(response, request, pageData) {

}

function deleteTask(response, request, pageData) {
	
}

function showPageDetail(response, request, listId, taskId) {
	base.validateUser(request, response, true, function(user) {
		var pageData = new base.PageData();
		taskDb.selectById(taskId, function(task) {
			taskPage.build(response, request, pageData, task, listId);
		});
	});
}

function showPageCreate(response, request, listId) {
	base.validateUser(request, response, true, function(user) {
		var pageData = new base.PageData();
		pageData.title = "Add Task - Node List";
		createPage.build(response, request, pageData, listId);
	});
}

function showPageUpdate(response, request, pageData) {

}

function Task() {
	this.id = "";
	this.list_id = "";
	this.name = "";
	this.note = "";
	this.complete = "";
	this.order_by = "";
	this.created = "";
	this.modified = "";
}

exports.create = create;
exports.update = update;
exports.deleteTask = deleteTask;
exports.showPageDetail = showPageDetail;
exports.showPageCreate = showPageCreate;
exports.showPageUpdate = showPageUpdate;
