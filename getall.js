'use strict';

//external
var Git = require("nodegit");
var _ = require('lodash');
var Q = require('q');

//internal
var auraSubmodule = "aura-submodule";
// var auraSubmodule = ".";

var allCommits = [];

Git.Repository.open(auraSubmodule)
	.then(function(repo) {
		return repo.getMasterCommit();
	})
	.then(function(firstCommitOnMaster){
		// History returns an event.
		// var history = firstCommitOnMaster.history(nodegit.Revwalk.SORT.Time);
		var history = firstCommitOnMaster.history(Git.Revwalk.SORT.Time);

		history.on('end', function(commits) {
			console.log('#Total commits:', commits.length);

			_.each(commits, function(commit, idx){
				var commitSha = commit.sha();
				var commitMessage = commit.sha();
				console.log(`cd ${auraSubmodule}; git checkout ${commitSha}; cd ..; npm run build ${commitSha}`);
			});
		});

		// Don't forget to call `start()`!
		history.start();
	})





// 'use strict';

// //internal
// import processor from '~/src/backend/processParsingLookup';
// import config    from '~/config.json';
// import util      from '~/src/backend/util';

// //external
// import path from 'path';
// import Git from "nodegit";
// import _ from 'lodash';
// import Q from 'q';


// var auraSubmodule = "aura-submodule";
// // var auraSubmodule = ".";


// //code start
// var deferGetAllcommit = Q.defer();
// Git.Repository.open(auraSubmodule)
// 	.then(function(repo) {
// 		return repo.getMasterCommit();
// 	})
// 	.then(function(firstCommitOnMaster){
// 		// History returns an event.
// 		// var history = firstCommitOnMaster.history(nodegit.Revwalk.SORT.Time);
// 		var history = firstCommitOnMaster.history(Git.Revwalk.SORT.Time);

// 		history.on('end', function(commits) {
// 			var commitSha = commit.sha();
// 			var commitMessage = commit.message();

// 			console.log('cd aura-submodule; git checkout '+commitSha+'; cd ..; npm run build ' + commitSha);
// 		});

// 		// Don't forget to call `start()`!
// 		history.start();
// 	})



// // deferGetAllcommit.promise.then(function(commits){
// // 	console.log('Total commits:', commits.length);

// // 	//try making the base path
// // 	try {
// // 		util.mkDir(path.join(process.cwd(), config.auraMetaOutputDir));
// // 	} catch(e) {}

// // 	var promises = [];
// // 	var defers = [];

// // 	_.each(commits, function(commit, idx){
// // 		var defer = Q.defer();
// // 		promises.push(defer.promise);
// // 		defers.push(defer);
// // 	});


// // 	var currentPromiseIdx = 0;
// // 	var isRunning = false;

// // 	setInterval(function(){
// // 		console.log('Pinging: ', currentPromiseIdx);
		
// // 		if(isRunning === false){
// // 			console.log('working on promise#', currentPromiseIdx);
// // 			isRunning = true;

// // 			var commit = commits[currentPromiseIdx];
// // 			var defer = defers[currentPromiseIdx];
// // 			var commitSha = commit.sha();
// // 			var commitMessage = commit.message();

// // 			console.log('Begin Working', currentPromiseIdx, commitSha, commitMessage);

// // 			//checking out
// // 			try {
// // 				Git.Checkout.tree(auraSubmodule, commitSha).then(function(){
// // 					//create the empty body
// // 					try {
// // 						console.log('Making', commitSha);
// // 						util.mkDir(path.join(process.cwd(), config.auraMetaOutputDir, commitSha));

// // 						//run it
// // 						processor(
// // 							path.join(process.cwd(), config.auraSourceBaseDir, '/'),
// // 							path.join(process.cwd(), config.auraMetaOutputDir, commitSha, '/'),
// // 							function(){
// // 								console.log('Done with defer: ', currentPromiseIdx);
// // 								isRunning = false;
// // 								defer.resolve(commitMessage);
// // 							}
// // 						);
// // 					} catch(e) {
// // 						console.log('Rejecting Parsing', commitMessage, e);
// // 						defer.reject(commitMessage);
// // 					}
// // 				})
// // 			}catch(e){
// // 				console.log('Rejecting Premature', commitMessage, e);
// // 				defer.reject(commitMessage);
// // 			}
// // 		}
// // 		else{
// // 			console.log('Sleep');
// // 		}
// // 	}, 5000);


// // 	//finally done
// // 	console.log('Waiting On Promises', promises.length);
// // 	Q.allSettled(promises).then(function(){
// // 		console.log('finally done...');
// // 	});
// // });


// // 


