"use strict";

var DB = require("./db");
var db = new DB();

Promise.all([
	db.exec("select * from f_novo_menu limit 1"),
	db.exec("select * from f_agenda limit 1"),
	db.exec("select * from f_bilhetes_chamadas limit 1")
]).then(result=>{
	console.log(result);
}).catch(reason=>{
	console.log(reason);
});
