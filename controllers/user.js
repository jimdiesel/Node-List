var querystring = require("querystring"),
	formidable = require("formidable"),
	loginPage = require("../views/user/login"),
	createPage = require("../views/user/create"),
	userPage = require("../views/user/index"),
	editPage = require("../views/user/edit"),
	deletePage = require("../views/user/delete"),
	userDb = require("../models/user"),
	base = require("./base"),
	http = require("http"),
	session = require("../node_modules/sesh/lib/core").magicSession();
require("joose");
require("joosex-namespace-depended");
require("hash");

function login(response, request) {
	var pageData = new base.PageData();
	var form = new formidable.IncomingForm();

	pageData.title = "Log In - Node List";
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

function deleteUser(response, request) {
	// TODO: call method to delete user from database
	// check if user is logged in first
}

function showPageLogin(response, request) {
	var loggedIn = base.validateUser(request, response, false);
	if (loggedIn == false) {
		var pageData = new base.PageData();
		pageData.title = "Log In - Node List";
	
		if (request.method.toLowerCase() == 'post') {
			login(response, request, pageData);
		} else {
			loginPage.build(response, request, pageData);
		}
	} else {
		response.writeHead(302, {"Location": "/user"});
		response.end();
	}
}

function showPageUser(response, request) {
	base.validateUser(request, response, true, function(user) {
		var pageData = new base.PageData();
		pageData.title = "Home - Node List";
		userPage.build(response, request, pageData, user);
	});
}

function showPageEdit(response, request) {
	base.validateUser(request, response, true, function(user) {
		var pageData = new base.PageData();
		pageData.title = "Edit Profile - Node List";
		editPage.build(response, request, pageData, user);
	});
}

function showPageCreate(response, request) {
	var loggedIn = base.validateUser(request, response, false);
	if (loggedIn == false) {
		var pageData = new base.PageData();
		pageData.title = "Create Account - Node List";
	
		if (request.method.toLowerCase() == 'post') {
			create(response, request, pageData);
		} else {
			createPage.build(response, request, pageData);
		}
	} else {
		response.writeHead(302, {"Location": "/user"});
		response.end();
	}
}

function showPageDelete(response, request) {
	base.validateUser(request, response, true, function(user) {
		var pageData = new base.PageData();
		pageData.title = "Delete Account - Node List";
		deletePage.build(response, request, pageData);
	});
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
exports.deleteUser = deleteUser;
exports.showPageLogin = showPageLogin;
exports.showPageUser = showPageUser;
exports.showPageEdit = showPageEdit;
exports.showPageCreate = showPageCreate;
exports.User = User;
