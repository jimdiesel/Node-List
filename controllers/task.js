var taskPage = require("../views/task/index"),
	createPage = require("../views/task/create"),
	updatePage = require("../views/task/update"),
	base = require("./base"),
	taskDb = require("../models/task"),
	formidable = require("formidable"),
	http = require("http"),
	session = require("../node_modules/sesh/lib/core").magicSession();

function create(response, request, pageData) {

}

function update(response, request, pageData) {

}

function deleteTask(response, request, pageData) {

}

function showPageDetail(response, request, pageData, id) {

}

function showPageCreate(response, request, pageData) {

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
