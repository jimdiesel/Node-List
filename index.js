var server = require("./server");
var router = require("./router");
var user = require("./controllers/user");

var handle = {}
handle["/"] = user.showPageUser;
handle["/user"] = user.showPageUser;
handle["/user/edit"] = user.showPageEdit;
handle["/user/login"] = user.showPageLogin;
handle["/user/create"] = user.showPageCreate;

server.start(router.route, handle);
