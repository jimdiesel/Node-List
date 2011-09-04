var listPage = require("../views/list/index"),
	createPage = require("../views/list/create"),
	base = require("./base"),
	listDb = require("../models/list"),
	formidable = require("formidable"),
	http = require("http"),
	session = require("../node_modules/sesh/lib/core").magicSession();

function create(response, request, pageData) {
	var list = new List();
	var form = new formidable.IncomingForm();
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
