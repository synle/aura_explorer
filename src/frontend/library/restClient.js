const AURA_EXPLORER_UTILS = window.AURA_EXPLORER_UTILS || global.AURA_EXPLORER_UTILS;
console.log('AURA_EXPLORER_UTILS', AURA_EXPLORER_UTILS, AURA_EXPLORER_UTILS.getData.toString());

//definitions
const restClient = function(){
	const self = {};

	//private
	let commitId = 'latest';

	//public
	self.setCommitId = (newCommitId) => {
		commitId = newCommitId;
	}

	self.getCommitId = () => commitId;


	//rest api calls
	self.getDataDependenciesMap = () => {
		return AURA_EXPLORER_UTILS.getData( 'dependenciesMap.json', commitId )
		.then(AURA_EXPLORER_UTILS.tryParseJSON);
	};

	self.getUsageMap = () => {
		return AURA_EXPLORER_UTILS.getData( 'usageMap.json', commitId )
		.then(AURA_EXPLORER_UTILS.tryParseJSON);
	};

	self.getControlCountMap = () => {
		return AURA_EXPLORER_UTILS.getData( 'controlCountMap.json', commitId )
		.then(AURA_EXPLORER_UTILS.tryParseJSON);
	};

	self.getNamespaceCountMap = () => {
		return AURA_EXPLORER_UTILS.getData( 'namespaceCountMap.json', commitId )
		.then(AURA_EXPLORER_UTILS.tryParseJSON);
	};

	return self;
}()

//export
export default restClient;
