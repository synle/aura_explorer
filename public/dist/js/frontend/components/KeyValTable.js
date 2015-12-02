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

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; } //external

//internal

//definitions
var KeyValTableComponent = React.createClass({
	displayName: 'KeyValTableComponent',
	render: function render() {
		var _props = this.props;
		var objects = _props.objects;
		var keyLabel = _props.keyLabel;
		var valueLabel = _props.valueLabel;
		var emptyMsg = _props.emptyMsg;
		var clickToViewDetail = _props.clickToViewDetail;
		var showHeader = _props.showHeader;
		var showIndex = _props.showIndex;

		var domKey = 'KeyValTableComponent-' + keyLabel + '-' + valueLabel;

		if (_lodash2.default.size(objects) === 0) {
			return React.createElement(
				'div',
				{ key: domKey },
				emptyMsg
			);
		} else {
			var _ret = (function () {
				var rowCount = 0;
				var domTableRows = _lodash2.default.chain(_lodash2.default.keys(objects)).sort().map(function (objKey) {
					var objVal = objects[objKey];
					var domCellText = clickToViewDetail === true ? React.createElement(
						'a',
						{ href: _util2.default.getQueryUrl(objKey) },
						objKey
					) : objKey;

					var rowIdxCell = showIndex === true ? React.createElement(
						'td',
						null,
						++rowCount
					) : null;

					return React.createElement(
						'tr',
						{ key: 'KeyValTableComponent-' + keyLabel + '-' + valueLabel + '-' + objKey },
						rowIdxCell,
						React.createElement(
							'td',
							null,
							domCellText
						),
						React.createElement(
							'td',
							null,
							objVal
						)
					);
				}).value();

				var headerIdxCell = showIndex === true ? React.createElement('th', null) : null;

				var domTableHeaders = showHeader === true ? React.createElement(
					'thead',
					null,
					React.createElement(
						'tr',
						null,
						headerIdxCell,
						React.createElement(
							'th',
							null,
							keyLabel
						),
						React.createElement(
							'th',
							null,
							valueLabel
						)
					)
				) : null;

				return {
					v: React.createElement(
						'table',
						{ key: domKey,
							className: 'table table-bordered table-hover table-condensed table-striped' },
						domTableHeaders,
						React.createElement(
							'tbody',
							null,
							domTableRows
						)
					)
				};
			})();

			if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
		}
	},
	shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
		return true; //always update
	}
});

exports.default = KeyValTableComponent;