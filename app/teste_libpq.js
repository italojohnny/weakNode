var Libpq = require("libpq");
var pq = new Libpq();

var user = "";
var pswd = "";
var host = "";
var port = "5432";
var bank = ""; 
var conString = `postgres://${user}:${pswd}@${host}:${port}/${bank}`;

pq.connect(conString, function(){
	pq.exec("select * from f_bilhetes_chamadas limit 1000");
	
	var arrayResult = [];
	for (var i = 0; i < pq.ntuples(); i++) {
		var obj = new Object();
		for (var j = 0; j < pq.nfields(); j++) {
			obj[pq.fname(j)] = pq.getvalue(i, j);
		}
		arrayResult.push(obj);
	}
	pq.finish();
	console.log(JSON.stringify(arrayResult));
});
