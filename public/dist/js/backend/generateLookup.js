//Developed by Sy Le. Coprighted by Salesforce.com 2015
'use strict';

//external

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

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

var _logger = require('dist/js/backend/logger');

var _logger2 = _interopRequireDefault(_logger);

var _util = require('dist/js/backend/util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//exports

exports.default = function (componentFileNames, baseDirAuraUpstream, outputDirDataPath) {
	var mainDefer = _q2.default.defer();
	var promises = [];

	var interestedFiles = _lodash2.default.merge(_lodash2.default.values(componentFileNames.cmp), _lodash2.default.values(componentFileNames.app));

	//buffer used to store meta data
	var auraUpstreamPomFileContent = undefined;

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
	_logger2.default.log('[Begin parsing]:'.yellow, _lodash2.default.size(interestedFiles));
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
		_util2.default.addNamespaceCountMapEntry(namespaceCountMap, controlNameSpace, 1);

		//update the dependencies stuffs
		_util2.default.setDependenciesMapEntry(dependenciesMap, controlNameSpace, controlName, curControlObj);

		//update it for autocomplete
		var relativeControlPath = fileName.substr(fileName.indexOf('aura_upstream/')); //substring to aura_upstream
		relativeControlPath = relativeControlPath.substr(0, relativeControlPath.lastIndexOf('/'));
		controlLocationMap[controlFullName] = relativeControlPath;

		//read and parse
		_util2.default.readFromFileAsync(fileName).then(function (fileContent) {
			var relativeFileName = _util2.default.getControlRelativePath(fileName);

			try {
				//parsing xml
				var $ = _cheerio2.default.load(fileContent, {
					xmlMode: true
				});

				_lodash2.default.each($('*'), function (attribute) {
					var name = attribute.name;
					var attribs = attribute.attribs;
					var children = attribute.children;

					//populate usage map

					_util2.default.appendUsageMapByName(usageMap, name, controlFullName, {
						controlNameSpace: controlNameSpace,
						controlName: controlName,
						controlFullName: controlFullName,
						attribs: attribs
					});

					//populate the use a ...
					switch (name.toLowerCase()) {
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
							//other tag will be considered depdencies
							var depdenciesName = name;
							if (_util2.default.isValidDependencies(depdenciesName)) {
								//list of depdencies
								_util2.default.appendDependenciesPropInControlObj(curControlObj, depdenciesName, attribs);

								//count control usage
								_util2.default.addControlCountMapEntry(controlCountMap, depdenciesName, 1);
							}
							break;
					}
				});

				//resolved
				defer.resolve(relativeFileName + ' done');
			} catch (e) {
				defer.reject(relativeFileName + ' : ' + e);
			}
		});
	});

	var deferAuraPomXml = _q2.default.defer();
	promises.push(deferAuraPomXml.promise);
	_util2.default.readFromFileAsync(_path2.default.join(baseDirAuraUpstream, 'pom.xml')).done(function (fileContent) {
		auraUpstreamPomFileContent = fileContent;
		deferAuraPomXml.resolve();
	});

	//when all things are done, lets prepare to print
	_logger2.default.log('[Waiting for promises]: '.yellow, promises.length);
	_q2.default.allSettled(promises).then(function (results) {
		_logger2.default.log('[Promises Returned]: '.yellow);

		//aggregate errors
		var promiseSuccessCount = 0,
		    promiseFailCount = 0;
		var promisesErrors = [];
		_lodash2.default.each(results, function (result) {
			var value = result.value;
			var reason = result.reason;

			if (result.state !== "fulfilled") {
				promisesErrors.push(reason);
				promiseFailCount++;
			} else {
				promiseSuccessCount++;
			}
		});

		//resolve the main promise
		mainDefer.resolve({
			promisesErrors: promisesErrors,
			promiseSuccessCount: promiseSuccessCount,
			promiseFailCount: promiseFailCount
		});
	}).then(function (_ref) {
		var promisesErrors = _ref.promisesErrors;
		var promiseSuccessCount = _ref.promiseSuccessCount;
		var promiseFailCount = _ref.promiseFailCount;

		//printing out the promise results
		_logger2.default.log('[Promises Statistics:]'.yellow, promiseSuccessCount + ' succeeded', promiseFailCount + ' failed');

		//print out promise error
		_lodash2.default.each(promisesErrors, function (promiseError) {
			return _logger2.default.log('[Promise Failed]: '.red, promiseError);
		});

		mainDefer.resolve();
	});

	//main promise
	mainDefer.promise.then(function () {
		_logger2.default.log('[Main Promise Returned, Writing Output]:'.yellow);

		//writing stuff to file
		var remappedControlCountMap = _lodash2.default.reduce(controlCountMap, function (res, controlReferencesCount, controlName) {
			var fullControlName = controlCountMap[controlName + '.app'] ? controlName + '.app' : controlName + '.cmp';
			res[fullControlName] = controlReferencesCount;

			return res;
		}, {});

		//writing to files
		var _writeToFile = function _writeToFile(jsonSerialization, content, outputFileName) {
			var contentToWrite = jsonSerialization ? _util2.default.serializeJsonObject(content) : content;
			var outputFullPath = _path2.default.join(outputDirDataPath, outputFileName);

			_logger2.default.log('\t[Writing To]: '.yellow, outputFullPath.blue, contentToWrite.length);

			_util2.default.writeToFile(contentToWrite, outputFullPath);
		};

		//making output dir if it is not there
		_logger2.default.log('[Making Output Dir]'.yellow, outputDirDataPath);
		try {
			_util2.default.mkDir(outputDirDataPath);
			_logger2.default.log('\t[OuputDir Created]'.yellow);
		} catch (e) {
			_logger2.default.log('\t[Skipped]'.yellow, e);
		}

		//writing files
		_logger2.default.log('[Writing Output]'.yellow);
		try {
			_writeToFile(true, //need json serialization
			dependenciesMap, 'dependenciesMap.json');

			_writeToFile(true, //need json serialization
			usageMap, 'usageMap.json');

			_writeToFile(true, //need json serialization
			namespaceCountMap, 'namespaceCountMap.json');

			//let's do a map to get the name
			_writeToFile(true, //need json serialization
			remappedControlCountMap, 'controlCountMap.json');

			_writeToFile(true, //need json serialization
			controlLocationMap, 'autoCompleteControlMap.json');

			_writeToFile(true, //need json serialization
			controlLocationMap, 'controlLocationMap.json');

			//write the aura_upstream_pom
			_writeToFile(false, auraUpstreamPomFileContent, 'aura_upstream_pom.xml');
		} catch (ex) {
			_logger2.default.log('[Main Defer Error]'.red, ex);
		}
	});
};