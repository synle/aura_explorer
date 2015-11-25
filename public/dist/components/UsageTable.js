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
		var usageMaps = this.props.usage;

		var allUsagesDom = _lodash2.default.map(usageMaps, function (usageDetails, callerControlName) {
			var usagesDom = _lodash2.default.map(usageDetails, function (usageDetail, idx) {
				var usageDetailDomKey = selectedControlName + '-' + callerControlName + '-' + idx + '-usage}';
				var attributeDetails = usageDetail.attribs;

				var usageDetailDom = _this.state.useXmlForm ? _this._getXmlViewForm(usageDetailDomKey, selectedControlName, attributeDetails) : _this._getTableViewForm(usageDetailDomKey, selectedControlName, attributeDetails);

				return React.createElement(
					'div',
					{ key: usageDetailDomKey, className: 'panel panel-default' },
					React.createElement(
						'div',
						{ className: 'panel-heading' },
						'Usage #',
						idx + 1
					),
					usageDetailDom
				);
			});

			var curControlUsageCount = _lodash2.default.size(usageDetails) > 0 ? _lodash2.default.size(usageDetails) + ' References' : null;

			return React.createElement(
				'div',
				{ key: selectedControlName + '-' + callerControlName + '-usage}' },
				React.createElement(
					'div',
					null,
					React.createElement(_ControlDetailLink2.default, { mainText: callerControlName, subText: curControlUsageCount })
				),
				usagesDom
			);
		});

		return React.createElement(
			'div',
			{ key: selectedControlName + '-usage-' + new Date() },
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
				null,
				allUsagesDom
			)
		);
	},
	_getXmlViewForm: function _getXmlViewForm(domKey, tagName, objects) {
		return React.createElement(_KeyValueXmlSyntax2.default, {
			key: domKey,
			objects: objects,
			tagName: tagName });
	},
	_getTableViewForm: function _getTableViewForm(domKey, tagName, objects) {
		return _lodash2.default.size(objects) > 0 ? React.createElement(_KeyValTable2.default, {
			objects: objects,
			clickToViewDetail: false,
			showHeader: false,
			showIndex: false }) : React.createElement(
			'div',
			null,
			'Called with No Arguments'
		);
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
