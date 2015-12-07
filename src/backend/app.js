//external
import path from 'path';

//internal
import processor from '~/src/backend/processParsingLookup';
import config    from '~/config.json';
import util      from '~/src/backend/util';


//try making the base path
try {
	util.mkDir(path.join(process.cwd(), config.auraMetaOutputDir));
} catch(e) {
	console.log('[Error]', e);
}

//run it
processor(
	path.join(process.cwd(), config.auraSourceBaseDir, '/'),
	path.join(process.cwd(), config.auraMetaOutputDir, 'latest', '/'),
	() => {
		console.log('All Done');
	}
);
