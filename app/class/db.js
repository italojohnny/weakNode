/*
 * Classe de conexao com o banco
 */
var pg = require("pg");

var DB = function() {
	var user = "admteste";
	var pswd = "yma2578k";
	var host = "192.168.1.104";
	var port = "5432";
	var bank = "bancodedados";
	this.conString = `postgres://${user}:${pswd}@${host}:${port}/${bank}`;
};

DB.prototype.test = function() {
	console.log("testando");
};

module.exports = DB;
