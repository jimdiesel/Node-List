var base = require("../base");

function build(response, request, pageData) {
	var html = '';
	html = html + base.openPage(pageData);
	html = html + ''+
		'<p class="message">' + pageData.message + '</p>'+
		'<form action="/user/login" method="post">'+
		'<fieldset>'+
		'<label>'+
		'Email Address: '+
		'<input type="email" name="email" />'+
		'</label><br />'+
		'<label>'+
		'Password: '+
		'<input type="password" name="password" />'+
		'</label><br />'+
		'<button type="submit">Login</button>'+
		'</fieldset>'+
		'</form>'+
		'<p>Not a user? <a href="/user/create">Create an Account</a>.</p>';
	html = html + base.closePage(pageData);
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(html);
	response.end();
}

exports.build = build;
