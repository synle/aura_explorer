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
		// const defer = Q.defer();
		// defer.resolve(dataDependenciesMap);
		// return defer.promise;
		//
		//
		return _dependenciesMap2.default;
	},
	getUsageMap: function getUsageMap() {
		// const defer = Q.defer();
		// defer.resolve(usageMap);
		// return defer.promise;
		//
		//
		return _usageMap2.default;
	},
	getControlCountMap: function getControlCountMap() {
		// const defer = Q.defer();
		// defer.resolve(controlCountMap);
		// return defer.promise;
		//
		//
		return _controlCountMap2.default;
	},
	getNamespaceCountMap: function getNamespaceCountMap() {
		// const defer = Q.defer();
		// defer.resolve(namespaceCountMap);
		// return defer.promise;
		//
		return _namespaceCountMap2.default;
	},
	getPackageInfo: function getPackageInfo() {
		// const defer = Q.defer();
		// defer.resolve(packageInfo);
		// return defer.promise;
		//
		return packageInfo;
	},
	getExplorerConfig: function getExplorerConfig() {
		// const defer = Q.defer();
		// defer.resolve(explorerConfig);
		// return defer.promise;
		//
		return _config2.default;
	},
	getAuraExplorerJson: function getAuraExplorerJson() {
		// const defer = Q.defer();
		// defer.resolve(auraExplorerJson);
		// return defer.promise;
		//
		return auraExplorerJson;
	},
	getAuraStreamPom: function getAuraStreamPom() {
		// const defer = Q.defer();
		// defer.resolve(auraStreamPom);
		// return defer.promise;
		//
		return auraStreamPom;
	}
};