//external
import _ from 'lodash';
import util from '../util';

//internal
import TableComponent from './Table';

//definitions
const Attributes_Handler_Events_Table = React.createClass({
	render(){
		const objName = this.props.name;
		const propertiesList = _.get(this, 'props.properties');
		const flattenedPropertiesValues = _.values(propertiesList)


		const tableBody = _.size( propertiesList ) === 0
			? ( <div>No {objName}</div> )
			: (
				<TableComponent
					objects={flattenedPropertiesValues}
					showHeader={true}
					showIndex={false} />
			);

		//return
		return (
			<div key={`${objName}-table`}>
				{tableBody}
			</div>
		);
	},
	shouldComponentUpdate(nextProps, nextState) {
		return true;//always update
	}
});

export default Attributes_Handler_Events_Table;