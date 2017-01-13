/*
 * Visualizacao
 */
var fs = require("fs");

var View = function (contentType, inputView) {//{{{
	this.filePath = __dirname+"/../";
	this.contentType = contentType;
	this.fileName = inputView["file"];
	this.inputVars = inputView["vars"];
	this.auxPath; // TODO refatorar logica de replaceExtend e replaceInclude para essa variavel nao ser mais necessaria
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
				this.replaceExtend(function(that) {
					that.replaceInclude(function() {

					});
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
};//}}}

View.prototype.replaceExtend = function (callback) {//{{{
	//console.log(this.finalyPage.toString());
	var caminho = this.filePath + this.fileName.replace(/\/\w*\.html$/,'') + '/';
	var fileAux1 = this.finalyPage.toString();
	var fileAux2;

	// TODO existe a possibilidade do codigo quebrar se estiver usando
	// aspas-simples (usando os indices dos grupos casados no resultado). Pode
	// ser corrigindo removendo as aspas dupas ou simples do primeiro grupo
	var erExtend = /<!--\[\[extends (\"(.*)\"|\'(.*)\')\]\]-->/;
	var erBlocks = /<!--\[\[block \w*\]\]-->/g; //para encontrar todo os blocos
	var erKeyBlock = /<!--\[\[block (\w*)\]\]-->/; //para encontrar a chave do primeiro bloco

	var result;

	if (result = fileAux1.match(erExtend)[2]) {
		if (fs.existsSync(caminho + result)) {
			fileAux2 = fs.readFileSync(caminho + result, function () {});
			fileAux2 = fileAux2.toString();

			var qtd = fileAux2.match(erBlocks).length;
			for (i = 0; i < qtd; i++)
				fileAux2 = fileAux2.replace(fileAux2.match(erKeyBlock)[0], this.getBlock(fileAux2.match(erKeyBlock)[1]));
			this.finalyPage = fileAux2;
			this.auxPath = caminho + result;

		} else throw `Erro durante processo de extensão de arquivo:\nNão foi possivel abrir "${caminho}${result}".`;
	}
	callback(this);
};

View.prototype.getBlock = function (nameBlock) {
	var erResult;
	var erBlock = new RegExp("<!--\\[\\[block "+ nameBlock +"\\]\\]-->\(.\|\\s\)*?<!--\\[\\[endblock\\]\\]-->", "gm");

	if (erResult = this.finalyPage.toString().match(erBlock))
		return erResult[0].slice(17+nameBlock.length, erResult.length-20);
	return '';
};//}}}

View.prototype.replaceInclude = function (callback) {
	var caminho = this.auxPath.replace(/\/\w*\.html$/,'') + '/';
	var fileAux1 = this.finalyPage.toString();
	var fileAux2;

	// TODO existe a possibilidade do codigo quebrar se estiver usando
	// aspas-simples (usando os indices dos grupos casados no resultado). Pode
	// ser corrigindo removendo as aspas dupas ou simples do primeiro grupo
	var erIncludes = /<!--\[\[\include (\"(.*)\"|\'(.*)\')\]\]-->/g; //para encontrar todos os includes que existirem
	var erKeyInclude = /<!--\[\[\include (\"(.*)\"|\'(.*)\')\]\]-->/; //para pegar o arquivo da key include
	var result;

	var qtd = 0;
	if (qtd = fileAux1.match(erIncludes))
		qtd = qtd.length;

	for (i = 0; i < qtd; i++) {
		if (result = fileAux1.match(erKeyInclude)[2]) { // TODO revisar essa regex
			if (fs.existsSync(caminho + result)) {
				fileAux2 = fs.readFileSync(caminho + result, function () {}).toString();
				fileAux1 = fileAux1.replace(erKeyInclude, fileAux2)

			} else throw `Erro durante processo de inclusao de arquivo:\nNão foi possivel abrir "${caminho}${result}".`;
		} else console.log("nao deu" + fileAux1.match(erKeyInclude)[2]);
	}
	this.finalyPage = fileAux1;
	callback();
};

View.prototype.replacePrint = function (callback) {//{{{
	console.log("Replacing prints");
	//precorre arquivo principal (ja com as alteracoes de replaceInclude)
	//procura por key print e substitui pela variavel referente indicada na key

	callback();
};

View.prototype.getPage = function(callback) {
	return this.finalyPage;

	callback();
}//}}}

module.exports = View;
