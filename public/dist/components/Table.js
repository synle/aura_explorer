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

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; } //external

//definitions
var TableComponent = React.createClass({
	displayName: 'TableComponent',
	render: function render() {
		var _props = this.props;
		var objects = _props.objects;
		var showHeader = _props.showHeader;
		var showIndex = _props.showIndex;
		var emptyMsg = _props.emptyMsg;

		if (_lodash2.default.size(objects) === 0) {
			return React.createElement(
				'div',
				null,
				emptyMsg || 'No Data'
			);
		} else {
			var _ret = (function () {
				var rowCount = 0;
				var uniqueArgsList = _util2.default.getUniqueArgumentsList(objects);

				var headerIdxCell = showIndex === true ? React.createElement('th', null) : null;

				if (showIndex === true) {
					uniqueArgsList.unshift('_idx_');
				}

				var headerCells = showHeader ? _lodash2.default.map(uniqueArgsList, function (argName) {
					var headerKey = 'header-cell-' + argName;
					return React.createElement(
						'th',
						{ key: headerKey },
						argName
					);
				}) : null;

				var domTableRows = _lodash2.default.map(objects, function (object, rowIndex) {
					var rowDomKey = 'TableComponent-Row-' + rowIndex;

					var rowCellsDom = _lodash2.default.map(uniqueArgsList, function (objKey) {
						var objVal = object[objKey] || '';
						var rowCellDomKey = 'TableComponent-Row-' + rowIndex + '-' + objKey;
						return React.createElement(
							'td',
							{ key: rowCellDomKey },
							objVal
						);
					});

					return React.createElement(
						'tr',
						{ key: rowDomKey },
						rowCellsDom
					);
				});

				return {
					v: React.createElement(
						'div',
						null,
						React.createElement(
							'table',
							{ className: 'table table-bordered table-hover table-condensed table-striped' },
							React.createElement(
								'thead',
								null,
								React.createElement(
									'tr',
									null,
									headerCells
								)
							),
							React.createElement(
								'tbody',
								null,
								domTableRows
							)
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

exports.default = TableComponent;