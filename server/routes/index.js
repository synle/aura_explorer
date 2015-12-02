var express = require('express');
var router = express.Router();

var lastCommit = 'last commit';
var resourceNames = [
	'dataDependenciesMap',
	'usageMap',
	'controlCountMap',
	'namespaceCountMap',
	'packageInfo',
	'explorerConfig',
	'auraExplorerJson',
	'auraStreamPom'
];

/* GET home page. */
// router.get('/'/:commitId, function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/rest/:resourceName/:commitId', function(req, res, next) {
	var error = null;
	var content = null;
	var commitId = req.params.commitId || lastCommit;
	var resourceName = req.params.resourceName;

	switch(resourceName.toLowerCase()){
		case 'datadependenciesmap':
			resourceName = 'dataDependenciesMap';
			content = {};
			break;
		case 'usagemap':
			resourceName = 'usageMap';
			content = {};
			break;
		case 'controlcountmap':
			resourceName = 'controlCountMap';
			content = {};
			break;
		case 'namespacecountmap':
			resourceName = 'namespaceCountMap';
			content = {};
			break;
		case 'packageinfo':
			resourceName = 'packageInfo';
			content = {};
			break;
		case 'explorerconfig':
			resourceName = 'explorerConfig';
			content = {};
			break;
		case 'auraexplorerjson':
			resourceName = 'auraExplorerJson';
			content = {};
			break;
		case 'aurastreampom':
			resourceName = 'auraStreamPom';
			content = {};
			break;
		default:
			error = 'Invalid resource name. Resource name must be of form: ' + resourceNames.join(', ');
			commitId = null;
			resourceName = null;
			break;
	}

	res.json({'name': resourceName, 'content': content, 'commitId': commitId, error : error});
});

module.exports = router;
