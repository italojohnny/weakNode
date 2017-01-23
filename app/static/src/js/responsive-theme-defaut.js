/*
 *
 */

// Variaveis globais -----------------------------------------------------------
var layoutModel = analyzeWidth(window.innerWidth);
var mainMenu = document.getElementById("default-header-button-menu");

// Eventos ---------------------------------------------------------------------
window.addEventListener("resize", function(){
	layoutModel = analyzeWidth(window.innerWidth);
});

mainMenu.addEventListener("click", function () {
	layoutModel === "fullview" ? layoutModel = "standard" : layoutModel = "fullview";
	resetLayout(layoutModel);
});

// Funcoes ---------------------------------------------------------------------
function analyzeWidth (width) {
	var model;
	if (width < 800)
		model = "fullview";
	else
		model = "standard";

	resetLayout(model);
	return model;
}

function resetLayout (model) {
	switch (model) {
		case "fullview": setFullViewLayout(); break;
		default: setStandardLayout();
	}
}

function setFullViewLayout() {
	var menu = document.getElementById("default-body-menu");
	var frame = document.getElementById("default-body-frame");
	menu.className = "fullview-default-body-menu";
	frame.className = "fullview-default-body-frame";
}

function setStandardLayout() {
	var menu = document.getElementById("default-body-menu");
	var frame = document.getElementById("default-body-frame");
	menu.className = "standard-default-body-menu";
	frame.className = "standard-default-body-frame";
}
