//Developed by Sy Le. Coprighted by Salesforce.com 2015
'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })(); //external

//internal
//data

//internal react components

//utils

//app init

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _restClient = require('dist/js/restClient');

var _restClient2 = _interopRequireDefault(_restClient);

var _AuraStatCountTable = require('dist/js/components/AuraStatCountTable');

var _AuraStatCountTable2 = _interopRequireDefault(_AuraStatCountTable);

var _util = require('dist/js/util');

var _util2 = _interopRequireDefault(_util);

var _app = require('dist/js/app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//main page
var StatPage = React.createClass({
	displayName: 'StatPage',
	render: function render() {
		return React.createElement(
			'div',
			{ className: 'row' },
			React.createElement(
				'div',
				{ className: 'col-sm-5' },
				React.createElement(
					'div',
					{ className: 'panel panel-success' },
					React.createElement(
						'div',
						{ className: 'panel-heading' },
						React.createElement(
							'h3',
							{ className: 'panel-title' },
							'How many components in a Namespace?'
						)
					),
					React.createElement(
						'div',
						{ className: 'panel-body' },
						React.createElement(_AuraStatCountTable2.default, { countMap: this.props.namespaceCountMap, keyLabel: 'Namespaces', badgeExtraText: 'Components', onSelectRow: this.selectNameSpace })
					)
				)
			),
			React.createElement(
				'div',
				{ className: 'col-sm-7' },
				React.createElement(
					'div',
					{ className: 'panel panel-primary' },
					React.createElement(
						'div',
						{ className: 'panel-heading' },
						React.createElement(
							'h3',
							{ className: 'panel-title' },
							'How many time a component is used?'
						)
					),
					React.createElement(
						'div',
						{ className: 'panel-body' },
						React.createElement(_AuraStatCountTable2.default, { countMap: this.props.controlCountMap,
							keyLabel: 'Controls',
							badgeExtraText: 'References',
							onSelectRow: this.selectControl })
					)
				)
			)
		);
	},
	selectNameSpace: function selectNameSpace(keyword) {
		location.href = _util2.default.getQueryUrl(keyword + ':');
	},
	selectControl: function selectControl(keyword) {
		location.href = _util2.default.getQueryUrl('' + keyword);
	}
});

//rendering
_util2.default.render(function () {
	//init app
	(0, _app2.default)();

	//loading components
	_q2.default.all([_restClient2.default.getControlCountMap(), _restClient2.default.getNamespaceCountMap()]).done(function (_ref) {
		var _ref2 = _slicedToArray(_ref, 2);

		var controlCountMap = _ref2[0];
		var namespaceCountMap = _ref2[1];

		ReactDOM.render(React.createElement(StatPage, { namespaceCountMap: namespaceCountMap,
			controlCountMap: controlCountMap }), document.querySelector('#body'));
	});
});