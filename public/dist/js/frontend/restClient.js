//Developed by Sy Le. Coprighted by Salesforce.com 2015
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _dependenciesMap = require('dist/js/data/dependenciesMap.json');

var _dependenciesMap2 = _interopRequireDefault(_dependenciesMap);

var _usageMap = require('dist/js/data/usageMap.json');

var _usageMap2 = _interopRequireDefault(_usageMap);

var _controlCountMap = require('dist/js/data/controlCountMap.json');

var _controlCountMap2 = _interopRequireDefault(_controlCountMap);

var _namespaceCountMap = require('dist/js/data/namespaceCountMap.json');

var _namespaceCountMap2 = _interopRequireDefault(_namespaceCountMap);

var _config = require('dist/js/backend/config.js');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//external

var util_readFromFileAsync = function util_readFromFileAsync(fpath) {
	return _fs2.default.readFileSync(fpath, 'utf8');
};

//internal

var auraExplorerJson = util_readFromFileAsync(_path2.default.join(process.cwd(), 'package.json'));

var auraStreamPom = util_readFromFileAsync(_path2.default.join(process.cwd(), 'public', 'dist', 'js', 'data', 'aura_upstream_pom.xml'));

var packageInfo = JSON.parse(auraExplorerJson);

exports.default = {
	getDataDependenciesMap: function getDataDependenciesMap() {
		var defer = _q2.default.defer();
		defer.resolve(_dependenciesMap2.default);
		return defer.promise;
	},
	getUsageMap: function getUsageMap() {
		var defer = _q2.default.defer();
		defer.resolve(_usageMap2.default);
		return defer.promise;
	},
	getControlCountMap: function getControlCountMap() {
		var defer = _q2.default.defer();
		defer.resolve(_controlCountMap2.default);
		return defer.promise;
	},
	getNamespaceCountMap: function getNamespaceCountMap() {
		var defer = _q2.default.defer();
		defer.resolve(_namespaceCountMap2.default);
		return defer.promise;
	},
	getPackageInfo: function getPackageInfo() {
		var defer = _q2.default.defer();
		defer.resolve(packageInfo);
		return defer.promise;
	},
	getExplorerConfig: function getExplorerConfig() {
		var defer = _q2.default.defer();
		defer.resolve(_config2.default);
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