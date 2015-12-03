//external
import Q from 'q';
import express from 'express';

//internal
import data from '../library/data';


//code start
const router = express.Router();

const lastCommit = 'latest';
const resourceNames = [
	'dataDependenciesMap',
	'usageMap',
	'controlCountMap',
	'namespaceCountMap'
];

/* GET home page. */
// router.get('/'/:commitId, function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/rest/:resourceName/:commitId', (req, res, next) => {
	let error = null;
	let content = null;
	let commitId = req.params.commitId || lastCommit;
	let resourceName = req.params.resourceName;

	let asyncRestPromise = true;

	//set the content on the promise
	const _asyncIntermidateThen = (newContent) => {
		content = newContent;
	}

	switch(resourceName.toLowerCase()){
		case 'dependenciesmap':
			resourceName = 'dependenciesMap';
			asyncRestPromise = data.getDataDependenciesMap( commitId ).then(_asyncIntermidateThen);
			break;
		case 'usagemap':
			resourceName = 'usageMap';
			asyncRestPromise = data.getUsageMap( commitId ).then(_asyncIntermidateThen);
			break;
		case 'controlcountmap':
			resourceName = 'controlCountMap';
			asyncRestPromise = data.getControlCountMap( commitId ).then(_asyncIntermidateThen);
			break;
		case 'namespacecountmap':
			resourceName = 'namespaceCountMap';
			asyncRestPromise = data.getNamespaceCountMap( commitId ).then(_asyncIntermidateThen);
			break;
		default:
			error = 'Invalid resource name. Resource name must be of form: ' + resourceNames.join(', ');
			commitId = null;
			resourceName = null;
			break;
	}

	//wait for promise to be settled
	Q.allSettled([asyncRestPromise]).then(() => {
		res.json(
			{'name': resourceName, content, commitId, error}
		);
	});
});

module.exports = router;
