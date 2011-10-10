var base = require("../base");

function build(response, request, pageData, task, listId) {
	var html = '';
	html = html + base.openPage(pageData);
	if (task == 'undefined' || task == null) {
		html = html + '<h1>Task not found</h1>';
	} else {
		html = html +
			'<h1>Edit Task</h1>'+
			'<form action="/lists/' + listId + '/' + task.id + '/edit" method="post">'+
			'<fieldset>'+
			'<label>'+
			'Name: '+
			'<input type="text" name="name" value="' + task.name + '" />'+
			'</label><br />'+
			'<label>'+
			'Note: '+
			'<textarea name="note" rows="2" cols="20">' + task.note + '</textarea>'+
			'</label><br />'+
			'<button type="submit">Update Task</button>'+
			'</fieldset>'+
			'</form>';
		html = html + base.closePage(pageData);
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(html);
		response.end();
}

exports.build = build;
