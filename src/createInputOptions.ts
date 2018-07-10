import { ExternalOption, RollupFileOptions } from 'rollup';
import minify from 'rollup-plugin-babel-minify';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import ts from 'rollup-plugin-typescript2';
import VuePlugin from 'rollup-plugin-vue';

/**
 * Create Rollup's input options.
 *
 * @export
 * @param {string} entry Bundle's entry point.
 * @param {ExternalOption} [externals=['vue']] External dependencies. (Rollup's `external`)
 * @returns {RollupFileOptions}
 */
export default function createInputOptions(
	entry: string,
	externals: ExternalOption = ['vue']
): RollupFileOptions {
	const inputOptions: RollupFileOptions = {
		input: entry,
		plugins: [
			nodeResolve(),
			commonjs(),
			ts(),
			VuePlugin(),
			minify({
				mangle: false,
				comments: false
			})
		],
		external: externals
	};

	return inputOptions;
}
