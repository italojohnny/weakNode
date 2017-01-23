var pg = require("pg");

var conString = "postgres://usuario:senha@host:5432/banco";

pg.connect(conString, function(err, client, done) {
	done();
	if (err) {
		return console.error("error fetching client from poll", err);
	}
	
	client.query("select * from f_novo_menu;", function(err, result){
		if (err) {
			return console.error("error runnig query", err);
		}
		console.log(result);
	});

});
