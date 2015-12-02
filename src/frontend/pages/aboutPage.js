//external
import _ from 'lodash';
import Q from 'q';

//internal
//utils
import util from '/aura-explorer/frontend/util';
import appInit from '/aura-explorer/frontend/library/app';
import restClient from '/aura-explorer/frontend/library/restClient';

const AboutPage = React.createClass({
	render(){
		return (
			<div className="row">
				<div className="col-sm-12">
					<div className="mb15">
						<strong>Aura-Explorer Version</strong> : {this.props.packageInfo.version}
					</div>
					<div className="mb15">
						<strong>Explorer Config</strong>
						<pre>{JSON.stringify(this.props.explorerConfig, null, 2)}</pre>
					</div>
					<div className="mb15">
						<strong>Aura Explorer JSON</strong>
						<pre>{this.props.auraExplorerJson}</pre>
					</div>
					<div>
						<strong>Aura Upstream Pom.xml</strong>
						<pre>{this.props.auraStreamPom}</pre>
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
	//init app
	appInit(document);

	//loading components
	Q.all([
		restClient.getPackageInfo(),
		restClient.getExplorerConfig(),
		restClient.getAuraExplorerJson(),
		restClient.getAuraStreamPom()
	]).done( ( [ packageInfo, explorerConfig, auraExplorerJson, auraStreamPom ] ) => {
		ReactDOM.render(
			<AboutPage packageInfo={packageInfo}
				explorerConfig={explorerConfig}
				auraExplorerJson={auraExplorerJson}
				auraStreamPom={auraStreamPom}/>,
			document.querySelector('#body')
		);
	});
});