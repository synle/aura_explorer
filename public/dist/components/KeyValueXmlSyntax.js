//Developed by Sy Le. Coprighted by Salesforce.com 2015
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _util = require('dist/util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//definitions
//external
var KeyValueXmlSyntax = React.createClass({
	displayName: 'KeyValueXmlSyntax',
	render: function render() {
		var _props = this.props;
		var objects = _props.objects;
		var tagName = _props.tagName;

		var domAttributes = _lodash2.default.chain(_lodash2.default.keys(objects)).sort().map(function (objKey) {
			var objVal = objects[objKey];
			return objKey + '="' + objVal + '"';
		}).value().join(' ');

		var tagNameWithoutExtension = _util2.default.getTagNameFromControlName(tagName);
		var tagDetailString = '<' + tagNameWithoutExtension + ' ' + domAttributes + ' />';

		return React.createElement(
			'pre',
			null,
			tagDetailString
		);
	}
});

//internal

exports.default = KeyValueXmlSyntax;