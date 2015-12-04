//external

//internal
const _parseJSONPromise = response => {
	try{
		if (_.isString( response )){
			return JSON.parse(response)
		}
	} catch(e){}

	return response;
};


//definitions
const restClient = function(){
	let commitId = 'latest';

	this.setCommitId = (newCommitId) => {
		commitId = newCommitId;
	}

	this.getCommitId = () => commitId;


	//rest api calls
	this.getDataDependenciesMap = () => {
		return AURA_EXPLORER_UTILS.getData( 'dependenciesMap.json', commitId )
		.then(_parseJSONPromise);
	};

	this.getUsageMap = () => {
		return AURA_EXPLORER_UTILS.getData( 'usageMap.json', commitId )
		.then(_parseJSONPromise);
	};

	this.getControlCountMap = () => {
		return AURA_EXPLORER_UTILS.getData( 'controlCountMap.json', commitId )
		.then(_parseJSONPromise);
	};

	this.getNamespaceCountMap = () => {
		return AURA_EXPLORER_UTILS.getData( 'namespaceCountMap.json', commitId )
		.then(_parseJSONPromise);
	};
}

//export
export default restClient;
