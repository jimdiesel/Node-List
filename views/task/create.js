var base = require("../base");

function build(response, request, pageData, listId) {
	var html = '';
	html = html + base.openPage(pageData);
	var html = html +
		'<nav><a href="/lists/' + listId + '">&laquo; Back</a></nav>'+
		'<p class="message">' + pageData.message + '</p>'+
		'<form action="/lists/' + listId + '/add" method="post">'+
		'<fieldset>'+
		'<label>'+
		'Name: '+
		'<input type="text" name="name" />'+
		'</label><br />'+
		'<label>'+
		'Note: '+
		'<textarea name="note" rows="2" cols="20"></textarea>'+
		'</label><br />'+
		'<button type="submit">Add Task</button>'+
		'</fieldset>'+
		'</form>';
	html = html + base.closePage(pageData);
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(html);
	response.end();
}

exports.build = build;
