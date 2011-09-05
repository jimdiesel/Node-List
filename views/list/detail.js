var base = require("../base");

function build(response, request, pageData, tasks) {
	var html = "";
	html = html + base.openPage(pageData);
	html = html +
		'<h1>Tasks to Complete</h1>'+ // TODO: pull in name of list
		'<ul>';
	for (var i = 0;i < tasks.length;i++) {
		html = html +
			'<li>'+
			'<label>'+
			'<input type="checkbox" name="' + task.id + '" />'+
			' ' + task.name+
			'</label>'+
			'</li>';
	}
	html = html +
		'</ul>'+
		'<input type="submit" value="Update List" />';
	html = html + base.closePage(pageData);
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(html);
	response.end();
}

exports.build = build;
