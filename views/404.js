var base = require("./base");

function build(response, request, pageData) {
	var html = '';
	html = html + base.openPage(pageData);
	html = html +
		'<h1>Page Not Found</h1>'+
		'<p>You probably thought this was a real page. Nope, just Chuck Testa.</p>'+
		'<p><a href="/">Return Home</a></p>';
	html = html + base.closePage(pageData);
	response.writeHead(404, {"Content-Type": "text/html"});
	response.write(html);
	response.end();
}

exports.build = build;
