//external
import Mustache from 'mustache';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import Q from 'q';

//internal
import logger from './logger';//internal loggr

//export
const self = {
	_getSimplePathString: (path) => {
        var pathString = '';
        try{
            var pathSplits = path.split('/');
            pathString = [pathSplits[pathSplits.length - 3], pathSplits[pathSplits.length - 1]].join('/');
        }
        catch(ex){}

        return pathString;
    },
    getComponentNamesFromPath: function(path){
        const shortenPath = self._getSimplePathString(path);

        return [
            shortenPath.substr(0, shortenPath.indexOf('/')),
            shortenPath.substr(shortenPath.indexOf('/') + 1)
        ]
    },
	getTemplateFunc: (templateStr) => {
		return Mustache.render.bind(undefined, templateStr);
	},
	readFromFileAsync: (path) =>  {
        const defer = Q.defer();

        logger.debug(
            'Reading file...'.magenta.bold,
            self._getSimplePathString(path).yellow
        );;

        defer.resolve( fs.readFileSync(path, 'utf-8') );
        return defer.promise;
    },
	listDir: function listDir(inputDir, inputRes) {
        const defer = Q.defer();
        const dirs = fs.readdirSync(inputDir);

        //reduce and flatten out the dir
        inputRes = _.reduce(dirs, (res, curDir) => {
        	const newDir = path.join(inputDir, curDir);
            if (fs.lstatSync(newDir).isDirectory()) {
                listDir(newDir, res);
            } else {
                //if this dir contain /target/, then ignore it
                if(newDir.indexOf('/target/') >= 0){
                    return res;
                }

                //is a file
                const extension = path.extname(newDir);
                let destinationBucket;
                switch (extension) {
                    case '.cmp':
                        destinationBucket = 'cmp';
                        break;
                    case '.app':
                        destinationBucket = 'app';
                        break;
                    case '.evt':
                        destinationBucket = 'evt';
                        break;
                    case '.js':
                        destinationBucket = 'js';

                        //special helper js
                        if(newDir.indexOf('Helper.js') >= 0){
                            destinationBucket = 'helperjs';
                        }
                        else if(newDir.indexOf('Controller.js') >= 0){
                            destinationBucket = 'controllerjs';
                        }
                        else if(newDir.indexOf('Renderer.js') >= 0){
                            destinationBucket = 'rendererjs';
                        }
                        break;
                }

                //push new dir to the right bucket
                if(destinationBucket){
                	if (!res[destinationBucket]){
                		//defint it if it is not yet define
                		res[destinationBucket] = [];
                	}

                	res[destinationBucket].push(newDir);
                }
            }

            return res;//return result
        }, inputRes || {}//default reduce value
            // app: [],
            // cmp: [],
            // evt: [],
            // helperjs: [],
            // controllerjs: [],
            // rendererjs: [],
            // js: []
        );

		//use for the first call to return the promise
        defer.resolve(inputRes);
        return defer.promise;
    },
    getBaseFileNameWithoutExtension: (fileName) => {
        var shortFileName = path.basename(fileName);
        return shortFileName.substr(0, shortFileName.indexOf('.'));
    },
    getKeyValFromCheerioDom: (cheerioDom) => {
        return [cheerioDom.attribs.name, cheerioDom.attribs];
    },
    writeToFile:(string, path, isAppend) => {
        logger.debug(path.yellow);
        if (isAppend === true){
            fs.appendFileSync(path, string);
        }
        else{
            fs.writeFileSync(path, string);
        }
    },
    serializeJsonObject(jsonObj){
        return JSON.stringify(jsonObj, null, 1);
    }
}

export default self;