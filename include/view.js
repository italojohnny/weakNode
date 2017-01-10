/*
 * Visualizacao
 */
var fs = require("fs");

var View = function (fileName, inputVars) {
	this.filePath = __dirname+"/../view/";
	this.fileName = fileName;
	this.inputVars = inputVars;
	this.finalyPage;

	this.readFile(function(){});
};


View.prototype.readFile = function (callback) {
	this.finalyPage = fs.readFileSync(this.filePath+this.fileName, function () {
		callback();
	});
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
	return this.finalyPage.toString();
}

module.exports = View;
