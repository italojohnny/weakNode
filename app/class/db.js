"use strict";
var Libpq = require("libpq");
var pq = new Libpq();

var DB = function() {
	var user = "";
	var pswd = "";
	var host = "";
	var port = "5432";
	var bank = "";
	this.conString = `postgres://${user}:${pswd}@${host}:${port}/${bank}`;
	this.result;
};

DB.prototype.exec = function(query) {
	return new Promise ((resolve, reject) => {
		var arrayResult = [];
//------------------------------------------------------------------------------
		pq.connect(this.conString, function() {
			var acao = new Promise((res, rej) =>{
				pq.exec(query);
				try {
					for (var i = 0; i < pq.ntuples(); i++) {
						var obj = new Object();
						for (var j = 0; j < pq.nfields(); j++)
							obj[pq.fname(j)] = pq.getvalue(i, j);
						arrayResult.push(obj);
					}
					this.result = arrayResult;
					res(arrayResult);
				} catch(e) {
					rej(pq.errorMessage());
				}
			});
			acao.then(result=>{
				return resolve(result);
			}).catch(reason=>{
				reject(reason);
			});
		});
//------------------------------------------------------------------------------
	});
};

DB.prototype.getResult = function() {
	return this.result;
};

module.exports = DB;
