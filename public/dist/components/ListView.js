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
var ListView = React.createClass({
	displayName: 'ListView',
	render: function render() {
		var _this = this;

		var key = 'list-view';
		var _props = this.props;
		var data = _props.data;
		var selectedItem = _props.selectedItem;

		var curSelectedItem = selectedItem.toLowerCase();

		var controlsBody = _lodash2.default.chain(_lodash2.default.keys(data)).sort().map(function (propKey) {
			var controlObj = data[propKey];
			var domKey = 'list-view-row-' + propKey;
			return React.createElement(
				'a',
				{ id: domKey,
					key: domKey,
					onClick: function onClick(e) {
						return _this.onRowSelection(propKey);
					},
					title: propKey,
					className: propKey.toLowerCase() === curSelectedItem ? 'list-group-item ellipsis pointer active' : 'list-group-item ellipsis pointer' },
				propKey
			);
		}).value();

		return React.createElement(
			'div',
			{ id: key, key: key, className: 'list-group' },
			controlsBody
		);
	},
	onRowSelection: function onRowSelection(propKey) {
		if (this.props.onRowSelection) {
			this.props.onRowSelection(propKey);
		}
	},
	shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
		return true; //always update
	}
});

exports.default = ListView;
//# sourceMappingURL=ListView.js.map
