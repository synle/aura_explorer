//external
import cheerio from 'cheerio';
import path from 'path';
import colors from 'colors';
import _ from 'lodash';
import Q from 'q';


//internal
import logger from './logger';
import util from './util';


//exports
export default (componentFileNames, baseDirAuraUpstream, outputDirDataPath) => {
	const promises = [];

	const interestedFiles = _.merge(
		_.values(componentFileNames.cmp),
		_.values(componentFileNames.app)
	);


	const dependenciesMap = {};//which component I use
	// {
	// 	nameSpace : {
	// 		controlName : {
	// 			attributes : {
	// 				...
	// 				attributeName1 : {name, type, default, description, access}
	// 				...
	// 			},
	// 			imports    : {
	// 				...
	// 				importLibName1 : {library, property}
	// 				...
	// 			},
	// 			events     : {
	// 				...
	// 				eventName1 : {name, type, description}
	// 				...
	// 			},
	// 			handlers   : {
	// 				...
	// 				handlerName1 : {name, value, action}
	// 				...
	// 			},
	// 			methods    : {
	// 				...
	// 				methodName1  : {name, action, access, description}
	// 				...
	// 			}
	// 		} 
	// 	}
	// }
	
	const usageMap = {};//which component uses me
	
	const namespaceCountMap = {};//count the important of namespace
	// {
	// 	ui:stuff: [
	// 		{controlNameSpace, controlName, attribs}
	// 	]
	// }
	

	const controlCountMap = {};//count how many a component is used

	const controlLocationMap = {};//used for autocomplete
	//flat map of <namespace:control> : relative_location


	//loop through interested files
	_.each(
		interestedFiles,
		fileName => {
			const defer = Q.defer();
	        promises.push(defer.promise);

	        const [controlNameSpace, controlName] = util.getComponentNamesFromPath(fileName);
	        const controlFullName = `${controlNameSpace}:${controlName}`;

	        const curControlObj = {
	        	attributes : {},
				imports : {},
				events : {},
				handlers : {},
				methods : {},
				dependencies : {}
	        };

	        //increment namespace count map
	        util.addNamespaceCountMapEntry(namespaceCountMap,controlNameSpace, 1);

	        //update the dependencies stuffs
	        util.setDependenciesMapEntry(dependenciesMap, controlNameSpace, controlName, curControlObj);

	        //update it for autocomplete
	        let relativeControlPath = fileName.substr(fileName.indexOf('aura_upstream/'));//substring to aura_upstream
	        relativeControlPath = relativeControlPath.substr(0, relativeControlPath.lastIndexOf('/'));
	        controlLocationMap[controlFullName] = relativeControlPath;

	        //read and parse
	        util.readFromFileAsync(fileName).then( fileContent => {
	            //success
	            //parsing xml
	            const $ = cheerio.load(fileContent, {
	                xmlMode: true
	            });


	            _.each(
	            	$('*'),
	            	(attribute) => {
	            		const {name, attribs, children} = attribute;


	            		//populate usage map
	            		util.appendUsageMapByName(
	            			usageMap,
	            			name,
	            			controlFullName,
	            			{
		            			controlNameSpace,
		            			controlName,
		            			controlFullName,
		            			attribs
		            		}
            			)

	            		//populate the use a ...
	            		switch(name.toLowerCase()){
            				case 'aura:attribute'://{name, type, default, description, access}
            					const [curAttrName, curAttrAttributes] = util.getKeyValFromCheerioDom(attribute);
            					curControlObj.attributes[curAttrName] = curAttrAttributes;
            					break;

        					case 'aura:import'://{library, property}
        						const {library} = attribs;
        						curControlObj.imports[library] = attribs;
            					break;

        					case 'aura:registerevent'://{name, type, description}
        						const eventName = attribs.name;
        						curControlObj.events[eventName] = attribs;
    							break;

							case 'aura:handler'://{name, value, action}
								const handlerName = attribs.name;
        						curControlObj.handlers[handlerName] = attribs;
    							break;

							case 'aura:method'://{name, action, access, description}
								const methodName = attribs.name;

								const childrenAttrs = _.reduce(
									children || [],
									(resChildAttrs, curChildAttr) => {
										if (curChildAttr.name === 'aura:attribute' && attribs){
    										const [childAttrName, childAttrAttributes] = util.getKeyValFromCheerioDom(curChildAttr);
    										resChildAttrs[childAttrName] = childAttrAttributes;
										}

										return resChildAttrs;
									},
									{}
								);

								curControlObj.methods[methodName] = childrenAttrs;
								break;

							case 'aura:component'://to ignore
								break;

        					default:
        						//other tag will be considered depdencies
        						const depdenciesName = name;
        						if (util.isValidDependencies(depdenciesName)){
            						//list of depdencies
        							utill.appendDependenciesPropInControlObj(
        								curControlObj,
        								depdenciesName,
        								attribs
    								);

            						//count control usage
            						util.addControlCountMapEntry(controlCountMap, depdenciesName, 1);
            					}
        						break;
            			}
	            	}
            	);

	            //resolved
	            defer.resolve();
	        });
		}
	);


	//when all things are done, lets prepare to print
	Q.all(promises).then( () => {
		util.writeToFile(
            util.serializeJsonObject( dependenciesMap ),
            path.join(
                outputDirDataPath,
                'dependenciesMap.json'
            )
        );

        util.writeToFile(
            util.serializeJsonObject( usageMap ),
            path.join(
                outputDirDataPath,
                'usageMap.json'
            )
        );

        util.writeToFile(
            util.serializeJsonObject( namespaceCountMap ),
            path.join(
                outputDirDataPath,
                'namespaceCountMap.json'
            )
        );



        const remappedControlCountMap = _.reduce(
        	controlCountMap,
        	(res, controlReferencesCount, controlName) => {
        		const fullControlName = controlCountMap[`${controlName}.app`]
        			? `${controlName}.app`
        			: `${controlName}.cmp`;
        		res[fullControlName] = controlReferencesCount;

        		return res;
        	},
        	{}
    	);

        //let's do a map to get the name
        util.writeToFile(
            util.serializeJsonObject( remappedControlCountMap ),
            path.join(
                outputDirDataPath,
                'controlCountMap.json'
            )
        );



        util.writeToFile(
            util.serializeJsonObject( _.keys(controlLocationMap) ),
            path.join(
                outputDirDataPath,
                'autoCompleteControlMap.json'
            )
        );


        util.writeToFile(
            util.serializeJsonObject( controlLocationMap ),
            path.join(
                outputDirDataPath,
                'controlLocationMap.json'
            )
        );


        //write the aura_upstream_pom
        util.readFromFileAsync(path.join(baseDirAuraUpstream,'pom.xml'))
        .done( fileContent => {
        	util.writeToFile(
	        	fileContent,
	        	path.join(
	                outputDirDataPath,
	                'aura_upstream_pom.xml'
	            )
	        );
        });
	});
};