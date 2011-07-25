var base = require("../base");

function build(response, request, pageData) {
	var html = '';
	html = html + base.openPage(pageData);
	html = html +
		'<h1>Welcome, </h1>'+ // need to pass user's name to this method
		'<ul>'+
		'<li><a href="/lists">View my lists</a></li>'+
		'</ul>';
	html = html + base.closePage(pageData);
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(html);
	response.end();
}

exports.build = build;
