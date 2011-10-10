var base = require("../base");

function build(response, request, pageData, list, tasks) {
	var html = "";
	html = html + base.openPage(pageData);
	html = html +
		'<nav><a href="/lists">&laquo; Back</a></nav>'+
		'<h1>Tasks for ' + list.name + '</h1>';
	if (tasks != 'undefined' && tasks != null) {
		html = html +
			'<p><small>Click \'x\' to delete a task</small></p>'+
			'<p><a href="/lists/' + list.id + '/add">Add a Task</a></p>'+
			'<form action="/lists/' + list.id + '" method="post">'+
			'<section>'+
			'<h2>Incomplete Tasks</h2>'+
			'<ul>';
		for (var i = 0;i < tasks.length;i++) {
			if (tasks[i].complete == '0') {
				html = html +
					'<li>'+
					'<label>'+
					'<input type="checkbox" name="' + tasks[i].id + '" />'+
					' <a href="/lists/' + list.id + '/' + tasks[i].id + '">' + tasks[i].name + '</a>'+
					' [<a href="/lists/' + list.id + '/' + tasks[i].id + '/delete/confirm">x</a>]'+
					'</label>'+
					'</li>';
			}
		}
		html = html +
			'</ul>'+
			'</section>'+
			'<section>'+
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
					' [<a href="/lists/' + list.id + '/' + tasks[i].id + '/delete/confirm">x</a>]'+
					'</label>'+
					'</li>';
			}
		}
		html = html +
			'</ul>'+
			'</section>'+
			'<input type="submit" value="Update List" />'+
			'</form>';
	} else {
		html = html +
		'<p>There are no tasks for this list. Why not <a href="/lists/' + list.id + '/add">add a task</a>?</p>';
	}
	html = html +
		'<a href="/lists/' + list.id + '/update">Rename this list</a>';
	html = html + base.closePage(pageData);
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(html);
	response.end();
}

exports.build = build;
