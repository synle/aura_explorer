'use strict';

//internal
import processor from '~/src/backend/processParsingLookup';
import config    from '~/config.json';
import util      from '~/src/backend/util';

//external
import path from 'path';
import Git from "nodegit";
import _ from 'lodash';
import Q from 'q';


var auraSubmodule = "aura-submodule";
// var auraSubmodule = ".";


//code start
var deferGetAllcommit = Q.defer();
Git.Repository.open(auraSubmodule)
	.then(function(repo) {
		return repo.getMasterCommit();
	})
	.then(function(firstCommitOnMaster){
		// History returns an event.
		// var history = firstCommitOnMaster.history(nodegit.Revwalk.SORT.Time);
		var history = firstCommitOnMaster.history(Git.Revwalk.SORT.Time);

		history.on('end', function(commits) {
			deferGetAllcommit.resolve(commits);
		});

		// Don't forget to call `start()`!
		history.start();
	})



deferGetAllcommit.promise.then(function(commits){
	console.log('Total commits:', commits.length);

	//try making the base path
	try {
		util.mkDir(path.join(process.cwd(), config.auraMetaOutputDir));
	} catch(e) {
		console.log('[Error]', e);
	}

	var promises = [];

	_.each(commits, function(commit, idx){
		var defer = Q.defer();
		promises.push(defer.promise);

		var commitSha = commit.sha();
		var commitMessage = commit.message();

		//create the empty body
		try {
			util.mkDir(path.join(process.cwd(), config.auraMetaOutputDir, commitSha));
		} catch(e) {}

		//run it
		processor(
			path.join(process.cwd(), config.auraSourceBaseDir, '/'),
			path.join(process.cwd(), config.auraMetaOutputDir, commitSha, '/'),
			function(){
				defer.resolve(commitMessage);
			}
		);
	});

	//finally done
	console.log('Waiting On Promises', promises.length);
	Q.allSettled(promises).then(function(){
		console.log('finally done...');
	});
});


