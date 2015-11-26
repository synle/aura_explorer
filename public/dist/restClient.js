//Developed by Sy Le. Coprighted by Salesforce.com 2015
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _dependenciesMap = require('.../data/dependenciesMap.json');

var _dependenciesMap2 = _interopRequireDefault(_dependenciesMap);

var _usageMap = require('.../data/usageMap.json');

var _usageMap2 = _interopRequireDefault(_usageMap);

var _controlCountMap = require('.../data/controlCountMap.json');

var _controlCountMap2 = _interopRequireDefault(_controlCountMap);

var _namespaceCountMap = require('.../data/namespaceCountMap.json');

var _namespaceCountMap2 = _interopRequireDefault(_namespaceCountMap);

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

var _config = require('../../public/backend/config.js');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const auraExplorerJson = fs.readFileSync(`../package.json`, 'utf8');
// const auraStreamPom    = fs.readFileSync(process.cwd(), 'utf8');

//internal
exports.default = {
	dataDependenciesMap: _dependenciesMap2.default,
	usageMap: _usageMap2.default,
	controlCountMap: _controlCountMap2.default,
	namespaceCountMap: _namespaceCountMap2.default,
	packageInfo: _package2.default,
	explorerConfig: _config2.default
}; //external