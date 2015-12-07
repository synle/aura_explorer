//init calls
(function(){
    //import
    var Q = require('q');

    //utils
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


    var AURA_EXPLORER_UTILS = {
        tryParseJSON: function(response){
            try{
                return JSON.parse(response);
            } catch(e){}

            return response;
        },
        getData : function (fullPath, commitId) {
            var defer = Q.defer();
            var url = getRestUrlPath(fullPath, commitId);

            //making ajax calls
            $.get(url).done(function(content){
                defer.resolve(content.content, fullPath);
            });

            return defer.promise;
        }
    };

    //override the vars
    window.AURA_EXPLORER_UTILS = AURA_EXPLORER_UTILS;
})()

export default {};