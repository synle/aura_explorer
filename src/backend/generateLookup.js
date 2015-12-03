'use strict'

//external
import cheerio from 'cheerio';
import path from 'path';
import colors from 'colors';
import _ from 'lodash';
import Q from 'q';


//internal
import logger from '~/src/backend/logger';
import util from '~/src/backend/util';


//exports
export default (componentFileNames, baseDirAuraUpstream, outputDirDataPath) => {
	const mainDefer = Q.defer();
	const promises = [];

	const interestedFiles = _.merge(
		_.values(componentFileNames.cmp),
		_.values(componentFileNames.app)
	);


	//buffer used to store meta data
	let auraUpstreamPomFileContent;

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
	logger.log( '[Begin parsing]:'.yellow, _.size( interestedFiles ) );
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
	        	const relativeFileName = util.getControlRelativePath( fileName );

	            try{
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
	        							util.appendDependenciesPropInControlObj(
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
		            defer.resolve(`${relativeFileName} done`);
	            }catch(e){
	            	defer.reject(`${relativeFileName} : ${e}`);
	            }
	        });
		}
	);

	
	const deferAuraPomXml = Q.defer();
	promises.push(deferAuraPomXml.promise);
	util.readFromFileAsync( path.join(baseDirAuraUpstream,'pom.xml') )
	    .done( fileContent => {
	    	auraUpstreamPomFileContent = fileContent;
	    	deferAuraPomXml.resolve();
	    });


	//when all things are done, lets prepare to print
	logger.log('[Waiting for promises]: '.yellow, promises.length);
	Q.allSettled(promises).then( (results) => {
		logger.log('[Promises Returned]: '.yellow);

		//aggregate errors
		let promiseSuccessCount = 0, promiseFailCount = 0;
		const promisesErrors = [];
		_.each(
			results,
			result => {
				const {value, reason} = result;

		        if (result.state !== "fulfilled") {
		        	promisesErrors.push(reason);
		        	promiseFailCount++;
		        } else{
		        	promiseSuccessCount++;
		        }
		    }
		);

		//resolve the main promise
		mainDefer.resolve({
			promisesErrors,
			promiseSuccessCount,
			promiseFailCount
		});
	}).then( ({promisesErrors, promiseSuccessCount, promiseFailCount}) => {
		//printing out the promise results
		logger.log('[Promises Statistics:]'.yellow, `${promiseSuccessCount} succeeded`, `${promiseFailCount} failed`);

		//print out promise error
		_.each(
			promisesErrors,
			promiseError => logger.log('[Promise Failed]: '.red, promiseError)
		);

		mainDefer.resolve();
	});



	//main promise
	mainDefer.promise.then( () => {
		logger.log('[Main Promise Returned, Writing Output]:'.yellow);


		//writing stuff to file
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


		//writing to files
		const _writeToFile = (jsonSerialization, content, outputFileName) => {
			const contentToWrite = jsonSerialization
				? util.serializeJsonObject( content )
				: content;
			const outputFullPath = path.join(
                outputDirDataPath,
                outputFileName
            );

			logger.log('\t[Writing To]: '.yellow, outputFullPath.blue, contentToWrite.length);

			util.writeToFile(
	            contentToWrite,
	            outputFullPath
	        );
		}


		//making output dir if it is not there
		logger.log('[Making Output Dir]'.yellow, outputDirDataPath);
		try {
			util.mkDir(outputDirDataPath);
			logger.log('\t[OuputDir Created]'.yellow);
		} catch(e) {}

		//writing files
		logger.log('[Writing Output]'.yellow);
		try{
			_writeToFile(
				true,//need json serialization
	            dependenciesMap,
	            'dependenciesMap.json'
	        );

	        _writeToFile(
	        	true,//need json serialization
	            usageMap,
	            'usageMap.json'
	        );

	        _writeToFile(
	        	true,//need json serialization
	            namespaceCountMap,
	            'namespaceCountMap.json'
	        );

	        //let's do a map to get the name
	        _writeToFile(
	        	true,//need json serialization
	            remappedControlCountMap,
	            'controlCountMap.json'
	        );



	        _writeToFile(
	        	true,//need json serialization
	            controlLocationMap,
	            'autoCompleteControlMap.json'
	        );


	        _writeToFile(
	        	true,//need json serialization
	            controlLocationMap,
	            'controlLocationMap.json'
	        );


	        //write the aura_upstream_pom
	        _writeToFile(
        		false,
	        	auraUpstreamPomFileContent,
	        	'aura_upstream_pom.xml'
	        );
        } catch(ex){
        	logger.log('[Main Defer Error]'.red, ex);
        }
	});
};