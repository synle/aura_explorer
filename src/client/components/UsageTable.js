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
		const myUsage = this.props.usage;

		const usagesDom = myUsage.map((usageObj, idx) => {
			const subSectionLinkLabel = usageObj.controlFullName;

			const usageDetailDom = this.state.useXmlForm
				? this._getXmlViewForm( selectedControlName, usageObj.attribs )
				: this._getTableViewForm( selectedControlName, usageObj.attribs );

			return (
				<div key={`${subSectionLinkLabel}-usage-table-row-${idx}`} className="mb15">
					<div>
						<ControlDetailLink mainText={subSectionLinkLabel} />
					</div>

					{usageDetailDom}
				</div>
			);
		});

		return (
			<div key={`${selectedControlName}-usage-table`}>
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
				<div id="usageTableContent">{usagesDom}</div>
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
		return (
			<KeyValTableComponent
				objects={objects}
				keyLabel="Argument Name"
				valueLabel="Argument Value"
				emptyMsg="Called with no arguments"
				clickToViewDetail={false}
				showHeader={true}
				showIndex={true} />
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


export default UsageTable;