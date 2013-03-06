var base = require("../../base");

function build(response, request, pageData, list) {
	var html = '';
	html = html + base.openPage(pageData);
	html = html + 
		'<nav><a href="/lists/' + list.id + '">&laquo; Back</a></nav>'+
		'<p class="message">' + pageData.message + '</p>'+
		'<form action="/lists/' + list.id + '/update" method="post">'+
		'<fieldset>'+
		'<label>'+
		'Name: '+
		'<input type="text" name="name" value="' + list.name + '" />'+
		'</label><br />'+
		'<button type="submit">Update</button>'+
		'</fieldset>'+
		'</form>';
	html = html + base.closePage(pageData);
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(html);
	response.end();
}

exports.build = build;
