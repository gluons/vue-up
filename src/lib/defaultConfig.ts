import slugify from '@sindresorhus/slugify';
import { PartialDefaults } from 'moren';

import Configuration from '../types/Configuration';
import resolvePath from '../utils/resolvePath';

const defaultConfig: PartialDefaults<Configuration> = {
	fileName(config) {
		return slugify(config.libraryName);
	},
	outDir() {
		return resolvePath('dist');
	},
	cleanOutDir: true,
	sourceMap: true,
	externals: ['vue']
};

export default defaultConfig;
