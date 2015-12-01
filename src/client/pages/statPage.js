//external
import _ from 'lodash';
import Q from 'q';

//internal
//data
import restClient from '/aura-explorer/restClient';

//internal react components
import CountTableComponent from '/aura-explorer/components/AuraStatCountTable';

//utils
import util from '/aura-explorer/util';

//main page
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
							<CountTableComponent countMap={this.props.namespaceCountMap} keyLabel='Namespaces' badgeExtraText='Components' onSelectRow={this.selectNameSpace} />
						</div>
					</div>
				</div>

				<div className="col-sm-7">
					<div className="panel panel-primary">
						<div className="panel-heading">
							<h3 className="panel-title">How many time a component is used?</h3>
						</div>
						<div className="panel-body">
							<CountTableComponent countMap={this.props.controlCountMap}
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
	Q.all([
		restClient.getControlCountMap(),
		restClient.getNamespaceCountMap()
	]).done(([controlCountMap, namespaceCountMap]) => {
		ReactDOM.render(
			<StatPage namespaceCountMap={namespaceCountMap}
				controlCountMap={controlCountMap} />,
			document.querySelector('#body')
		);
	});
});