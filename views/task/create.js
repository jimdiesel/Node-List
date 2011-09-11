var base = require("../base");

function build(response, request, pageData, listId) {
	var html = '';
	html = html + base.openPage(pageData);
	var html = html +
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
		'<input type="submit" value="Add Task" />'+
		'</fieldset>'+
		'</form>';
	html = html + base.closePage(pageData);
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(html);
	response.end();
}

exports.build = build;
