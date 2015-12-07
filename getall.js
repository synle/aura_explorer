'use strict';

//external
var Git = require("nodegit");
var _ = require('lodash');

//
var getMostRecentCommit = function(repository) {
	console.log('repository', repository);
	return repository.getBranchCommit("master");
};

var getCommitMessage = function(commit) {
	console.log('getCommitMessage', commit);
	return commit.message();
};

var auraSubmodule = "aura-submodule";
// var auraSubmodule = ".";

Git.Repository.open(auraSubmodule)
	.then(function(repo) {
		return repo.getMasterCommit();
	})
	.then(function(firstCommitOnMaster){
		// History returns an event.
		// var history = firstCommitOnMaster.history(nodegit.Revwalk.SORT.Time);
		var history = firstCommitOnMaster.history(Git.Revwalk.SORT.Time);

		history.on('end', function(commits) {
			console.log('Total commits:', commits.length);

			_.each(commits, function(commit, idx){
				var commitSha = commit.sha();
				var commitMessage = commit.sha();
				
			});
		});

		// Don't forget to call `start()`!
		history.start();
	})




// Git.Repository.open(auraSubmodule)
//   .then(getMostRecentCommit)
//   .then(getCommitMessage)
//   .then(function(message) {
//     console.log('message', message);
//   });
