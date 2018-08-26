import slugify from '@sindresorhus/slugify';
import { PartialDefaults } from 'moren';

import Configuration from '../types/Configuration';
import resolveCwd from '../utils/resolveCwd';

/**
 * Default configuration.
 */
const defaultConfig: PartialDefaults<Configuration> = {
	fileName(config) {
		// Prevent error in `slugify` when no `libraryName` given
		if (!config.libraryName) {
			return '';
		}

		return slugify(config.libraryName);
	},
	outDir() {
		return resolveCwd('dist');
	},
	cleanOutDir: true,
	sourceMap: true,
	externals: ['vue']
};

export default defaultConfig;
