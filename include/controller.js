/*
 * Controle
 */

var fs = require("fs");
var appIndex = require("../app/index");

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
	if (typeof(genericModule[this.functionName]) === "function") {

		var request = {input:this.inputVariables, session:appIndex()}; // TODO aperfeicoar esse parametro

		this.output = genericModule[this.functionName](request, function(retorno) {
			//console.log(request.session.title);
			returnResult = {output: retorno, session:request.session};
		});

	} else throw "Função '" + this.functionName + "' não foi encontrada no arquivo '" + this.filePath + this.fileName + ".js'";
	callback(this, returnResult);
};

// padroniza retorno da main
Controller.prototype.standardizeOutput = function (retorno, callback) { // TODO corrigir toda a funcao para tornar claro o que esta acontecendo com a 'sessao' e as variaveis normais
	var typeOutput = typeof(retorno.output);

	// se o retorno e uma string terminada em ".html"
	if (typeOutput === "string" && retorno.output.match(/\.html$/))
		this.output = {file:retorno.output, vars:null};

	// se e uma string, number ou booleano
	else if (typeOutput.match(/string|number|boolean/))
		this.output = {file:null, vars:retorno};

	// se e um array
	else if (Array.isArray(retorno.output)) {

		// se o primeiro elemento do array e uma string terminada em ".html
		if (typeof(retorno.output[0]) === "string" && retorno.output[0].match(/\.html$/))
			this.output = {file:retorno.output[0], vars:retorno.output.slice(1, retorno.output.length)};

		else this.output = {file:null, vars:retorno.output};

	// se o retorno e um objeto
	} else if (typeOutput === "object") {

		// se esse objeto tem a propriedade "render"
		if ("render" in retorno.output) {
			var novo = {};
			for (i in Object.keys(retorno.output)) {
				if (Object.keys(retorno.output)[i] !== "render"){
					novo[Object.keys(retorno.output)[i]] = retorno.output[Object.keys(retorno.output)[i]];
				}
			}
			this.output = {file:retorno.output["render"], vars:{output:novo, session:retorno.session}}; // TODO aperfeicoar esse parametro

		} else this.output = {file:null, vars: retorno};

	// se nao... lanca excecao
	} else throw `Tipo de retorno da controller '${this.fileName}/${this.functionName}' não é conhecido: '${typeOutput}'`;

	callback();
};

Controller.prototype.getOutput = function () {
	return this.output;
};

module.exports = Controller;
