import { resolve } from 'path';

import { Configuration } from '../dist/bundle';

const config: Configuration = {
	entry: resolve(__dirname, './src/index.ts'),
	libraryName: 'HelloPlugin'
};

export default config;
