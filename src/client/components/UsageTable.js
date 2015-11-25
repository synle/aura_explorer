//external
import _ from 'lodash';
import util from '../util';

//internal component
import KeyValTableComponent from './KeyValTable';
import KeyValueXmlSyntaxComponent from './KeyValueXmlSyntax';
import ControlDetailLink from './ControlDetailLink';

//definitions
const UsageTable = React.createClass({
	getInitialState(){
		return {
			useXmlForm : false
		}
	},
	render(){
		const selectedControlName = this.props.selectedControlName;
		const usageMaps = this.props.usage;

		const allUsagesDom = _.map(
			usageMaps,
			(usageDetails, callerControlName) =>{
				const usagesDom = _.map(
					usageDetails,
					(usageDetail, idx) => {
						const usageDetailDomKey = `${selectedControlName}-${callerControlName}-${idx}-usage}`;
						const attributeDetails = usageDetail.attribs;

						const usageDetailDom = this.state.useXmlForm
							? this._getXmlViewForm   (usageDetailDomKey, selectedControlName, attributeDetails )
							: this._getTableViewForm (usageDetailDomKey, selectedControlName, attributeDetails );

						return (
							<div key={usageDetailDomKey} className="panel panel-default">
								<div className="panel-heading">Usage #{idx + 1}</div>
								{usageDetailDom}
							</div>
						);
					}
				);

				const curControlUsageCount = _.size(usageDetails) > 1
					? `${_.size(usageDetails)} References`
					: null;

				return (
					<div key={`${selectedControlName}-${callerControlName}-usage}`}>
						<div><ControlDetailLink mainText={callerControlName} subText={curControlUsageCount} /></div>
						{usagesDom}
					</div>
				);
			}
		);

		return (
			<div key={`${selectedControlName}-usage-${new Date()}`}>
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
				<div>{allUsagesDom}</div>
			</div>
		);
	},
	_getXmlViewForm(domKey, tagName, objects){
		return (
			<KeyValueXmlSyntaxComponent
				key={domKey}
				objects={objects}
				tagName={tagName} />
		);
	},
	_getTableViewForm(domKey, tagName, objects){
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


export default UsageTable;