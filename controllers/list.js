var listPage = require("../views/list/index"),
	createPage = require("../views/list/create"),
	updatePage = require("../views/list/update"),
	detailPage = require("../views/list/detail"),
	deletePage = require("../views/list/delete"),
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
		// TODO: add form validation
		//name is required
		list.userId = request.session.data.user;
		list.name = fields["name"];
		listDb.create(list, list.userId, function(list) {
			if (list) {
				response.writeHead(302, {"Location": "/lists/" + list.id});
				response.end();
			} else {
				pageData.message = "Error creating list. Please try again";
				createPage.build(response, request, pageData);
			}
		});
	});
}

function update(response, request, pageData, listId) {
	var list = new List();
	var form = new formidable.IncomingForm();
	form.parse(request, function(error, fields, files) {
		// TODO: add form validation
		// name field is required
		list.id = listId;
		list.user_id = request.session.data.user;
		list.name = fields["name"];
		listDb.update(list, function(success) {
			if (success) {
				response.writeHead(302, {"Location": '/lists/' + listId});
				response.end();
			} else {
				pageData.message = "Error updating list. Please try again";
				updatePage.build(response, request, pageData, list);
			}
		});
	});
}

function updateTasks(response, request, pageData, listId) {
	var form = new formidable.IncomingForm();
	form.parse(request, function(error, fields, files) {
		var tasks = [];
		for(key in fields) {
			// TODO: check if field name is numeric
			// since all field names on the form are
			// numbered checkboxes, this can be
			// done later
			
			var complete = (fields[key].indexOf('on') != -1) ? 1 : 0;
			//taskDb.updateComplete(key, complete);
			tasks.push({id: key, complete: complete});
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
		listDb.deleteById(listId, function(success) {
			response.writeHead(302, {"Location": "/lists"});
			response.end();
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
		var pageData = new base.PageData();
		pageData.title = "Incomplete Tasks - Node List";
		if (request.method.toLowerCase == 'post') {
			updateTasks(response, request, pageData);
		} else {
			taskDb.selectByListId(listId, function(tasks) {
				listDb.selectById(listId, function(list) {
					detailPage.build(response, request, pageData, list, tasks);
				});
			});
		}
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
		var pageData = new base.PageData();
		pageData.title = "Edit List - Node List";
		if (request.method.toLowerCase() == "post") {
			update(response, request, pageData, listId);
		} else {
			listDb.selectById(listId, function(list) {
				if (list == null || list == 'undefined') {
					response.writeHead(302, {"Location": "/user/login"});
				}
				updatePage.build(response, request, pageData, list);
			});
		}
	});
}

function showPageDelete(response, request, listId) {
	base.validateUser(request, response, true, function(user) {
		listDb.selectById(listId, function(list) {
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
