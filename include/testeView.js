

var http = require("http");
var fs = require("fs");
var server = http.createServer();
console.log(__dirname);

fs.readFile('../static/image/forip.png', function(err, data) {
	server.on("request", function(request, response){
		response.writeHead(200, {"Content-Type": "image/png"});
		response.write(data);
		response.end();
	}).listen(3001);
});
console.log("\nhttp://localhost:3001\n\nctrl+c para encerrar\n\n");
