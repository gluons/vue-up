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
	 * Bundle's entry point
	 *
	 * @type {string}
	 * @memberof Configuration
	 */
	entry: string;
	/**
	 * Library's name
	 *
	 * @type {string}
	 * @memberof Configuration
	 */
	libraryName: string;
	/**
	 * Name of output bundled files (without extension)
	 *
	 * @type {string}
	 * @memberof Configuration
	 */
	fileName?: string;
	/**
	 * Output directory
	 *
	 * @type {string}
	 * @default 'dist'
	 * @memberof Configuration
	 */
	outDir?: string;
	/**
	 * Clean output directory before bundling
	 *
	 * @type {boolean}
	 * @default true
	 * @memberof Configuration
	 */
	cleanOutDir?: boolean;
	/**
	 * Alias to path
	 *
	 * @type {Record<string, string>}
	 * @memberof Configuration
	 */
	alias?: Record<string, string>;
	/**
	 * Define global constants to apply at compile time
	 *
	 * @type {Record<string, any>}
	 * @memberof Configuration
	 */
	define?: Record<string, any>;
	/**
	 * Use source map?
	 *
	 * @type {boolean}
	 * @default true
	 * @memberof Configuration
	 */
	sourceMap?: boolean;
	/**
	 * External dependencies (Rollup's `external`)
	 *
	 * @type {{ module?: ExternalOption, web?: ExternalOption }}
	 * @default { module: nodeExternals(), web: ['vue'] }
	 * @memberof Configuration
	 */
	externals?: {
		module?: ExternalOption,
		web?: ExternalOption
	};
	/**
	 * Global variables of external dependencies (Rollup's `output.globals`)
	 *
	 * @type {Record<string, string>}
	 * @memberof Configuration
	 */
	globals?: Record<string, string>;
	/**
	 * Options for development server
	 *
	 * @type {DevOptions}
	 * @memberof Configuration
	 */
	dev?: DevOptions;
}
