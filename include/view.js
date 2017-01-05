/*
 * Visualizacao
 */
var fs = require("fs");

var View = function () {
	this.filePath = __dirname+"/../view/";
	this.fileName;
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

module.exports = View;
