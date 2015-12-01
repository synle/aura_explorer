//external
import _ from 'lodash';
import Q from 'q';

//internal
//data
import restClient from '/aura-explorer/restClient';

//internal react components
import ListView from '/aura-explorer/components/ListView';

//big component
import ControlDetailPage from '/aura-explorer/components/AuraControlDetail';

//utils
import util from '/aura-explorer/util';

//app init
import appInit from '/aura-explorer/app';

//main page
const DependenciesPage = React.createClass({
	getInitialState(){
		const searchTerm = util.getSearchTerm(location.href);
		const flattenDependencies = util.flattenDependencies( this.props.dataDependenciesMap );

		const myInitState = {
			flattenDependencies,
			searchTerm,
			matchedControls : util.findMatchingControl( flattenDependencies, searchTerm ),
			selectedControlName : '',
			selectedControlObj : {},
		};

		//auto select the only item in the list
		if (_.size(myInitState.matchedControls) === 1){
			myInitState.selectedControlName = _.keys(myInitState.matchedControls)[0];
			myInitState.selectedControlObj = myInitState.matchedControls[myInitState.selectedControlName];
		}

		return myInitState;
	},
	render() {
		let domSelectedControlDetail;


		return (
			<div>
				<div className="row">
					<div className="col-sm-12 mb15">
						<div className="input-group">
							<span className="input-group-addon" id="search-term-input">Search Term</span>
							<input type="text"
								value={this.state.searchTerm}
								onChange={this.onSearchTermChanged}
								className="form-control"
								placeholder="Enter text to search... (<namespace>:<control>)"
								aria-describedby="search-term-input" />
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-4">
						<div id="search-matches-wrapper" className="panel panel-success">
							<div className="panel-heading">
								<h3 className="panel-title">
									Matching Searches
									<span className="badge pull-right">{_.size(this.state.matchedControls)} matches</span>
								</h3>
							</div>
							<div className="panel-body">
								<ListView data={this.state.matchedControls}
									onRowSelection={this.onViewControlDetail}
									selectedItem={this.state.selectedControlName} />
							</div>
						</div>
					</div>
					<div id="control-detail-wrapper" className="col-sm-8">
						<ControlDetailPage controlName={this.state.selectedControlName}
							controlObj={this.state.selectedControlObj}
							usageMaps={this.props.usageMaps} />
					</div>
				</div>
			</div>
		);
	},
	onSearchTermChanged({ target: { value: newSearchTerm } }) {
		newSearchTerm = newSearchTerm.toLowerCase();

		this.setState({
			searchTerm : newSearchTerm,
			matchedControls : util.findMatchingControl( this.state.flattenDependencies, newSearchTerm )
		});
	},
	onViewControlDetail(controlName){
		this.setState({
			// searchTerm : controlName,
			// matchedControls : util.findMatchingControl( controlName ),
			selectedControlName: controlName,
			selectedControlObj : this.state.matchedControls[controlName]
		});
	},
});

//rendering
util.render( () => {
	//init app
	appInit();

	//loading components
	Q.all([
		restClient.getDataDependenciesMap(),
		restClient.getUsageMap()
	]).done(([ dataDependenciesMap, usageMaps ]) => {
		ReactDOM.render(
			<DependenciesPage dataDependenciesMap={dataDependenciesMap}
				usageMaps={usageMaps} />,
			document.querySelector('#body')
		);
	});
});