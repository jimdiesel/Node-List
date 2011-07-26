var base = requre("../base");

function build(response, request, pageData, lists) {
	var html = "";
	html = html + base.openPage(pageData);
	html = html +
		'<h1>Your Lists</h1>'+
		'<ul>';
	for (list in lists) {
		html = html +
			'<li><a href="/lists/' + list.id + '">' + list.name + '</a></li>';
	}
	html = html +
		'</ul>'+
		'<p><a href="/lists/add">Create a new list</a></p>';
	html = html + base.closePage(pageData);
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(html);
	response.end();
}

exports.build = build;
