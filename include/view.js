/*
 * Visualizacao
 */
var fs = require("fs");

var View = function (contentType, inputView) {
	if (contentType.match(/html/))
		this.filePath = __dirname+"/../app/view/";
	else
		this.filePath = __dirname+"/../app";
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
			this.finalyPage = fs.readFileSync(this.filePath + this.fileName, function () {});
			if (this.contentType.match(/html/)) {
				try { this.replaceExtend(function(that) {
					try { that.replaceInclude(function(that) {
						try { that.replacePrint(function() {
						}); } catch (e) { throw `Print > ${e}`; }
					}); } catch (e) { throw `Include > ${e}`; }
				}); } catch (e) { throw `Extend > ${e}`; }
			}
		} else this.finalyPage = this.inputVars.output.toString();
	} else if (this.contentType.match(/image/)) {
		if (fs.existsSync(this.filePath + this.fileName)) {
			this.finalyPage = fs.readFileSync(this.filePath + this.fileName, function () {});
		} else throw `Arquivo ".${this.fileName}" não foi encontrado.`;
	} else throw "Não há suporte para o conteúdo solicitado";
	callback();
};

View.prototype.replaceExtend = function (callback) {
	var caminho = this.filePath + this.fileName.replace(/\/\w*\.html$/,'') + '/';
	var fileAux1 = this.finalyPage.toString();
	var fileAux2;

	var erExtend = /<!--\[\[extends (\"(.*)\"|\'(.*)\')\]\]-->/;
	var erBlocks = /<!--\[\[block \w*\]\]-->/g; //para encontrar todo os blocos
	var erKeyBlock = /<!--\[\[block (\w*)\]\]-->/; //para encontrar a chave do primeiro bloco
	var result = fileAux1.match(erExtend);

	if (result) {
		result = result[1].toString().replace(/\'|\"/g,'');
		if (fs.existsSync(caminho + result)) {
			fileAux2 = fs.readFileSync(caminho + result, function () {});
			fileAux2 = fileAux2.toString();

			var qtd = 0;
			if (qtd = fileAux2.match(erBlocks))
				qtd = qtd.length;

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
};

View.prototype.replaceInclude = function (callback) {
	var caminho
	if (this.auxPath)
		caminho = this.auxPath.replace(/\/\w*\.html$/,'') + '/';
	else
		caminho = __dirname + "/../app/view/";

	var fileAux1 = this.finalyPage.toString();
	var fileAux2;

	var erIncludes = /<!--\[\[\include (\"(.*)\"|\'(.*)\')\]\]-->/g; //para encontrar todos os includes que existirem
	var erKeyInclude = /<!--\[\[\include (\"(.*)\"|\'(.*)\')\]\]-->/; //para pegar o arquivo da key include
	var result = fileAux1.match(erKeyInclude);

	var qtd = 0;
	if (qtd = fileAux1.match(erIncludes)) qtd = qtd.length;
	for (i = 0; i < qtd; i++) {
		if (result) {
			result = result[1].toString().replace(/\'|\"/g, '');
			if (fs.existsSync(caminho + result)) {
				fileAux2 = fs.readFileSync(caminho + result, function () {}).toString();
				fileAux1 = fileAux1.replace(erKeyInclude, fileAux2)

			} else throw `Erro durante processo de inclusao de arquivo:\nNão foi possivel abrir "${caminho}${result}".`;
		} else console.log("nao deu" + fileAux1.match(erKeyInclude)[2]); // TODO
	}
	this.finalyPage = fileAux1;
	callback(this);
};

View.prototype.replacePrint = function (callback) { // TODO aperfeicoar codigo para tornar claro
	var fileAux1 = this.finalyPage.toString();
	var erPrints = /<!--\[\[print .+\]\]-->/g;
	var erKeyPrint = /<!--\[\[print (.+|session\..+)\]\]-->/;
	var result;
	var qtd = 0;
	if (qtd = fileAux1.match(erPrints)) qtd = qtd.length;
	for (i = 0; i < qtd; i++) {
		result = fileAux1.match(erKeyPrint);
		if (result) {
			result = result[1];
			if (this.inputVars && typeof(this.inputVars.output) === "object" && result in this.inputVars.output) {
				fileAux1 = fileAux1.replace(erKeyPrint, this.inputVars.output[result]);

			} else if (this.inputVars && typeof(this.inputVars.output) === "object" && result.match(/^session\..+/)) {
				//TRABALHANDO AQUI
				var aux = result.match(/^session\.(.+)/);
				fileAux1 = fileAux1.replace(erKeyPrint, this.inputVars.session[aux[1]]);
				/*
				 * Atualmente a view só podera encontrar as variaveis que estao em output e session
				 * futuramente deseja-se que o usuario do framework possa declarar qualquer variavel
				 * e utilizar livremente na view.
				 */

			} else throw `Erro durante processo de impressão das variaveis.\nA página está esperando pela variavel "${result}".`;
		}
	}
	this.finalyPage = fileAux1;
	callback();
};

View.prototype.getPage = function() {
	return this.finalyPage;
}

module.exports = View;
