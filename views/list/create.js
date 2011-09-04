var base = require("../base");

function build(response, request, pageData) {
	var html = "";
	html = html + base.openPage(pageData);
	html = html +
		'<h1>Create List</h1>'+
		'<form action="/list/add" method="post">'+
		'<label>'+
		'List Name: '+
		'<input type="text" name="name" />'+
		'</label>'+
		'</form>';
	html = html + base.closePage(pageData);
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(html);
	response.end();
}

exports.build = build;
