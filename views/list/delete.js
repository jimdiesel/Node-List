var base = require("../base");

function build(response, request, pageData, list) {
	var html = '';
	html = html + base.openPage(pageData);
	html = html +
		'<h1>Delete List</h1>'+
		'<p><strong>Are you sure you want to delete ' + list.name + '?</strong></p>'+
		'<p><a href="/lists/' + list.id + '/delete">Yes</a> <a href="/lists">No</a></p>';
	html = html + base.closePage(pageData);
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(html);
	response.end();
}

exports.build = build;
