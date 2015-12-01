//external
import fs from 'fs';
import Q from 'q';
import path from 'path';

//internal
import dataDependenciesMap from '/aura-explorer/data/dependenciesMap.json';
import usageMap from '/aura-explorer/data/usageMap.json';
import controlCountMap from '/aura-explorer/data/controlCountMap.json';
import namespaceCountMap from '/aura-explorer/data/namespaceCountMap.json';
import explorerConfig from '/aura-explorer/backend/config.js';

const util_readFromFileAsync = (fpath) => fs.readFileSync(fpath, 'utf8');

const auraExplorerJson = util_readFromFileAsync(path.join(
		process.cwd(),
		'package.json'
	)
);

const auraStreamPom    = util_readFromFileAsync(path.join(
		process.cwd(),
		'public',
		'dist',
		'js',
		'data',
		'aura_upstream_pom.xml'
	)
);

const packageInfo = JSON.parse(auraExplorerJson);

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
	getPackageInfo(){
		// const defer = Q.defer();
		// defer.resolve(packageInfo);
		// return defer.promise;
		// 
		return packageInfo;
	},
	getExplorerConfig(){
		// const defer = Q.defer();
		// defer.resolve(explorerConfig);
		// return defer.promise;
		// 
		return explorerConfig;
	},
	getAuraExplorerJson(){
		// const defer = Q.defer();
		// defer.resolve(auraExplorerJson);
		// return defer.promise;
		// 
		return auraExplorerJson;
	},
	getAuraStreamPom(){
		// const defer = Q.defer();
		// defer.resolve(auraStreamPom);
		// return defer.promise;
		// 
		return auraStreamPom;
	}
}