"use strict";
var DB = require("./db.js");

var Actor = function() {
	this.first_name = "John";
	this.email = "john@actor.com";
	this.result;
};

Actor.prototype.setFirstName = function(name) { this.first_name = name; };
Actor.prototype.getFirstName = function() {	return this.first_name; };
Actor.prototype.setEmail = function(email) { this.email = email; };
Actor.prototype.getEmail = function() { return this.email; };

Actor.prototype.consulta = function(callback) {
	var db = new DB();
	var defer = db.exec("select * from f_bilhetes_chamadas limit 10").then((dados) => {
		this.result = dados;
		callback(dados);
	});
};

Actor.prototype.getResult = function() {
	return this.result;
};

module.exports = Actor;
