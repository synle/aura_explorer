const AURA_EXPLORER_UTILS = global.AURA_EXPLORER_UTILS || window.AURA_EXPLORER_UTILS;

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
		.then(AURA_EXPLORER_UTILS.tryParseJSON);
	};

	this.getUsageMap = () => {
		return AURA_EXPLORER_UTILS.getData( 'usageMap.json', commitId )
		.then(AURA_EXPLORER_UTILS.tryParseJSON);
	};

	this.getControlCountMap = () => {
		return AURA_EXPLORER_UTILS.getData( 'controlCountMap.json', commitId )
		.then(AURA_EXPLORER_UTILS.tryParseJSON);
	};

	this.getNamespaceCountMap = () => {
		return AURA_EXPLORER_UTILS.getData( 'namespaceCountMap.json', commitId )
		.then(AURA_EXPLORER_UTILS.tryParseJSON);
	};
}

//export
export default restClient;
