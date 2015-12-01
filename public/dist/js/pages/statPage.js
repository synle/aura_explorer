//Developed by Sy Le. Coprighted by Salesforce.com 2015
'use strict';

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//main page

//internal react components
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

//utils

//internal
//data
//external
_util2.default.render(function () {
	var controlCountMap = _restClient2.default.getControlCountMap();
	var namespaceCountMap = _restClient2.default.getNamespaceCountMap();

	//TODO: use promises
	// Q.all([restClient.getControlCountMap(), restClient.getNamespaceCountMap()]).done((controlCountMap, namespaceCountMap) => {
	ReactDOM.render(React.createElement(StatPage, { namespaceCountMap: namespaceCountMap,
		controlCountMap: controlCountMap }), document.querySelector('#body'));
	// });
});