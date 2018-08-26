import { ModuleFormat } from 'rollup';

/**
 * Infomation of output bundle format.
 *
 * @export
 * @interface FormatInfo
 */
export interface FormatInfo {
	/**
	 * Output module format
	 *
	 * @type {ModuleFormat}
	 * @memberof FormatInfo
	 */
	format: ModuleFormat;
	/**
	 * Output file suffix
	 *
	 * @type {string}
	 * @memberof FormatInfo
	 */
	suffix?: string;
}

/**
 * List of unminified output bundle format.
 */
export const unminifiedFormats: FormatInfo[] = [
	{
		format: 'cjs'
	},
	{
		format: 'es'
	},
	{
		format: 'iife',
		suffix: 'web'
	}
];

/**
 * List of minified output bundle format.
 */
export const minifiedFormats: FormatInfo[] = [
	{
		format: 'iife',
		suffix: 'web.min'
	}
];
