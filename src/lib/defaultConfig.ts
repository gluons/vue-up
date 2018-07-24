import { join } from 'path';

const defaultConfig = {
	path() {
		return join(process.cwd(), 'dist');
	},
	sourceMap: true,
	externals: ['vue']
};

export default defaultConfig;
