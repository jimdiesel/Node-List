var querystring = require("querystring"),
	formidable = require("formidable"),
	login = require("../layouts/user/login");

function login(response, request) {

}

function update(response, request) {

}

function select(response, request) {

}

function create(response, request) {

}

function showPageLogin(response, request) {
	login.build(response, request);
}

function showPageUser(response, request) {

}

function showPageEdit(response, request) {

}

function showPageCreate(response, request) {

}

exports.login = login;
exports.update = update;
exports.select = select;
exports.create = create;
exports.showPageLogin = showPageLogin;
exports.showPageUser = showPageUser;
exports.showPageEdit = showPageEdit;
exports.showPageCreate = showPageCreate;
