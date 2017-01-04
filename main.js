/*
 * Servico
 */

var Route = require("./include/route");
var Http = require("http");
var server = Http.createServer();
var port = 3000;

server.on("request", function(request, response) {
	var route = new Route(request);

	response.writeHead(route.status, {"Content-Type":"text/html; charset=utf-8"});
	response.write(route.getPage());
	response.end();
});

server.listen(port);
console.log("\nhttp://localhost:"+ port +"\n\nctrl+c para encerrar\n\n");
