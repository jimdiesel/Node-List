var base = require("../base");

function build(response, request, pageData, user) {
	var html = '';
	html = html + base.openPage(pageData);
	html = html +
		'<nav>'+
		'<a href="/user">&laquo; Back</a>'+
		'</nav>'+
		'<p class="message">' + pageData.message + '</p>'+
		'<p><a href="/user/delete/confirm">Delete my Account</a></p>'+
		'<form action="/user/edit" method="post">'+
		'<fieldset>'+
		'<label>'+
		'Email address: '+
		'<input type="text" name="email" value="' + user.email + '" />'+
		'</label><br />'+
		'<label>'+
		'Name: '+
		'<input type="email" name="name" value="' + user.name + '" />'+
		'</label><br />'+
		'<label>'+
		'Password <small>Only enter here if you wish to change your password</small>:'+
		'<input type="password" name="password" />'+
		'</label><br />'+
		'<label>'+
		'Re-Enter Password <small>Only if you\'ve entered a new password above</small>:'+
		'<input type="password" name="password2" />'+
		'</label><br />'+
		'<button type="submit">Update Profile</button>'+
		'</fieldset>'+
		'</form>';
	html = html + base.closePage(pageData);
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(html);
	response.end();
}

exports.build = build;
