//external
import path from 'path';

//internal
import logger from './logger';//internal loggr
import util from './util';
import generateLookup from './generateLookup';

export default (componentBaseDir, metaDataOutputDir) => {
	//trim whitespace
	logger.log('componentBaseDir  :'.yellow, componentBaseDir);
	logger.log('metaDataOutputDir :'.yellow, metaDataOutputDir);

	//find all cmp files in nested structures
	util.listDir(componentBaseDir).then( function( componentFileNames ){
		//success
		//print stats
		logger.log('Statistics'.yellow);
		logger.log('\t.app:'.yellow, componentFileNames.app.length);
		logger.log('\t.cmp:'.yellow, componentFileNames.cmp.length);
		logger.log('\t.evt:'.yellow, componentFileNames.evt.length);
		logger.log('\tjs:'.yellow, componentFileNames.js.length);
		logger.log('\tHelper.js:'.yellow, componentFileNames.helperjs.length);
		logger.log('\tController.js:'.yellow, componentFileNames.controllerjs.length);
		logger.log('\tRenderrer.js:'.yellow, componentFileNames.rendererjs.length);

		generateLookup(
			componentFileNames,//dictionary containing all js, evt and cmp files
			componentBaseDir,//base dir of the aura upstream directory
			metaDataOutputDir//base output dir , snippet
		);
	}, function(err){
		//fail callback
		logger.error('index.js has issues with getting dir list', err);
	});
}
