var base = require("../base");

function build(pageData) {
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
	return html;
}

exports.build = build;
