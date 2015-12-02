//external
import Mustache from 'mustache';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import Q from 'q';

//export
const self = {
	readFromFileAsync: (path) =>  {
        const defer = Q.defer();

        defer.resolve( fs.readFileSync(path, 'utf-8') );

        try{
            fs.readFile(path, 'utf-8', (error, fileContent) => {
                if (error){
                    throw error;
                } else {
                    defer.resolve(fileContent);
                }
            });
        } catch(exception) {
            console.log('readFromFileAsync error', exception);
            defer.resolve('');//if there is error, resolve with an empty file
        }

        return defer.promise;
    }
}

export default self;