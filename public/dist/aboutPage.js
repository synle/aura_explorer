//Developed by Sy Le. Coprighted by Salesforce.com 2015
'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _restClient = require('./dist/restClient');

var _restClient2 = _interopRequireDefault(_restClient);

var _util = require('./dist/util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//internal
//external

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

//utils
_util2.default.render(function () {
	var packageInfo = _restClient2.default.getPackageInfo();
	var explorerConfig = _restClient2.default.getExplorerConfig();
	var auraExplorerJson = _restClient2.default.getAuraExplorerJson();
	var auraStreamPom = _restClient2.default.getAuraStreamPom();

	//control usage count
	ReactDOM.render(React.createElement(AboutPage, { packageInfo: packageInfo,
		explorerConfig: explorerConfig,
		auraExplorerJson: auraExplorerJson,
		auraStreamPom: auraStreamPom }), document.querySelector('#body'));
});