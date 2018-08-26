import { resolve } from 'path';

import { Configuration } from '../../dist/bundle';

const config: Partial<Configuration> = {
	entry: resolve(__dirname, './src/index.ts')
};

export default config;
