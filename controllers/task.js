var taskPage = require("../views/task/page/index"),
	createPage = require("../views/task/page/create"),
	updatePage = require("../views/task/page/update"),
	deletePage = require("../views/task/page/delete"),
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
		task.SetDue(fields["due"]);

		if (validate.Required(fields["name"]) == false) {
			isValid = false;
			pageData.message = "Name is required<br />";
		}
		if (validate.DateFormat(fields["due"]) == false) {
			isValid = false;
			pageData.message += "Due date is invalid<br />";
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
		task.SetDue(fields["due"]);

		if (validate.Required(fields["name"]) == false) {
			isValid = false;
			pageData.message = pageData.message + "Name is required<br />";
		}
		if (validate.DateFormat(fields["due"]) == false) {
			isValid = false;
			pageData.message = pageData.message + "Due Date is invalid<br />";
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
		base.validateList(request, response, true, user, listId, function(list) {
			base.validateTask(request, response, true, user, list, taskId, function(task) {
				taskDb.deleteById(taskId, function(success) {
					response.writeHead(302, {"Location": "/lists/" + listId});
					response.end();
				});
			});
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
		base.validateList(request, response, true, user, listId, function(list) {
			base.validateTask(request, response, true, user, list, taskId, function(task) {
				var pageData = new base.PageData();
				pageData.title = "Delete Task - Node List";
				deletePage.build(response, request, pageData, listId, task);
			});
		});
	});
}

//TODO: Consider putting this in the model
function Task() {
	this.id = "";
	this.list_id = "";
	this.name = "";
	this.note = "";
	this.due = new Date();
	this.dueFormatted = "00-00-0000";
	this.dueIso = "";
	this.complete = "";
	this.order_by = "";
	this.created = "";
	this.modified = "";

	this.SetDue = SetDue;

	function SetDue(newDate) {
		this.due = new Date(newDate);
		
		var month = this.due.getMonth() + 1;
		var day = this.due.getDate();
		var year = this.due.getFullYear();

		if (month < 10) {
			month = "0" + month.toString();
		} else {
			month = month.toString();
		}
		if (day < 10) {
			day = "0" + day.toString();
		} else {
			day = day.toString();
		}
		year = year.toString();

		this.dueFormatted = month + '-' + day + '-' + year;
		this.dueIso = this.due.toISOString();
	}
}

exports.Task = Task;
exports.create = create;
exports.update = update;
exports.deleteTask = deleteTask;
exports.showPageDetail = showPageDetail;
exports.showPageCreate = showPageCreate;
exports.showPageUpdate = showPageUpdate;
exports.showPageDelete = showPageDelete;
