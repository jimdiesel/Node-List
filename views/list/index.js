var base = require("../base");

function build(response, request, pageData, lists) {
	var html = "";
	html = html + base.openPage(pageData);
	html = html +
		'<nav><a href="/">&laquo; Back</a></nav>'+
		'<h1>Your Lists</h1>';
	if (lists != 'undefined' && lists != null) {
	html = html + '<ul>';
	for (var i = 0;i < lists.length;i++) {
		html = html +
			'<li><a href="/lists/' + lists[i].id + '">' + lists[i].name + '</a> [<a href="/lists/' + lists[i].id + '/delete/confirm">x</a>]</li>';
	}
	html = html +
		'</ul>'+
		'<p><a href="/lists/add">Create a new list</a></p>';
	} else {
		html = html+
			'<p>You don\'t have anything to do! Get started and <a href="/lists/add">create a list</a>.</p>';
	}
	html = html + base.closePage(pageData);
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(html);
	response.end();
}

exports.build = build;
