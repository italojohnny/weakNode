/*
 *
 */

var layoutModel = analyzeWidth(window.innerWidth);

window.addEventListener("resize", function(){
	layoutModel = analyzeWidth(window.innerWidth);
}); 

function analyzeWidth (width) {
	var model;
	if (width < 800) 
		model = "fullview";
	else 
		model = "standard";

	if (model != layoutModel) {
		switch (model) {
			case "fullview": setFullViewLayout(); break;
			default: setStandardLayout();
		}
	}
	return model;
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
