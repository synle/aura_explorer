//Developed by Sy Le. Coprighted by Salesforce.com 2015
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//definitions
var KeyValListViewComponent = React.createClass({
	displayName: 'KeyValListViewComponent',
	render: function render() {
		var _this = this;

		var _props = this.props;
		var objects = _props.objects;
		var keyLabel = _props.keyLabel;
		var valueLabel = _props.valueLabel;
		var emptyMsg = _props.emptyMsg;
		var badgeExtraText = _props.badgeExtraText;

		var domKey = 'KeyValListViewComponent-' + keyLabel + '-' + valueLabel;

		if (_lodash2.default.size(objects) === 0) {
			return React.createElement(
				'div',
				{ key: domKey },
				emptyMsg
			);
		} else {
			var domDivRows = _lodash2.default.chain(_lodash2.default.keys(objects)).sort().map(function (objKey) {
				var objVal = objects[objKey];

				return React.createElement(
					'a',
					{ key: 'KeyValListViewComponent-' + keyLabel + '-' + valueLabel + '-' + objKey,
						className: 'list-group-item ellipsis pointer',
						onClick: function onClick() {
							return _this.onSelectRow(objKey);
						} },
					objKey,
					React.createElement(
						'span',
						{ className: 'badge' },
						objVal,
						' ',
						badgeExtraText
					)
				);
			}).value();

			return React.createElement(
				'div',
				{ key: domKey, className: 'list-group' },
				domDivRows
			);
		}
	},
	shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
		return true; //always update
	},
	onSelectRow: function onSelectRow(keyword) {
		if (this.props.onSelectRow) {
			this.props.onSelectRow(keyword);
		}
	}
}); //external

exports.default = KeyValListViewComponent;
//# sourceMappingURL=KeyValListView.js.map
