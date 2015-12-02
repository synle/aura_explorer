//external
import Q from 'q';
import path from 'path';

//internal
import util from './util';

//get path
const util_getJoinPath = (myPath) => `../${myPath}`;//path.join( process.cwd(), myPath );


const _parsePromise = stringContent => JSON.parse(stringContent);


//definitions
const restClient = {
	getPackageInfo(){
		return util.readFromFileAsync( util_getJoinPath( 'package.json' ) );
	},
	getAuraExplorerJson(){
		return util.readFromFileAsync( util_getJoinPath( 'package.json' ) )
			.then(_parsePromise);
	},
	getDataDependenciesMap(){
		return util.readFromFileAsync( util_getJoinPath( 'public/dist/js/data/dependenciesMap.json' ) )
			.then(_parsePromise);
	},
	getUsageMap(){
		return util.readFromFileAsync( util_getJoinPath( 'public/dist/js/data/usageMap.json' ) )
			.then(_parsePromise);
	},
	getControlCountMap(){
		return util.readFromFileAsync( util_getJoinPath( 'public/dist/js/data/controlCountMap.json' ) )
			.then(_parsePromise);
	},
	getNamespaceCountMap(){
		return util.readFromFileAsync( util_getJoinPath( 'public/dist/js/data/namespaceCountMap.json' ) )
			.then(_parsePromise);
	},
	getAuraStreamPom(){
		return util.readFromFileAsync( util_getJoinPath( 'public/dist/js/data/aura_upstream_pom.xml' ) );
	}
}

//export
export default restClient;
