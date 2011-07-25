var base = require("../base");

function build(response, request, pageData) {
	var html = '';
	html = html + base.openPage(pageData);
	html = html + ''+
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
	html = html + base.closePage(pageData);
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(html);
	response.end();
}

exports.build = build;
