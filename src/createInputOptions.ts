import postcss from '@gluons/rollup-plugin-postcss-only';
import { ExternalOption, RollupFileOptions } from 'rollup';
import minify from 'rollup-plugin-babel-minify';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import ts from 'rollup-plugin-typescript2';
import vue from 'rollup-plugin-vue';

/**
 * Create Rollup's input options.
 *
 * @export
 * @param {string} entry Bundle's entry point
 * @param {boolean} minimize Minimize bundle?
 * @param {ExternalOption} [externals=['vue']] External dependencies. (Rollup's `external`)
 * @returns {RollupFileOptions}
 */
export default function createInputOptions(
	entry: string,
	minimize: boolean,
	externals: ExternalOption = ['vue']
): RollupFileOptions {
	const inputOptions: RollupFileOptions = {
		input: entry,
		plugins: [
			nodeResolve(),
			commonjs(),
			ts(),
			postcss(),
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
			)
		],
		external: externals,
		inlineDynamicImports: false
	};

	return inputOptions;
}
