//external
import path from 'path';

//internal
import processor from '/aura-explorer/backend/processParsingLookup';
import config    from '/aura-explorer/backend/config';

//run it
processor(
	path.join(process.cwd(), config.baseDir, '/'),
	path.join(process.cwd(), config.outputDir, '/')
);
