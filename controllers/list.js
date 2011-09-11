var listPage = require("../views/list/index"),
	createPage = require("../views/list/create"),
	updatePage = require("../views/list/update"),
	detailPage = require("../views/list/detail"),
	base = require("./base"),
	listDb = require("../models/list"),
	taskDb = require("../models/task"),
	formidable = require("formidable"),
	http = require("http"),
	session = require("../node_modules/sesh/lib/core").magicSession();

function create(response, request, pageData) {
	var list = new List();
	var form = new formidable.IncomingForm();
	console.log("Request object:");
	for(key in request.headers.connection) {
		console.log(key + " = " + request[key]);
	}
	form.parse(request, function(error, fields, files) {
		//add form validation
		//name is required
		list.userId = request.session.data.user;
		list.name = fields["name"];
		listDb.create(list, list.userId, function(success) {
			if (success) {
				// TODO: redirect user to new list page
				// implement once ids can be included in urls
				pageData.message = "List created successfully";
			} else {
				pageData.message = "Error creating list. Please try again";
			}
			createPage.build(response, request, pageData);
		});
	});
}

function update(response, request, pageData, listId) {
	var list = new List();
	var form = new formidable.IncomingForm();
	form.parse(request, function(error, fields, files) {
		// add form validation
		// name field is required
		list.id = listId;
		list.user_id = request.session.data.user;
		list.name = fields["name"];
		listDb.update(list, function(success) {
			if (success) {
				pageData.message = "List updated successfully";
			} else {
				pageData.message = "Error updating list. Please try again";
			}
			updatePage.build(response, request, pageData, list);
		});
	});
}

function deleteList(response, request, pageData) {
	// in list model, call delete function
	// in task modle, call delete by list id function
}

function showPageList(response, request) {
	var pageData = new base.PageData();
	pageData.title = "Your Lists - Node List";

	if (request.session.data.user != null && request.session.data.user != "undefined" && request.session.data.user != "") {
		listDb.selectByUserId(request.session.data.user, function(lists) {
			listPage.build(response, request, pageData, lists);
		});
	} else {
		response.writeHead(302, {"Location": "/user/login"});
		response.end();
	}
}

function showPageDetail(response, request, listId) {
	var pageData = new base.PageData();
	pageData.title = "Incomplete Tasks - Node List";

	if (request.session.data.user != null && request.session.data.user != 'undefined' && request.session.data.user != "") {
		taskDb.selectByListId(listId, function(tasks) {
			listDb.selectById(listId, function(list) {
				detailPage.build(response, request, pageData, list, tasks);
			});
		});
	} else {
		response.writeHead(302, {"Location": "/user/login"});
		response.end();
	}
}

function showPageCreate(response, request) {
	var pageData = new base.PageData();
	pageData.title = "Create List - Node List";

	if (request.session.data.user != null && request.session.data.user != "undefined" && request.session.data.user != "") {
		if (request.method.toLowerCase() == 'post') {
			create(response, request, pageData);
		} else {
			createPage.build(response, request, pageData);
		}
	} else {
		response.writeHead(302, {"Location": "/user/login"});
	}
}

function showPageEdit(response, request, listId) {
	var pageData = new base.PageData();
	pageData.title = "Edit List - Node List";

	if (request.session.data.user != null && request.session.data.user != "undefined" && request.session.data.user != "") {
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
	} else {
		response.writeHead(302, {"Location": "/user/login"});
	}
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
exports.deleteList = deleteList;
exports.showPageList = showPageList;
exports.showPageDetail = showPageDetail;
exports.showPageCreate = showPageCreate;
exports.showPageEdit = showPageEdit;
