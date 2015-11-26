//external
import fs from 'fs';


//internal
import dataDependenciesMap from '../data/dependenciesMap.json';
import usageMap from '../data/usageMap.json';
import controlCountMap from '../data/controlCountMap.json';
import namespaceCountMap from '../data/namespaceCountMap.json';
import packageInfo from '../../package.json';
import explorerConfig from '../../public/backend/config.js';

// const auraExplorerJson = fs.readFileSync(`../package.json`, 'utf8');
// const auraStreamPom    = fs.readFileSync(process.cwd(), 'utf8');


export default {
	dataDependenciesMap,
	usageMap,
	controlCountMap,
	namespaceCountMap,
	packageInfo,
	explorerConfig,
	// auraExplorerJson,
	// auraStreamPom
}