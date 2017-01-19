/*
 * controller default
 */
var Actor = require("../class/actor");//{{{

exports.index = function (vars) {
	return {render:"default/index.html", var1:"italo", var2:"johnny", var3:"dos anjos"};
}
exports.sobre = function (req, res) { res("default/sobre.html"); }
exports.teste1 = function (req, res) { res("layout.html"); }
exports.teste2 = function (req, res) { res("italo"); }
exports.teste3 = function (req, res) { res(16); }
exports.teste4 = function (req, res) { res(false); }
exports.teste5 = function (req, res) { res([1, 2, 3, 4, 5]); }
exports.teste6 = function (req, res) { res(["johnny", 2, 3, 4, 5]); }
exports.teste7 = function (req, res) { res(["layout.html", 2, 3, 4, 5]); }
exports.teste8 = function (req, res) {
	res({render: "default/index.html", var1:"var1", var2:JSON.stringify([{a:1,b:2},{a:3,b:4}]), var3:false});
}

exports.teste9 = function (req, res) {
	var john = new Actor();
	var nome = john.getFirstName();
	var email = john.getEmail();
	var teste;
	john.teste(function(dados) {
		console.log(dados);
		teste = dados;
		//res.render({render:"default/index.html", var1:teste, var2:email, var3:nome});
	});
	res({render:"default/index.html", var1:teste, var2:email, var3:nome});
}
//}}}
exports.teste = function (request, response) {
	var john = new Actor();
	var nome = john.getFirstName();
	var email = john.getEmail();
	var teste;
	john.teste(function(dados){
		teste = dados;
	});
	response({render:"default/index.html", var1:teste, var2:email, var3:nome});
}
