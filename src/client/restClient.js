//external
import fs from 'fs';
import Q from 'q';

//internal
import dataDependenciesMap from '/aura-explorer/data/dependenciesMap.json';
import usageMap from '/aura-explorer/data/usageMap.json';
import controlCountMap from '/aura-explorer/data/controlCountMap.json';
import namespaceCountMap from '/aura-explorer/data/namespaceCountMap.json';
// import packageInfo from '../../package.json';
// import explorerConfig from '../../public/backend/config.js';

// const auraExplorerJson = fs.readFileSync(`../package.json`, 'utf8');
// const auraStreamPom    = fs.readFileSync(process.cwd(), 'utf8');


export default {
	getDataDependenciesMap(){
		// const defer = Q.defer();
		// defer.resolve(dataDependenciesMap);
		// return defer.promise;
		// 
		// 
		return dataDependenciesMap;
	},
	getUsageMap(){
		// const defer = Q.defer();
		// defer.resolve(usageMap);
		// return defer.promise;
		// 
		// 
		return usageMap;
	},
	getControlCountMap(){
		// const defer = Q.defer();
		// defer.resolve(controlCountMap);
		// return defer.promise;
		// 
		// 
		return controlCountMap;
	},
	getNamespaceCountMap(){
		// const defer = Q.defer();
		// defer.resolve(namespaceCountMap);
		// return defer.promise;
		// 
		return namespaceCountMap;
	},
	// packageInfo,
	// explorerConfig,
	// auraExplorerJson,
	// auraStreamPom
}