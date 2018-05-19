import { join, resolve } from 'path';
import { ModuleFormat, OutputOptions as RollupOutputOptions } from 'rollup';

import nvl from './utils/nvl';

export interface OutputOptions {
	fileName: string;
	libraryName: string;
	outPath?: string;
	sourceMap?: boolean;
}

export default function createOutputOptions(options: OutputOptions): RollupOutputOptions[] {
	options.outPath = nvl(options.outPath, 'dist');
	options.sourceMap = nvl(options.sourceMap, true);

	let { fileName, libraryName, outPath, sourceMap } = options;

	if (outPath === 'dist') {
		outPath = resolve(process.cwd(), outPath);
	}

	const formats: ModuleFormat[] = ['cjs', 'es', 'iife'];

	return formats.map(format => ({
		format,
		file: join(outPath, `${fileName}.${format}.js`),
		name: libraryName,
		sourcemap: sourceMap,
		globals: {
			vue: 'Vue'
		}
	} as RollupOutputOptions));
}
