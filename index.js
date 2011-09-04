var server = require("./server");
var router = require("./router");
var user = require("./controllers/user");
var list = require("./controllers/list");
var http = require("http"),
	router = require("choreographer").router();

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
.notFound(function(request, response) {
	response.writeHead(404, {"Content-Type": "text/html"});
	response.write("<h1>You done goofed - Page not found</h1>");
	response.end();
});

http.createServer(router).listen(8888);
