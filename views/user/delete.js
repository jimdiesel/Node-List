var base = require("../base");

function build(response, request, pageData) {
	var html = '';
	html = html + base.openPage(pageData);
	html = html + ''+
		'<h1>Delete Account</h1>'+
		'<p><strong>Are you sure you want to delete your account?</strong></p>'+
		'<p><a href="/user/delete">Yes</a> <a href="/user/edit">No</a></p>';
	html = html + base.closePage(pageData);
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(html);
	response.end();
}

exports.build = build;
