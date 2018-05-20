import { join, resolve } from 'path';
import { ModuleFormat, OutputOptions as RollupOutputOptions } from 'rollup';

import nvl from './utils/nvl';

/**
 * Options of `createOutputOptions`.
 *
 * @export
 * @interface OutputOptions
 */
export interface OutputOptions {
	/**
	 * Bundle file's name. (Don't need extension. Just file's name.)
	 *
	 * @type {string}
	 * @memberof OutputOptions
	 */
	fileName: string;
	/**
	 * Library's name.
	 *
	 * @type {string}
	 * @memberof OutputOptions
	 */
	libraryName: string;
	/**
	 * Output path.
	 *
	 * @type {string}
	 * @default 'dist'
	 * @memberof OutputOptions
	 */
	outPath?: string;
	/**
	 * Use source map?
	 *
	 * @type {boolean}
	 * @default true
	 * @memberof OutputOptions
	 */
	sourceMap?: boolean;
}

/**
 * Create Rollup's output options.
 *
 * @export
 * @param {OutputOptions} options Options.
 * @returns {RollupOutputOptions[]}
 */
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
