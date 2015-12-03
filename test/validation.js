import {assert} from 'chai';
import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import CONFIG from '~/config.json';

const _readFile = (fpath) => {
	const fullPath = path.join(process.cwd(), CONFIG.auraMetaOutputDir, `${fpath}`);
	console.log(fullPath);
	return fs.readFileSync(
		fullPath,
		'utf8'
	);
}

const _readJsonFile = (fpath) => {
	try{
		return JSON.parse(_readFile(fpath));
	} catch(e){
		return {};
	}
}

//internal
const dataDependenciesMap = _readJsonFile('dependenciesMap.json');
const usageMaps = _readJsonFile('usageMap.json');
const controlCountMap = _readJsonFile('controlCountMap.json');
const namespaceCountMap = _readJsonFile('namespaceCountMap.json');
const autoCompleteControlMap = _readJsonFile('autoCompleteControlMap.json');
const controlLocationMap = _readJsonFile('controlLocationMap.json');


describe('Aura Explorer', () => {
    describe('Meta Data Test', () => {
    	it('should have some meta data', () => {
	        assert.isTrue( _.size(dataDependenciesMap) > 0, 'dataDependenciesMap is empty');
			assert.isTrue( _.size(usageMaps) > 0, 'usageMaps is empty');
			assert.isTrue( _.size(controlCountMap) > 0, 'controlCountMap is empty');
			assert.isTrue( _.size(namespaceCountMap) > 0, 'namespaceCountMap is empty');
			assert.isTrue( _.size(autoCompleteControlMap) > 0, 'autoCompleteControlMap is empty');
			assert.isTrue( _.size(controlLocationMap) > 0, 'controlLocationMap is empty');
	    });


	    it('dataDependenciesMap should have valid data', () => {
	        assert.isTrue( _.size(dataDependenciesMap) > 0, 'dataDependenciesMap is empty');
	        assert.isTrue( _.size(dataDependenciesMap.ui) > 0, 'ui is empty');

	        assert.isTrue( _.size(dataDependenciesMap.ui['scroller.cmp'].imports) > 0, 'dataDependenciesMap.ui.imports is empty');
			assert.isTrue( _.size(dataDependenciesMap.ui['scroller.cmp'].events) > 0, 'dataDependenciesMap.ui.events is empty');
			assert.isTrue( _.size(dataDependenciesMap.ui['scroller.cmp'].handlers) > 0, 'dataDependenciesMap.ui.handlers is empty');
			// assert.isTrue( _.size(dataDependenciesMap.ui['scroller.cmp'].methods) > 0, 'dataDependenciesMap.ui.methods is empty');
			assert.isTrue( _.size(dataDependenciesMap.ui['scroller.cmp'].dependencies) > 0, 'dataDependenciesMap.ui.dependencies is empty');
	    });
    })
})