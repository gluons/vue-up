import slugify from '@sindresorhus/slugify';
import { PartialDefaults } from 'moren';

import Configuration from '../types/Configuration';
import resolveCwd from '../utils/resolveCwd';
import nodeExternals from './nodeExternals';

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
	externals: {
		module: nodeExternals(),
		web: ['vue']
	}
};

export default defaultConfig;
