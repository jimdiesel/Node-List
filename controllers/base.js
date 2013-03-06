var userDb = require("../models/user"),
	listDb = require("../models/list"),
	taskDb = require("../models/task"),
	userController = require('./user'),
	listController = require('./list'),
	taskController = require('./task'),
	querystring = require("querystring"),
	http = require("http"),
	errorPage = require("../views/error"),
	notFoundPage = require("../views/404"),
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
					//TODO: Return User object
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
						//TODO: Return List object
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

function validateTask(request, response, redirect, user, list, taskId, callback) {
	var validate = new Validate();
	if (validate.Integer(taskId) == true) {
		taskDb.selectById(taskId, function(task) {
			if (task == null || task == 'undefined') {
				if (redirect == true) {
					redirectToError(request, response, "Task does not exist");
				} else {
					return false;
				}
			} else {
				if (task.list_id != list.id) {
					if (redirect == true) {
						redirectToError(request, response, "Task is not part of this list");
					} else {
						return false;
					}
				} else {
					if (callback && typeof(callback) == 'function') {
						var returnTask = new taskController.Task();
						returnTask.id = task.id;
						returnTask.list_id = task.list_id;
						returnTask.name = task.name;
						returnTask.note = task.note;
						returnTask.complete = task.complete;
						returnTask.order_by = task.order_by;
						returnTask.created = task.created;
						returnTask.modified = task.modified;

						returnTask.SetDue(task.due);

						callback(returnTask);
					} else {
						return true;
					}
				}
			}
		});
	} else {
		if (redirect == true) {
			redirectToError(request, response, "Task does not exist");
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

function redirectTo404(request, response) {
	var pageData = new PageData();
	pageData.title = "Page Not Found - Node List";
	notFoundPage.build(response, request, pageData);
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
		var result = parseInt(field);
		if (!isNaN(result) && isFinite(result)) {
			return true;
		} else {
			return false;
		}
	},
	this.DateFormat = function(field) {
		var format = /^(\d{2})\-(\d{2})\-(\d{4})$/;
		if (format.test(field)) {
			var dateFormat = new Date(field);
			if (dateFormat == null || dateFormat == undefined) {
				return false;
			}
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

	return input;
}

exports.PageData = PageData;
exports.validateUser = validateUser;
exports.validateList = validateList;
exports.validateTask = validateTask;
exports.isLoggedIn = isLoggedIn;
exports.redirectToLogin = redirectToLogin;
exports.redirectToError = redirectToError;
exports.redirectTo404 = redirectTo404;
exports.Validate = Validate;
exports.sanitize = sanitize;
