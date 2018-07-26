import { join } from 'path';

const defaultConfig = {
	outDir() {
		return join(process.cwd(), 'dist');
	},
	cleanOutDir: true,
	sourceMap: true,
	externals: ['vue']
};

export default defaultConfig;
