import _ from 'lodash';

export default {
	render(cb) {
		$(() => cb());
	},
	getQueryUrl(searchTerm){
		return `controls.html?search=${searchTerm}`;
	},
	getSearchTerm(location_href){
		const searchPrefix = '?search=';
		const idxSearchStrt = location_href.indexOf(searchPrefix);

		return idxSearchStrt > 0
			? location_href.substr(idxSearchStrt + searchPrefix.length).toLowerCase()
			: '';
	},
	//flatten to array of objects
	flattenDependencies(dataDependenciesMap){
		return _.reduce(
			dataDependenciesMap,
			(flattenDependencies, namespaceControls, namespaceKey) => {
				_.forEach(namespaceControls, (controlObj, controlKey) => {
					flattenDependencies[`${namespaceKey}:${controlKey}`] = controlObj;
				});

				return flattenDependencies;
			},
			{}
		)
	},
	//find matching page search term
	findMatchingControl(flattenDependencies, targetString){
		let resMatches = flattenDependencies;
		if (targetString){
			// const regex = new RegExp(`${targetString}`, 'i');//use regex
			resMatches = _.reduce(
				flattenDependencies,
				(res, controlObj, controlKey) => {
					if (controlKey.toLowerCase().indexOf(targetString) === 0){
					// if (controlKey.indexOf(targetString) === 0){
						res[controlKey] = controlObj;
					}
					return res;
				},
				{}
			);
		}

		return resMatches;
	},
	findMatchingKeysInHash(countMap, newSearchTerm){
		return _.size(newSearchTerm) > 0
			? _.reduce(
				countMap,
				(res, objVal, objKey) => {
					if (objKey.toLowerCase().indexOf(newSearchTerm) === 0){
						res[objKey] = objVal;
					}

					return res;
				},
				{}
			)
			: countMap;
	},
	getUniqueArgumentsList(depArgObjs){
		return _.reduce(
			depArgObjs,
			(resUniqueArgList, depArgObj) => {
				return _.unique(
					resUniqueArgList.concat(_.keys(depArgObj))
				)
			},
			[]
		);
	}
}