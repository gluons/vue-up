import { PartialDefaults } from 'moren';
import { join } from 'path';

import Configuration from '../types/Configuration';

const defaultConfig: PartialDefaults<Configuration> = {
	outDir() {
		return join(process.cwd(), 'dist');
	},
	cleanOutDir: true,
	sourceMap: true,
	externals: ['vue']
};

export default defaultConfig;
