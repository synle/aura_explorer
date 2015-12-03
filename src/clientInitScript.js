try {
    //polyfill for native
    //import
    var path = require( 'path' );
    var fs = require( 'fs' );
    var Q = require( 'q' );

    //polyfill
    //this script is appended to vendor script to make certain external
    //lib available in global
    global.React = React;
    global.$ = $;
    global.util_readFromFileAsync = function (fullPath) {
        var defer = Q.defer();

        fullPath = path.join(process.cwd(), fullPath);

        console.log('Reading Native', fullPath);

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
    console.log('//polyfill for server side');
    //polyfill for server side
    //this script is appended to vendor script to make certain external
    //lib available in global
    var global = {};
    global.util_readFromFileAsync = function (fullPath) {
        var defer = Q.defer();

        console.log('Reading Server Side', fullPath);

        var url = '';
        if ( fullPath.indexOf('data/controlCountMap.json') >= 0){
            url = '/rest/controlCountMap/latest';
        } else if ( fullPath.indexOf('data/dependenciesMap.json') >= 0){
            url = '/rest/dependenciesMap/latest';
        } else if ( fullPath.indexOf('data/namespaceCountMap.json') >= 0){
            url = '/rest/namespaceCountMap/latest';
        } else if ( fullPath.indexOf('data/usageMap.json') >= 0){
            url = '/rest/usageMap/latest';
        }

        //making ajax calls
        $.get(url).done(function(content){
            defer.resolve(content.content, fullPath);
        });

        return defer.promise;
    };
}