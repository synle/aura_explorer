//Developed by Sy Le. Coprighted by Salesforce.com 2015
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _util = require('../util');

var _util2 = _interopRequireDefault(_util);

var _KeyValTable = require('./KeyValTable');

var _KeyValTable2 = _interopRequireDefault(_KeyValTable);

var _ControlDetailLink = require('./ControlDetailLink');

var _ControlDetailLink2 = _interopRequireDefault(_ControlDetailLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//definitions

//internal component
//external
var UsageTable = React.createClass({
	displayName: 'UsageTable',
	render: function render() {
		var selectedControlName = this.props.selectedControlName;
		var myUsage = this.props.usage;

		var usagesDom = myUsage.map(function (usageObj, idx) {
			var subSectionLinkLabel = usageObj.controlFullName;

			return React.createElement(
				'div',
				{ key: subSectionLinkLabel + '-usage-table-row-' + idx, className: 'mb15' },
				React.createElement(
					'div',
					null,
					React.createElement(_ControlDetailLink2.default, { mainText: subSectionLinkLabel })
				),
				React.createElement(_KeyValTable2.default, {
					objects: usageObj.attribs,
					keyLabel: 'Argument Name',
					valueLabel: 'Argument Value',
					emptyMsg: 'Called with no arguments',
					clickToViewDetail: false,
					showHeader: true,
					showIndex: true })
			);
		});

		return React.createElement(
			'div',
			{ key: selectedControlName + '-usage-table' },
			usagesDom
		);
	},
	shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
		// return nextProps.selectedControlName !== this.props.selectedControlName;
		return true; //always update
	}
});

exports.default = UsageTable;
//# sourceMappingURL=UsageTable.js.map
