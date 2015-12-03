//Developed by Sy Le. Coprighted by Salesforce.com 2015
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _util = require('dist/js/frontend/util');

var _util2 = _interopRequireDefault(_util);

var _ControlDetailLink = require('dist/js/frontend/components/ControlDetailLink');

var _ControlDetailLink2 = _interopRequireDefault(_ControlDetailLink);

var _KeyValTable = require('dist/js/frontend/components/KeyValTable');

var _KeyValTable2 = _interopRequireDefault(_KeyValTable);

var _KeyValueXmlSyntax = require('dist/js/frontend/components/KeyValueXmlSyntax');

var _KeyValueXmlSyntax2 = _interopRequireDefault(_KeyValueXmlSyntax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//definitions
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
			// const uniqueArgList = ['idx'].concat( util.getUniqueArgumentsList(depArgObjs) );
			var totalDepCount = _lodash2.default.size(depArgObjs) > 1 ? _lodash2.default.size(depArgObjs) + ' Calls' : null;

			//push the header
			var depCount = _lodash2.default.size(depArgObjs) > 0 ? _lodash2.default.size(depArgObjs) + ' Uses' : null; //how many time does this use this external component

			resDomDependencies.push(React.createElement(
				'div',
				{ key: 'dependencies-header-' + depKey },
				React.createElement(_ControlDetailLink2.default, { mainText: depKey, subText: totalDepCount })
			));

			//detailed usages
			var dependenciesDetailDom = _lodash2.default.map(depArgObjs, function (depArgObj, depArgObjIdx) {
				var usageDetailDomKey = depKey + '-' + depArgObjIdx;
				var usageDetailDom = _this.state.useXmlForm ? _this._getXmlViewForm(depKey, depArgObj) : _this._getTableViewForm(depKey, depArgObj);

				return React.createElement(
					'div',
					{ key: 'dependencies-' + depKey + '-' + depArgObjIdx + '-body',
						className: 'panel panel-info' },
					React.createElement(
						'div',
						{ className: 'panel-heading' },
						'Dependency #',
						depArgObjIdx + 1
					),
					React.createElement(
						'div',
						{ className: 'panel-body' },
						usageDetailDom
					)
				);
			});

			resDomDependencies.push(dependenciesDetailDom);

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
	_getXmlViewForm: function _getXmlViewForm(tagName, objects) {
		return React.createElement(_KeyValueXmlSyntax2.default, {
			objects: objects,
			tagName: tagName });
	},
	_getTableViewForm: function _getTableViewForm(tagName, objects) {
		return _lodash2.default.size(objects) > 0 ? React.createElement(_KeyValTable2.default, {
			objects: objects,
			clickToViewDetail: false,
			showHeader: false,
			showIndex: false }) : React.createElement(
			'div',
			null,
			'Called with No Arguments'
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

//internal
//external

exports.default = DependenciesDetailTable;