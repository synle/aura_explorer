//Developed by Sy Le. Coprighted by Salesforce.com 2015
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//internal
//external
var _util_getJoinPath = function _util_getJoinPath(myPath) {
	return '' + myPath;
}; //path.join( process.cwd(), myPath );
var _util_readFromFileAsync = _lodash2.default.memoize(function (fileName) {
	return util.readFromFileAsync(fileName);
});
var _parsePromise = function _parsePromise(response) {
	try {
		if (_lodash2.default.isString(response)) {
			return JSON.parse(response);
		}
	} catch (e) {}

	return response;
};

//definitions
var restClient = {
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
	}
};

//export
exports.default = restClient;