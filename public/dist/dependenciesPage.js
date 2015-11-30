//Developed by Sy Le. Coprighted by Salesforce.com 2015
'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _restClient = require('dist/restClient');

var _restClient2 = _interopRequireDefault(_restClient);

var _ListView = require('dist/components/ListView');

var _ListView2 = _interopRequireDefault(_ListView);

var _AttributesHandlerEventsTable = require('dist/components/AttributesHandlerEventsTable');

var _AttributesHandlerEventsTable2 = _interopRequireDefault(_AttributesHandlerEventsTable);

var _UsageTable = require('dist/components/UsageTable');

var _UsageTable2 = _interopRequireDefault(_UsageTable);

var _ControlDetailLink = require('dist/components/ControlDetailLink');

var _ControlDetailLink2 = _interopRequireDefault(_ControlDetailLink);

var _DependenciesDetailTable = require('dist/components/DependenciesDetailTable');

var _DependenciesDetailTable2 = _interopRequireDefault(_DependenciesDetailTable);

var _MethodTable = require('dist/components/MethodTable');

var _MethodTable2 = _interopRequireDefault(_MethodTable);

var _util = require('dist/util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; } //external

//internal
//data

//internal react components

//utils

//control detail
var ControlDetailPage = React.createClass({
	displayName: 'ControlDetailPage',
	render: function render() {
		var _this = this;

		if (!this.props.controlName) {
			return React.createElement(
				'div',
				{ className: 'panel panel-primary' },
				React.createElement(
					'div',
					{ className: 'panel-body' },
					'Please select a match from the left side of this page to view the detailed description'
				)
			);
		} else {
			var _ret = (function () {
				var controlName = _this.props.controlName.toLowerCase();
				var shortControlName = controlName.substr(controlName, controlName.lastIndexOf('.'));
				var dependenciesMap = _lodash2.default.get(_this, 'props.controlObj.dependencies', {});
				var methodsMap = _lodash2.default.get(_this, 'props.controlObj.methods', {}); //{controlName => methodName : {attribs}}

				var attributeList = _lodash2.default.values(_lodash2.default.get(_this, 'props.controlObj.attributes', []));
				var eventsList = _lodash2.default.values(_lodash2.default.get(_this, 'props.controlObj.events', {}));
				var handlersList = _lodash2.default.values(_lodash2.default.get(_this, 'props.controlObj.handlers', {}));
				var importsList = _lodash2.default.values(_lodash2.default.get(_this, 'props.controlObj.imports', {}));

				var usageList = _lodash2.default.reduce(_this.props.usageMaps, function (res, usageMap, curControlName) {
					if (shortControlName === curControlName.toLowerCase()) {
						return usageMap;
					}
					return res;
				}, {});

				var controlNameBreadCrumsDom = _lodash2.default.map(controlName.split(/[:.]/), function (token, tokenIdx) {
					return React.createElement(
						'li',
						{ key: token + '-' + tokenIdx },
						token
					);
				});

				return {
					v: React.createElement(
						'div',
						{ id: 'control-detail-wrapper' },
						React.createElement(
							'div',
							null,
							React.createElement(
								'ol',
								{ className: 'breadcrumb' },
								controlNameBreadCrumsDom
							)
						),
						React.createElement(
							'ul',
							{ className: 'nav nav-tabs', role: 'tablist' },
							_this._getTabHeaderItem("tab-attributes", "Attributes", attributeList, true),
							_this._getTabHeaderItem("tab-dependencies", "Dependencies", dependenciesMap),
							_this._getTabHeaderItem("tab-events", "Events", eventsList),
							_this._getTabHeaderItem("tab-imports", "Imports", importsList),
							_this._getTabHeaderItem("tab-handlers", "Handlers", handlersList),
							_this._getTabHeaderItem("tab-methods", "Methods", methodsMap),
							_this._getTabHeaderItem("tab-usages", "Usages", usageList)
						),
						React.createElement(
							'div',
							{ className: 'tab-content' },
							React.createElement(
								'div',
								{ role: 'tabpanel', className: 'tab-pane active', id: 'tab-attributes' },
								React.createElement(_AttributesHandlerEventsTable2.default, { name: 'Attributes', properties: attributeList })
							),
							React.createElement(
								'div',
								{ role: 'tabpanel', className: 'tab-pane', id: 'tab-dependencies' },
								React.createElement(_DependenciesDetailTable2.default, { dependencies: dependenciesMap })
							),
							React.createElement(
								'div',
								{ role: 'tabpanel', className: 'tab-pane', id: 'tab-events' },
								React.createElement(_AttributesHandlerEventsTable2.default, { name: 'Events', properties: eventsList })
							),
							React.createElement(
								'div',
								{ role: 'tabpanel', className: 'tab-pane', id: 'tab-imports' },
								React.createElement(_AttributesHandlerEventsTable2.default, { name: 'Imports', properties: importsList })
							),
							React.createElement(
								'div',
								{ role: 'tabpanel', className: 'tab-pane', id: 'tab-handlers' },
								React.createElement(_AttributesHandlerEventsTable2.default, { name: 'Handlers', properties: handlersList })
							),
							React.createElement(
								'div',
								{ role: 'tabpanel', className: 'tab-pane', id: 'tab-methods' },
								React.createElement(_MethodTable2.default, { methodsMap: methodsMap })
							),
							React.createElement(
								'div',
								{ role: 'tabpanel', className: 'tab-pane', id: 'tab-usages' },
								React.createElement(_UsageTable2.default, { selectedControlName: controlName, usage: usageList })
							)
						)
					)
				};
			})();

			if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
		}
	},
	shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
		// return nextProps.selectedControlName !== this.props.selectedControlName;
		return true; //always update
	},
	_getTabHeaderItem: function _getTabHeaderItem(tabContentId, headerName, entityObjects, active) {
		var entityCount = _lodash2.default.size(entityObjects);
		var tabPlainText = headerName + ' ' + this._getCountBadge(entityCount);

		return React.createElement(
			'li',
			{ role: 'presentation', className: active ? 'active' : '' },
			React.createElement(
				'a',
				{ href: '#' + tabContentId, 'aria-controls': 'settings', role: 'tab', 'data-toggle': 'tab' },
				tabPlainText
			)
		);
	},
	_getCountBadge: function _getCountBadge(countNum) {
		return countNum > 0 ? '[' + countNum + ']' : '';
	}
});

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
					React.createElement(ControlDetailPage, { controlName: this.state.selectedControlName,
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
	var dataDependenciesMap = _restClient2.default.getDataDependenciesMap();
	var usageMaps = _restClient2.default.getUsageMap();

	//control usage count
	ReactDOM.render(React.createElement(DependenciesPage, { dataDependenciesMap: dataDependenciesMap,
		usageMaps: usageMaps }), document.querySelector('#body'));
});