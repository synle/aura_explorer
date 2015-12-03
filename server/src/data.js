//external
import Q from 'q';
import path from 'path';

//internal
import util from './util';

//get path
const _util_getJoinPath = (myPath) => `../${myPath}`;//path.join( process.cwd(), myPath );
const _util_readFromFileAsync = util.readFromFileAsync;

const _parsePromise = stringContent => JSON.parse(stringContent);


//definitions
const restClient = {
	getPackageInfo(){
		return _util_readFromFileAsync( _util_getJoinPath( 'package.json' ) );
	},
	getAuraExplorerJson(){
		return _util_readFromFileAsync( _util_getJoinPath( 'package.json' ) )
			.then(_parsePromise);
	},
	getDataDependenciesMap(){
		return _util_readFromFileAsync( _util_getJoinPath( 'public/dist/js/data/dependenciesMap.json' ) )
			.then(_parsePromise);
	},
	getUsageMap(){
		return _util_readFromFileAsync( _util_getJoinPath( 'public/dist/js/data/usageMap.json' ) )
			.then(_parsePromise);
	},
	getControlCountMap(){
		return _util_readFromFileAsync( _util_getJoinPath( 'public/dist/js/data/controlCountMap.json' ) )
			.then(_parsePromise);
	},
	getNamespaceCountMap(){
		return _util_readFromFileAsync( _util_getJoinPath( 'public/dist/js/data/namespaceCountMap.json' ) )
			.then(_parsePromise);
	},
	getAuraStreamPom(){
		return _util_readFromFileAsync( _util_getJoinPath( 'public/dist/js/data/aura_upstream_pom.xml' ) );
	}
}

//export
export default restClient;
