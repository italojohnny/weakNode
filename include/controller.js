/*
 * Controle
 */

var fs = require("fs");

var Controller = function (fileName, functionName, inputVariables) {
	this.filePath = __dirname+"/../app/controller/";
	this.fileName = fileName;
	this.functionName = functionName;
	this.inputVariables = inputVariables;
	this.output = {};

	this.main(function(that, retorno) {
		that.standardizeOutput(retorno, function() {});
	});
};

Controller.prototype.main = function (callback) {
	var genericModule;
	var italo;
	if (fs.existsSync(this.filePath+this.fileName+".js"))
		genericModule = require(this.filePath + this.fileName);
	else
		throw "Arquivo '"+ this.fileName +".js' não existe no diretório '"+ this.filePath +"'";

	if (genericModule[this.functionName])
		this.output = genericModule[this.functionName](this.inputVariables, function(retorno){
			italo = retorno;
		});
	else
		throw "Função '" + this.functionName + "' não foi encontrada no arquivo '" + this.filePath + this.fileName + ".js'";
	callback(this, italo);
};

Controller.prototype.standardizeOutput = function (retorno, callback) {
	var typeOutput = typeof(retorno);

	console.log(typeOutput);

	if (typeOutput === "string" && retorno.match(/\.html$/)) {
		this.output = {file:retorno, vars:null};

	} else if (typeOutput.match(/string|number|boolean/)) {
		this.output = {file:null, vars:retorno};

	} else if (Array.isArray(retorno)) {

		if (typeof(retorno[0]) === "string" && retorno[0].match(/\.html$/)) {// array com arquivo.html
			this.output = {file:retorno[0], vars:retorno.slice(1, retorno.length)};

		}else {
			this.output = {file:null, vars:retorno};}

	} else if (typeOutput === "object") {

		if ("render" in retorno) { // caso objeto com arquivo.html
			var novo = {};
			for (i in Object.keys(retorno)) {
				if (Object.keys(retorno)[i] !== "render"){
					novo[Object.keys(retorno)[i]] = retorno[Object.keys(retorno)[i]];
				}
			}
			this.output = {file:retorno["render"], vars:novo};

		} else {
			this.output = {file:null, vars: retorno};
		}
	} else { throw `Tipo de retorno da controller '${this.fileName}/${this.functionName}' não é conhecido: '${typeOutput}'`; }
	console.log(this.output);
	callback();
};

Controller.prototype.getOutput = function () {
	return this.output;
};

module.exports = Controller;
