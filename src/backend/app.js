//external
import path from 'path';

//internal
import processor from '~/src/backend/processParsingLookup';
import config    from '~/config.json';
import util      from '~/src/backend/util';


//try making the base path
try {
	util.mkDir(path.join(process.cwd(), config.auraMetaOutputDir));
} catch(e) {}

const commit = process.argv[2] || 'latest';
console.log('Parsing branch:', commit);

//run it
processor(
	commit,
	path.join(process.cwd(), config.auraSourceBaseDir, '/'),
	path.join(process.cwd(), config.auraMetaOutputDir, commit, '/'),
	() => {
		console.log('All Done');
	}
);
