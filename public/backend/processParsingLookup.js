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

exports.default = function (baseDir, outputDir) {
	_logger2.default.log(baseDir.bold.underline, baseDir);

	//trim whitespace
	baseDir = baseDir.trim();
	outputDir = outputDir.trim();

	//get a list of all files
	//read content files
	var componentBaseDir = _path2.default.join(baseDir, '/');

	//find all cmp files in nested structures
	_util2.default.listDir(componentBaseDir).then(function (componentFileNames) {
		//success
		//print stats
		_logger2.default.log('Statistics'.bold.underline.bgBlue.white);
		_logger2.default.log('.app Files:'.bold, componentFileNames.app.length);
		_logger2.default.log('.cmp Files:'.bold, componentFileNames.cmp.length);
		_logger2.default.log('.evt Files:'.bold, componentFileNames.evt.length);
		// logger.log('js Files:'.bold, componentFileNames.js.length);
		_logger2.default.log('\tHelper.js Files:'.bold, componentFileNames.helperjs.length);
		_logger2.default.log('\tController.js Files:'.bold, componentFileNames.controllerjs.length);
		_logger2.default.log('\tRenderrer.js Files:'.bold, componentFileNames.rendererjs.length);

		(0, _generateLookup2.default)(componentFileNames, //dictionary containing all js, evt and cmp files
		baseDir, //base dir of the aura upstream directory
		outputDir //base output dir , snippet
		);
	}, function (err) {
		//fail callback
		_logger2.default.error('index.js has issues with getting dir list', err);
	});
};

//internal
//# sourceMappingURL=processParsingLookup.js.map
