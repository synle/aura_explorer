//external
import _ from 'lodash';
import util from '../util';


//definitions
const Attributes_Handler_Events_Table = React.createClass({
	render(){
		const objName = this.props.name;
		const propertiesList = _.get(this, 'props.properties');

		const unigueCellHeaders = _.reduce(
			propertiesList,
			(res, propObj) => {
				return _.unique( res.concat( _.keys( propObj ) ) );
			},
			[]
		);

		//table headers
		const domTableHeaders = _.map(
			unigueCellHeaders,
			propName => (
				<th key={`${objName}-table-header-${propName}`}>
					{propName}
				</th>
			)
		)

		//table rows
		const domTableRows =  _.size(propertiesList) === 0
			? null
			: _.map(
				propertiesList,
				(attributeObj, attributeName, attributeIdx) => {
					const tableCellsDom = _.map(
						unigueCellHeaders,
						propName => (
							<td key={`${objName}-table-row-${propName}-${attributeIdx}`}>
								{attributeObj[propName]}
							</td>
						)
					);

					return (
						<tr key={`control-detail-row-attribute-${attributeObj.name}`}>
							{tableCellsDom}
						</tr>
					);
				}
			);

		const tableBody = _.size( domTableRows ) === 0
			? ( <div>No {objName}</div> )
			: (
				<table className="table table-bordered table-hover table-condensed">
					<thead>
					    <tr>
							{domTableHeaders}
					    </tr>
					</thead>
					<tbody>
					    {domTableRows}
					</tbody>
				</table>
			);

		//return
		return (
			<div key={`${objName}-table`}>
				{tableBody}
			</div>
		);
	},
	shouldComponentUpdate(nextProps, nextState) {
		// return nextProps.selectedControlName !== this.props.selectedControlName;
		return true;//always update
	}
});

export default Attributes_Handler_Events_Table;