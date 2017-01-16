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

		});} catch (e){ that.makeError("Controller", "500", e.message+"\n\n"+e.stack, function(){}); }

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
	if (this.contentType.match(/html/)) {
		var view = new View(this.contentType, this.outputCtrl);
		//this.finalyPage = view.getPage() + this.makePage();
		this.finalyPage = view.getPage();

	} else {
		var view = new View(this.contentType, {file:this.fileName, vars:null});
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

Route.prototype.getPage = function() {
	return this.finalyPage;
}

module.exports = Route;
