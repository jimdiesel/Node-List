var base = require("../base");

function build(response, request, pageData) {
	var html = '';
	html = html + base.openPage(pageData);
	var html = html + ''+
		'<form action="/user/create" method="post">'+
		'<fieldset>'+
		'<label>'+
		'Name: '+
		'<input type="text" name="name" />'+
		'</label><br />'+
		'<label>'+
		'Email Address: '+
		'<input type="text" name="email" />'+
		'</label><br />'+
		'<label>'+
		'Re-enter Email: '+
		'<input type="text" name="email2" />'+
		'</label><br />'+
		'<label>'+
		'Password: '+
		'<input type="password" name="password" />'+
		'</label><br />'+
		'<label>'+
		'Re-enter Password: '+
		'<input type="password" name="password2" />'+
		'</label><br />'+
		'<input type="submit" value="Sign Up" />'+
		'</fieldset>'+
		'</form>';
	html = html + base.closePage(pageData);
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(html);
	response.end();
}

exports.build = build;
