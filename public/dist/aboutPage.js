//Developed by Sy Le. Coprighted by Salesforce.com 2015
'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

var _config = require('../public/backend/config.js');

var _config2 = _interopRequireDefault(_config);

var _util = require('./dist/util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//internal
//external

var auraExplorerJson = _fs2.default.readFileSync('./package.json', 'utf8');

//config content

var auraStreamPom = _fs2.default.readFileSync('./data/aura_upstream_pom.xml', 'utf8');

//utils

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
					_package2.default.version
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
						JSON.stringify(_config2.default, null, 2)
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
						auraExplorerJson
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
						auraStreamPom
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
	//control usage count
	ReactDOM.render(React.createElement(AboutPage, null), document.querySelector('#body'));
});