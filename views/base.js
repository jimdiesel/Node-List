function openPage(pageData) {
	var html = ''+
		'<!DOCTYPE html>'+
		'<html>'+
		'<head>'+
		'<title>' + pageData.title + '</title>'+
		'<meta charset="utf-8" />'+
		'<meta name="description" content="' + pageData.metaDescription + '" />'+
		'<meta name="keywords" content="' + pageData.metaKeywords + '" />'+
		'<link rel="stylesheet" media="screen" href="/_assets/css/site.css" />'+
		'<link rel="shortcut icon" href="/_assets/img/favicon.ico" />'+
		'<body>'+
		'<div id="container">'+
		'<header>'+
		'<h1>Node List</h1>'+
		'<nav>'+
		'<a href="/">Home</a>'+
		'<a href="/lists">Lists</a>'+
		'<a href="/user/edit">Account</a>'+
		'<a href="/user/logout">Log Out</a>'+
		'</nav>'+
		'</header>'+
		'<section id="content">';
	return html;
}

function closePage(pageData) {
	var html = ''+
		'</section>'+
		'</div>'+
		'<footer>'+
		'<script type="text/javascript" src="/_assets/js/jquery.js"></script>'+
		'</footer>'+
		'</body>'+
		'</html>';
	return html;
}

exports.openPage = openPage;
exports.closePage = closePage;
