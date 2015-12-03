//external
import _ from 'lodash';
import util from '/aura-explorer/frontend/util';

//internal
import ControlDetailLink from '/aura-explorer/frontend/components/ControlDetailLink';
import KeyValTableComponent from '/aura-explorer/frontend/components/KeyValTable';
import KeyValueXmlSyntaxComponent from '/aura-explorer/frontend/components/KeyValueXmlSyntax';

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
						// const uniqueArgList = ['idx'].concat( util.getUniqueArgumentsList(depArgObjs) );
						const totalDepCount = _.size(depArgObjs) > 1
							? `${_.size(depArgObjs)} Calls`
							: null;

						//push the header
						const depCount = _.size(depArgObjs) > 0 ? `${_.size(depArgObjs)} Uses`
							: null;//how many time does this use this external component

						resDomDependencies.push(
							<div key={`dependencies-header-${depKey}`}>
								<ControlDetailLink mainText={depKey} subText={totalDepCount} />
							</div>
						);


						//detailed usages
						const dependenciesDetailDom = _.map(
							depArgObjs,
							(depArgObj, depArgObjIdx) => {
								const usageDetailDomKey = `${depKey}-${depArgObjIdx}`;
								const usageDetailDom = this.state.useXmlForm
									? this._getXmlViewForm(depKey, depArgObj)
									: this._getTableViewForm(depKey, depArgObj)

								return (
									<div key={`dependencies-${depKey}-${depArgObjIdx}-body`}
									className="panel panel-info">
										<div className="panel-heading">Dependency #{depArgObjIdx + 1}</div>
										<div className="panel-body">{usageDetailDom}</div>
									</div>
								);
							}
						);

						resDomDependencies.push(
							dependenciesDetailDom
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
	_getXmlViewForm(tagName, objects){
		return (
			<KeyValueXmlSyntaxComponent
				objects={objects}
				tagName={tagName} />
		);
	},
	_getTableViewForm(tagName, objects){
		return _.size(objects) > 0
		? (
			<KeyValTableComponent
				objects={objects}
				clickToViewDetail={false}
				showHeader={false}
				showIndex={false} />
		)
		: <div>Called with No Arguments</div>;
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