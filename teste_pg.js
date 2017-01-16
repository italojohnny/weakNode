var pg = require("pg");

var conString = "postgres://admteste:senha1234@192.168.1.104:5432/bancodedados";

pg.connect(conString, function(err, client, done) {
	done();
	if (err) {
		return console.error("error fetching client from poll", err);
	}
	
	client.query("select * from actor where first_name = 'naruto';", function(err, result){
		if (err) {
			return console.error("error runnig query", err);
		}
		console.log(result);
	});

});
