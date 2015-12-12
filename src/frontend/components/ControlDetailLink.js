//external
import _ from 'lodash';
import React from 'react';

//internal
import util from '~/src/frontend/library/util';


//definitions
const ControlDetailLink = React.createClass({
	render(){
		const {mainText, subText} = this.props;

		const subDom = subText
			? ( <span className="badge ml15">{subText}</span> )
			: null;

		return(
			<div key={`control-detail-link-${mainText}-${subText}`}>
				<a href={ util.getQueryUrl( mainText ) } className="btn btn-large btn-danger mb15">
					{mainText}
					{subDom}
				</a>
			</div>
		);
	}
});

export default ControlDetailLink;