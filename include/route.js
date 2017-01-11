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
	this.contentType;

	this.fileName = "";
	this.functionName = "";
	this.inputVars = variaveis;

	this.outputCtrl;

	this.finalyPage = "";

	try { this.analyzeURL(function(that) {

			try { that.evokeControl(function(that) {

				try { that.evokeView(function(that) {

				});} catch (e) { that.makeError("View", "500", e, function(){}); }

			});} catch (e){ that.makeError("Controller", "500", e, function(){}); }

	});} catch (e) { this.makeError("Route", "500", e, function(){}); }
};

Route.prototype.evokeControl = function(callback) {
	if (this.contentType.match(/html/)) {
		var controller = new Controller(this.fileName, this.functionName, this.inputVars);
		this.outputCtrl = controller.output;
	}
	callback(this);
};

Route.prototype.evokeView = function(callback) {
	//TODO modularizar os parametros de criacao da view
	if (this.contentType.match(/html/)) {
		var view = new View(this.contentType, "layout.html", [1, 2, 3, 4,5]);
		this.finalyPage = view.getPage() + this.makePage();

	} else {
		var view = new View(this.contentType, "../static/css/default.css");
		this.finalyPage = view.getPage();
	}
	callback();
};

Route.prototype.makeError = function(title, subtitle, msg, callback) {
	var error = new Error();
	this.finalyPage = error.makePage(title, subtitle, msg);
	callback();
};

Route.prototype.analyzeURL = function (callback) {
	var regexResult;
	if (regexResult = this.url.match(/^\/?$/)) {
		this.contentType = this.setContentType("html");
		this.fileName = "default";
		this.functionName = "index";

	} else if (regexResult = this.url.match(/^\/(\w+)\/(\w+)\/?$/)) {
		this.contentType = this.setContentType("html");
		this.fileName = regexResult[1];
		this.functionName = regexResult[2];

	} else if (regexResult = this.url.match(/^\/(\w+)\/(\w+)\/([A-z0-9/]+)\/?$/)) {
		this.contentType = this.setContentType("html");
		this.fileName = regexResult[1];
		this.functionName = regexResult[2];
		if (this.metodo !== "POST")
			this.inputVars = regexResult[3].split("/");

	} else if (regexResult = this.url.match(/^\/static\/(.*\.)(css|js|png|jpg|gif)/)) {
		this.contentType = this.setContentType(regexResult[2]);
		this.fileName = regexResult[0];

	} else {
		this.statusCode = 404;
		throw "url solicitada e invalida";
	}
	callback(this);
};

//{{{
Route.prototype.setContentType = function (type) {
	switch (type) {
		case "html": return "text/html; charset=utf-8";
		case  "css": return "text/css; charset=utf-8";
		case   "js": return "text/javascript; charset=utf-8";
		case  "jpg": return "image/jpeg";
		case  "gif": return "image/gif";
		case  "png": return "image/png";
	}
};

Route.prototype.makePage = function() {
	//this.finalyPage = "<ul>" +
	return "<ul>"+
		"<li><a href='/'>home</a></li>"+
		//"<li><a href='/default/index'>index</a></li>"+
		//"<li><a href='/default/index/var/var/var'>index com variavel</a></li>"+
		"<li><a href='/default/sobre'>sobre</a></li>"+
		//"<li><a href='/default/sobre/var/var/var/var'>sobre com variavel</a></li>"+
		"<li><a href='/default/teste1'>teste1 - arquivo.html</a></li>"+
		"<li><a href='/default/teste2'>teste2 - string</a></li>"+
		"<li><a href='/default/teste3'>teste3 - number</a></li>"+
		"<li><a href='/default/teste4'>teste4 - boolean</a></li>"+
		"<li><a href='/default/teste5'>teste5 - array</a></li>"+
		"<li><a href='/default/teste6'>teste6 - array string</a></li>"+
		"<li><a href='/default/teste7'>teste7 - array arquivo</a></li>"+
		"<li><a href='/default/teste8'>teste8 - object</a></li>"+
		"<li><a href='/default/teste9'>teste9 - object render</a></li>"+
		//"<li><a href='/produto/empresa/forip'>empresa</a></li>"+
		//"<li><a href='/produto/cliente/italo/fisico'>cliente</a></li>"+
		//"<li><a href='/invalido'>invalido</a></li>"+
		//"<li><a href='/static/css/default.css'>default.css</a></li>"+
		"</ul><hr>"+
		"<form action='/formulario/dados' method='POST'>"+
		"<input type='text' name='empresa' />"+
		"<input type='text' name='cliente' />"+
		"<input type='submit' /></form><hr>"+ this.debuge();
};

Route.prototype.debuge = function() {
	return "<pre>"+
" this.contentType: "+ this.contentType +"<br>"+
"         this.url: "+ this.url +"<br>"+
"      this.metodo: "+ this.metodo +"<br>"+
"  this.statusCode: "+ this.statusCode +"<br>"+
"    this.fileName: "+ this.fileName +"<br>"+
"this.functionName: "+ this.functionName +"<br>"+
"   this.inputVars: "+ JSON.stringify(this.inputVars) +"<br>"+
"  this.outputCtrl: "+ JSON.stringify(this.outputCtrl) +"<br>"+
"</pre>";
};

Route.prototype.getPage = function() {
	return this.finalyPage;
}
//}}}
module.exports = Route;
