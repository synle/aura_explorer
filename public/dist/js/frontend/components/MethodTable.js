//Developed by Sy Le. Coprighted by Salesforce.com 2015
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Table = require('public/dist/js/frontend/components/Table');

var _Table2 = _interopRequireDefault(_Table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//definitions
//external
var MethodTable = React.createClass({
	displayName: 'MethodTable',
	render: function render() {
		//{controlName => methodName : {attribs}}
		var methodsMap = this.props.methodsMap;

		var domKey = 'method-description';

		var methodsDom = _lodash2.default.size(methodsMap) > 0 ? _lodash2.default.map(methodsMap, function (methodsAttribs, methodName) {
			var subDomKey = 'methods-' + methodName;
			var methodsArgDom = 'No Argument For This Method';
			if (_lodash2.default.size(methodsAttribs) > 0) {
				var flattenedMethodsAttribs = _lodash2.default.values(methodsAttribs);

				methodsArgDom = React.createElement(_Table2.default, {
					objects: flattenedMethodsAttribs,
					showHeader: true,
					showIndex: false });
			}

			return React.createElement(
				'div',
				{ key: subDomKey, className: 'panel panel-info' },
				React.createElement(
					'div',
					{ className: 'panel-heading' },
					methodName
				),
				React.createElement(
					'div',
					{ className: 'panel-body' },
					methodsArgDom
				)
			);
		}) : 'No Methods';

		return React.createElement(
			'div',
			{ key: domKey },
			methodsDom
		);
	}
});

//internal

exports.default = MethodTable;