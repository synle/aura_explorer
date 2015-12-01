//external
import _ from 'lodash';

//internal
//internal react components
import Attributes_Handler_Events_Table from '/aura-explorer/components/AttributesHandlerEventsTable';
import UsageTable from '/aura-explorer/components/UsageTable';
import DependenciesDetailTable from '/aura-explorer/components/DependenciesDetailTable';
import MethodTable from '/aura-explorer/components/MethodTable';

//utils
import util from '/aura-explorer/util';


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
				this.props.usageMaps,
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

//export
export default ControlDetailPage;
