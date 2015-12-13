'use strict';

//external
import {assert} from 'chai';
import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import Q from 'q';

//internal
import CONFIG from '~/config.json';
import metaDataService from '~/src/common/model/metaData';

const _readFile = (fpath) => {
	const fullPath = path.join(process.cwd(), CONFIG.auraMetaOutputDir, `${fpath}`);
	// const fullPath = path.join(process.cwd(), CONFIG.auraMetaOutputDir, 'latest', `${fpath}`);
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
    describe('MetaData Plain Files Test', () => {
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
    });


	describe('MetaData Database (SQLite3) Test', () => {
		const promiseMetaDbInit = metaDataService.init();
		const commitToValidate = 'latest';

		const getMetaToTestPromise = () => {
			const defer = Q.defer();

			promiseMetaDbInit.then(() => {
    			metaDataService.getMetaByCommitId( commitToValidate )
	    			.then(
	    				metaData => defer.resolve(metaData)
					).catch(
						e => {
							console.log('metaDataService.getMetaByCommitId(latest): ', e.message)
							assert.throw('metaDataService.getMetaByCommitId(latest): ' + e.message)
						}
					);
			}).catch(
				e => {
					console.log('metaDataService.init(): ', e.message)
					assert.throw('metaDataService.init(): ' + e.message)
				}
			);

			return defer.promise;
		}

    	it('should have the latest', function(done){
    		getMetaToTestPromise().then( metaData => {
				assert.isAbove( _.keys( metaData ).length , 0, 'MetaData from SQLite should return something' );

				assert.isDefined( metaData['aura_upstream_pom.xml'], 'aura_upstream_pom.xml defined' );
				assert.isDefined( metaData['autocompletecontrolmap.json'], 'autocompletecontrolmap.json defined' );
				assert.isDefined( metaData['controlcountmap.json'], 'controlcountmap.json defined' );
				assert.isDefined( metaData['controllocationmap.json'], 'controllocationmap.json defined' );
				assert.isDefined( metaData['dependenciesmap.json'], 'dependenciesmap.json defined' );
				assert.isDefined( metaData['namespacecountmap.json'], 'namespacecountmap.json defined' );
				assert.isDefined( metaData['usagemap.json'], 'usagemap.json defined' );

				done();
			}).catch( e => console.log(e));
	    });


	    it('dataDependenciesMap should have valid data', () => {
	    	getMetaToTestPromise().then( metaData => {
				assert.isDefined( metaData['aura_upstream_pom.xml'], 'aura_upstream_pom.xml defined' );
				assert.isDefined( metaData['autocompletecontrolmap.json'], 'autocompletecontrolmap.json defined' );
				assert.isDefined( metaData['controlcountmap.json'], 'controlcountmap.json defined' );
				assert.isDefined( metaData['controllocationmap.json'], 'controllocationmap.json defined' );
				assert.isDefined( metaData['dependenciesmap.json'], 'dependenciesmap.json defined' );
				assert.isDefined( metaData['namespacecountmap.json'], 'namespacecountmap.json defined' );
				assert.isDefined( metaData['usagemap.json'], 'usagemap.json defined' );
				done();
			}).catch( e => console.log(e));
	    });
    });
})