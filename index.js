var server = require("./server");
var router = require("./router");
var user = require("./modules/user");

var handle = {}
handle["/"] = user.showPageUser;
handle["/user"] = user.showPageUser;
handle["/user/edit"] = user.showPageEdit;
handle["/user/login"] = user.showPageLogin;
handle["/user/create"] = user.showPageCreate;

server.start(router.route, handle);
