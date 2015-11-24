//Developed by Sy Le. Coprighted by Salesforce.com 2015
'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _controlCountMap = require('../data/controlCountMap.json');

var _controlCountMap2 = _interopRequireDefault(_controlCountMap);

var _namespaceCountMap = require('../data/namespaceCountMap.json');

var _namespaceCountMap2 = _interopRequireDefault(_namespaceCountMap);

var _KeyValListView = require('./dist/components/KeyValListView');

var _KeyValListView2 = _interopRequireDefault(_KeyValListView);

var _util = require('./dist/util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//controls

//internal react components

//internal
//data
var CountTableComponent = React.createClass({
	displayName: 'CountTableComponent',
	getInitialState: function getInitialState() {
		return {
			searchTerm: '',
			countMap: []
		};
	},
	componentDidMount: function componentDidMount() {
		this.setState({
			countMap: this.props.countMap
		});
	},
	render: function render() {
		var key = 'control-count-table';
		var _props = this.props;
		var badgeExtraText = _props.badgeExtraText;
		var onSelectRow = _props.onSelectRow;

		return React.createElement(
			'div',
			{ id: key, key: key },
			React.createElement(
				'div',
				{ className: 'col-sm-12 mb15' },
				React.createElement(
					'div',
					{ className: 'input-group' },
					React.createElement(
						'span',
						{ className: 'input-group-addon', id: 'search-term-input' },
						'Search'
					),
					React.createElement('input', { type: 'text',
						onChange: this.onSearchTermChanged,
						value: this.state.searchTerm,
						className: 'form-control',
						placeholder: 'Enter text to search ...',
						'aria-describedby': 'search-term-input' })
				)
			),
			React.createElement('div', { className: 'clearfix' }),
			React.createElement(
				'div',
				{ className: 'col-sm-12' },
				React.createElement(
					'div',
					{ className: 'text-center mb15' },
					React.createElement(
						'strong',
						null,
						'Total Matches: ',
						_lodash2.default.size(this.state.countMap)
					)
				),
				React.createElement(_KeyValListView2.default, {
					key: key + '-table-detail',
					objects: this.state.countMap,
					keyLabel: this.props.keyLabel,
					valueLabel: 'Count',
					emptyMsg: 'No data',
					badgeExtraText: badgeExtraText,
					onSelectRow: onSelectRow })
			)
		);
	},
	onSearchTermChanged: function onSearchTermChanged(_ref) {
		var newSearchTerm = _ref.target.value;

		newSearchTerm = newSearchTerm.toLowerCase();

		this.setState({
			searchTerm: newSearchTerm,
			countMap: _util2.default.findMatchingKeysInHash(this.props.countMap, newSearchTerm)
		});
	}
});

//utils
//external

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
						React.createElement(CountTableComponent, { countMap: _namespaceCountMap2.default, keyLabel: 'Namespaces', badgeExtraText: 'Components', onSelectRow: this.selectNameSpace })
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
						React.createElement(CountTableComponent, { countMap: _controlCountMap2.default,
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
	//control usage count
	ReactDOM.render(React.createElement(StatPage, null), document.querySelector('#body'));
});
//# sourceMappingURL=statPage.js.map
