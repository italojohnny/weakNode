/*
 * controller default
 */

exports.index = function (vars) {
	return "default/index.html"
}

exports.sobre = function (vars) {
	return "default/clients.html"
}

exports.teste1 = function () {
	return {view:"default"}
}

//TODO padronizar o retorno
