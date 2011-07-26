var listPage = require("../views/list/index");

function create(response, request, pageData) {

}

function update(response, request, pageData) {

}

function deleteList(response, request, pageData) {

}

function showPageList(response, request) {

}

function showPageCreate(response, request) {

}

function showPageEdit(response, request) {

}

function List() {
	this.id = "";
	this.user_id = "";
	this.name = "";
	this.order = "";
	this.created = "";
	this.modified = "";
}

exports.create = create;
exports.update = update;
exports.deleteList = deleteList;
exports.showPageList = showPageList;
exports.showPageCreate = showPageCreate;
exports.showPageEdit = showPageEdit;
