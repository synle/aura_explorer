//import
var path = require( 'path' );
var fs = require( 'fs' );

//polyfill
//this script is appended to vendor script to make certain external
//lib available in global
global.React = React;
global.$ = $;
global.util_readFromFileAsync = function (fpath) {
	var fullPath = path.join(process.cwd(), fpath);	
	var content = fs.readFileSync(fullPath, 'utf8');
	return content;
};