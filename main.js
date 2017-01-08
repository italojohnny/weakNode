/*
 * Servico
 */

var Route = require("./include/route");
var Qs = require("querystring");
var Http = require("http");
var server = Http.createServer();
var port = 3000;

server.on("request", function(request, response, next) {

	request.body = "";
	var teste = function (request, callback) {
		if (request.method === "POST") {
			var body = [];
			request.on("data", function(chunk){
				body += chunk;

			}).on("end", function() {
				request.body = Qs.parse(body);
				callback();
			});
		} else
			callback();
	}

	teste(request, function() {
		var route = new Route(request.url, request.method, request.body);
		response.writeHead(route.statusCode, {"Content-Type":"text/html; charset=utf-8"});
		response.write(route.getPage());
		response.end();
	});
});

server.listen(port);
console.log("\nhttp://localhost:"+ port +"\n\nctrl+c para encerrar\n\n");
