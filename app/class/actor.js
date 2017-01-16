/*
 *
 */

var DB = require("./db.js");

var Actor = function() {
	this.first_name = "John";
}

Actor.prototype.setFirstName = function(name) {
	this.first_name = name;
};

Actor.prototype.getFirstName = function() {
	return this.first_name;
};

Actor.prototype.teste = function(callback) {
	var db = new DB();
	console.log("entrou 1");
	var result = db.exec("select * from actor limit 1", callback);
	return result;
}

module.exports = Actor;
