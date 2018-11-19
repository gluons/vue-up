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
	/**
	 * Minified?
	 *
	 * @type {boolean}
	 * @memberof FormatInfo
	 */
	min?: boolean;
}

/**
 * List of module output bundle format.
 */
export const moduleFormats: FormatInfo[] = [
	{
		format: 'cjs'
	},
	{
		format: 'es'
	}
];

/**
 * List of SSR output bundle format.
 */
export const ssrFormats: FormatInfo[] = [
	{
		format: 'cjs',
		suffix: 'ssr'
	}
];

/**
 * List of web output bundle format.
 */
export const webFormats: FormatInfo[] = [
	{
		format: 'iife',
		suffix: 'web'
	},
	{
		format: 'iife',
		suffix: 'web.min',
		min: true
	}
];
