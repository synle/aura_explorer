//Developed by Sy Le. Coprighted by Salesforce.com 2015
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _util = require('../util');

var _util2 = _interopRequireDefault(_util);

var _Table = require('./Table');

var _Table2 = _interopRequireDefault(_Table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//definitions
var Attributes_Handler_Events_Table = React.createClass({
	displayName: 'Attributes_Handler_Events_Table',
	render: function render() {
		var objName = this.props.name;
		var propertiesList = _lodash2.default.get(this, 'props.properties');
		var flattenedPropertiesValues = _lodash2.default.values(propertiesList);

		var tableBody = _lodash2.default.size(propertiesList) === 0 ? React.createElement(
			'div',
			null,
			'No ',
			objName
		) : React.createElement(_Table2.default, {
			objects: flattenedPropertiesValues,
			showHeader: true,
			showIndex: false });

		//return
		return React.createElement(
			'div',
			{ key: objName + '-table' },
			tableBody
		);
	},
	shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
		return true; //always update
	}
});

//internal
//external

exports.default = Attributes_Handler_Events_Table;
//# sourceMappingURL=AttributesHandlerEventsTable.js.map
