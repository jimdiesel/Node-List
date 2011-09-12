var server = require("./server");
var router = require("./router");
var controllerBase = require("./controllers/base");
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
// use showPage function to handle POST request for now
// refactor to go directly to the update function eventually
.post('/user/edit', function(request, response, path) {
	user.showPageEdit(response, request);
})
.get('/user/login', function(request, response, path) {
	user.showPageLogin(response, request);
})
.post('/user/login', function(request, response, path) {
	user.showPageLogin(response, request);
})
.get('/user/create', function(request, response, path) {
	user.showPageCreate(response, request);
})
.post('/user/create', function(request, response, path) {
	user.showPageCreate(response, request);
})
.get('/lists', function(request, response, path) {
	list.showPageList(response, request);
})
.get('/lists/add', function(request, response, path) {
	list.showPageCreate(response, request);
})
.post('/lists/add', function(request, response, path) {
	list.showPageCreate(response, request);
})
.get('/lists/*', function(request, response, listId) {
	list.showPageDetail(response, request, listId);
})
.post('/lists/*', function(request, response, listId) {
	var pageData = new controllerBase.PageData();
	pageData.title = "Incomplete Tasks - Node List";
	list.updateTasks(response, request, pageData, listId);
})
.get('/lists/*/update', function(request, response, listId) {
	list.showPageEdit(response, request, listId);
})
.post('/lists/*/update', function(request, response, listId) {
	list.showPageEdit(response, request, listId);
})
.get('/lists/*/add', function(request, response, listId) {
	task.showPageCreate(response, request, listId);
})
.post('/lists/*/add', function(request, response, listId) {
	task.showPageCreate(response, request, listId);
})
.get('/lists/*/*', function(request, response, list, task) {
	// task detail page
})
.notFound(function(request, response) {
	response.writeHead(404, {"Content-Type": "text/html"});
	response.write("<h1>You done goofed - Page not found</h1>");
	response.end();
});

http.createServer(router).listen(8888);
