import { ExternalOption } from 'rollup';

import DevOptions from './DevOptions';

export { ExternalOption };

/**
 * `vue-up`'s configuration.
 *
 * @export
 * @interface Configuration
 */
export default interface Configuration {
	/**
	 * Bundle's entry point.
	 *
	 * @type {string}
	 * @memberof Configuration
	 */
	entry: string;
	/**
	 * Library's name.
	 *
	 * @type {string}
	 * @memberof Configuration
	 */
	libraryName: string;
	/**
	 * Bundle file's name. (Don't need extension. Just file's name.)
	 *
	 * @type {string}
	 * @memberof Configuration
	 */
	fileName?: string;
	/**
	 * Output directory.
	 *
	 * @type {string}
	 * @default 'dist'
	 * @memberof Configuration
	 */
	outDir?: string;
	/**
	 * Clean output directory before bundling.
	 *
	 * @type {boolean}
	 * @default true
	 * @memberof Configuration
	 */
	cleanOutDir?: boolean;
	/**
	 * Use source map?
	 *
	 * @type {boolean}
	 * @default true
	 * @memberof Configuration
	 */
	sourceMap?: boolean;
	/**
	 * External dependencies. (Rollup's `external`)
	 *
	 * @type {ExternalOption}
	 * @default ['vue']
	 * @memberof Configuration
	 */
	externals?: ExternalOption;
	/**
	 * Options for development server.
	 *
	 * @type {DevOptions}
	 * @memberof Configuration
	 */
	dev?: DevOptions;
}

export const ConfigKeys = [
	'entry',
	'libraryName',
	'fileName',
	'outDir',
	'cleanOutDir',
	'sourceMap',
	'externals',
	'dev'
];
