//Developed by Sy Le. Coprighted by Salesforce.com 2015
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mustache = require('mustache');

var _mustache2 = _interopRequireDefault(_mustache);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _logger = require('dist/js/backend/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//internal loggr

//export
//external
var self = {
    _getSimplePathString: function _getSimplePathString(path) {
        var pathString = '';
        try {
            var pathSplits = path.split('/');
            pathString = [pathSplits[pathSplits.length - 3], pathSplits[pathSplits.length - 1]].join('/');
        } catch (ex) {}

        return pathString;
    },
    getComponentNamesFromPath: function getComponentNamesFromPath(path) {
        var shortenPath = self._getSimplePathString(path);

        return [shortenPath.substr(0, shortenPath.indexOf('/')), shortenPath.substr(shortenPath.indexOf('/') + 1)];
    },
    getTemplateFunc: function getTemplateFunc(templateStr) {
        return _mustache2.default.render.bind(undefined, templateStr);
    },
    readFromFileAsync: function readFromFileAsync(path) {
        var defer = _q2.default.defer();

        _logger2.default.debug('Reading file...'.magenta.bold, self._getSimplePathString(path).yellow);;

        defer.resolve(_fs2.default.readFileSync(path, 'utf-8'));

        _fs2.default.readFile(path, 'utf-8', function (error, fileContent) {
            if (error) {
                _logger2.default.log('[ReadFile Error]'.red, path + ': cannot be read');
                defer.resolve(''); //if there is error, resolve with an empty file
            } else {
                    defer.resolve(fileContent);
                }
        });

        return defer.promise;
    },
    listDir: function listDir(inputDir, inputRes) {
        var defer = _q2.default.defer();
        var dirs = _fs2.default.readdirSync(inputDir);

        //reduce and flatten out the dir
        inputRes = _lodash2.default.reduce(dirs, function (res, curDir) {
            var newDir = _path2.default.join(inputDir, curDir);
            if (_fs2.default.lstatSync(newDir).isDirectory()) {
                listDir(newDir, res);
            } else {
                //if this dir contain /target/, then ignore it
                if (newDir.indexOf('/target/') >= 0) {
                    return res;
                }

                //is a file
                var extension = _path2.default.extname(newDir);
                var destinationBucket = undefined;
                switch (extension) {
                    case '.cmp':
                        destinationBucket = 'cmp';
                        break;
                    case '.app':
                        destinationBucket = 'app';
                        break;
                    case '.evt':
                        destinationBucket = 'evt';
                        break;
                    case '.js':
                        destinationBucket = 'js';

                        //special helper js
                        if (newDir.indexOf('Helper.js') >= 0) {
                            destinationBucket = 'helperjs';
                        } else if (newDir.indexOf('Controller.js') >= 0) {
                            destinationBucket = 'controllerjs';
                        } else if (newDir.indexOf('Renderer.js') >= 0) {
                            destinationBucket = 'rendererjs';
                        }
                        break;
                }

                //push new dir to the right bucket
                if (destinationBucket) {
                    if (!res[destinationBucket]) {
                        //defint it if it is not yet define
                        res[destinationBucket] = [];
                    }

                    res[destinationBucket].push(newDir);
                }
            }

            return res; //return result
        }, inputRes || {} //default reduce value
        // app: [],
        // cmp: [],
        // evt: [],
        // helperjs: [],
        // controllerjs: [],
        // rendererjs: [],
        // js: []
        );

        //use for the first call to return the promise
        defer.resolve(inputRes);
        return defer.promise;
    },
    getBaseFileNameWithoutExtension: function getBaseFileNameWithoutExtension(fileName) {
        var shortFileName = _path2.default.basename(fileName);
        return shortFileName.substr(0, shortFileName.indexOf('.'));
    },
    getKeyValFromCheerioDom: function getKeyValFromCheerioDom(cheerioDom) {
        return [cheerioDom.attribs.name, cheerioDom.attribs];
    },
    writeToFile: function writeToFile(string, path, isAppend) {
        _logger2.default.debug(path.yellow);
        if (isAppend === true) {
            _fs2.default.appendFileSync(path, string);
        } else {
            _fs2.default.writeFileSync(path, string);
        }
    },
    serializeJsonObject: function serializeJsonObject(jsonObj) {
        return JSON.stringify(jsonObj, null, 1);
    },

    //this method is used to filter out too common dependencies
    //such as aura:registerEvent
    isValidDependencies: function isValidDependencies(componentFullName) {
        if (componentFullName.indexOf(':') >= 0) {
            //only consider tag with : (namespace:control)
            return true;
        }
        return false;
    },
    getControlRelativePath: function getControlRelativePath(fileName) {
        return fileName.substr(fileName.indexOf('/src/'));
    },
    mkDir: function mkDir(dir) {
        _fs2.default.mkdirSync(dir);
    },

    //append stuff
    appendUsageMapByName: function appendUsageMapByName(usageMap, parentName, childrenName, newUsageObj) {
        usageMap[parentName] = usageMap[parentName] || {};
        usageMap[parentName][childrenName] = usageMap[parentName][childrenName] || [];
        usageMap[parentName][childrenName].push(newUsageObj);
    },
    appendDependenciesPropInControlObj: function appendDependenciesPropInControlObj(curControlObj, depdenciesName, attribs) {
        curControlObj.dependencies[depdenciesName] = curControlObj.dependencies[depdenciesName] || [];
        curControlObj.dependencies[depdenciesName].push(attribs);
    },
    addNamespaceCountMapEntry: function addNamespaceCountMapEntry(namespaceCountMap, controlNameSpace, delta) {
        namespaceCountMap[controlNameSpace] = namespaceCountMap[controlNameSpace] || 0;
        namespaceCountMap[controlNameSpace] += delta;
    },
    addControlCountMapEntry: function addControlCountMapEntry(controlCountMap, depdenciesName, delta) {
        controlCountMap[depdenciesName] = controlCountMap[depdenciesName] || 0;
        controlCountMap[depdenciesName] += delta;
    },
    setDependenciesMapEntry: function setDependenciesMapEntry(dependenciesMap, controlNameSpace, controlName, curControlObj) {
        dependenciesMap[controlNameSpace] = dependenciesMap[controlNameSpace] || {};
        dependenciesMap[controlNameSpace][controlName] = curControlObj;
    }
};

//internal

exports.default = self;