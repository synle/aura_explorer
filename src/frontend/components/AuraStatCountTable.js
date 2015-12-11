//external
import _ from 'lodash';
import React from 'react';

//internal
//internal react components
import KeyValListView from '~/src/frontend/components/KeyValListView';

//utils
import util from '~/src/frontend/library/util';



//controls
const CountTableComponent = React.createClass({
	getInitialState(){
		return {
			searchTerm : '',
			countMap : []
		};
	},
	componentDidMount(){
		this.setState({
			countMap : this.props.countMap
		});
	},
	render() {
		const key = 'control-count-table';
		const {badgeExtraText, onSelectRow} = this.props;

		return (
			<div id={key} key={key}>
				<div className="col-sm-12 mb15">
					<div className="input-group">
						<span className="input-group-addon" id="search-term-input">Search</span>
						<input type="text"
							onChange={this.onSearchTermChanged}
							value={this.state.searchTerm}
							className="form-control"
							placeholder="Enter text to search ..."
							aria-describedby="search-term-input" />
					</div>
				</div>
				<div className="clearfix"></div>
				<div className="col-sm-12">
					<div className="text-center mb15"><strong>Total Matches: {_.size(this.state.countMap)}</strong></div>
					<KeyValListView
						key={`${key}-table-detail`}
						objects={this.state.countMap}
						keyLabel={this.props.keyLabel}
						valueLabel="Count"
						emptyMsg="No data"
						badgeExtraText={badgeExtraText}
						onSelectRow={onSelectRow} />
				</div>
			</div>
		);
	},
	onSearchTermChanged({ target: { value: newSearchTerm } }) {
		newSearchTerm = newSearchTerm.toLowerCase();

		this.setState({
			searchTerm : newSearchTerm,
			countMap : util.findMatchingKeysInHash( this.props.countMap, newSearchTerm )
		});
	}
});

export default CountTableComponent;
