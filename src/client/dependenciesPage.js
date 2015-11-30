//external
import _ from 'lodash';

//internal
//data
import dataDependenciesMap from './data/dependenciesMap.json';
import usageMaps from './data/usageMap.json';

//internal react components
import ListView from './src/client/components/ListView';
import Attributes_Handler_Events_Table from './src/client/components/AttributesHandlerEventsTable';
import UsageTable from './src/client/components/UsageTable';
import ControlDetailLink from './src/client/components/ControlDetailLink';
import DependenciesDetailTable from './src/client/components/DependenciesDetailTable';
import MethodTable from './src/client/components/MethodTable';

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
			const dependenciesMap = _.get(this, 'props.controlObj.dependencies', {});
			const methodsMap = _.get(this, 'props.controlObj.methods', {});//{controlName => methodName : {attribs}}

			const attributeList = _.values( _.get(this, 'props.controlObj.attributes', []) );
			const eventsList    = _.values( _.get(this, 'props.controlObj.events', {}) );
			const handlersList  = _.values( _.get(this, 'props.controlObj.handlers', {}) );
			const importsList   = _.values( _.get(this, 'props.controlObj.imports', {}) );

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
				<div id="control-detail-wrapper">
					<div>
						<ol className="breadcrumb">{controlNameBreadCrumsDom}</ol>
					</div>

					<ul className="nav nav-tabs" role="tablist">
						{ this._getTabHeaderItem( "tab-attributes",    "Attributes", attributeList , true) }
						{ this._getTabHeaderItem( "tab-dependencies",  "Dependencies", dependenciesMap) }
						{ this._getTabHeaderItem( "tab-events",        "Events", eventsList) }
						{ this._getTabHeaderItem( "tab-imports",       "Imports", importsList) }
						{ this._getTabHeaderItem( "tab-handlers",      "Handlers", handlersList) }
						{ this._getTabHeaderItem( "tab-methods",       "Methods", methodsMap) }
						{ this._getTabHeaderItem( "tab-usages",        "Usages", usageList) }
					</ul>

					<div className="tab-content">
						<div role="tabpanel" className="tab-pane active" id="tab-attributes"><Attributes_Handler_Events_Table name='Attributes' properties={attributeList} /></div>
						<div role="tabpanel" className="tab-pane" id="tab-dependencies"><DependenciesDetailTable dependencies={dependenciesMap} /></div>
						<div role="tabpanel" className="tab-pane" id="tab-events"><Attributes_Handler_Events_Table name='Events' properties={eventsList} /></div>
						<div role="tabpanel" className="tab-pane" id="tab-imports"><Attributes_Handler_Events_Table name='Imports' properties={importsList} /></div>
						<div role="tabpanel" className="tab-pane" id="tab-handlers"><Attributes_Handler_Events_Table name='Handlers' properties={handlersList} /></div>
						<div role="tabpanel" className="tab-pane" id="tab-methods"><MethodTable methodsMap={methodsMap} /></div>
						<div role="tabpanel" className="tab-pane" id="tab-usages"><UsageTable selectedControlName={controlName} usage={usageList} /></div>
					</div>
				</div>
			);
		}
	},
	shouldComponentUpdate(nextProps, nextState) {
		// return nextProps.selectedControlName !== this.props.selectedControlName;
		return true;//always update
	},
	_getTabHeaderItem(tabContentId, headerName, entityObjects, active){
		const entityCount = _.size( entityObjects );
		const tabPlainText = `${headerName} ${this._getCountBadge( entityCount )}`;

		return (
			<li role="presentation" className={active ? 'active' : ''}>
				<a href={`#${tabContentId}`} aria-controls="settings" role="tab" data-toggle="tab">
					{tabPlainText}
				</a>
			</li>
		)
	},
	_getCountBadge(countNum){
		return countNum > 0 ? `[${countNum}]` : '';
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