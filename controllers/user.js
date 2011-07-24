var querystring = require("querystring"),
	formidable = require("formidable"),
	loginPage = require("../views/user/login"),
	createPage = require("../views/user/create"),
	userDb = require("../models/user"),
	base = require("./base");
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
				// set login cookie and redirect to /user
				// for now just display a success message
				response.writeHead(200, {"Content-Type": "text/plain"});
				response.write("Login successful");
				response.end();
			}
		});
	});
}

function update(response, request, pageData) {

}

function select(response, request, pageData) {

}

function create(response, request, pageData) {
	var user = new User();
	var form = new formidable.IncomingForm();
	form.parse(request, function(error, fields, files) {
		// need to add form validation
		user.email = fields["email"];
		user.password = Hash.sha1(fields["password"]);
		user.name = fields["name"];
		user = userDb.create(user);
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write("WOO HOO! Id: " + user.id);
		response.end();
	});
}

function showPageLogin(response, request) {
	var pageData = new base.PageData();
	pageData.title = "Log In - Node List";

	// not sure if this is the best way to do this, will revisit
	if (request.method.toLowerCase() == 'post') {
		console.log("Post data detected. Attempting to log in.");
		login(response, request, pageData);
	} else {
		loginPage.build(response, request, pageData);
	}
}

function showPageUser(response, request) {

}

function showPageEdit(response, request) {

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
exports.select = select;
exports.create = create;
exports.showPageLogin = showPageLogin;
exports.showPageUser = showPageUser;
exports.showPageEdit = showPageEdit;
exports.showPageCreate = showPageCreate;
exports.User = User;
