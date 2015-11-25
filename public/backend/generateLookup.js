//Developed by Sy Le. Coprighted by Salesforce.com 2015
'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })(); //external

//internal

Object.defineProperty(exports, "__esModule", {
				value: true
});

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//exports

exports.default = function (componentFileNames, baseDirAuraUpstream, outputDirDataPath) {
				var promises = [];

				var interestedFiles = _lodash2.default.merge(_lodash2.default.values(componentFileNames.cmp), _lodash2.default.values(componentFileNames.app));

				var dependenciesMap = {}; //which component I use
				// {
				// 	nameSpace : {
				// 		controlName : {
				// 			attributes : {
				// 				...
				// 				attributeName1 : {name, type, default, description, access}
				// 				...
				// 			},
				// 			imports    : {
				// 				...
				// 				importLibName1 : {library, property}
				// 				...
				// 			},
				// 			events     : {
				// 				...
				// 				eventName1 : {name, type, description}
				// 				...
				// 			},
				// 			handlers   : {
				// 				...
				// 				handlerName1 : {name, value, action}
				// 				...
				// 			},
				// 			methods    : {
				// 				...
				// 				methodName1  : {name, action, access, description}
				// 				...
				// 			}
				// 		}
				// 	}
				// }

				var usageMap = {}; //which component uses me

				var namespaceCountMap = {}; //count the important of namespace
				// {
				// 	ui:stuff: [
				// 		{controlNameSpace, controlName, attribs}
				// 	]
				// }

				var controlCountMap = {}; //count how many a component is used

				var controlLocationMap = {}; //used for autocomplete
				//flat map of <namespace:control> : relative_location

				//loop through interested files
				_lodash2.default.each(interestedFiles, function (fileName) {
								var defer = _q2.default.defer();
								promises.push(defer.promise);

								var _util$getComponentNam = _util2.default.getComponentNamesFromPath(fileName);

								var _util$getComponentNam2 = _slicedToArray(_util$getComponentNam, 2);

								var controlNameSpace = _util$getComponentNam2[0];
								var controlName = _util$getComponentNam2[1];

								var controlFullName = controlNameSpace + ':' + controlName;

								var curControlObj = {
												attributes: {},
												imports: {},
												events: {},
												handlers: {},
												methods: {},
												dependencies: {}
								};

								//increment namespace count map
								namespaceCountMap[controlNameSpace] = namespaceCountMap[controlNameSpace] || 0;
								namespaceCountMap[controlNameSpace]++;

								//update the dependencies stuffs
								dependenciesMap[controlNameSpace] = dependenciesMap[controlNameSpace] || {};
								dependenciesMap[controlNameSpace][controlName] = curControlObj;

								//update it for autocomplete
								var relativeControlPath = fileName.substr(fileName.indexOf('aura_upstream/')); //substring to aura_upstream
								relativeControlPath = relativeControlPath.substr(0, relativeControlPath.lastIndexOf('/'));
								controlLocationMap[controlFullName] = relativeControlPath;

								//read and parse
								_util2.default.readFromFileAsync(fileName).then(function (fileContent) {
												//success
												//parsing xml
												var $ = _cheerio2.default.load(fileContent, {
																xmlMode: true
												});

												_lodash2.default.each($('*'), function (attribute) {
																var name = attribute.name;
																var attribs = attribute.attribs;
																var children = attribute.children;

																//populate the parent hier...

																usageMap[name] = usageMap[name] || {};
																usageMap[name][controlFullName] = usageMap[name][controlFullName] || [];
																usageMap[name][controlFullName].push({
																				controlNameSpace: controlNameSpace,
																				controlName: controlName,
																				controlFullName: controlFullName,
																				attribs: attribs
																});

																//populate the use a ...
																if (name.indexOf('aura:') === 0) {
																				//only interest in aura:*
																				switch (name) {
																								case 'aura:attribute':
																												//{name, type, default, description, access}

																												var _util$getKeyValFromCh = _util2.default.getKeyValFromCheerioDom(attribute);

																												var _util$getKeyValFromCh2 = _slicedToArray(_util$getKeyValFromCh, 2);

																												var curAttrName = _util$getKeyValFromCh2[0];
																												var curAttrAttributes = _util$getKeyValFromCh2[1];

																												curControlObj.attributes[curAttrName] = curAttrAttributes;
																												break;

																								case 'aura:import':
																												//{library, property}
																												var library = attribs.library;

																												curControlObj.imports[library] = attribs;
																												break;

																								case 'aura:registerevent':
																												//{name, type, description}
																												var eventName = attribs.name;
																												curControlObj.events[eventName] = attribs;
																												break;

																								case 'aura:handler':
																												//{name, value, action}
																												var handlerName = attribs.name;
																												curControlObj.handlers[handlerName] = attribs;
																												break;

																								case 'aura:method':
																												//{name, action, access, description}
																												var methodName = attribs.name;

																												var childrenAttrs = _lodash2.default.reduce(children || [], function (resChildAttrs, curChildAttr) {
																																if (curChildAttr.name === 'aura:attribute' && attribs) {
																																				var _util$getKeyValFromCh3 = _util2.default.getKeyValFromCheerioDom(curChildAttr);

																																				var _util$getKeyValFromCh4 = _slicedToArray(_util$getKeyValFromCh3, 2);

																																				var childAttrName = _util$getKeyValFromCh4[0];
																																				var childAttrAttributes = _util$getKeyValFromCh4[1];

																																				resChildAttrs[childAttrName] = childAttrAttributes;
																																}

																																return resChildAttrs;
																												}, {});

																												curControlObj.methods[methodName] = childrenAttrs;
																												break;

																								case 'aura:component':
																												//to ignore
																												break;

																								default:
																												var depdenciesName = name;
																												//list of dependenceis
																												curControlObj.dependencies[depdenciesName] = curControlObj.dependencies[depdenciesName] || [];
																												curControlObj.dependencies[depdenciesName].push(attribs);

																												//count control usage
																												controlCountMap[depdenciesName] = controlCountMap[depdenciesName] || 0;
																												controlCountMap[depdenciesName]++;
																												break;
																				}
																} else if (name.indexOf(':') > 0) {
																				//only interested in stuffs with a :
																				var depdenciesName = name;
																				//list of dependenceis
																				curControlObj.dependencies[depdenciesName] = curControlObj.dependencies[depdenciesName] || [];
																				curControlObj.dependencies[depdenciesName].push(attribs);

																				//count control usage
																				controlCountMap[depdenciesName] = controlCountMap[depdenciesName] || 0;
																				controlCountMap[depdenciesName]++;
																}
												});

												//resolved
												defer.resolve();
								});
				});

				//when all things are done, lets prepare to print
				_q2.default.all(promises).then(function () {
								_util2.default.writeToFile(_util2.default.serializeJsonObject(dependenciesMap), _path2.default.join(outputDirDataPath, 'dependenciesMap.json'));

								_util2.default.writeToFile(_util2.default.serializeJsonObject(usageMap), _path2.default.join(outputDirDataPath, 'usageMap.json'));

								_util2.default.writeToFile(_util2.default.serializeJsonObject(namespaceCountMap), _path2.default.join(outputDirDataPath, 'namespaceCountMap.json'));

								var remappedControlCountMap = _lodash2.default.reduce(controlCountMap, function (res, controlReferencesCount, controlName) {
												var fullControlName = controlCountMap[controlName + '.app'] ? controlName + '.app' : controlName + '.cmp';
												res[fullControlName] = controlReferencesCount;

												return res;
								}, {});

								//let's do a map to get the name
								_util2.default.writeToFile(_util2.default.serializeJsonObject(remappedControlCountMap), _path2.default.join(outputDirDataPath, 'controlCountMap.json'));

								_util2.default.writeToFile(_util2.default.serializeJsonObject(_lodash2.default.keys(controlLocationMap)), _path2.default.join(outputDirDataPath, 'autoCompleteControlMap.json'));

								_util2.default.writeToFile(_util2.default.serializeJsonObject(controlLocationMap), _path2.default.join(outputDirDataPath, 'controlLocationMap.json'));

								//write the aura_upstream_pom
								_util2.default.readFromFileAsync(_path2.default.join(baseDirAuraUpstream, 'pom.xml')).done(function (fileContent) {
												_util2.default.writeToFile(fileContent, _path2.default.join(outputDirDataPath, 'aura_upstream_pom.xml'));
								});
				});
};
//# sourceMappingURL=generateLookup.js.map
