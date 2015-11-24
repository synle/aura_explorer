//external
import _ from 'lodash';

//internal
//data
import controlCountMap from './data/controlCountMap.json';
import namespaceCountMap from './data/namespaceCountMap.json';

//internal react components
import KeyValListView from './src/client/components/KeyValListView';

//utils
import util from './src/client/util';


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
							placeholder="Enter text to search ... (<namespace>:<control>)"
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




const StatPage = React.createClass({
	render(){
		return (
			<div className="row">
				<div className="col-sm-5"> 
					<div className="panel panel-success">
						<div className="panel-heading">
							<h3 className="panel-title">How many components in a Namespace?</h3>
						</div>
						<div className="panel-body">
							<CountTableComponent countMap={namespaceCountMap} keyLabel='Namespaces' badgeExtraText='Components' onSelectRow={this.selectNameSpace} />
						</div>
					</div>
				</div>

				<div className="col-sm-7">
					<div className="panel panel-primary">
						<div className="panel-heading">
							<h3 className="panel-title">How many time a component is used?</h3>
						</div>
						<div className="panel-body">
							<CountTableComponent countMap={controlCountMap}
								keyLabel='Controls'
								badgeExtraText='References'
								onSelectRow={this.selectControl} />
						</div>
					</div>
				</div>
			</div>
		);
	},
	selectNameSpace(keyword){
		location.href = util.getQueryUrl(`${keyword}:`);
	},
	selectControl(keyword){
		location.href = util.getQueryUrl(`${keyword}`);
	}
});


//rendering
util.render( () => {
	//control usage count
	ReactDOM.render(
		<StatPage />,
		document.querySelector('#body')
	);
});