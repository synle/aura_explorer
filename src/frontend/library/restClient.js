//external
import path from 'path';
import _ from 'lodash';

//internal
const _util_getJoinPath = (myPath) => `${myPath}`;//path.join( process.cwd(), myPath );
const _util_readFromFileAsync = global.util_readFromFileAsync;
const _parsePromise = response => {
	try{
		if (_.isString( response )){
			return JSON.parse(response)
		}
	} catch(e){}

	return response;
};


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
