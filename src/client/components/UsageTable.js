//external
import _ from 'lodash';
import util from '../util';

//internal component
import KeyValTableComponent from './KeyValTable';
import ControlDetailLink from './ControlDetailLink';

//definitions
const UsageTable = React.createClass({
	render(){
		const selectedControlName = this.props.selectedControlName;
		const myUsage = this.props.usage;

		const usagesDom = myUsage.map((usageObj, idx) => {
			const subSectionLinkLabel = usageObj.controlFullName;

			return (
				<div key={`${subSectionLinkLabel}-usage-table-row-${idx}`} className="mb15">
					<div>
						<ControlDetailLink mainText={subSectionLinkLabel} />
					</div>

					<KeyValTableComponent
						objects={usageObj.attribs}
						keyLabel="Argument Name"
						valueLabel="Argument Value"
						emptyMsg="Called with no arguments"
						clickToViewDetail={false}
						showHeader={true}
						showIndex={true} />
				</div>
			);
		});

		return (
			<div key={`${selectedControlName}-usage-table`}>
				{usagesDom}
			</div>
		);
	},
	shouldComponentUpdate(nextProps, nextState) {
		// return nextProps.selectedControlName !== this.props.selectedControlName;
		return true;//always update
	}
});


export default UsageTable;