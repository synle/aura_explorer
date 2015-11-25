//external
import _ from 'lodash';
import util from '../util';

//internal
import ControlDetailLink from './ControlDetailLink';
import KeyValueXmlSyntaxComponent from './KeyValueXmlSyntax';

//definitions
const DependenciesDetailTable = React.createClass({
	getInitialState(){
		return {
			useXmlForm : false
		}
	},
	render(){
		const dependenciesMap = _.get(this, 'props.dependencies');
		const domDependencies = _.size(dependenciesMap) === 0
				? (<div>No Dependencies</div>)
				: _.reduce(
					dependenciesMap,
					(resDomDependencies, depArgObjs, depKey) => {
						const uniqueArgList = ['idx'].concat( util.getUniqueArgumentsList(depArgObjs) );


						//push the header
						const depCount = _.size(depArgObjs) > 0 ? `${_.size(depArgObjs)} Uses`
							: null;//how many time does this use this external component

						resDomDependencies.push(
							<div key={`dependencies-header-${depKey}`}>
								<ControlDetailLink mainText={depKey} />
							</div>
						);

						//append the detail usage
						const dependenciesDetailDom = this.state.useXmlForm
							? this._getXmlViewForm(depKey, uniqueArgList, depArgObjs)
							: this._getTableViewForm(depKey, uniqueArgList, depArgObjs);


						resDomDependencies.push(
							<div key={`dependencies-${depKey}-body`} className="panel panel-default">
								<div className="panel-heading">Dependency</div>
								{dependenciesDetailDom}
							</div>
						);

						//return
						return resDomDependencies;
					},
					[]
				);



		//render return
		return (
			<div>
				<div className="mb15">
					<ul className="nav nav-pills nav-justified">
						<li role="presentation" className={!this.state.useXmlForm ? 'active' : ''} onClick={()=> this.changeViewFormat('table')}>
							<a>Table Form</a>
						</li>
						<li role="presentation" className={this.state.useXmlForm ? 'active' : ''} onClick={()=> this.changeViewFormat('xml')}>
							<a>XML Form</a>
						</li>
					</ul>
				</div>
				{domDependencies}
			</div>
		);
	},
	_getXmlViewForm(depKey, uniqueArgList, depArgObjs){
		return _.map(
			depArgObjs,
			(depArgObj, depArgIdx) => {
				return (
					<div className="mb15">
						<KeyValueXmlSyntaxComponent
							key={`dependencies-${depKey}-xml-${depArgIdx}`}
							objects={depArgObj}
							tagName={depKey} />
					</div>
				);
			}
		);
	},
	_getTableViewForm(depKey, uniqueArgList, depArgObjs){
		//header with the arg name
		const curUsageHeaderList = _.map(
			uniqueArgList,
			argName => (<th key={`arg-header-${argName}`}>{argName}</th>)
		);

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


		return (
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
	},
	changeViewFormat(newForm){
		this.setState({
			useXmlForm: newForm === 'xml'
		});
	},
	shouldComponentUpdate(nextProps, nextState) {
		// return nextProps.selectedControlName !== this.props.selectedControlName;
		return true;//always update
	}
});

export default DependenciesDetailTable;