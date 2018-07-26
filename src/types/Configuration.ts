import { ExternalOption } from 'rollup';

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
