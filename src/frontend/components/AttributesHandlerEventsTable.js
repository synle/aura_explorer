//external
import _ from 'lodash';
import React from 'react';

//internal
import util from '~/src/frontend/library/util';
import TableComponent from '~/src/frontend/components/Table';

//definitions
const Attributes_Handler_Events_Table = React.createClass({
	render(){
		const objName = this.props.name;
		const propertiesList = _.get(this, 'props.properties');
		
		const tableBody = _.size( propertiesList ) === 0
			? ( <div>No {objName}</div> )
			: (
				<TableComponent
					objects={propertiesList}
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