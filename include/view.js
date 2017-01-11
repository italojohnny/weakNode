/*
 * Visualizacao
 */
var fs = require("fs");

var View = function (contentType, fileName, inputVars) {
	this.filePath = __dirname+"/../view/";
	this.contentType = contentType;
	this.fileName = fileName;
	this.inputVars = inputVars;
	this.finalyPage;

	this.readFile(function(){
	});
};

View.prototype.readFile = function (callback) {

	if (this.contentType.match(/text/)) {
		this.finalyPage = fs.readFileSync(this.filePath+this.fileName, function () {
			callback();
		});

	} else if (this.contentType.match(/image/)) {
		throw "ainda nao e possivel ler imagens"
		callback();

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
