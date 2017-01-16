/*
 * Classe de conexao com o banco
 */
var Libpq = require("libpq");
var pq = new Libpq();

var DB = function() {
	var user = "admteste";
	var pswd = "senha1234";
	var host = "192.168.1.104";
	var port = "5432";
	var bank = "bancodedados";
	this.conString = `postgres://${user}:${pswd}@${host}:${port}/${bank}`;
};

DB.prototype.exec = function(query, callback) {
	console.log(query);
	pq.connect(this.conString, function() {
		pq.exec(query);
		var arrayResult = [];
		for (var i = 0; i < pq.ntuples(); i++) {
			var obj = new Object();
			for (var j = 0; j < pq.nfields(); j++) {
				obj[pq.fname(j)] = pq.getvalue(i, j);
				console.log(obj[pq.fname(j)]);
			}
			arrayResult.push(obj);
		}
		pq.finish();
		console.log("entrou 3");
		return arrayResult;
	});
	callback();
};

module.exports = DB;
