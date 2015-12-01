//Developed by Sy Le. Coprighted by Salesforce.com 2015
'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _processParsingLookup = require('dist/js/backend/processParsingLookup');

var _processParsingLookup2 = _interopRequireDefault(_processParsingLookup);

var _config = require('dist/js/backend/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//run it

//internal
(0, _processParsingLookup2.default)(_path2.default.join(process.cwd(), _config2.default.baseDir, '/'), _path2.default.join(process.cwd(), _config2.default.outputDir, '/')); //external