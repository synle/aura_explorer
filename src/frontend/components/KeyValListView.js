//external
import _ from 'lodash';

//definitions
const KeyValListViewComponent = React.createClass({
	render(){
		const {objects, keyLabel, valueLabel, emptyMsg, badgeExtraText} = this.props;
		const domKey = `KeyValListViewComponent-${keyLabel}-${valueLabel}`;

		if (_.size(objects) === 0){
			return <div key={domKey}>{emptyMsg}</div>;
		} else{
			const domDivRows = _.chain( _.keys(objects) )
				.sort()
				.map(objKey => {
					const objVal = objects[objKey];

					return (
						<a key={`KeyValListViewComponent-${keyLabel}-${valueLabel}-${objKey}`}
						className='list-group-item ellipsis pointer'
						onClick={() => this.onSelectRow(objKey)}>
							{objKey}
							<span className="badge">
								{objVal} {badgeExtraText}
							</span>
						</a>
					);
				})
				.value();

			return (
				<div key={domKey} className="list-group">
					{domDivRows}
				</div>
			);
		}
	},
	shouldComponentUpdate(nextProps, nextState) {
		return true;//always update
	},
	onSelectRow(keyword){
		if(this.props.onSelectRow){
			this.props.onSelectRow( keyword );
		}
	}
});


export default KeyValListViewComponent;