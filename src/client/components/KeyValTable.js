//external
import _ from 'lodash';
import util from '../util';


//definitions
const KeyValTableComponent = React.createClass({
	render(){
		const {objects, keyLabel, valueLabel, emptyMsg, clickToViewDetail, showHeader, showIndex} = this.props;
		const domKey = `KeyValTableComponent-${keyLabel}-${valueLabel}`;

		if (_.size(objects) === 0){
			return <div key={domKey}>{emptyMsg}</div>;
		} else{
			let rowCount = 0;
			const domTableRows = _.chain( _.keys(objects) )
				.sort()
				.map(objKey => {
					const objVal = objects[objKey];
					const domCellText = clickToViewDetail === true
						? <a href={util.getQueryUrl(objKey)}>{objKey}</a>
						: objKey;

					const rowIdxCell = showIndex === true
						? <td>{++rowCount}</td>
						: null;

					return (
						<tr key={`KeyValTableComponent-${keyLabel}-${valueLabel}-${objKey}`}>
							{rowIdxCell}
							<td>{domCellText}</td>
							<td>{objVal}</td>
						</tr>
					);
				})
				.value();

			const headerIdxCell = showIndex === true
				? <th></th>
				: null;

			const domTableHeaders = showHeader === true ? (
					<thead>
					    <tr>
					    	{headerIdxCell}
							<th>{keyLabel}</th>
							<th>{valueLabel}</th>
					    </tr>
					</thead>
				)
				: null;

			return (
				<table key={domKey}
				className="table table-bordered table-hover table-condensed table-striped">
					{domTableHeaders}
					<tbody>
					    {domTableRows}
					</tbody>
				</table>
			);
		}
	},
	shouldComponentUpdate(nextProps, nextState) {
		return true;//always update
	}
});


export default KeyValTableComponent;