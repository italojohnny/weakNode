/*
 * Visualizacao
 */
var fs = require("fs");

var View = function (contentType, inputView) {
	this.filePath = __dirname+"/../";
	this.contentType = contentType;
	this.fileName = inputView["file"];
	this.inputVars = inputView["vars"];
	this.finalyPage;

	this.readFile(function(){
	});
};

View.prototype.readFile = function (callback) {

	if (this.contentType.match(/text/)) {
		if (this.fileName) {
			this.finalyPage = fs.readFileSync(this.filePath+this.fileName, function () {
				callback();
			});
		} else {
			this.finalyPage = this.inputVars.toString();
			callback();
		}

	} else if (this.contentType.match(/image/)) {
		//ler arquivo
		fs.readFile('static/image/forip.png', function(err, data) {
			//if (err) throw "vou ver isso ainda";
			this.finalyPage = data;
			callback();
		});

	} else {
		throw "Não há suporte para o conteúdo solicitado";
		callback();
	}
};

View.prototype.replaceExtend = function () {
	console.log("Replacing extends");
};

View.prototype.replaceInclude = function () {
	console.log("Replacing includes");
};

View.prototype.replaceBlock = function () {
	console.log("Replacing blocks");
};

View.prototype.replacePrint = function () {
	console.log("Replacing prints");
};

View.prototype.getPage = function() {
	return this.finalyPage.toString();
}

module.exports = View;
