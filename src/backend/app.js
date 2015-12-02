//external
import path from 'path';

//internal
import processor from '~/src/backend/processParsingLookup';
import config    from '~/src/backend/config';

//run it
processor(
	path.join(process.cwd(), config.baseDir, '/'),
	path.join(process.cwd(), config.outputDir, '/')
);
