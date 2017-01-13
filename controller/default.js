/*
 * controller default
 */

exports.index = function (vars) {
	return "default/index.html"; //TODO retornando para layout.html, erro
}

exports.sobre = function (vars) {
	return "default/sobre.html";
}

exports.teste1 = function () {return "default/index.html";}
exports.teste2 = function () {return "italo";}
exports.teste3 = function () {return 16;}
exports.teste4 = function () {return false;}
exports.teste5 = function () {return [1, 2, 3, 4, 5];}
exports.teste6 = function () {return ["johnny", 2, 3, 4, 5];}
exports.teste7 = function () {return ["layout.html", 2, 3, 4, 5];}
exports.teste8 = function () {return {var1:"var1", var2:1, var3:false};}
exports.teste9 = function () {return {render:"layout.html", var1:"var1", var2:1, var3:false};}
