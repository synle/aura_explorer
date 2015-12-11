//internal
import _ from 'lodash';
import $ from 'jquery';

//definitions
const utils = {
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
			resMatches = _.reduce(
				flattenDependencies,
				(res, controlObj, controlKey) => {
					if (_.startsWith( controlKey.toLowerCase(), targetString )){
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
					if (_.startsWith( objKey.toLowerCase(), newSearchTerm )){
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
	},

	//strip .cmp and .app
	getTagNameFromControlName(tagName){
		let extensionIdx;

		extensionIdx = tagName.lastIndexOf('.cmp');
		if (extensionIdx >= 0){
			return tagName.substr(0, extensionIdx);
		}

		extensionIdx = tagName.lastIndexOf('.app');
		if (extensionIdx >= 0){
			return tagName.substr(0, extensionIdx);
		}

		return tagName;
	}
};


//export
export default utils;