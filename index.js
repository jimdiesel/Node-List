var user = require("./controllers/user");
var list = require("./controllers/list");
var task = require("./controllers/task");
var http = require("http");
var fs = require("fs");
var path = require("path");
var router = require("choreographer").router();
var controllers = require("./controllers/base");

router.ignoreCase = true;

router.get(/^\/_assets\//, function(request, response, path) {
	serveStaticFile(request, response, '.' + request.url);
})
.get('/', function(request, response, path) {
	user.showPageUser(response, request);
})
.get('/user', function(request, response, path) {
	user.showPageUser(response, request);
})
.get('/user/', function(request, response, path) {
	user.showPageUser(response, request);
})
.get('/user/edit', function(request, response, path) {
	user.showPageEdit(response, request);
})
.post('/user/edit', function(request, response, path) {
	user.update(response, request);
})
.get('/user/edit/', function(request, response, path) {
	user.showPageEdit(response, request);
})
.post('/user/edit/', function(request, response, path) {
	user.update(response, request);
})
.get('/user/login', function(request, response, path) {
	user.showPageLogin(response, request);
})
.post('/user/login', function(request, response, path) {
	user.login(response, request);
})
.get('/user/login/', function(request, response, path) {
	user.showPageLogin(response, request);
})
.post('/user/login/', function(request, response, path) {
	user.login(response, request);
})
.get('/user/create', function(request, response, path) {
	user.showPageCreate(response, request);
})
.post('/user/create', function(request, response, path) {
	user.create(response, request);
})
.get('/user/create/', function(request, response, path) {
	user.showPageCreate(response, request);
})
.post('/user/create/', function(request, response, path) {
	user.create(response, request);
})
.get('/user/delete', function(request, response, path) {
	user.deleteUser(response, request);
})
.get('/user/delete/', function(request, response, path) {
	user.deleteUser(response, request);
})
.get('/user/delete/confirm', function(request, response, path) {
	user.showPageDelete(response, request);
})
.get('/user/delete/confirm/', function(request, response, path) {
	user.showPageDelete(response, request);
})
.get('/user/logout', function(request, response, path) {
	user.logout(response, request);
})
.get('/user/logout/', function(request, response, path) {
	user.logout(response, request);
})
.get('/lists', function(request, response, path) {
	list.showPageList(response, request);
})
.get('/lists/', function(request, response, path) {
	list.showPageList(response, request);
})
.get('/lists/add', function(request, response, path) {
	list.showPageCreate(response, request);
})
.post('/lists/add', function(request, response, path) {
	list.create(response, request);
})
.get('/lists/add/', function(request, response, path) {
	list.showPageCreate(response, request);
})
.post('/lists/add/', function(request, response, path) {
	list.create(response, request);
})
.get('/lists/*', function(request, response, listId) {
	list.showPageDetail(response, request, listId);
})
.post('/lists/*', function(request, response, listId) {
	list.updateTasks(response, request, listId);
})
.get('/lists/*/', function(request, response, listId) {
	list.showPageDetail(response, request, listId);
})
.post('/lists/*/', function(request, response, listId) {
	list.updateTasks(response, request, listId);
})
.get('/lists/*/update', function(request, response, listId) {
	list.showPageEdit(response, request, listId);
})
.post('/lists/*/update', function(request, response, listId) {
	list.update(response, request, listId);
})
.get('/lists/*/update/', function(request, response, listId) {
	list.showPageEdit(response, request, listId);
})
.post('/lists/*/update/', function(request, response, listId) {
	list.update(response, request, listId);
})
.get('/lists/*/delete/confirm', function(request, response, listId) {
	list.showPageDelete(response, request, listId);
})
.get('/lists/*/delete/confirm/', function(request, response, listId) {
	list.showPageDelete(response, request, listId);
})
.get('/lists/*/delete', function(request, response, listId) {
	list.deleteList(response, request, listId);
})
.get('/lists/*/delete/', function(request, response, listId) {
	list.deleteList(response, request, listId);
})
.get('/lists/*/add', function(request, response, listId) {
	task.showPageCreate(response, request, listId);
})
.post('/lists/*/add', function(request, response, listId) {
	task.create(response, request, listId);
})
.get('/lists/*/add/', function(request, response, listId) {
	task.showPageCreate(response, request, listId);
})
.post('/lists/*/add/', function(request, response, listId) {
	task.create(response, request, listId);
})
.get('/lists/*/*', function(request, response, listId, taskId) {
	task.showPageDetail(response, request, listId, taskId);
})
.get('/lists/*/*/', function(request, response, listId, taskId) {
	task.showPageDetail(response, request, listId, taskId);
})
.get('/lists/*/*/edit', function(request, response, listId, taskId) {
	task.showPageUpdate(response, request, listId, taskId);
})
.post('/lists/*/*/edit', function(request, response, listId, taskId) {
	task.update(response, request, listId, taskId);
})
.get('/lists/*/*/edit/', function(request, response, listId, taskId) {
	task.showPageUpdate(response, request, listId, taskId);
})
.post('/lists/*/*/edit/', function(request, response, listId, taskId) {
	task.update(response, request, listId, taskId);
})
.get('/lists/*/*/delete/confirm', function(request, response, listId, taskId) {
	task.showPageDelete(response, request, listId, taskId);
})
.get('/lists/*/*/delete/confirm/', function(request, response, listId, taskId) {
	task.showPageDelete(response, request, listId, taskId);
})
.get('/lists/*/*/delete', function(request, response, listId, taskId) {
	task.deleteTask(response, request, listId, taskId);
})
.get('/lists/*/*/delete/', function(request, response, listId, taskId) {
	task.deleteTask(response, request, listId, taskId);
})
.notFound(function(request, response) {
	controllers.redirectTo404(request, response);
});

var port = process.env.PORT || 8888;
http.createServer(router).listen(port);

function serveStaticFile(request, response, filePath) {
	var ext = path.extname(filePath);
	var contentType = "text/plain";

	switch(ext) {
		case '.js':
			contentType = "text/javascript";
			break;
		case '.css':
			contentType = "text/css";
			break;
		case '.jpg':
			contentType = "image/jpeg";
			break;
		case '.png':
			contentType = "image/png";
			break;
		case '.gif':
			contentType = "image/gif";
			break;
	}

	path.exists(filePath, function(exists) {
		if (exists) {
			fs.readFile(filePath, function(error, content) {
				if (error) {
					controllers.redirectToError(request, response, "Error serving file");
				} else {
					response.writeHead(200, {"Content-Type": contentType});
					response.write(content);
					response.end();
				}
			});
		} else {
			controllers.redirectTo404(request, response);
		}
	});
}
