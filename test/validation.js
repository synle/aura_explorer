import {assert} from 'chai';
import _ from 'lodash';

//internal
import dataDependenciesMap from '../data/dependenciesMap.json';
import usageMaps from '../data/usageMap.json';
import controlCountMap from '../data/controlCountMap.json';
import namespaceCountMap from '../data/namespaceCountMap.json';
import autoCompleteControlMap from '../data/autoCompleteControlMap.json';
import controlLocationMap from '../data/controlLocationMap.json';


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
    })
})
