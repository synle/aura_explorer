//external
import _ from 'lodash';
import util from '../util';


//definitions
const ListView = React.createClass({
	render() {
		const key = 'list-view';
		const {data, selectedItem} = this.props;
		const curSelectedItem = selectedItem.toLowerCase();

		const controlsBody  = _.chain( _.keys(data) )
									.sort()
									.map( (propKey) => {
										const controlObj = data[propKey];
										const domKey = `list-view-row-${propKey}`;
										return(
											<a id={domKey}
												key={domKey}
												onClick={(e) => this.onRowSelection(propKey)}
												title={propKey}
												className={
													propKey.toLowerCase() === curSelectedItem
														? 'list-group-item ellipsis pointer active'
														: 'list-group-item ellipsis pointer'
												}>
													{propKey}
											</a>
										);
									})
									.value();

		return (
			<div id={key} key={key} className="list-group">
				{controlsBody}
			</div>
		);
	},
	onRowSelection(propKey) {
		if(this.props.onRowSelection){
			this.props.onRowSelection(propKey);
		}
	},
	shouldComponentUpdate(nextProps, nextState) {
		return true;//always update
	}
});

export default ListView;