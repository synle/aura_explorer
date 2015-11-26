//external
import _ from 'lodash';
import util from '../util';


//definitions
const TableComponent = React.createClass({
	render(){
		const {objects, showHeader, showIndex, emptyMsg} = this.props;

		if (_.size(objects) === 0){
			return <div>{emptyMsg || 'No Data'}</div>;
		} else{
			let rowCount = 0;
			const uniqueArgsList = util.getUniqueArgumentsList(objects);

			const headerIdxCell = showIndex === true
				? <th></th>
				: null;

			if(showIndex === true){
				uniqueArgsList.unshift('_idx_');
			}

			const headerCells = showHeader
				? _.map(
					uniqueArgsList,
					(argName) => {
						const headerKey = `header-cell-${argName}`;
						return (<th key={headerKey}>{argName}</th>);
					}
				)
				: null;

			const domTableRows = _.map(
				objects,
				(object, rowIndex) => {
					const rowDomKey = `TableComponent-Row-${rowIndex}`;

					const rowCellsDom = _.map(
						object,
						(objVal, objKey) => {
							const rowCellDomKey = `TableComponent-Row-${rowIndex}-${objKey}-${objVal}`;
							return (<td key={rowCellDomKey}>{objVal}</td>)
						}
					);

					return (
						<tr key={rowDomKey}>
							{rowCellsDom}
						</tr>
					);
				}
			);


			return (
				<div>
				<table className="table table-bordered table-hover table-condensed table-striped">
					<thead>
					    <tr>
							{headerCells}
					    </tr>
					</thead>
					<tbody>
					    {domTableRows}
					</tbody>
				</table>
				</div>
			);
		}
	},
	shouldComponentUpdate(nextProps, nextState) {
		return true;//always update
	}
});


export default TableComponent;