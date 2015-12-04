(function(){
    //utils
    var FILE_BASE_PATH = 'public/dist/js/data/';
    var REST_URL_BASE_PATH = '/rest';

    var getFilePath = function(jsonName, commitId, path){
        return path.join(
            process.cwd(),
            FILE_BASE_PATH,
            jsonName
        );
    }

    var getRestUrlPath = function(jsonName, commitId){
        var restUrlPathSegments = [REST_URL_BASE_PATH, jsonName, commitId];
        return restUrlPathSegments.join('/');
    }


    var AURA_EXPLORER_UTILS = {};

    try{
        //polyfill for native
        //import
        var fs = require( 'fs' );
        var path = require( 'path' );
        var Q = require( 'q' );

        //set get data methods from files
        AURA_EXPLORER_UTILS.getData = function (fullPath, commitId) {
            var defer = Q.defer();

            fullPath = getFilePath(fullPath, commitId, path);

            try{
                fs.readFile(fullPath, 'utf-8', function (error, fileContent) {
                    if (error){
                        throw error;
                    } else {
                        defer.resolve(fileContent);
                    }
                });
            } catch(exception) {
                console.log('global.getData error', exception);
                defer.resolve('');//if there is error, resolve with an empty file
            }

            return defer.promise;
        };


        //set global variables used for native node webkit
        global.React = React;
        global.$ = $;
        global.AURA_EXPLORER_UTILS = AURA_EXPLORER_UTILS;
    } catch(e) {
        //polyfill for server side
        //import
        var Q = window.Q;

        //set get data methods from files
        AURA_EXPLORER_UTILS.getData = function (fullPath, commitId) {
            var defer = Q.defer();
            var url = getRestUrlPath(fullPath, commitId);

            //making ajax calls
            $.get(url).done(function(content){
                defer.resolve(content.content, fullPath);
            });

            return defer.promise;
        };

        //override the vars
        window.AURA_EXPLORER_UTILS = AURA_EXPLORER_UTILS;
    }
})()