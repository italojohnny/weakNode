/*
 * Tratamento de erros
 */
var fs = require("fs");

var Error = function() {
	var d = new Date();
	this.filePath = __dirname+"/../error/";
	this.fileName = new Date(+d - d.getTimezoneOffset() *60*1000).toISOString().split(/[TZ]/).slice(0, 2).join('').replace(/-|:|\./g, '');
};

Error.prototype.makePage = function(titulo, subtitulo, mensagem) {
	var page = "<!DOCTYPE html><html lang='pt-br'>"+
	"<head><meta charset='utf-8'><title>"+titulo+"</title></head><body>"+
	"<h1>"+ titulo +"</h1>"+
	"<h3>"+ subtitulo+"</h3><hr>"+
	"<pre>"+ mensagem + "</pre><hr>"+
	"<a href='/'>Voltar</a>"+
	"</body></html>";
	return page;
};

Error.prototype.savePage = function () {

};

module.exports = Error;
