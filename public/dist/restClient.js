//Developed by Sy Le. Coprighted by Salesforce.com 2015
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _dependenciesMap = require('./data/dependenciesMap.json');

var _dependenciesMap2 = _interopRequireDefault(_dependenciesMap);

var _usageMap = require('./data/usageMap.json');

var _usageMap2 = _interopRequireDefault(_usageMap);

var _controlCountMap = require('./data/controlCountMap.json');

var _controlCountMap2 = _interopRequireDefault(_controlCountMap);

var _namespaceCountMap = require('./data/namespaceCountMap.json');

var _namespaceCountMap2 = _interopRequireDefault(_namespaceCountMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import packageInfo from '../../package.json';
// import explorerConfig from '../../public/backend/config.js';

// const auraExplorerJson = fs.readFileSync(`../package.json`, 'utf8');
// const auraStreamPom    = fs.readFileSync(process.cwd(), 'utf8');

//internal
//external
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
	}
};