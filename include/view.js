/*
 * Visualizacao
 */
var fs = require("fs");

var View = function (contentType, inputView) {
	this.filePath = __dirname+"/../";
	this.contentType = contentType;
	this.fileName = inputView["file"];
	this.inputVars = inputView["vars"];
	this.finalyPage;

	this.readFile(function(){
	});
};

View.prototype.readFile = function (callback) {

	if (this.contentType.match(/text/)) {
		if (this.fileName) {
			this.finalyPage = fs.readFileSync(this.filePath + this.fileName, function () {
				//callback();
			});
			if (this.contentType.match(/html/)) {
				this.replaceExtend(function() {
					// TODO verificar assincronidade
				});
			}
		} else {
			this.finalyPage = this.inputVars.toString();
			//callback();
		}

	} else if (this.contentType.match(/image/)) {
		if (fs.existsSync('.' + this.fileName)) {
			this.finalyPage = fs.readFileSync("." + this.fileName, function () {
				//callback();
			});
		} else {
			throw `Arquivo ".${this.fileName}" não foi encontrado.`;
		}

	} else {
		throw "Não há suporte para o conteúdo solicitado";
	}
	callback();
};

View.prototype.replaceExtend = function (callback) {
	//console.log(this.finalyPage.toString());
	var testeExtend;
	var testeBlock;
	var fileAux;
	var keyBlock;
	var caminho = this.filePath + this.fileName.replace(/\/\w*\.html$/,'') + '/';
	var erExtend = /<!--\[\[extends (\"(.*)\"|\'(.*)\')\]\]-->/;
	var erBlock = /<!--\[\[block (\w*)\]\]-->/;

	if (testeExtend = this.finalyPage.toString().match(erExtend)) {
		if (fs.existsSync(caminho + testeExtend[2])) {
			fileAux = fs.readFileSync(caminho + testeExtend[2], function () {});

			//TODO encontrar uma forma de testar a regex, alterar e continuar ate terminar o arquivo
			if (testeBlock = fileAux.toString().match(erBlock)) {
				keyBlock = testeBlock[1];
			}
			console.log(this.getBlock(keyBlock));

		} else {
			throw `Erro durante processo de extender arquivo: "${testeExtend[2]}".`;
		}
	} else
		console.log("Replacing extends");
	//{OK} procurar pela key extend
	//{OK} carrega em uma variavel local auxiliar o arquivo indicado
	//procura no arquivo auxiliar keys block
	//evoca replaceblock passando o block, e substitui o block encontrado quando o retorno for diferente de null
	//repete ate terminar o arquivo
	//
	//evoca replaceInclude

	callback();
};

View.prototype.getBlock = function (nameBlock) {
	var erResult;
	var erBlock = new RegExp("<!--\\[\\[block "+ nameBlock +"\\]\\]-->\(.\|\\s\)*?<!--\\[\\[endblock\\]\\]-->", "gm");

	if (erResult = this.finalyPage.toString().match(erBlock))
		return erResult[0].slice(17+nameBlock.length, erResult.length-20);
	return '';
};

View.prototype.replaceInclude = function (callback) {
	console.log("Replacing includes");
	//percorre arquivo principal (ja com as alteracoes de replaceExtend)
	//procura por key include e injeta o conteudo do arquivo indicado nessa regiao do arquivo principal
	//
	//evoca replacePrint
	callback();
};

View.prototype.replacePrint = function (callback) {
	console.log("Replacing prints");
	//precorre arquivo principal (ja com as alteracoes de replaceInclude)
	//procura por key print e substitui pela variavel referente indicada na key

	callback();
};

View.prototype.getPage = function(callback) {
	return this.finalyPage;

	callback();
}

module.exports = View;
