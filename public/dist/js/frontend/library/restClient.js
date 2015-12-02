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
var util_getJoinPath = function util_getJoinPath(myPath) {
	return myPath;
}; //path.join( process.cwd(), myPath );

//get contents
var auraExplorerJson = global.util_readFromFileAsync(util_getJoinPath('package.json'));

var auraStreamPom = global.util_readFromFileAsync(util_getJoinPath('public/dist/js/data/aura_upstream_pom.xml'));

var dataDependenciesMap = JSON.parse(global.util_readFromFileAsync('public/dist/js/data/dependenciesMap.json'));
var usageMap = JSON.parse(global.util_readFromFileAsync('public/dist/js/data/usageMap.json'));
var controlCountMap = JSON.parse(global.util_readFromFileAsync('public/dist/js/data/controlCountMap.json'));
var namespaceCountMap = JSON.parse(global.util_readFromFileAsync('public/dist/js/data/namespaceCountMap.json'));
var explorerConfig = {};

var packageInfo = JSON.parse(auraExplorerJson);

//definitions
var restClient = {
	getDataDependenciesMap: function getDataDependenciesMap() {
		var defer = _q2.default.defer();
		defer.resolve(dataDependenciesMap);
		return defer.promise;
	},
	getUsageMap: function getUsageMap() {
		var defer = _q2.default.defer();
		defer.resolve(usageMap);
		return defer.promise;
	},
	getControlCountMap: function getControlCountMap() {
		var defer = _q2.default.defer();
		defer.resolve(controlCountMap);
		return defer.promise;
	},
	getNamespaceCountMap: function getNamespaceCountMap() {
		var defer = _q2.default.defer();
		defer.resolve(namespaceCountMap);
		return defer.promise;
	},
	getPackageInfo: function getPackageInfo() {
		var defer = _q2.default.defer();
		defer.resolve(packageInfo);
		return defer.promise;
	},
	getExplorerConfig: function getExplorerConfig() {
		var defer = _q2.default.defer();
		defer.resolve(explorerConfig);
		return defer.promise;
	},
	getAuraExplorerJson: function getAuraExplorerJson() {
		var defer = _q2.default.defer();
		defer.resolve(auraExplorerJson);
		return defer.promise;
	},
	getAuraStreamPom: function getAuraStreamPom() {
		var defer = _q2.default.defer();
		defer.resolve(auraStreamPom);
		return defer.promise;
	}
};

//export
exports.default = restClient;