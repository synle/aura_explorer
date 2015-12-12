//external
import _ from 'lodash';
import React from 'react';

//internal
import TableComponent from '~/src/frontend/components/Table';

//definitions
const MethodTable = React.createClass({
	render(){
		//{controlName => methodName : {attribs}}
		const {methodsMap} = this.props;
		const domKey = `method-description`;

		const methodsDom = _.size(methodsMap) > 0
			? _.map(
				methodsMap,
				(methodsAttribs, methodName) => {
					const subDomKey = `methods-${methodName}`;
					let methodsArgDom = 'No Argument For This Method';
					if( _.size(methodsAttribs) > 0 ){
						const flattenedMethodsAttribs = _.values(
							methodsAttribs
						);

						methodsArgDom = (<TableComponent
							objects={flattenedMethodsAttribs}
							showHeader={true}
							showIndex={false} />)
					}

					return (
						<div key={subDomKey} className="panel panel-info">
							<div className="panel-heading">{methodName}</div>
							<div className="panel-body">{methodsArgDom}</div>
						</div>
					);
				}
			)
			: 'No Methods';


		return (
			<div key={domKey}>
				{methodsDom}
			</div>
		);
	}
});

export default MethodTable;