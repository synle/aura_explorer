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

var _KeyValueXmlSyntax = require('./KeyValueXmlSyntax');

var _KeyValueXmlSyntax2 = _interopRequireDefault(_KeyValueXmlSyntax);

var _ControlDetailLink = require('./ControlDetailLink');

var _ControlDetailLink2 = _interopRequireDefault(_ControlDetailLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//definitions
var UsageTable = React.createClass({
	displayName: 'UsageTable',
	getInitialState: function getInitialState() {
		return {
			useXmlForm: false
		};
	},
	render: function render() {
		var _this = this;

		var selectedControlName = this.props.selectedControlName;
		var myUsage = this.props.usage;

		var usagesDom = myUsage.map(function (usageObj, idx) {
			var subSectionLinkLabel = usageObj.controlFullName;

			var usageDetailDom = _this.state.useXmlForm ? _this._getXmlViewForm(selectedControlName, usageObj.attribs) : _this._getTableViewForm(selectedControlName, usageObj.attribs);

			return React.createElement(
				'div',
				{ key: subSectionLinkLabel + '-usage-table-row-' + idx, className: 'mb15' },
				React.createElement(
					'div',
					null,
					React.createElement(_ControlDetailLink2.default, { mainText: subSectionLinkLabel })
				),
				usageDetailDom
			);
		});

		return React.createElement(
			'div',
			{ key: selectedControlName + '-usage-table' },
			React.createElement(
				'div',
				{ className: 'mb15' },
				React.createElement(
					'ul',
					{ className: 'nav nav-pills nav-justified' },
					React.createElement(
						'li',
						{ role: 'presentation', className: !this.state.useXmlForm ? 'active' : '', onClick: function onClick() {
								return _this.changeViewFormat('table');
							} },
						React.createElement(
							'a',
							null,
							'Table Form'
						)
					),
					React.createElement(
						'li',
						{ role: 'presentation', className: this.state.useXmlForm ? 'active' : '', onClick: function onClick() {
								return _this.changeViewFormat('xml');
							} },
						React.createElement(
							'a',
							null,
							'XML Form'
						)
					)
				)
			),
			React.createElement(
				'div',
				{ id: 'usageTableContent' },
				usagesDom
			)
		);
	},
	_getXmlViewForm: function _getXmlViewForm(tagName, objects) {
		return React.createElement(_KeyValueXmlSyntax2.default, {
			objects: objects,
			tagName: tagName });
	},
	_getTableViewForm: function _getTableViewForm(tagName, objects) {
		return React.createElement(_KeyValTable2.default, {
			objects: objects,
			keyLabel: 'Argument Name',
			valueLabel: 'Argument Value',
			emptyMsg: 'Called with no arguments',
			clickToViewDetail: false,
			showHeader: true,
			showIndex: true });
	},
	changeViewFormat: function changeViewFormat(newForm) {
		this.setState({
			useXmlForm: newForm === 'xml'
		});
	},
	shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
		// return nextProps.selectedControlName !== this.props.selectedControlName;
		return true; //always update
	}
});

//internal component
//external

exports.default = UsageTable;
//# sourceMappingURL=UsageTable.js.map
