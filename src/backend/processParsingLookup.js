//external
import path from 'path';

//internal
import logger from '~/src/backend/logger';//internal loggr
import util from '~/src/backend/util';
import generateLookup from '~/src/backend/generateLookup';

export default (commit, componentBaseDir, metaDataOutputDir, callback) => {
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

		//making the output dir if needed
		logger.log('[Verifying Meta Data Dir]'.yellow, metaDataOutputDir);
		try {
			util.mkDir(metaDataOutputDir);
		} catch(e) {}

		//generate lookup
		generateLookup(
			commit,
			componentFileNames,//dictionary containing all js, evt and cmp files
			componentBaseDir,//base dir of the aura upstream directory
			metaDataOutputDir//base output dir , snippet
		).then(() => {
			//finally done
			callback();
		});
	}, function(err){
		//fail callback
		logger.error('index.js has issues with getting dir list', err);
	});
}
