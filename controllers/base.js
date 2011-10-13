var userDb = require("../models/user"),
	querystring = require("querystring"),
	http = require("http"),
	session = require("../node_modules/sesh/lib/core").magicSession();
require("joose");
require("joosex-namespace-depended");
require("hash");

function PageData() {
	this.title = '';
	this.metaDescription = '';
	this.metaKeywords = '';
	this.message = '';
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

exports.PageData = PageData;
exports.validateUser = validateUser;
exports.isLoggedIn = isLoggedIn;
exports.redirectToLogin = redirectToLogin;
exports.Validate = Validate;
