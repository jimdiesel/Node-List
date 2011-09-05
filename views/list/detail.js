var base = require("../base");

function build(response, request, pageData, list, tasks) {
	console.log("tasks = " + tasks);
	var html = "";
	html = html + base.openPage(pageData);
	html = html +
		'<h1>Tasks for ' + list.name + '</h1>'+
		'<p><a href="/lists/' + list.id + '/add">Add a Task</a></p>'+
		'<ul>';
	for (var i = 0;i < tasks.length;i++) {
		html = html +
			'<li>'+
			'<label>'+
			'<input type="checkbox" name="' + tasks[i].id + '" />'+
			' ' + tasks[i].name+
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
