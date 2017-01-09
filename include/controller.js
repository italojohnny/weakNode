/*
 * Controle
 */

var fs = require("fs");

var Controller = function (fileName, functionName, inputVariables) {
	this.filePath = __dirname+"/../controller/";
	this.fileName = fileName;
	this.functionName = functionName;
	this.inputVariables = inputVariables;
	this.output = {};

	this.main(function() {});
};

Controller.prototype.main = function (callback) {
	var genericModule;
	if (fs.existsSync(this.filePath+this.fileName+".js"))
		genericModule = require(this.filePath + this.fileName);
	else
		throw "Arquivo '"+ this.fileName +".js' não existe no diretório '"+ this.filePath +"'";

	if (genericModule[this.functionName])
		this.output = genericModule[this.functionName](this.inputVariables);
	else
		throw "Função '" + this.functionName + "' não foi encontrada no arquivo '" + this.filePath + this.fileName + ".js'";
	callback();
};

Controller.prototype.getOutput = function () {
	return this.output;
};

module.exports = Controller;
