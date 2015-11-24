//Developed by Sy Le. Coprighted by Salesforce.com 2015
'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _processParsingLookup = require('./processParsingLookup');

var _processParsingLookup2 = _interopRequireDefault(_processParsingLookup);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//run it

//internal
(0, _processParsingLookup2.default)(_path2.default.join(process.cwd(), _config2.default.baseDir), _config2.default.outputDir); //external
//# sourceMappingURL=app.js.map
