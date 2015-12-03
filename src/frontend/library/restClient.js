//external
import Q from 'q';
import path from 'path';

//internal
const util_getJoinPath = (myPath) => myPath;//path.join( process.cwd(), myPath );

//get contents
const auraExplorerJson = global.util_readFromFileAsync(
	util_getJoinPath( 'package.json' )
);

const auraStreamPom    = global.util_readFromFileAsync(
	util_getJoinPath( 'public/dist/js/data/aura_upstream_pom.xml' )
);

const dataDependenciesMap = JSON.parse( global.util_readFromFileAsync( 'public/dist/js/data/dependenciesMap.json' ) );
const usageMap = JSON.parse( global.util_readFromFileAsync( 'public/dist/js/data/usageMap.json' ) );
const controlCountMap = JSON.parse( global.util_readFromFileAsync( 'public/dist/js/data/controlCountMap.json' ) );
const namespaceCountMap = JSON.parse( global.util_readFromFileAsync( 'public/dist/js/data/namespaceCountMap.json' ) );
const explorerConfig = {};

const packageInfo = JSON.parse(auraExplorerJson);


//definitions
const restClient = {
	getDataDependenciesMap(){
		const defer = Q.defer();
		defer.resolve(dataDependenciesMap);
		return defer.promise;
	},
	getUsageMap(){
		const defer = Q.defer();
		defer.resolve(usageMap);
		return defer.promise;
	},
	getControlCountMap(){
		const defer = Q.defer();
		defer.resolve(controlCountMap);
		return defer.promise;
	},
	getNamespaceCountMap(){
		const defer = Q.defer();
		defer.resolve(namespaceCountMap);
		return defer.promise;
	},
	getPackageInfo(){
		const defer = Q.defer();
		defer.resolve(packageInfo);
		return defer.promise;
	},
	getExplorerConfig(){
		const defer = Q.defer();
		defer.resolve(explorerConfig);
		return defer.promise;
	},
	getAuraExplorerJson(){
		const defer = Q.defer();
		defer.resolve(auraExplorerJson);
		return defer.promise;
	},
	getAuraStreamPom(){
		const defer = Q.defer();
		defer.resolve(auraStreamPom);
		return defer.promise;
	}
}

//export
export default restClient;
