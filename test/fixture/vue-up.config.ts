import { resolve } from 'path';

import { Configuration } from '../../dist/bundle';

const config: Partial<Configuration> = {
	entry: resolve(__dirname, './src/index.ts'),
	alias: {
		'@comp': resolve(__dirname, './src/components/')
	},
	define: {
		HELLO: 'Hello'
	}
};

export default config;
