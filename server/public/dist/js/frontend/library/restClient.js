//Developed by Sy Le. Coprighted by Salesforce.com 2015
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//internal
//external
var _util_getJoinPath = function _util_getJoinPath(myPath) {
	return '' + myPath;
}; //path.join( process.cwd(), myPath );
var _util_readFromFileAsync = global.util_readFromFileAsync;
var _parsePromise = function _parsePromise(stringContent) {
	debugger;
	try {
		JSON.parse(stringContent);
	} catch (e) {
		return stringContent;
	}
};

//definitions
var restClient = {
	getPackageInfo: function getPackageInfo() {
		return _util_readFromFileAsync(_util_getJoinPath('package.json'));
	},
	getAuraExplorerJson: function getAuraExplorerJson() {
		return _util_readFromFileAsync(_util_getJoinPath('package.json')).then(_parsePromise);
	},
	getDataDependenciesMap: function getDataDependenciesMap() {
		return _util_readFromFileAsync(_util_getJoinPath('public/dist/js/data/dependenciesMap.json')).then(_parsePromise);
	},
	getUsageMap: function getUsageMap() {
		return _util_readFromFileAsync(_util_getJoinPath('public/dist/js/data/usageMap.json')).then(_parsePromise);
	},
	getControlCountMap: function getControlCountMap() {
		return _util_readFromFileAsync(_util_getJoinPath('public/dist/js/data/controlCountMap.json')).then(_parsePromise);
	},
	getNamespaceCountMap: function getNamespaceCountMap() {
		return _util_readFromFileAsync(_util_getJoinPath('public/dist/js/data/namespaceCountMap.json')).then(_parsePromise);
	},
	getAuraStreamPom: function getAuraStreamPom() {
		return _util_readFromFileAsync(_util_getJoinPath('public/dist/js/data/aura_upstream_pom.xml'));
	}
};

//export
exports.default = restClient;