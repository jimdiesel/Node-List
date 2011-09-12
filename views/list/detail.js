var base = require("../base");

function build(response, request, pageData, list, tasks) {
	console.log("tasks = " + tasks);
	var html = "";
	html = html + base.openPage(pageData);
	html = html +
		'<h1>Tasks for ' + list.name + '</h1>'+
		'<p><a href="/lists/' + list.id + '/add">Add a Task</a></p>'+
		'<form action="/lists/' + list.id + '" method="post">'+
		'<h2>Incomplete Tasks</h2>'+
		'<ul>';
	for (var i = 0;i < tasks.length;i++) {
		if (tasks[i].complete == '0') {
			html = html +
				'<li>'+
				'<label>'+
				'<input type="checkbox" name="' + tasks[i].id + '" />'+
				' <a href="/lists/' + list.id + '/' + tasks[i].id + '">' + tasks[i].name + '</a>'+
				'</label>'+
				'</li>';
		}
	}
	html = html +
		'</ul>'+
		'<h2>Completed Tasks</h2>'+
		'<ul>';
	for (var i = 0;i < tasks.length;i++) {
		if (tasks[i].complete == '1') {
			html = html +
				'<li>'+
				'<label>'+
				'<input type="hidden" name="' + tasks[i].id + '" value="0" />'+
				'<input type="checkbox" name="' + tasks[i].id + '" checked="checked" />'+
				' <a href="/lists/' + list.id + '/' + tasks[i].id + '">' + tasks[i].name + '</a>'+
				'</label>'+
				'</li>';
		}
	}
	html = html +
		'</ul>'+
		'<input type="submit" value="Update List" />'+
		'</form>';
	html = html + base.closePage(pageData);
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(html);
	response.end();
}

exports.build = build;
