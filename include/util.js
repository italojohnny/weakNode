/*
 *
 */

var Util = function () {
	this.start();
};

Util.prototype.start = function () {
	console.log("testando");
	var stdin = process.openStdin();
	stdin.addListener("data", function(d) {
		console.log("you entered: [" +
			d.toString().trim() + "]");
	});
};

Util.prototype.createConfig = function () {

};

module.exports = Util;
