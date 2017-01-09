/*
 * Tratamento de erros
 */
var fs = require("fs");

var Error = function() {
	var d = new Date();

	this.filePath = __dirname+"/../error/";
	this.fileName = new Date(+d - d.getTimezoneOffset() *60*1000).toISOString().split(/[TZ]/).slice(0, 2).join('').replace(/-|:|\./g, '');
};

Error.prototype.makePage = function(titulo="404: route", subtitulo="url solicitada invalida", mensagem="explicacao completa") {
	var page = "<!DOCTYPE html><html lang='pt-br'>"+
	"<head><meta charset='utf-8'><title>"+titulo+"</title></head><body>"+
	"<h1>"+ titulo +"</h1>"+
	"<h3>"+ subtitulo+"</h3><hr>"+
	"<pre>"+ mensagem + "</pre><hr>"+
	"</body></html>";
	return page;
};

Error.prototype.savePage = function () {


};


module.exports = Error;

/*
var http = require("http");
var fs = require("fs");
var d = new Date();
var fileName = new Date(+d - d.getTimezoneOffset() *60*1000).toISOString().split(/[TZ]/).slice(0, 2).join('').replace(/-|:|\./g, '') + ".html";

http.get("http://loripsum.net/api/5/", function(res){
	var text = "";
	res.on("data", function(chunk){
		text += chunk;
	}).on("end", function(){
		fs.writeFile(fileName, text, function(){
			console.log("arquivo "+fileName+" pronto");
		});
	});
});
*/
