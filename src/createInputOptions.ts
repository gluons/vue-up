import postcss from '@gluons/rollup-plugin-postcss-only';
import cssnano from 'cssnano';
import { ExternalOption, RollupFileOptions, RollupWarning, WarningHandler } from 'rollup';
import minify from 'rollup-plugin-babel-minify';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import resolveAlias from 'rollup-plugin-resolve-alias';
import ts from 'rollup-plugin-typescript2';
import vue from 'rollup-plugin-vue';

import constructAlias from './lib/constructAlias';
import progress from './lib/ProgressPlugin';
import stringifyObjectValues from './utils/stringifyObjectValues';

/**
 * Options of `createInputOptions`.
 *
 * @export
 * @interface InputOptions
 */
export interface InputOptions {
	/**
	 * Bundle's entry point
	 *
	 * @type {string}
	 * @memberof InputOptions
	 */
	entry: string;
	/**
	 * Minimize bundle?
	 *
	 * @type {boolean}
	 * @memberof InputOptions
	 */
	minimize: boolean;
	/**
	 * Enable SSR optimization
	 *
	 * @type {boolean}
	 * @memberof InputOptions
	 */
	ssr: boolean;
	/**
	 * Name of output bundled files (without extension)
	 *
	 * @type {string}
	 * @memberof InputOptions
	 */
	fileName: string;
	/**
	 * Alias to path
	 *
	 * @type {Record<string, string>}
	 * @memberof InputOptions
	 */
	alias: Record<string, string>;
	/**
	 * Define global constants to apply at compile time
	 *
	 * @type {Record<string, any>}
	 * @memberof InputOptions
	 */
	define: Record<string, any>;
	/**
	 * External dependencies (Rollup's `external`)
	 *
	 * @type {ExternalOption}
	 * @memberof InputOptions
	 */
	externals: ExternalOption;
	/**
	 * Is this bundle for web?
	 *
	 * @type {boolean}
	 * @memberof InputOptions
	 */
	isWeb: boolean;
}

/**
 * Create Rollup's input options.
 *
 * @export
 * @param {string} entry Bundle's entry point
 * @param {boolean} minimize Minimize bundle?
 * @param {ExternalOption} [externals=['vue']] External dependencies. (Rollup's `external`)
 * @returns {RollupFileOptions}
 */
export default function createInputOptions(options: InputOptions): RollupFileOptions {
	const {
		entry,
		minimize,
		ssr,
		fileName,
		alias,
		define,
		externals,
		isWeb
	} = options;

	const cssFileName = `${fileName}${minimize ? '.min' : ''}.css`;
	const constructedAlias = constructAlias(alias);
	const definedConstants = {
		...(typeof define === 'object' ? stringifyObjectValues(define) : {}),
		'process.env.NODE_ENV': JSON.stringify('production'),
		'IS_WEB_BUNDLE': JSON.stringify(isWeb)
	};
	const inputOptions: RollupFileOptions = {
		input: entry,
		plugins: [
			replace(definedConstants),
			nodeResolve(),
			commonjs(),
			resolveAlias({
				aliases: constructedAlias
			}),
			ts({
				clean: true
			}),
			postcss({
				fileName: cssFileName,
				plugins: (minimize ? [cssnano({ preset: 'default' })] : [])
			}),
			vue({
				css: false,
				template: {
					compiler: require('vue-template-compiler'),
					compilerOptions: void 0,
					isProduction: true,
					optimizeSSR: ssr
				}
			}),
			...(
				minimize ?
				[
					minify({
						comments: false,
						mangle: false,
						plugins: [
							'@babel/plugin-syntax-dynamic-import'
						]
					})
				] :
				[]
			),
			progress()
		],
		external: externals,
		onwarn: ((warning: RollupWarning, warn) => {
			if (warning.code === 'THIS_IS_UNDEFINED') {
				return;
			}

			warn(warning);
		}) as WarningHandler
	};

	return inputOptions;
}
