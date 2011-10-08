function PageData() {
	this.title = '';
	this.metaDescription = '';
	this.metaKeywords = '';
	this.message = '';
}

function validateUser(request, response, id, callback) {
	if (request.session.data.user != null && request.session.data.user != '' && request.session.data.user != 'undefined') {
		userDb.selectById(request.session.data.user, function(user) {
			if (user == null || user == 'undefined') {
				redirectToLogin(response);
			} else {
				if (callback && typeof(callback) == 'function') {
					callback();
				}
			}
		});
	} else {
		redirectToLogin(response);
	}
}

function redirectToLogin(response) {
	response.writeHead(302, {"Location": "/user/login"});
	response.end();
}

exports.PageData = PageData;
