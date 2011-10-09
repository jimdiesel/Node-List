var querystring = require("querystring"),
	formidable = require("formidable"),
	loginPage = require("../views/user/login"),
	createPage = require("../views/user/create"),
	userPage = require("../views/user/index"),
	editPage = require("../views/user/edit"),
	userDb = require("../models/user"),
	base = require("./base"),
	http = require("http"),
	session = require("../node_modules/sesh/lib/core").magicSession();
require("joose");
require("joosex-namespace-depended");
require("hash");

function login(response, request, pageData) {
	var form = new formidable.IncomingForm();
	form.parse(request, function(error, fields, files) {
		userDb.selectByEmail(fields["email"], function (user) {
			if (user == null || user == 'undefined') {
				pageData.message = "Email address does not exist. Please try another email address.";
				loginPage.build(response, request, pageData);
			} else if (Hash.sha1(fields["password"]) != user.password) {
				pageData.message = "Password is incorrect. Please try again.";
				loginPage.build(response, request, pageData);
			} else {
				request.session.data.user = user.id;
				response.writeHead(302, {"Location": "/user"});
				response.end();
			}
		});
	});
}

function update(response, request, pageData) {
	var user = new User();
	var form = new formidable.IncomingForm();
	form.parse(request, function(error, fields, files) {
		// TODO: add form validation later
		user.id = request.session.data.user;
		user.email = fields["email"];
		user.name = fields["name"];
		if (fields["password"] != "") {
			user.password = Hash.sha1(fields["password"]);
		}
		userDb.update(user, function(success) {
			if (success) {
				pageData.message = "Update successful";
			} else {
				pageData.message = "Error updating your profile. Please try again";
			}
			editPage.build(response, request, pageData, user);
		});
	});
}

function create(response, request, pageData) {
	var user = new User();
	var form = new formidable.IncomingForm();
	form.parse(request, function(error, fields, files) {
		// TODO: need to add form validation
		user.email = fields["email"];
		user.password = Hash.sha1(fields["password"]);
		user.name = fields["name"];
		user = userDb.create(user);
		request.session.data.user = user.id;
		response.writeHead(302, {"Location": "/user"});
		response.end();
	});
}

function showPageLogin(response, request) {
	var pageData = new base.PageData();
	pageData.title = "Log In - Node List";

	// TODO: not sure if this is the best way to do this, will revisit
	if (request.method.toLowerCase() == 'post') {
		login(response, request, pageData);
	} else {
		loginPage.build(response, request, pageData);
	}
}

function showPageUser(response, request) {
	base.validateUser(request, response, function(user) {
		var pageData = new base.PageData();
		pageData.title = "Home - Node List";
		userPage.build(response, request, pageData, user);
	});
}

function showPageEdit(response, request) {
	var pageData = new base.PageData();
	pageData.title = "Edit Profile - Node List";

	if (request.session.data.user != null && request.session.data.user != 'undefined' && request.session.data.user != '') {
		if (request.method.toLowerCase() == 'post') {
			update(response, request, pageData);
		} else {
			userDb.selectById(request.session.data.user, function(user) {
				if (user == null || user == 'undefined') {
					response.writeHead(302, {"Location": "/user/login"});
					response.end();
				} else {
					editPage.build(response, request, pageData, user);
				}
			});
		}
	} else {
		response.writeHead(302, {"Location": "/user/login"});
		response.end();
	}
}

function showPageCreate(response, request) {
	var pageData = new base.PageData();
	pageData.title = "Create Account - Node List";

	if (request.method.toLowerCase() == 'post') {
		create(response, request, pageData);
	} else {
		createPage.build(response, request, pageData);
	}
}

function User() {
	this.id = "";
	this.email = "";
	this.password = "";
	this.name = "";
	this.created = "";
	this.modified = "";
	this.last_login = "";
}

exports.login = login;
exports.update = update;
exports.create = create;
exports.showPageLogin = showPageLogin;
exports.showPageUser = showPageUser;
exports.showPageEdit = showPageEdit;
exports.showPageCreate = showPageCreate;
exports.User = User;
