var server = require("./server");
var router = require("./router");
var user = require("./controllers/user");
var list = require("./controllers/list");

var handle = {}
handle["/"] = user.showPageUser;
handle["/user"] = user.showPageUser;
handle["/user/edit"] = user.showPageEdit;
handle["/user/login"] = user.showPageLogin;
handle["/user/create"] = user.showPageCreate;
handle["/lists"] = list.showPageList;

server.start(router.route, handle);
