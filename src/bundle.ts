import { ExternalOption, rollup } from 'rollup';

import createInputOptions from './createInputOptions';
import createOutputOptions from './createOutputOptions';

export { ExternalOption };

/**
 * Options of `pack`.
 *
 * @export
 * @interface PackOptions
 */
export interface PackOptions {
	/**
	 * Bundle's entry point.
	 *
	 * @type {string}
	 * @memberof PackOptions
	 */
	entry: string;
	/**
	 * Library's name.
	 *
	 * @type {string}
	 * @memberof PackOptions
	 */
	libraryName: string;
	/**
	 * Bundle file's name. (Don't need extension. Just file's name.)
	 *
	 * @type {string}
	 * @memberof PackOptions
	 */
	fileName: string;
	/**
	 * Output path.
	 *
	 * @type {string}
	 * @default 'dist'
	 * @memberof PackOptions
	 */
	path?: string;
	/**
	 * Use source map?
	 *
	 * @type {boolean}
	 * @default true
	 * @memberof PackOptions
	 */
	sourceMap?: boolean;
	/**
	 * External dependencies. (Rollup's `external`)
	 *
	 * @type {ExternalOption}
	 * @default ['vue']
	 * @memberof PackOptions
	 */
	externals?: ExternalOption;
}

/**
 * Bundle Vue library.
 *
 * @export
 * @param {PackOptions} options Options.
 * @returns
 */
export default async function bundle(options: PackOptions) {
	const {
		entry,
		externals,
		fileName,
		libraryName,
		path,
		sourceMap
	} = options;

	const inputOptions = createInputOptions(entry, externals);
	const outputOptionsList = createOutputOptions({
		fileName,
		libraryName,
		outPath: path,
		sourceMap
	});

	const rollupBundle = await rollup(inputOptions);
	await Promise.all(outputOptionsList.map(outputOptions => rollupBundle.write(outputOptions)));

	return Promise.resolve();
}
