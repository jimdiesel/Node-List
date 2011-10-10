var server = require("./server");
var router = require("./router");
var user = require("./controllers/user");
var list = require("./controllers/list");
var task = require("./controllers/task");
var http = require("http"),
	router = require("choreographer").router();

router.ignoreCase = true;

router.get('/', function(request, response, path) {
	user.showPageUser(response, request);
})
.get('/user', function(request, response, path) {
	user.showPageUser(response, request);
})
.get('/user/edit', function(request, response, path) {
	user.showPageEdit(response, request);
})
.post('/user/edit', function(request, response, path) {
	user.update(response, request);
})
.get('/user/login', function(request, response, path) {
	user.showPageLogin(response, request);
})
.post('/user/login', function(request, response, path) {
	user.login(response, request);
})
.get('/user/create', function(request, response, path) {
	user.showPageCreate(response, request);
})
.post('/user/create', function(request, response, path) {
	user.create(response, request);
})
.get('/user/delete', function(request, response, path) {
	user.deleteUser(response, request);
})
.get('/user/delete/confirm', function(request, response, path) {
	user.showPageDelete(response, request);
})
.get('/user/logout', function(request, response, path) {
	user.logout(response, request);
})
.get('/lists', function(request, response, path) {
	list.showPageList(response, request);
})
.get('/lists/add', function(request, response, path) {
	list.showPageCreate(response, request);
})
.post('/lists/add', function(request, response, path) {
	list.create(response, request);
})
.get('/lists/*', function(request, response, listId) {
	list.showPageDetail(response, request, listId);
})
.post('/lists/*', function(request, response, listId) {
	list.updateTasks(response, request, listId);
})
.get('/lists/*/update', function(request, response, listId) {
	list.showPageEdit(response, request, listId);
})
.post('/lists/*/update', function(request, response, listId) {
	list.update(response, request, listId);
})
.get('/lists/*/delete/confirm', function(request, response, listId) {
	list.showPageDelete(response, request, listId);
})
.get('/lists/*/delete', function(request, response, listId) {
	list.deleteList(response, request, listId);
})
.get('/lists/*/add', function(request, response, listId) {
	task.showPageCreate(response, request, listId);
})
.post('/lists/*/add', function(request, response, listId) {
	task.create(response, request, listId);
})
.get('/lists/*/*', function(request, response, listId, taskId) {
	task.showPageDetail(response, request, listId, taskId);
})
.get('/lists/*/*/edit', function(request, response, listId, taskId) {
	task.showPageUpdate(response, request, listId, taskId);
})
.post('/lists/*/*/edit', function(request, response, listId, taskId) {
	task.update(response, request, listId, taskId);
})
.get('/lists/*/*/delete/confirm', function(request, response, listId, taskId) {
	task.showPageDelete(response, request, listId, taskId);
})
.get('/lists/*/*/delete', function(request, response, listId, taskId) {
	task.deleteTask(response, request, listId, taskId);
})
.notFound(function(request, response) {
	response.writeHead(404, {"Content-Type": "text/html"});
	response.write("<h1>You done goofed - Page not found</h1>");
	response.end();
});

http.createServer(router).listen(8888);
