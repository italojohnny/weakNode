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

	this.outputCtrl;

	this.finalyPage = "";

	try {
		this.analyzeURL(function(that){
			try {
				that.evokeControl(function(that){
					try {
						that.evokeView(function(that){});
					} catch (e) {
						that.makeError("View", "500", e, function(){});
					}
				});
			} catch (e){
				that.makeError("Controller", "500", e, function(){});
			}
		});
	} catch (e) {
		this.makeError("Route", "500", e, function(){});
	}
};


Route.prototype.evokeControl = function(callback) {
	var controller = new Controller(this.fileName, this.functionName, this.inputVars);
	this.outputCtrl = controller.output;
	callback(this);
};

Route.prototype.evokeView = function(callback) {
	var view = new View();
	this.finalyPage = view.getPage() + this.makePage();
	callback();
};

Route.prototype.makeError = function(title, subtitle, msg, callback) {
	var error = new Error();
	this.finalyPage = error.makePage(title, subtitle, msg);
	callback();
};

Route.prototype.getPage = function() {
	return this.finalyPage;
}


Route.prototype.analyzeURL = function (callback) {
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
		if (this.metodo !== "POST")
			this.inputVars = regexResult[3].split("/");

	} else {
		// TODO melhorar tratamento de erro
		throw "url solicitada e invalida";
		//this.statusCode = 404;
		//this.error = new Error();
		//this.finalyPage = this.error.makePage();
		//callback(this);
	}
	callback(this);
};

Route.prototype.makePage = function() {
	//this.finalyPage = "<ul>" +
	return "<ul>"+
		"<li><a href='/'>home</a></li>"+
		"<li><a href='/default/index'>index</a></li>"+
		"<li><a href='/default/index/var/var/var'>index com variavel</a></li>"+
		"<li><a href='/default/sobre'>sobre</a></li>"+
		"<li><a href='/default/sobre/var/var/var/var'>sobre com variavel</a></li>"+
		"<li><a href='/produto/empresa/forip'>empresa</a></li>"+
		"<li><a href='/produto/cliente/italo/fisico'>cliente</a></li>"+
		"<li><a href='/invalido'>invalido</a></li>"+
		"</ul><hr>"+
		"<form action='/formulario/dados' method='POST'>"+
		"<input type='text' name='empresa' />"+
		"<input type='text' name='cliente' />"+
		"<input type='submit' /></form><hr>"+ this.debuge();
};

Route.prototype.debuge = function() {
	return "<pre>"+
"         this.url: "+ this.url +"<br>"+
"      this.metodo: "+ this.metodo +"<br>"+
"  this.statusCode: "+ this.statusCode +"<br>"+
"    this.fileName: "+ this.fileName +"<br>"+
"this.functionName: "+ this.functionName +"<br>"+
"   this.inputVars: "+ JSON.stringify(this.inputVars) +"<br>"+
"  this.outputCtrl: "+ JSON.stringify(this.outputCtrl) +"<br>"+
"</pre>";
};

module.exports = Route;
