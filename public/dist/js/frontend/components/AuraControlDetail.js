//Developed by Sy Le. Coprighted by Salesforce.com 2015
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _AttributesHandlerEventsTable = require('dist/js/frontend/components/AttributesHandlerEventsTable');

var _AttributesHandlerEventsTable2 = _interopRequireDefault(_AttributesHandlerEventsTable);

var _UsageTable = require('dist/js/frontend/components/UsageTable');

var _UsageTable2 = _interopRequireDefault(_UsageTable);

var _DependenciesDetailTable = require('dist/js/frontend/components/DependenciesDetailTable');

var _DependenciesDetailTable2 = _interopRequireDefault(_DependenciesDetailTable);

var _MethodTable = require('dist/js/frontend/components/MethodTable');

var _MethodTable2 = _interopRequireDefault(_MethodTable);

var _util = require('dist/js/frontend/util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; } //external

//internal
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

//export
exports.default = ControlDetailPage;