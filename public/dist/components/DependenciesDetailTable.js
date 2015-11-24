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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//definitions
var DependenciesDetailTable = React.createClass({
	displayName: 'DependenciesDetailTable',
	render: function render() {
		var dependenciesMap = _lodash2.default.get(this, 'props.dependencies');
		var domDependencies = _lodash2.default.size(dependenciesMap) === 0 ? React.createElement(
			'div',
			null,
			'No Dependencies'
		) : _lodash2.default.reduce(dependenciesMap, function (resDomDependencies, depArgObjs, depKey) {
			var uniqueArgList = ['idx'].concat(_util2.default.getUniqueArgumentsList(depArgObjs));

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

			//header with the arg name
			var curUsageHeaderList = _lodash2.default.map(uniqueArgList, function (argName) {
				return React.createElement(
					'th',
					{ key: 'arg-header-' + argName },
					argName
				);
			});

			//push the header
			var depCount = _lodash2.default.size(depArgObjs) > 0 ? _lodash2.default.size(depArgObjs) + ' Uses' : null; //how many time does this use this external component

			resDomDependencies.push(React.createElement(
				'div',
				{ key: 'dependencies-header-' + depKey },
				React.createElement(_ControlDetailLink2.default, { mainText: depKey })
			));

			//append the detail usage
			resDomDependencies.push(React.createElement(
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
			));

			//return
			return resDomDependencies;
		}, []);

		//render return
		return React.createElement(
			'div',
			null,
			domDependencies
		);
	},
	shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
		// return nextProps.selectedControlName !== this.props.selectedControlName;
		return true; //always update
	}
});

//internal
//external

exports.default = DependenciesDetailTable;
//# sourceMappingURL=DependenciesDetailTable.js.map
