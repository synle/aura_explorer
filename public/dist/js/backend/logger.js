//Developed by Sy Le. Coprighted by Salesforce.com 2015
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	error: function error() {
		console.error.apply(null, arguments);

		//write error to files
	},
	info: function info() {
		if (parseInt(process.env.debug) >= 1) {
			console.log.apply(this, arguments);
		}
	},
	debug: function debug() {
		if (parseInt(process.env.debug) >= 2) {
			console.log.apply(this, arguments);
		}
	},
	log: function log() {
		console.log.apply(this, arguments);
	}
};