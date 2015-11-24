//Developed by Sy Le. Coprighted by Salesforce.com 2015
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	render: function render(cb) {
		(0, _jquery2.default)(function () {
			return cb();
		});
	},
	getQueryUrl: function getQueryUrl(searchTerm) {
		return 'controls.html?search=' + searchTerm;
	},
	getSearchTerm: function getSearchTerm(location_href) {
		var searchPrefix = '?search=';
		var idxSearchStrt = location_href.indexOf(searchPrefix);

		return idxSearchStrt > 0 ? location_href.substr(idxSearchStrt + searchPrefix.length).toLowerCase() : '';
	},

	//flatten to array of objects
	flattenDependencies: function flattenDependencies(dataDependenciesMap) {
		return _lodash2.default.reduce(dataDependenciesMap, function (flattenDependencies, namespaceControls, namespaceKey) {
			_lodash2.default.forEach(namespaceControls, function (controlObj, controlKey) {
				flattenDependencies[namespaceKey + ':' + controlKey] = controlObj;
			});

			return flattenDependencies;
		}, {});
	},

	//find matching page search term
	findMatchingControl: function findMatchingControl(flattenDependencies, targetString) {
		var resMatches = flattenDependencies;
		if (targetString) {
			// const regex = new RegExp(`${targetString}`, 'i');//use regex
			resMatches = _lodash2.default.reduce(flattenDependencies, function (res, controlObj, controlKey) {
				if (controlKey.toLowerCase().indexOf(targetString) === 0) {
					// if (controlKey.indexOf(targetString) === 0){
					res[controlKey] = controlObj;
				}
				return res;
			}, {});
		}

		return resMatches;
	},
	findMatchingKeysInHash: function findMatchingKeysInHash(countMap, newSearchTerm) {
		return _lodash2.default.size(newSearchTerm) > 0 ? _lodash2.default.reduce(countMap, function (res, objVal, objKey) {
			if (objKey.toLowerCase().indexOf(newSearchTerm) === 0) {
				res[objKey] = objVal;
			}

			return res;
		}, {}) : countMap;
	},
	getUniqueArgumentsList: function getUniqueArgumentsList(depArgObjs) {
		return _lodash2.default.reduce(depArgObjs, function (resUniqueArgList, depArgObj) {
			return _lodash2.default.unique(resUniqueArgList.concat(_lodash2.default.keys(depArgObj)));
		}, []);
	}
};
//# sourceMappingURL=util.js.map
