/*
 * Roteamento
 */

var querystring = require("querystring");

var Controller = require("./controller");
var View = require("./view");
var Error = require("./error");

var Route = function (request) {
	this.request = request;
	this.statusCode = 200;

	this.fileName;
	this.functionName;
	this.inputVars;

	this.controller;
	this.view;
	this.error;

	this.analyzeURL;
	this.debbuging;
};

Route.prototype.analyzeURL = function () {
	var regexResult;
	if (regexResult = this.request.url.match(/^\/?$/)) {
		this.setNames("default", "index");

	} else if (regexResult = this.request.url.match(/^\/(\w+)\/(\w+)\/?$/)) {
		this.setNames(regexResult[1], regexResult[2]);

	} else if (regexResult = this.request.url.match(/^\/(\w+)\/(\w+)\/(.+)\/?$/)) {
		this.setNames(regexResult[1], regexResult[2], regexResult[3]);

	} else {
		// TODO melhorar tratamento de erro
		throw "url solicitada e invalida";
		this.statusCode = 404;
	}
};

Route.prototype.setNames = function (file, func, vars) {
	this.fileName = file;
	this.functionName = func;

	if (this.request.method == "GET") {
		if (typeof(vars) === "string")
			this.inputVars = vars.split("/");

	} else if (this.request.method == "POST") {
		// TODO preciso de ajuda aqui
	}
};

Route.prototype.getPage = function () {
	return "<h1>URL: "+this.request.url+"</h1>"+
	"<br/><ul>"+
	"<li><a href='/default/caso5'>caso5</a></li>" +
	"</ul>"+
	"<hr/><form method='POST' action='/default/formulario'>"+
	"<input type='text' name='empresa' /><br/>"+
	"<input type='text' name='nome' /><br/>"+
	"<input type='submit' />"+
	"</form>";
};

Route.prototype.debbuging = function () {
	console.log("\n\n----DEBBUGING ROUTE----");
	console.log(this.inputVars);
};

module.exports = Route;
