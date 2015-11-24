//external
import _ from 'lodash';
import util from '../util';

//internal
import ControlDetailLink from './ControlDetailLink';

//definitions
const DependenciesDetailTable = React.createClass({
	render(){
		const dependenciesMap = _.get(this, 'props.dependencies');
		const domDependencies = _.size(dependenciesMap) === 0
				? (<div>No Dependencies</div>)
				: _.reduce(
					dependenciesMap,
					(resDomDependencies, depArgObjs, depKey) => {
						const uniqueArgList = ['idx'].concat( util.getUniqueArgumentsList(depArgObjs) );

						//find unique attributes list
						const curUsageDomList = _.map(
							depArgObjs,
							(depArgObj, depArgIdx) => {
								let curUsageRowCellsDom = _.map(uniqueArgList, (argName, argIdx) => {
									return argIdx > 0
										? (
											<td key={`dependencies-cell-${depKey}-${depArgIdx}-${argIdx}`}>
												{depArgObj[argName]}
											</td>
										)
										: <td key={`dependencies-cell-${depKey}-${depArgIdx}-${argIdx}`}>
												{++depArgIdx}
											</td>;
								});

								//return
								return(
									<tr key={`dependencies-row-${depKey}-${depArgIdx}`}>
										{curUsageRowCellsDom}
									</tr>
								);
							}
						);


						//header with the arg name
						const curUsageHeaderList = _.map(
							uniqueArgList,
							argName => (<th key={`arg-header-${argName}`}>{argName}</th>)
						);




						//push the header
						const depCount = _.size(depArgObjs) > 0 ? `${_.size(depArgObjs)} Uses`
							: null;//how many time does this use this external component

						resDomDependencies.push(
							<div key={`dependencies-header-${depKey}`}>
								<ControlDetailLink mainText={depKey} />
							</div>
						);

						//append the detail usage
						resDomDependencies.push(
							<table key={`dependencies-table-${depKey}`} className="table table-bordered table-hover table-condensed">
								<thead>
								    <tr>
								    	{curUsageHeaderList}
								    </tr>
								</thead>
								<tbody>
								    {curUsageDomList}
								</tbody>
							</table>
						);

						//return
						return resDomDependencies;
					},
					[]
				);



		//render return
		return (
			<div>
				{domDependencies}
			</div>
		);
	},
	shouldComponentUpdate(nextProps, nextState) {
		// return nextProps.selectedControlName !== this.props.selectedControlName;
		return true;//always update
	}
});

export default DependenciesDetailTable;