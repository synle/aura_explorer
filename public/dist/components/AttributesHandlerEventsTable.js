//Developed by Sy Le. Coprighted by Salesforce.com 2015
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _util = require('../util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//definitions
//external
var Attributes_Handler_Events_Table = React.createClass({
	displayName: 'Attributes_Handler_Events_Table',
	render: function render() {
		var objName = this.props.name;
		var propertiesList = _lodash2.default.get(this, 'props.properties');

		var unigueCellHeaders = _lodash2.default.reduce(propertiesList, function (res, propObj) {
			return _lodash2.default.unique(res.concat(_lodash2.default.keys(propObj)));
		}, []);

		//table headers
		var domTableHeaders = _lodash2.default.map(unigueCellHeaders, function (propName) {
			return React.createElement(
				'th',
				{ key: objName + '-table-header-' + propName },
				propName
			);
		});

		//table rows
		var domTableRows = _lodash2.default.size(propertiesList) === 0 ? null : _lodash2.default.map(propertiesList, function (attributeObj, attributeName, attributeIdx) {
			var tableCellsDom = _lodash2.default.map(unigueCellHeaders, function (propName) {
				return React.createElement(
					'td',
					{ key: objName + '-table-row-' + propName + '-' + attributeIdx },
					attributeObj[propName]
				);
			});

			return React.createElement(
				'tr',
				{ key: 'control-detail-row-attribute-' + attributeObj.name },
				tableCellsDom
			);
		});

		var tableBody = _lodash2.default.size(domTableRows) === 0 ? React.createElement(
			'div',
			null,
			'No ',
			objName
		) : React.createElement(
			'table',
			{ className: 'table table-bordered table-hover table-condensed' },
			React.createElement(
				'thead',
				null,
				React.createElement(
					'tr',
					null,
					domTableHeaders
				)
			),
			React.createElement(
				'tbody',
				null,
				domTableRows
			)
		);

		//return
		return React.createElement(
			'div',
			{ key: objName + '-table' },
			tableBody
		);
	},
	shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
		// return nextProps.selectedControlName !== this.props.selectedControlName;
		return true; //always update
	}
});

exports.default = Attributes_Handler_Events_Table;
//# sourceMappingURL=AttributesHandlerEventsTable.js.map
