var base = require("../../base");

function build(response, request, pageData) {
	var html = "";
	html = html + base.openPage(pageData);
	html = html +
		'<nav><a href="/lists">&laquo; Back</a></nav>'+
		'<h1>Create List</h1>'+
		'<p class="message">' + pageData.message + '</p>'+
		'<form action="/lists/add" method="post">'+
		'<label>'+
		'List Name: '+
		'<input type="text" name="name" />'+
		'</label><br />'+
		'<button type="submit">Create List</button>'+
		'</form>';
	html = html + base.closePage(pageData);
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(html);
	response.end();
}

exports.build = build;
