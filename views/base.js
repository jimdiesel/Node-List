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
		'<body>';
	return html;
}

function closePage(pageData) {
	var html = ''+
		'<script type="text/javascript" src="/_assets/js/jquery.js"></script>'+
		'</body>'+
		'</html>';
	return html;
}

exports.openPage = openPage;
exports.closePage = closePage;
