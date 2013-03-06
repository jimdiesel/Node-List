var base = require("../../base");

function build(response, request, pageData, listId, task) {
	var html = '';
	html = html + base.openPage(pageData);
	html = html +
		'<h1>Delete Task</h1>'+
		'<p><strong>Are you sure you want to delete ' + task.name + '?</strong></p>'+
		'<p><a href="/lists/' + listId + '/' + task.id + '/delete">Yes</a> <a href="/lists/' + listId + '">No</a></p>';
	html = html + base.closePage(pageData);
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(html);
	response.end();
}

exports.build = build;
