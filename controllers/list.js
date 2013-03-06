var listPage = require("../views/list/page/index"),
	createPage = require("../views/list/page/create"),
	updatePage = require("../views/list/page/update"),
	detailPage = require("../views/list/page/detail"),
	deletePage = require("../views/list/page/delete"),
	base = require("./base"),
	taskController = require("./task"),
	listDb = require("../models/list"),
	taskDb = require("../models/task"),
	formidable = require("formidable"),
	http = require("http"),
	session = require("../node_modules/sesh/lib/core").magicSession();

function create(response, request) {
	var pageData = new base.PageData();
	var list = new List();
	var form = new formidable.IncomingForm();

	pageData.title = "Create List - Node List";
	form.parse(request, function(error, fields, files) {
		var validate = new base.Validate();
		var isValid = true;

		list.userId = request.session.data.user;
		list.name = base.sanitize(fields["name"]);

		if (validate.Required(fields["name"]) == false) {
			isValid = false;
			pageData.message = pageData.message + "Name is required<br />";
		}
		if (isValid == true) {
			listDb.create(list, list.userId, function(list) {
				if (list) {
					response.writeHead(302, {"Location": "/lists/" + list.id});
					response.end();
				} else {
					pageData.message = "Error creating list. Please try again";
					createPage.build(response, request, pageData);
				}
			});
		} else {
			createPage.build(response, request, pageData);
		}
	});
}

function update(response, request, listId) {
	var list = new List();
	var form = new formidable.IncomingForm();
	var pageData = new base.PageData();

	pageData.title = "Update List - Node List";
	pageData.message = "Error updating list. Please try again";
	form.parse(request, function(error, fields, files) {
		var validate = new base.Validate();
		var isValid = true;

		list.id = listId;
		list.user_id = request.session.data.user;
		list.name = fields["name"];

		if (validate.Required(fields["name"]) == false) {
			isValid = false;
			pageData.message = "Name is required<br />";
		}
		if (isValid == true) {
			listDb.update(list, function(success) {
				if (success) {
					response.writeHead(302, {"Location": '/lists/' + listId});
					response.end();
				} else {
					updatePage.build(response, request, pageData, list);
				}
			});
		} else {
			updatePage.build(response, request, pageData, list);
		}
	});
}

function updateTasks(response, request, listId) {
	var pageData = new base.PageData();
	var form = new formidable.IncomingForm();

	pageData.title = "Incomplete Tasks - Node List";
	form.parse(request, function(error, fields, files) {
		var validate = new base.Validate();
		var tasks = [];
		for(key in fields) {
			if (validate.Integer(key) == true) {
				var complete = (fields[key].indexOf('on') != -1) ? 1 : 0;
				tasks.push({id: key, complete: complete});
			}
		}
		taskDb.updateComplete(tasks, function() {
			taskDb.selectByListId(listId, function(tasks) {
				listDb.selectById(listId, function(list) {
					detailPage.build(response, request, pageData, list, tasks);
				});
			});
		});
	});
}

function deleteList(response, request, listId) {
	base.validateUser(request, response, true, function(user) {
		base.validateList(request, response, true, user, listId, function(list) {
			listDb.deleteById(listId, function(success) {
				response.writeHead(302, {"Location": "/lists"});
				response.end();
			});
		});
	});
}

function showPageList(response, request) {
	base.validateUser(request, response, true, function(user) {
		var pageData = new base.PageData();
		pageData.title = "Your Lists - Node List";
		listDb.selectByUserId(request.session.data.user, function(lists) {
			listPage.build(response, request, pageData, lists);
		});
	});
}

function showPageDetail(response, request, listId) {
	base.validateUser(request, response, true, function(user) {
		base.validateList(request, response, true, user, listId, function(list) {
			var pageData = new base.PageData();
			pageData.title = "Incomplete Tasks - Node List";
			taskDb.selectByListId(listId, function(tasks) {
				detailPage.build(response, request, pageData, list, tasks);
			});
		});
	});
}

function showPageCreate(response, request) {
	base.validateUser(request, response, true, function(user) {
		var pageData = new base.PageData();
		pageData.title = "Create List - Node List";
		createPage.build(response, request, pageData);
	});
}

function showPageEdit(response, request, listId) {
	base.validateUser(request, response, true, function(user) {
		base.validateList(request, response, true, user, listId, function(list) {
			var pageData = new base.PageData();
			pageData.title = "Edit List - Node List";
			updatePage.build(response, request, pageData, list);
		});
	});
}

function showPageDelete(response, request, listId) {
	base.validateUser(request, response, true, function(user) {
		base.validateList(request, response, true, user, listId, function(list) {
			var pageData = new base.PageData();
			pageData.title = "Delete List - Node List";
			deletePage.build(response, request, pageData, list);
		});
	});
}

function List() {
	this.id = "";
	this.user_id = "";
	this.name = "";
	this.order_by = "";
	this.created = "";
	this.modified = "";
}

exports.create = create;
exports.update = update;
exports.updateTasks = updateTasks;
exports.deleteList = deleteList;
exports.showPageList = showPageList;
exports.showPageDetail = showPageDetail;
exports.showPageCreate = showPageCreate;
exports.showPageEdit = showPageEdit;
exports.showPageDelete = showPageDelete;
