//external
import path from 'path';

//internal
import logger from './logger';//internal loggr
import util from './util';
import generateLookup from './generateLookup';

export default (baseDir, outputDir) => {
	logger.log(baseDir.bold.underline, baseDir);

	//trim whitespace
	baseDir = baseDir.trim();
	outputDir = outputDir.trim();


	//get a list of all files
	//read content files
	var componentBaseDir = path.join(
		baseDir,
		'/'
	);

	//find all cmp files in nested structures
	util.listDir(componentBaseDir).then( function( componentFileNames ){
		//success
		//print stats
		logger.log('Statistics'.bold.underline.bgBlue.white);
		logger.log('.app Files:'.bold, componentFileNames.app.length);
		logger.log('.cmp Files:'.bold, componentFileNames.cmp.length);
		logger.log('.evt Files:'.bold, componentFileNames.evt.length);
		// logger.log('js Files:'.bold, componentFileNames.js.length);
		logger.log('\tHelper.js Files:'.bold, componentFileNames.helperjs.length);
		logger.log('\tController.js Files:'.bold, componentFileNames.controllerjs.length);
		logger.log('\tRenderrer.js Files:'.bold, componentFileNames.rendererjs.length);

		generateLookup(
			componentFileNames,//dictionary containing all js, evt and cmp files
			baseDir,//base dir of the aura upstream directory
			outputDir//base output dir , snippet
		);
	}, function(err){
		//fail callback
		logger.error('index.js has issues with getting dir list', err);
	});
}
