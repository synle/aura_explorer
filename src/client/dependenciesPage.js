//external
import _ from 'lodash';

//internal
//data
import dataDependenciesMap from './data/dependenciesMap.json';
import usageMaps from './data/usageMap.json';

//internal react components
import KeyValTableComponent from './src/client/components/KeyValTable';
import ListView from './src/client/components/ListView';
import Attributes_Handler_Events_Table from './src/client/components/AttributesHandlerEventsTable';
import UsageTable from './src/client/components/UsageTable';
import ControlDetailLink from './src/client/components/ControlDetailLink';
import DependenciesDetailTable from './src/client/components/DependenciesDetailTable';

//utils
import util from './src/client/util';


//control detail
const ControlDetailPage = React.createClass({
	render() {
		if (!this.props.controlName){
			return (
				<div className="panel panel-primary">
					<div className="panel-body">
						Please select a match from the left side of this page to view the detailed description
					</div>
				</div>
			);
		} else{
			const controlName = this.props.controlName.toLowerCase();
			const shortControlName = controlName.substr(controlName, controlName.lastIndexOf('.'));
			const attributeList = _.get(this, 'props.controlObj.attributes', []);
			const dependenciesMap = _.get(this, 'props.controlObj.dependencies', {});
			const eventsList = _.get(this, 'props.controlObj.events', []);
			const handlersList = _.get(this, 'props.controlObj.handlers', []);
			const usageList = _.reduce(
				usageMaps,
				(res, usageMap, curControlName) => {
					if (shortControlName === curControlName.toLowerCase()){
						return usageMap;
					}
					return res;
				},
				{}
			);


			const controlNameBreadCrumsDom = _.map(
				controlName.split(/[:.]/),
				(token, tokenIdx) => {
					return ( <li key={`${token}-${tokenIdx}`}>{token}</li> );
				}
			);

			return (
				<div>
					<div>
						<ol className="breadcrumb">{controlNameBreadCrumsDom}</ol>
					</div>

					<ul className="nav nav-tabs" role="tablist">
						<li role="presentation" className="active"><a href="#tab-attributes" aria-controls="settings" role="tab" data-toggle="tab">Attributes</a></li>
						<li role="presentation"><a href="#tab-dependencies" aria-controls="settings" role="tab" data-toggle="tab">Dependencies</a></li>
						<li role="presentation"><a href="#tab-events" aria-controls="settings" role="tab" data-toggle="tab">Events</a></li>
						<li role="presentation"><a href="#tab-handlers" aria-controls="settings" role="tab" data-toggle="tab">Handlers</a></li>
						<li role="presentation"><a href="#tab-usages" aria-controls="settings" role="tab" data-toggle="tab">Usages</a></li>
					</ul>

					<div className="tab-content">
						<div role="tabpanel" className="tab-pane active" id="tab-attributes"><Attributes_Handler_Events_Table name='Attributes' properties={attributeList} /></div>
						<div role="tabpanel" className="tab-pane" id="tab-dependencies"><DependenciesDetailTable dependencies={dependenciesMap} /></div>
						<div role="tabpanel" className="tab-pane" id="tab-events"><Attributes_Handler_Events_Table name='Events' properties={eventsList} /></div>
						<div role="tabpanel" className="tab-pane" id="tab-handlers"><Attributes_Handler_Events_Table name='Handlers' properties={handlersList} /></div>
						<div role="tabpanel" className="tab-pane" id="tab-usages"><UsageTable selectedControlName={controlName} usage={usageList} /></div>
					</div>
				</div>
			);
		}
	},
	shouldComponentUpdate(nextProps, nextState) {
		// return nextProps.selectedControlName !== this.props.selectedControlName;
		return true;//always update
	}
});



//main page
const DependenciesPage = React.createClass({
	getInitialState(){
		const searchTerm = util.getSearchTerm(location.href);
		const flattenDependencies = util.flattenDependencies( dataDependenciesMap );

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
							controlObj={this.state.selectedControlObj} />
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
	//control usage count
	ReactDOM.render(
		<DependenciesPage />,
		document.querySelector('#body')
	);
});