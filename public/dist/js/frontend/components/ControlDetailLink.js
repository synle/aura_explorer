//Developed by Sy Le. Coprighted by Salesforce.com 2015
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _util = require('public/dist/js/frontend/util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//definitions
//external
var ControlDetailLink = React.createClass({
	displayName: 'ControlDetailLink',
	render: function render() {
		var _props = this.props;
		var mainText = _props.mainText;
		var subText = _props.subText;

		var subDom = subText ? React.createElement(
			'span',
			{ className: 'badge ml15' },
			subText
		) : null;

		return React.createElement(
			'div',
			{ key: 'control-detail-link-' + mainText + '-' + subText },
			React.createElement(
				'a',
				{ href: _util2.default.getQueryUrl(mainText), className: 'btn btn-large btn-danger mb15' },
				mainText,
				subDom
			)
		);
	}
});

//internal

exports.default = ControlDetailLink;