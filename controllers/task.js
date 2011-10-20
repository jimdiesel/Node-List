var taskPage = require("../views/task/index"),
	createPage = require("../views/task/create"),
	updatePage = require("../views/task/update"),
	deletePage = require("../views/task/delete"),
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
		var validate = new base.Validate();
		var isValid = true;

		task.listId = listId;
		task.name = base.sanitize(fields["name"]);
		task.note = base.sanitize(fields["note"]);

		if (validate.Required(fields["name"]) == false) {
			isValid = false;
			pageData.message = "Name is required<br />";
		}
		if (isValid == true) {
			taskDb.create(task, function(success) {
				if (success) {
					response.writeHead(302, {"Location": "/lists/" + listId});
					response.end();
				} else {
					pageData.message = "Error creating task. Please try again";
					createPgae.build(response, request, pageData, listId);
				}
			});
		} else {
			createPage.build(response, request, pageData, listId);
		}
	});
}

function update(response, request, listId, taskId) {
	var pageData = new base.PageData();
	var task = new Task();
	var form = new formidable.IncomingForm();
	
	pageData.title = "Update Task - Node List";
	form.parse(request, function(error, fields, files) {
		var validate = new base.Validate();
		var isValid = true;

		task.id = taskId;
		task.listId = listId;
		task.name = fields["name"];
		task.note = fields["note"];

		if (validate.Required(fields["name"]) == false) {
			isValid = false;
			pageData.message = pageData.message + "Name is required<br />";
		}
		if (isValid == true) {
			taskDb.update(task, function(success) {
				if (success) {
					response.writeHead(302, {"Location": '/lists/' + listId + '/' + taskId});
					response.end();
				} else {
					pageData.message = "Error updating task. Please try again.";
					taskDb.selectById(taskId, function(task) {
						updatePage.build(response, request, pageData, task, listId);
					});
				}
			});
		} else {
			taskDb.selectById(taskId, function(task) {
				updatePage.build(response, request, pageData, task, listId);
			});
		}
	});
}

function deleteTask(response, request, listId, taskId) {
	base.validateUser(request, response, true, function(user) {
		taskDb.deleteById(taskId, function(success) {
			response.writeHead(302, {"Location": "/lists/" + listId});
			response.end();
		});
	});
}

function showPageDetail(response, request, listId, taskId) {
	base.validateUser(request, response, true, function(user) {
		base.validateList(request, response, true, user, listId, function(list) {
			base.validateTask(request, response, true, user, list, taskId, function(task) {
				var pageData = new base.PageData();
				taskPage.build(response, request, pageData, task, listId);
			});
		});
	});
}

function showPageCreate(response, request, listId) {
	base.validateUser(request, response, true, function(user) {
		base.validateList(request, response, true, user, listId, function(list) {
			var pageData = new base.PageData();
			pageData.title = "Add Task - Node List";
			createPage.build(response, request, pageData, listId);
		});
	});
}

function showPageUpdate(response, request, listId, taskId) {
	base.validateUser(request, response, true, function(user) {
		base.validateList(request, response, true, user, listId, function(list) {
			base.validateTask(request, response, true, user, list, taskId, function(task) {
				var pageData = new base.PageData();
				pageData.title = "Update Task - Node List";
				updatePage.build(response, request, pageData, task, listId);
			});
		});
	});
}

function showPageDelete(response, request, listId, taskId) {
	base.validateUser(request, response, true, function(user) {
		taskDb.selectById(taskId, function(task) {
			var pageData = new base.PageData();
			pageData.title = "Delete Task - Node List";
			deletePage.build(response, request, pageData, listId, task);
		});
	});
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
exports.showPageDelete = showPageDelete;
