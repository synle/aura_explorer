//external
import path from 'path';

//internal
import processor from './processParsingLookup';
import config    from './config';

//run it
processor(
	path.join(process.cwd(), config.baseDir, '/'),
	path.join(process.cwd(), config.outputDir, '/')
);
