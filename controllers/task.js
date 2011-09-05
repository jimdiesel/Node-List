var taskPage = require("../views/task/index"),
	createPage = require("../views/task/create"),
	//updatePage = require("../views/task/update"),
	base = require("./base"),
	taskDb = require("../models/task"),
	listDb = require("../models/list"),
	formidable = require("formidable"),
	http = require("http"),
	session = require("../node_modules/sesh/lib/core").magicSession();

function create(response, request, pageData, list) {

}

function update(response, request, pageData) {

}

function deleteTask(response, request, pageData) {
	
}

function showPageDetail(response, request, id) {

}

function showPageCreate(response, request, listId) {
	var pageData = new base.PageData();
	pageData.title = "Add Task - Node List";

	if (request.session.data.user != null && request.session.data.user != "undefined" && request.session.user != "") {
		listDb.selectById(listId, function(list) {
			if (request.method.toLowerCase() == 'post') {
				create(response, request, pageData, list);
			} else {
				createPage.build(response, request, pageData, list);
			}
		});
	} else {
		response.writeHead(302, {"Location": "/user/login"});
		response.end();
	}
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
