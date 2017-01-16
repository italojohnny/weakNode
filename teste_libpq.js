var Libpq = require("libpq");
var pq = new Libpq();

var user = "admteste";
var pswd = "senha1234";
var host = "192.168.1.104";
var port = "5432";
var bank = "bancodedados"; 
var conString = `postgres://${user}:${pswd}@${host}:${port}/${bank}`;

pq.connect(conString, function(){
	pq.exec("select * from actor");
	
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
