var querystring = require("querystring"),
	formidable = require("formidable"),
	loginPage = require("../layouts/user/login"),
	createPage = require("../layouts/user/create");

function login(response, request, pageData) {
	var form = new formidable.IncomingForm();
	form.parse(request, function(error, fields, files) {
		// validate form data, then
		// put code to hash password and check the database here
		// call loginPage.build if email/password are invalid
		// otherwise redirect to /user
		// fields to check are:
		// email
		// password
	});
}

function update(response, request, pageData) {

}

function select(response, request, pageData) {

}

function create(response, request, pageData) {

}

function showPageLogin(response, request) {
	var pageData = {
		title:  "Log in - Node List",
		metaDescription: "",
		metaKeywords:  ""
	}
	// not sure if this is the best way to do this, will revisit
	if (request.method.toLowerCase() == 'post') {
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
	var pageData = {
		title: "Create Account - Node List",
		metaDescription: "",
		metaKeywords: ""
	}
	if (request.method.toLowerCase() == 'post') {
		create(response, request, pageData);
	} else {
		createPage.build(response, request, pageData);
	}
}

exports.login = login;
exports.update = update;
exports.select = select;
exports.create = create;
exports.showPageLogin = showPageLogin;
exports.showPageUser = showPageUser;
exports.showPageEdit = showPageEdit;
exports.showPageCreate = showPageCreate;
