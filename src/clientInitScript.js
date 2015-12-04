//utils
var jsonPath = 'public/dist/js/data/';

var getFilePath = function(jsonName, commitId, path){
    return path.join(
        process.cwd(),
        jsonPath,
        jsonName
    );
}

var getRestUrlPath = function(jsonName, commitId){
    jsonName = jsonName.toLowerCase();

    if ( jsonName.indexOf('controlcountmap.json') >= 0){
        return '/rest/controlCountMap/' + commitId;
    } else if ( jsonName.indexOf('dependenciesmap.json') >= 0){
        return '/rest/dependenciesMap/' + commitId;
    } else if ( jsonName.indexOf('namespacecountmap.json') >= 0){
        return '/rest/namespaceCountMap/' + commitId;
    } else if ( jsonName.indexOf('usagemap.json') >= 0){
        return '/rest/usageMap/' + commitId;
    }
    return '';
}

var getCommitIdString = function( commitId ){
    return commitId || 'latest';
}

try {
    //polyfill for native
    //import
    var fs = require( 'fs' );
    var path = require( 'path' );
    var Q = require( 'q' );

    //polyfill
    //this script is appended to vendor script to make certain external
    //lib available in global
    global.React = React;
    global.$ = $;
    global.util_readFromFileAsync = function (fullPath, commitId) {
        var defer = Q.defer();

        fullPath = getFilePath(fullPath, getCommitIdString( commitId ), path);

        try{
            fs.readFile(fullPath, 'utf-8', function (error, fileContent) {
                if (error){
                    throw error;
                } else {
                    defer.resolve(fileContent);
                }
            });
        } catch(exception) {
            console.log('global.util_readFromFileAsync error', exception);
            defer.resolve('');//if there is error, resolve with an empty file
        }

        return defer.promise;
    };
} catch(e){
    //polyfill for server side
    //this script is appended to vendor script to make certain external
    //lib available in global
    window.global = window.global || {};
    window.global.util_readFromFileAsync = function (fullPath, commitId) {
        var defer = Q.defer();
        var url = getRestUrlPath(fullPath, getCommitIdString( commitId ));

        //making ajax calls
        $.get(url).done(function(content){
            defer.resolve(content.content, fullPath);
        });

        return defer.promise;
    };
}