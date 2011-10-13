var base = require("./base");

function build(response, request, pageData) {
	var html = '';
	html = html + base.openPage(pageData);
	html = html +
		'<h1>Error</h1>'+
		'<p>' + pageData.message + '</p>';
	html = html + base.closePage(pageData);
	response.writeHead(500, {"Content-Type": "text/html"});
	response.write(html);
	response.end();
}

exports.build = build;
