//external
import path from 'path';

//internal
import logger from '/aura-explorer/backend/logger';//internal loggr
import util from '/aura-explorer/backend/util';
import generateLookup from '/aura-explorer/backend/generateLookup';

export default (componentBaseDir, metaDataOutputDir) => {
	//trim whitespace
	logger.log('[componentBaseDir]: '.yellow, componentBaseDir);
	logger.log('[metaDataOutputDir]: '.yellow, metaDataOutputDir);

	//find all cmp files in nested structures
	util.listDir(componentBaseDir).then( function( componentFileNames ){
		//success
		//print stats
		logger.log('[Category Statistics]'.yellow);
		logger.log('\t.app'.blue, componentFileNames.app.length);
		logger.log('\t.cmp'.blue, componentFileNames.cmp.length);
		logger.log('\t.evt'.blue, componentFileNames.evt.length);
		logger.log('\tjs'.blue, componentFileNames.js.length);
		logger.log('\tHelper.js'.blue, componentFileNames.helperjs.length);
		logger.log('\tController.js'.blue, componentFileNames.controllerjs.length);
		logger.log('\tRenderrer.js'.blue, componentFileNames.rendererjs.length);

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
