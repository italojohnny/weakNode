/*
 * Roteamento
 */

var qs = require('querystring');
var Controller = require("./controller");
var View = require("./view");
var Error = require("./error");

var Route = function (request) {
	this.request = request;
	this.statusCode = 200;

	this.fileName;
	this.functionName;
	this._inputVars = "italo";

	this.controller;
	this.view;
	this.error;

	this.analyzeURL(request.url);
	setTimeout(function(){
		console.log(this._inputVars + " TESTE");
	},100);
};

Route.prototype.analyzeURL = function (url) {
	console.log("1");
	this.getVariables(this.request, function() {
	console.log("2");
		console.log(this._inputVars);
		var regexResult;
		if (regexResult = url.match(/^\/?$/)) {
			this.fileName = "default";
			this.functionName = "index";

		} else if (regexResult = url.match(/^\/(\w+)\/(\w+)\/?$/)) {
			this.fileName = regexResult[1];
			this.functionName = regexResult[2];

		} else if (regexResult = url.match(/^\/(\w+)\/(\w+)\/(.+)\/?$/)) {
			this.fileName = regexResult[1];
			this.functionName = regexResult[2];
			this._inputVars = regexResult[3].split("/");

		} else {
			// TODO melhorar tratamento de erro
			throw "url solicitada e invalida";
			this.statusCode = 404;
		}

	});
};

Route.prototype.getVariables = function (request, callback) {
	console.log("3");
	//if (request.method == "GET") {
		//if (typeof(vars) === "string")
			//this._inputVars = vars.split("/");
	//	callback();

	//} else if (request.method == "POST") {
		var body = '';
		request.on("data", function(chunk){
			body += chunk;
		}).on("end", function() {
			console.log("4");
			this._inputVars = qs.parse(body);
			console.log(this._inputVars);
			console.log("5");
			callback();
			console.log("6");
		});
	//}
	console.log(this._inputVars);
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
	console.log("teste", this._inputVars);
};

module.exports = Route;
