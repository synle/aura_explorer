//external
import _ from 'lodash';
import fs from 'fs';

//internal
import packageInfo from '../package.json';

//config content
import explorerConfig from '../public/backend/config.js';

const auraExplorerJson = fs.readFileSync('./package.json', 'utf8');
const auraStreamPom    = fs.readFileSync(`./data/aura_upstream_pom.xml`, 'utf8');


//utils
import util from './src/client/util';


const AboutPage = React.createClass({
	render(){
		return (
			<div className="row">
				<div className="col-sm-12">
					<div className="mb15">
						<strong>Aura-Explorer Version</strong> : {packageInfo.version}
					</div>
					<div className="mb15">
						<strong>Explorer Config</strong>
						<pre>{JSON.stringify(explorerConfig, null, 2)}</pre>
					</div>
					<div className="mb15">
						<strong>Aura Explorer JSON</strong>
						<pre>{auraExplorerJson}</pre>
					</div>
					<div>
						<strong>Aura Upstream Pom.xml</strong>
						<pre>{auraStreamPom}</pre>
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
		<AboutPage />,
		document.querySelector('#body')
	);
});