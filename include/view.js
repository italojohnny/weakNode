/*
 * Visualizacao
 */
var fs = require("fs");

var View = function () {
	this.filePath = __dirname+"/../view/";
	this.fileName;
	this.finalyPage;
};

View.prototype.replaceExtend = function () {
	console.log("Replacing extends");
};

View.prototype.replaceInclude = function () {
	console.log("Replacing includes");
};

View.prototype.replaceBlock = function () {
	console.log("Replacing blocks");
};

View.prototype.replacePrint = function () {
	console.log("Replacing prints");
};

View.prototype.getPage = function() {
	return "<h1>chegou na view</h1>";
}

module.exports = View;
