//external
import path from 'path';

//internal
import processor from '~/src/backend/processParsingLookup';
import config    from '~/config.json';

//run it
processor(
	path.join(process.cwd(), config.auraSourceBaseDir, '/'),
	path.join(process.cwd(), config.auraMetaOutputDir, '/')
);
