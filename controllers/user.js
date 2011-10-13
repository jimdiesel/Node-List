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
		var email = base.sanitize(fields["email"]);
		userDb.selectByEmail(email, function (user) {
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

function update(response, request) {
	var pageData = new base.PageData();
	var user = new User();
	var form = new formidable.IncomingForm();

	pageData.title = "Update Profile - Node List";
	form.parse(request, function(error, fields, files) {
		var validate = new base.Validate();
		var isValid = true;

		user.id = request.session.data.user;
		user.email = base.sanitize(fields["email"]);
		user.name = base.sanitize(fields["name"]);

		if (validate.Required(fields["email"]) == false) {
			isValid = false;
			pageData.message = pageData.message + "Email is required<br />";
		} else if (validate.Email(fields["email"]) == false) {
			isValid = false;
			pageData.message = pageData.message + "Email is not valid<br />";
		}
		if (validate.Required(fields["name"]) == false) {
			isValid = false;
			pageData.message = pageData.message + "Name is required<br />";
		}

		if (fields["password"] != "") {
			user.password = Hash.sha1(fields["password"]);
			if (fields["password"] != fields["password2"]) {
				isValid = false;
				pageData.message = pageData.message + "Passwords do not match";
			}
		}
		if (isValid == true) {
			userDb.selectById(user.email, function(existingUser) {
				if (existingUser == null) {
					userDb.update(user, function(success) {
						if (success) {
							pageData.message = "Update successful";
						} else {
							pageData.message = "Error updating your profile. Please try again";
						}
						editPage.build(response, request, pageData, user);
					});
				} else {
					pageData.message = pageData.message + "Email address is already used. Please try another one<br />";
					editPage.build(response, request, pageData, user);
				}
			});
		} else {
			editPage.build(response, request, pageData, user);
		}
	});
}

function create(response, request) {
	var pageData = new base.PageData();
	var user = new User();
	var form = new formidable.IncomingForm();

	pageData.title = "Create Account - Node List";
	form.parse(request, function(error, fields, files) {
		var validate = new base.Validate();
		var isValid = true;

		user.email = base.sanitize(fields["email"]);
		user.password = Hash.sha1(fields["password"]);
		user.name = base.sanitize(fields["name"]);

		if (validate.Required(user.name) == false) {
			isValid = false;
			pageData.message = pageData.message + "Tell us your name<br />";
		}
		if (validate.Required(user.email) == false) {
			isValid = false;
			pageData.message = pageData.message + "Email is required<br />";
		} else if (validate.Email(user.email) == false) {
			isValid = false;
			pageData.message = pageData.message + "Email is invalid<br />";
		}
		if (fields["email"] != fields["email2"]) {
			isValid = false;
			pageData.message = pageData.message + "Emails do not match<br />";
		}
		if (validate.Required(fields["password"]) == false) {
			isValid = false;
			pageData.message = pageData.message + "Password is required<br />";
		}
		if (fields["password"] != fields["password2"]) {
			isValid = false;
			pageData.message = pageData.message + "Passwords do not match<br />";
		}

		if (isValid == true) {
			userDb.selectByEmail(user.email, function(existingUser) {
				if (existingUser == null) {
					userDb.create(user, function(user) {
						request.session.data.user = user.id;
						response.writeHead(302, {"Location": "/user"});
						response.end();
					});
				} else {
					pageData.message = pageData.message + "Email is already used. Please try another one.";
					createPage.build(response, request, pageData);
				}
			});
		} else {
			createPage.build(response, request, pageData);
		}
	});
}

function deleteUser(response, request) {
	base.validateUser(request, response, true, function(user) {
		userDb.deleteById(user.id, function() {
			request.session.data.user = "Guest";
			base.redirectToLogin(response);
		});
	});
}

function logout(response, request) {
	request.session.data.user = "Guest";
	base.redirectToLogin(response);
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
		createPage.build(response, request, pageData);
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
exports.logout = logout;
exports.showPageLogin = showPageLogin;
exports.showPageUser = showPageUser;
exports.showPageEdit = showPageEdit;
exports.showPageCreate = showPageCreate;
exports.showPageDelete = showPageDelete;
exports.User = User;
