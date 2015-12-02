//import
var path = require( 'path' );
var fs = require( 'fs' );
var Q = require( 'q' );

//polyfill
//this script is appended to vendor script to make certain external
//lib available in global
global.React = React;
global.$ = $;
global.util_readFromFileAsync = function (fpath) {
	var fullPath = path.join(process.cwd(), fpath);	
	var defer = Q.defer();

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