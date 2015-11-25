//Developed by Sy Le. Coprighted by Salesforce.com 2015
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _util = require('../util');

var _util2 = _interopRequireDefault(_util);

var _ControlDetailLink = require('./ControlDetailLink');

var _ControlDetailLink2 = _interopRequireDefault(_ControlDetailLink);

var _KeyValueXmlSyntax = require('./KeyValueXmlSyntax');

var _KeyValueXmlSyntax2 = _interopRequireDefault(_KeyValueXmlSyntax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//definitions

//internal
//external
var DependenciesDetailTable = React.createClass({
	displayName: 'DependenciesDetailTable',
	getInitialState: function getInitialState() {
		return {
			useXmlForm: false
		};
	},
	render: function render() {
		var _this = this;

		var dependenciesMap = _lodash2.default.get(this, 'props.dependencies');
		var domDependencies = _lodash2.default.size(dependenciesMap) === 0 ? React.createElement(
			'div',
			null,
			'No Dependencies'
		) : _lodash2.default.reduce(dependenciesMap, function (resDomDependencies, depArgObjs, depKey) {
			var uniqueArgList = ['idx'].concat(_util2.default.getUniqueArgumentsList(depArgObjs));

			//push the header
			var depCount = _lodash2.default.size(depArgObjs) > 0 ? _lodash2.default.size(depArgObjs) + ' Uses' : null; //how many time does this use this external component

			resDomDependencies.push(React.createElement(
				'div',
				{ key: 'dependencies-header-' + depKey },
				React.createElement(_ControlDetailLink2.default, { mainText: depKey })
			));

			//append the detail usage
			var dependenciesDetailDom = _this.state.useXmlForm ? _this._getXmlViewForm(depKey, uniqueArgList, depArgObjs) : _this._getTableViewForm(depKey, uniqueArgList, depArgObjs);

			resDomDependencies.push(React.createElement(
				'div',
				{ key: 'dependencies-' + depKey + '-body', className: 'panel panel-default' },
				React.createElement(
					'div',
					{ className: 'panel-heading' },
					'Dependency'
				),
				dependenciesDetailDom
			));

			//return
			return resDomDependencies;
		}, []);

		//render return
		return React.createElement(
			'div',
			null,
			React.createElement(
				'div',
				{ className: 'mb15' },
				React.createElement(
					'ul',
					{ className: 'nav nav-pills nav-justified' },
					React.createElement(
						'li',
						{ role: 'presentation', className: !this.state.useXmlForm ? 'active' : '', onClick: function onClick() {
								return _this.changeViewFormat('table');
							} },
						React.createElement(
							'a',
							null,
							'Table Form'
						)
					),
					React.createElement(
						'li',
						{ role: 'presentation', className: this.state.useXmlForm ? 'active' : '', onClick: function onClick() {
								return _this.changeViewFormat('xml');
							} },
						React.createElement(
							'a',
							null,
							'XML Form'
						)
					)
				)
			),
			domDependencies
		);
	},
	_getXmlViewForm: function _getXmlViewForm(depKey, uniqueArgList, depArgObjs) {
		return _lodash2.default.map(depArgObjs, function (depArgObj, depArgIdx) {
			return React.createElement(
				'div',
				{ className: 'mb15' },
				React.createElement(_KeyValueXmlSyntax2.default, {
					key: 'dependencies-' + depKey + '-xml-' + depArgIdx,
					objects: depArgObj,
					tagName: depKey })
			);
		});
	},
	_getTableViewForm: function _getTableViewForm(depKey, uniqueArgList, depArgObjs) {
		//header with the arg name
		var curUsageHeaderList = _lodash2.default.map(uniqueArgList, function (argName) {
			return React.createElement(
				'th',
				{ key: 'arg-header-' + argName },
				argName
			);
		});

		//find unique attributes list
		var curUsageDomList = _lodash2.default.map(depArgObjs, function (depArgObj, depArgIdx) {
			var curUsageRowCellsDom = _lodash2.default.map(uniqueArgList, function (argName, argIdx) {
				return argIdx > 0 ? React.createElement(
					'td',
					{ key: 'dependencies-cell-' + depKey + '-' + depArgIdx + '-' + argIdx },
					depArgObj[argName]
				) : React.createElement(
					'td',
					{ key: 'dependencies-cell-' + depKey + '-' + depArgIdx + '-' + argIdx },
					++depArgIdx
				);
			});

			//return
			return React.createElement(
				'tr',
				{ key: 'dependencies-row-' + depKey + '-' + depArgIdx },
				curUsageRowCellsDom
			);
		});

		return React.createElement(
			'table',
			{ key: 'dependencies-table-' + depKey, className: 'table table-bordered table-hover table-condensed' },
			React.createElement(
				'thead',
				null,
				React.createElement(
					'tr',
					null,
					curUsageHeaderList
				)
			),
			React.createElement(
				'tbody',
				null,
				curUsageDomList
			)
		);
	},
	changeViewFormat: function changeViewFormat(newForm) {
		this.setState({
			useXmlForm: newForm === 'xml'
		});
	},
	shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
		// return nextProps.selectedControlName !== this.props.selectedControlName;
		return true; //always update
	}
});

exports.default = DependenciesDetailTable;
//# sourceMappingURL=DependenciesDetailTable.js.map
