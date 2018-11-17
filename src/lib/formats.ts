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
		format: 'cjs',
		min: false
	},
	{
		format: 'es',
		min: false
	}
];

/**
 * List of web output bundle format.
 */
export const webFormats: FormatInfo[] = [
	{
		format: 'iife',
		min: false
	},
	{
		format: 'iife',
		min: true
	}
];
