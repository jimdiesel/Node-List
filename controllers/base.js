var userDb = require("../models/user"),
	listDb = require("../models/list"),
	querystring = require("querystring"),
	http = require("http"),
	errorPage = require("../views/error"),
	session = require("../node_modules/sesh/lib/core").magicSession();
require("joose");
require("joosex-namespace-depended");
require("hash");

function PageData() {
	this.bodyClass = '';
	this.title = '';
	this.metaDescription = '';
	this.metaKeywords = '';
	this.message = '';
	this.statusCode = 200;
}

function validateUser(request, response, redirect, callback) {
	if (isLoggedIn(request) == true) {
		userDb.selectById(request.session.data.user, function(user) {
			if (user == null || user == 'undefined') {
				if (redirect == true) {
					redirectToLogin(response);
				} else {
					return false;
				}
			} else {
				if (callback && typeof(callback) == 'function') {
					callback(user);
				} else {
					return true;
				}
			}
		});
	} else {
		if (redirect == true) {
			redirectToLogin(response);
		} else {
			return false;
		}
	}
}

function validateList(request, response, redirect, user, listId, callback) {
	var validate = new Validate();
	if (validate.Integer(listId) == true) {
		listDb.selectById(listId, function(list) {
			if (list == null || list == 'undefined') {
				if (redirect == true) {
					redirectToError(request, response, "List does not exist");
				} else {
					return false;
				}
			} else {
				if (list.user_id != user.id) {
					if (redirect == true) {
						redirectToError(request, response, "You don't have permission to view this list");
					} else {
						return false;
					}
				} else {
					if (callback && typeof(callback) == 'function') {
						callback(list);
					} else {
						return true;
					}
				}
			}
		});
	} else {
		if (redirect == true) {
			redirectToError(request, response, "List does not exist");
		} else {
			return false;
		}
	}
}

function isLoggedIn(request) {
	if (request.session != undefined && request.session != null && request.session.data.user != undefined && request.session.data.user != null && request.session.data.user != '' && request.session.data.user != 'undefined' && request.session.data.user != "Guest") {
		return true;
	} else {
		return false;
	}
}

function redirectToLogin(response) {
	response.writeHead(302, {"Location": "/user/login"});
	response.end();
}

function redirectToError(request, response, message) {
	var pageData = new PageData();
	pageData.title = "Error - Node List";
	pageData.message = message;
	errorPage.build(response, request, pageData);
}

function Validate() {
	this.Email = function(field) {
		// taken from http://www.marketingtechblog.com/design/javascript-regex-emailaddress/
		var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if (filter.test(field)) {
			return true;
		} else {
			return false;
		}
	},
	this.Required = function(field) {
		if (field != "") {
			return true;
		} else {
			return false;
		}
	},
	this.Integer = function(field) {
		if (parseInt(field) != Number.NaN) {
			return true;
		} else {
			return false;
		}
	}
}

function sanitize(input) {
	// simple method to sanitize inputs
	// escapes quotes and replaces > and < with html entities
	// TODO: revisit with more sophisticated sanitization method

	input = input.replace('>', '&gt;');
	input = input.replace('<', '&lt;');
	input = input.replace('\\\'', '\'');
	input = input.replace('\'', '\\\'');
	input = input.replace('\\\"', '\"');
	input = input.replace('\"', '\\\"');

	return input;
}

exports.PageData = PageData;
exports.validateUser = validateUser;
exports.validateList = validateList;
exports.isLoggedIn = isLoggedIn;
exports.redirectToLogin = redirectToLogin;
exports.redirectToError = redirectToError;
exports.Validate = Validate;
exports.sanitize = sanitize;
