var base = require("../base");

function build(response, request, pageData, task, list) {
	var html = '';
	html = html + base.openPage(pageData);
	html = html +
		'<a href="/lists/' + list.id + '">&laquo; Back</a>'+
		'<h1>' + task.name + '</h1>'+
		'<p>' + task.note + '</p>';
	html = html + base.closePage(pageData);
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(html);
	response.end();
}

exports.build = build;
