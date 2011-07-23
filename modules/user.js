var querystring = require("querystring"),
	formidable = require("formidable"),
	loginPage = require("../layouts/user/login");

function login(response, request) {
	var form = new formidable.IncomingForm();
	form.parse(request, function(error, fields, files) {
		// put code to hash password and check the database here
		// call loginPage.build if email/password are invalid
		// otherwise redirect to /user
		// fields to check are:
		// email
		// password
	});
}

function update(response, request) {

}

function select(response, request) {

}

function create(response, request) {

}

function showPageLogin(response, request) {
	// not sure if this is the best way to do this, will revisit
	if (request.method.toLowerCase() == 'post') {
		login(response, request);
	} else {
		loginPage.build(response, request);
	}
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
