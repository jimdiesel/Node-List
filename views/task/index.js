var base = require("../base");

function build(response, request, pageData, task, listId) {
	var html = '';
	var complete = (task.complete == '1') ? 'true' : 'false';
	html = html + base.openPage(pageData);
	if (task == 'undefined' || task == null) {
		html = html + '<h1>Task not found</h1>';
	} else {
		html = html +
			'<nav><a href="/lists/' + listId + '">&laquo; Back</a></nav>'+
			'<h1>' + task.name + '</h1>'+
			'<dl>'+
			'<dt>Note:</dt>'+
			'<dd>' + task.note + '</dd>'+
			'<dt>Complete:</dt>' +
			'<dd>' + complete  + '</dd>'+
			'<dt>Created:</dt>'+
			'<dd><time>' + task.created + '</time></dd>'+
			'<dt>Last Modified:</dt>'+
			'<dd><time>' + task.modified + '</time></dd>'+
			'</dl>'+
			'<a href="/lists/' + listId + '/' + task.id + '/edit">Edit this Task</a>';
	}
	html = html + base.closePage(pageData);
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(html);
	response.end();
}

exports.build = build;
