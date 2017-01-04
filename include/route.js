/*
 * Roteamento
 */

var querystring = require("querystring");
var url = require("url");

var Controller = require("./controller");
var View = require("./view");
var Error = require("./error");

var Route = function (request) {
	this.request = request
	this.status = 200;

	this.controller;
	this.view;
	this.error;
};

Route.prototype.getPage = function () {
	return "<h1>temp...</h1>";
};

module.exports = Route;
