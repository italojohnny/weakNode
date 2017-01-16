/*
 * controller default
 */
var Actor = require("../class/actor");

exports.index = function (vars) {
	return {render:"default/index.html", var1:"italo", var2:"johnny", var3:"dos anjos"};
}

exports.sobre = function (vars) {
	return "default/sobre.html";
}

exports.teste1 = function () {
	return "layout.html";
}

exports.teste2 = function () {
	return "italo";
}

exports.teste3 = function () {
	return 16;
}

exports.teste4 = function () {
	return false;
}

exports.teste5 = function () {
	return [1, 2, 3, 4, 5];
}

exports.teste6 = function () {
	return ["johnny", 2, 3, 4, 5];
}

exports.teste7 = function () {
	return ["layout.html", 2, 3, 4, 5];
}

exports.teste8 = function () {
	return {render: "default/index.html", var1:"var1", var2:1, var3:false};
}

exports.teste9 = function () {
	var actor = new Actor();

	actor.setFirstName("naruto");
	var nome = actor.getFirstName();
	var result = actor.teste(function(){});

	var teste = "gato";
	for (i = 0; i < 10; i++)
		teste += " cachorro";

	return {render:"default/index.html", var1:result, var2:teste, var3:nome};
}
