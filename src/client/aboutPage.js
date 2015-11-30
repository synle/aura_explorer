//external
import _ from 'lodash';
import fs from 'fs';

//internal
import restClient from './src/client/restClient';

//utils
import util from './src/client/util';


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
	const packageInfo = restClient.getPackageInfo();
	const explorerConfig = restClient.getExplorerConfig();
	const auraExplorerJson = restClient.getAuraExplorerJson();
	const auraStreamPom = restClient.getAuraStreamPom();


	//control usage count
	ReactDOM.render(
		<AboutPage packageInfo={packageInfo}
			explorerConfig={explorerConfig}
			auraExplorerJson={auraExplorerJson}
			auraStreamPom={auraStreamPom}/>,
		document.querySelector('#body')
	);
});