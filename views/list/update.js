var base = require("../base");

function build(response, request, pageData, list) {
	var html = '';
	html = html + base.openPage(pageData);
	html = html + 
		'<a href="/list/' + list.id + '">&laquo; Back</a>'+
		'<p class="message">' + pageData.message + '</p>'+
		'<form action="/list/' + list.id + '/edit" method="post">'+
		'<fieldset>'+
		'<label>'+
		'Name: '+
		'<input type="text" name="name" value="' + list.name + '" />'+
		'</label><br />'+
		'<input type="submit" value="Update" />'+
		'</fieldset>'+
		'</form>';
	html = html.base.closePage(pageData);
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(html);
	response.end();
}

exports.build = build;
