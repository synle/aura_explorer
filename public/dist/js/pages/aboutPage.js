//Developed by Sy Le. Coprighted by Salesforce.com 2015
'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })(); //external

//internal

//utils

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _restClient = require('dist/js/restClient');

var _restClient2 = _interopRequireDefault(_restClient);

var _util = require('dist/js/util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AboutPage = React.createClass({
	displayName: 'AboutPage',
	render: function render() {
		return React.createElement(
			'div',
			{ className: 'row' },
			React.createElement(
				'div',
				{ className: 'col-sm-12' },
				React.createElement(
					'div',
					{ className: 'mb15' },
					React.createElement(
						'strong',
						null,
						'Aura-Explorer Version'
					),
					' : ',
					this.props.packageInfo.version
				),
				React.createElement(
					'div',
					{ className: 'mb15' },
					React.createElement(
						'strong',
						null,
						'Explorer Config'
					),
					React.createElement(
						'pre',
						null,
						JSON.stringify(this.props.explorerConfig, null, 2)
					)
				),
				React.createElement(
					'div',
					{ className: 'mb15' },
					React.createElement(
						'strong',
						null,
						'Aura Explorer JSON'
					),
					React.createElement(
						'pre',
						null,
						this.props.auraExplorerJson
					)
				),
				React.createElement(
					'div',
					null,
					React.createElement(
						'strong',
						null,
						'Aura Upstream Pom.xml'
					),
					React.createElement(
						'pre',
						null,
						this.props.auraStreamPom
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
	_q2.default.all([_restClient2.default.getPackageInfo(), _restClient2.default.getExplorerConfig(), _restClient2.default.getAuraExplorerJson(), _restClient2.default.getAuraStreamPom()]).done(function (_ref) {
		var _ref2 = _slicedToArray(_ref, 4);

		var packageInfo = _ref2[0];
		var explorerConfig = _ref2[1];
		var auraExplorerJson = _ref2[2];
		var auraStreamPom = _ref2[3];

		ReactDOM.render(React.createElement(AboutPage, { packageInfo: packageInfo,
			explorerConfig: explorerConfig,
			auraExplorerJson: auraExplorerJson,
			auraStreamPom: auraStreamPom }), document.querySelector('#body'));
	});
});