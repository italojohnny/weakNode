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

// procura arquivo + funcao, executa e recebe retorno
Controller.prototype.main = function (callback) {
	var genericModule;
	var returnResult;

	// se arquivo existir, define modulo a ser carregado
	if (fs.existsSync(this.filePath+this.fileName+".js"))
		genericModule = require(this.filePath + this.fileName);

	else throw "Arquivo '"+ this.fileName +".js' não existe no diretório '"+ this.filePath +"'";

	// se existir a funcao no modulo, execute ela
	if (genericModule[this.functionName])
		this.output = genericModule[this.functionName](this.inputVariables, function(retorno) {
			returnResult = retorno;
		});

	else throw "Função '" + this.functionName + "' não foi encontrada no arquivo '" + this.filePath + this.fileName + ".js'";
	callback(this, returnResult);
};

// padroniza retorno da main
Controller.prototype.standardizeOutput = function (retorno, callback) {
	var typeOutput = typeof(retorno);

	// se o retorno e uma string terminada em ".html"
	if (typeOutput === "string" && retorno.match(/\.html$/))
		this.output = {file:retorno, vars:null};

	// se e uma string, number ou booleano
	else if (typeOutput.match(/string|number|boolean/))
		this.output = {file:null, vars:retorno};

	// se e um array
	else if (Array.isArray(retorno)) {

		// se o primeiro elemento do array e uma string terminada em ".html
		if (typeof(retorno[0]) === "string" && retorno[0].match(/\.html$/))
			this.output = {file:retorno[0], vars:retorno.slice(1, retorno.length)};

		else this.output = {file:null, vars:retorno};

	// se o retorno e um objeto
	} else if (typeOutput === "object") {

		// se esse objeto tem a propriedade "render"
		if ("render" in retorno) {
			var novo = {};
			for (i in Object.keys(retorno)) {
				if (Object.keys(retorno)[i] !== "render"){
					novo[Object.keys(retorno)[i]] = retorno[Object.keys(retorno)[i]];
				}
			}
			this.output = {file:retorno["render"], vars:novo};

		} else this.output = {file:null, vars: retorno};

	// se nao... lanca excecao
	} else throw `Tipo de retorno da controller '${this.fileName}/${this.functionName}' não é conhecido: '${typeOutput}'`;

	callback();
};

Controller.prototype.getOutput = function () {
	return this.output;
};

module.exports = Controller;
