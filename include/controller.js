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
	this.standardizeOutput(function() {});
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

Controller.prototype.standardizeOutput = function (callback) {
	var typeOutput = typeof(this.output);

	if (typeOutput === "string" && this.output.match(/\.html$/)) {
		this.output = {file:this.output, vars:null};

	} else if (typeOutput.match(/string|number|boolean/)) {
		this.output = {file:null, vars:this.output};

	} else if (Array.isArray(this.output)) {

		if (typeof(this.output[0]) === "string" && this.output[0].match(/\.html$/))// array com arquivo.html
			this.output = {file:this.output[0], vars:this.output.slice(1, this.output.length)};

		else
			this.output = {file:null, vars:this.output};

	} else if (typeOutput === "object") {

		if ("render" in this.output) { // caso objeto com arquivo.html
			var novo = {};
			for (i in Object.keys(this.output)) {
				if (Object.keys(this.output)[i] !== "render")
					novo[Object.keys(this.output)[i]] = this.output[Object.keys(this.output)[i]];
			}
			this.output = {file:this.output["render"], vars:novo};

		} else {
			this.output = {file:null, vars: this.output};
		}

	} else {
		throw `Tipo de retorno da controller '${this.fileName}/${this.functionName}' não é conhecido: '${typeOutput}'`;
	}
	callback();
};

Controller.prototype.getOutput = function () {
	return this.output;
};

module.exports = Controller;
