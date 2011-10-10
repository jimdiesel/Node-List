var base = require("../base");

function build(response, request, pageData) {
	var html = '';
	html = html + base.openPage(pageData);
	var html = html + ''+
		'<p class="message">' + pageData.message + '</p>'+
		'<form action="/user/create" method="post">'+
		'<fieldset>'+
		'<label>'+
		'Name: '+
		'<input type="text" name="name" />'+
		'</label><br />'+
		'<label>'+
		'Email Address: '+
		'<input type="email" name="email" />'+
		'</label><br />'+
		'<label>'+
		'Re-enter Email: '+
		'<input type="email" name="email2" />'+
		'</label><br />'+
		'<label>'+
		'Password: '+
		'<input type="password" name="password" />'+
		'</label><br />'+
		'<label>'+
		'Re-enter Password: '+
		'<input type="password" name="password2" />'+
		'</label><br />'+
		'<button type="submit">Sign Up</button>'+
		'</fieldset>'+
		'</form>';
	html = html + base.closePage(pageData);
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(html);
	response.end();
}

exports.build = build;
