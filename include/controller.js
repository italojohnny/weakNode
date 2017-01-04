/*
 * Controle
 */

var Controller = function (fileName, functionName, inputVariables) {
	this.filePath = __dirname+"/../controller/";
	this.fileName = fileName;
	this.functionName = functionName;
	this.inputVariables = inputVariables;
	this.output = {};
}

Controller.prototype.getOutput = function () {
	return this.output;
};

module.exports = Controller;
