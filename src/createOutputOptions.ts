import { join } from 'path';
import { ModuleFormat, OutputOptions as RollupOutputOptions } from 'rollup';

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
	 * File name suffix.
	 *
	 * @type {string}
	 * @memberof OutputOptions
	 */
	suffix: string;
	/**
	 * Bundle output format.
	 *
	 * @type {ModuleFormat}
	 * @memberof OutputOptions
	 */
	format: ModuleFormat;
	/**
	 * Library's name.
	 *
	 * @type {string}
	 * @memberof OutputOptions
	 */
	libraryName: string;
	/**
	 * Output directory.
	 *
	 * @type {string}
	 * @default 'dist'
	 * @memberof OutputOptions
	 */
	outDir: string;
	/**
	 * Use source map?
	 *
	 * @type {boolean}
	 * @default true
	 * @memberof OutputOptions
	 */
	sourceMap: boolean;
}

/**
 * Create Rollup's output options.
 *
 * @export
 * @param {OutputOptions} options Options.
 * @returns {RollupOutputOptions}
 */
export default function createOutputOptions(options: OutputOptions): RollupOutputOptions {
	let {
		fileName,
		suffix,
		format,
		libraryName,
		outDir,
		sourceMap
	} = options;

	const outputOptions: RollupOutputOptions = {
		format,
		file: join(outDir, `${fileName}.${suffix}.js`),
		name: libraryName,
		sourcemap: sourceMap,
		globals: {
			vue: 'Vue'
		}
	};

	return outputOptions;
}
