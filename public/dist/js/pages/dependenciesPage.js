//Developed by Sy Le. Coprighted by Salesforce.com 2015
'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })(); //external

//internal
//data

//internal react components

//big component

//utils

//app init

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _restClient = require('dist/js/restClient');

var _restClient2 = _interopRequireDefault(_restClient);

var _ListView = require('dist/js/components/ListView');

var _ListView2 = _interopRequireDefault(_ListView);

var _AuraControlDetail = require('dist/js/components/AuraControlDetail');

var _AuraControlDetail2 = _interopRequireDefault(_AuraControlDetail);

var _util = require('dist/js/util');

var _util2 = _interopRequireDefault(_util);

var _app = require('dist/js/app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//main page
var DependenciesPage = React.createClass({
	displayName: 'DependenciesPage',
	getInitialState: function getInitialState() {
		var searchTerm = _util2.default.getSearchTerm(location.href);
		var flattenDependencies = _util2.default.flattenDependencies(this.props.dataDependenciesMap);

		var myInitState = {
			flattenDependencies: flattenDependencies,
			searchTerm: searchTerm,
			matchedControls: _util2.default.findMatchingControl(flattenDependencies, searchTerm),
			selectedControlName: '',
			selectedControlObj: {}
		};

		//auto select the only item in the list
		if (_lodash2.default.size(myInitState.matchedControls) === 1) {
			myInitState.selectedControlName = _lodash2.default.keys(myInitState.matchedControls)[0];
			myInitState.selectedControlObj = myInitState.matchedControls[myInitState.selectedControlName];
		}

		return myInitState;
	},
	render: function render() {
		var domSelectedControlDetail = undefined;

		return React.createElement(
			'div',
			null,
			React.createElement(
				'div',
				{ className: 'row' },
				React.createElement(
					'div',
					{ className: 'col-sm-12 mb15' },
					React.createElement(
						'div',
						{ className: 'input-group' },
						React.createElement(
							'span',
							{ className: 'input-group-addon', id: 'search-term-input' },
							'Search Term'
						),
						React.createElement('input', { type: 'text',
							value: this.state.searchTerm,
							onChange: this.onSearchTermChanged,
							className: 'form-control',
							placeholder: 'Enter text to search... (<namespace>:<control>)',
							'aria-describedby': 'search-term-input' })
					)
				)
			),
			React.createElement(
				'div',
				{ className: 'row' },
				React.createElement(
					'div',
					{ className: 'col-sm-4' },
					React.createElement(
						'div',
						{ id: 'search-matches-wrapper', className: 'panel panel-success' },
						React.createElement(
							'div',
							{ className: 'panel-heading' },
							React.createElement(
								'h3',
								{ className: 'panel-title' },
								'Matching Searches',
								React.createElement(
									'span',
									{ className: 'badge pull-right' },
									_lodash2.default.size(this.state.matchedControls),
									' matches'
								)
							)
						),
						React.createElement(
							'div',
							{ className: 'panel-body' },
							React.createElement(_ListView2.default, { data: this.state.matchedControls,
								onRowSelection: this.onViewControlDetail,
								selectedItem: this.state.selectedControlName })
						)
					)
				),
				React.createElement(
					'div',
					{ id: 'control-detail-wrapper', className: 'col-sm-8' },
					React.createElement(_AuraControlDetail2.default, { controlName: this.state.selectedControlName,
						controlObj: this.state.selectedControlObj,
						usageMaps: this.props.usageMaps })
				)
			)
		);
	},
	onSearchTermChanged: function onSearchTermChanged(_ref) {
		var newSearchTerm = _ref.target.value;

		newSearchTerm = newSearchTerm.toLowerCase();

		this.setState({
			searchTerm: newSearchTerm,
			matchedControls: _util2.default.findMatchingControl(this.state.flattenDependencies, newSearchTerm)
		});
	},
	onViewControlDetail: function onViewControlDetail(controlName) {
		this.setState({
			// searchTerm : controlName,
			// matchedControls : util.findMatchingControl( controlName ),
			selectedControlName: controlName,
			selectedControlObj: this.state.matchedControls[controlName]
		});
	}
});

//rendering
_util2.default.render(function () {
	//init app
	(0, _app2.default)();

	//loading components
	_q2.default.all([_restClient2.default.getDataDependenciesMap(), _restClient2.default.getUsageMap()]).done(function (_ref2) {
		var _ref3 = _slicedToArray(_ref2, 2);

		var dataDependenciesMap = _ref3[0];
		var usageMaps = _ref3[1];

		ReactDOM.render(React.createElement(DependenciesPage, { dataDependenciesMap: dataDependenciesMap,
			usageMaps: usageMaps }), document.querySelector('#body'));
	});
});