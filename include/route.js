/*
 * Roteamento
 */

var Controller = require("./controller");
var View = require("./view");
var Error = require("./error");

var Route = function(url, metodo, variaveis) {
	this.url = url;
	this.metodo = metodo;
	this.statusCode = 200;

	this.fileName = "";
	this.functionName = "";
	this.inputVars = variaveis;

	this.controller;
	this.view;
	this.error;

	this.finalyPage = "";
	//---------------------------------
	setTimeout(function(){console.log("primeiro")}, 300);
	setTimeout(function(){console.log("segundo")}, 200);
	this.analyzeURL();
	setTimeout(function(){console.log("terceiro")}, 100);
	//---------------------------------
};

Route.prototype.analyzeURL = function () {
	var regexResult;
	if (regexResult = this.url.match(/^\/?$/)) {
		this.fileName = "default";
		this.functionName = "index";

	} else if (regexResult = this.url.match(/^\/(\w+)\/(\w+)\/?$/)) {
		this.fileName = regexResult[1];
		this.functionName = regexResult[2];

	} else if (regexResult = this.url.match(/^\/(\w+)\/(\w+)\/(.+)\/?$/)) {
		this.fileName = regexResult[1];
		this.functionName = regexResult[2];
		this.inputVars = regexResult[3].split("/");

	} else {
		// TODO melhorar tratamento de erro
		//throw "url solicitada e invalida";
		this.statusCode = 404;
		this.error = new Error();
		this.finalyPage = this.error.makePage();
	}
	return this.makePage();
};

Route.prototype.makePage = function() {
	this.finalyPage = "<ul>" +
		"<li><a href='/teste'>invalido</a></li>" +
		"<li><a href='/'>home</a></li>" + 
		"<li><a href='/default/sobre'>sobre</a></li>" + 
		"<li><a href='/produto/empresa/forip'>empresa</a></li>" + 
		"<li><a href='/produto/cliente/italo/fisico'>cliente</a></li>" + 
		"</ul><hr>" +
		"<form action='/formulario/dados' method='POST'>"+
		"<input type='text' name='empresa' />" +
		"<input type='text' name='cliente' />" +
		"<input type='submit' /></form><hr>" + this.debuge();
};

Route.prototype.getPage = function() {
	return this.finalyPage;
}

Route.prototype.debuge = function() {
	return `<pre>
         this.url: ${this.url}<br>
      this.metodo: ${this.metodo}<br>
  this.statusCode: ${this.statusCode}<br>
    this.fileName: ${this.fileName}<br>
this.functionName: ${this.functionName}<br>
   this.inputVars: ${JSON.stringify(this.inputVars)}<br>
	</pre>`;
};
module.exports = Route;
