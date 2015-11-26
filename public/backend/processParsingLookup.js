//Developed by Sy Le. Coprighted by Salesforce.com 2015
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

var _generateLookup = require('./generateLookup');

var _generateLookup2 = _interopRequireDefault(_generateLookup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//internal loggr
//external

exports.default = function (componentBaseDir, metaDataOutputDir) {
	//trim whitespace
	_logger2.default.log('[componentBaseDir]: '.yellow, componentBaseDir);
	_logger2.default.log('[metaDataOutputDir]: '.yellow, metaDataOutputDir);

	//find all cmp files in nested structures
	_util2.default.listDir(componentBaseDir).then(function (componentFileNames) {
		//success
		//print stats
		_logger2.default.log('[Category Statistics]'.yellow);
		_logger2.default.log('\t.app:'.yellow, componentFileNames.app.length);
		_logger2.default.log('\t.cmp:'.yellow, componentFileNames.cmp.length);
		_logger2.default.log('\t.evt:'.yellow, componentFileNames.evt.length);
		_logger2.default.log('\tjs:'.yellow, componentFileNames.js.length);
		_logger2.default.log('\tHelper.js:'.yellow, componentFileNames.helperjs.length);
		_logger2.default.log('\tController.js:'.yellow, componentFileNames.controllerjs.length);
		_logger2.default.log('\tRenderrer.js:'.yellow, componentFileNames.rendererjs.length);

		(0, _generateLookup2.default)(componentFileNames, //dictionary containing all js, evt and cmp files
		componentBaseDir, //base dir of the aura upstream directory
		metaDataOutputDir //base output dir , snippet
		);
	}, function (err) {
		//fail callback
		_logger2.default.error('index.js has issues with getting dir list', err);
	});
};

//internal