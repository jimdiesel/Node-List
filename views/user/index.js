var base = require("../base");

function build(response, request, pageData, user) {
	var html = '';
	html = html + base.openPage(pageData);
	html = html +
		'<h1>Welcome, ' + user.name + '</h1>'+
		'<ul>'+
		'<li><a href="/lists">View my lists</a></li>'+
		'<li><a href="/user/edit">Edit my profile</a></li>'+
		'</ul>';
	html = html + base.closePage(pageData);
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(html);
	response.end();
}

exports.build = build;
