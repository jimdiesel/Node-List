var base = require("../base");

function build(response, request) {
	var pageData = {
		title = "Log in - Node List",
		metaDescription = "",
		metaKeywords = ""
	}
	var html = '';
	html += base.openPage(pageData);
	var html += ''+
		'<form action="/user/login" method="post">'+
		'<fieldset>'+
		'<label>'+
		'Email Address: '+
		'<input type="text" name="email" />'+
		'</label><br />'+
		'<label>'+
		'Password: '+
		'<input type="password" name="password" />'+
		'</label><br />'+
		'<input type="submit" value="Login" />'+
		'</fieldset>'
		'</form>';
	html += base.closePage(pageData);
	response.
}

exports.build = build;
