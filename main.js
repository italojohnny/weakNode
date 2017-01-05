/*
 * Servico
 */

var Route = require("./include/route");
var Http = require("http");
var server = Http.createServer();
var port = 3000;

server.on("request", function(request, response, next) {
	
	var teste = function (request, callback) {
		var body = [];
		request.on("data", function(chunk){
			body.push(chunk);
		});
		request.on("end", function() {
			request.body = Buffer.concat(body).toString();
			callback();
		});
	}

	teste(request, function() {
		console.log(request.body);
		var route = new Route(request);
		response.writeHead(route.statusCode, {"Content-Type":"text/html; charset=utf-8"});
		response.write(route.getPage());
		response.end();
	});


});

server.listen(port);
console.log("\nhttp://localhost:"+ port +"\n\nctrl+c para encerrar\n\n");
