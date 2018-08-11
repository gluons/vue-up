import postcss from '@gluons/rollup-plugin-postcss-only';
import cssnano from 'cssnano';
import { ExternalOption, RollupFileOptions } from 'rollup';
import minify from 'rollup-plugin-babel-minify';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import ts from 'rollup-plugin-typescript2';
import vue from 'rollup-plugin-vue';

import progress from './lib/ProgressPlugin';

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
	 * Bundle file's name (Don't need extension. Just file's name)
	 *
	 * @type {string}
	 * @memberof InputOptions
	 */
	fileName: string;
	/**
	 * External dependencies (Rollup's `external`)
	 *
	 * @type {ExternalOption}
	 * @default ['vue']
	 * @memberof InputOptions
	 */
	externals: ExternalOption;
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
	const { entry, minimize, fileName, externals } = options;

	const cssFileName = `${fileName}${minimize ? '.min' : ''}.css`;
	const inputOptions: RollupFileOptions = {
		input: entry,
		plugins: [
			nodeResolve(),
			commonjs(),
			ts(),
			postcss({
				fileName: cssFileName,
				plugins: (minimize ? [cssnano({ preset: 'default' })] : [])
			}),
			vue({
				css: false
			}),
			...(
				minimize ?
				[
					minify({
						mangle: false,
						comments: false
					})
				] :
				[]
			),
			progress()
		],
		external: externals
	};

	return inputOptions;
}
