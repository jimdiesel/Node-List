var listPage = require("../views/list/index"),
	base = require("./base"),
	listDb = require("../models/list"),
	formidable = require("formidable"),
	http = require("http"),
	session = require("../node_modules/sesh/lib/core").magicSession();

function create(response, request, pageData) {

}

function update(response, request, pageData) {

}

function deleteList(response, request, pageData) {

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

function showPageDetail(response, request) {

}

function showPageCreate(response, request) {

}

function showPageEdit(response, request) {

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
