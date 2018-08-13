import R from 'ramda';
import { Arguments, Argv } from 'yargs';

import bundle from '../bundle';
import defaultConfig from '../lib/defaultConfig';
import loadConfig from '../utils/loadConfig';
import purifyConfig from '../utils/purifyConfig';
import resolvePath from '../utils/resolvePath';

/**
 * Check whether given object is non-empty string.
 *
 * @param {any} obj An object
 */
const isNonEmptyStr = R.allPass([R.compose(R.not, R.either(R.isNil, R.isEmpty)), R.is(String)]);

export const command = ['*', 'build'];

export const describe = 'Bundle Vue.js library';

export function builder(yargs: Argv): Argv {
	return yargs
		.option('config', {
			type: 'string',
			desc: 'Path to config file.',
			alias: 'c'
		})
		.option('entry', {
			type: 'string',
			desc: "Bundle's entry point.",
			alias: 'i'
		})
		.option('libraryName', {
			type: 'string',
			desc: "Library's name.",
			alias: 'l'
		})
		.option('fileName', {
			type: 'string',
			desc: "Bundle file's name. (Without extension.)",
			alias: 'f'
		})
		.option('outDir', {
			type: 'string',
			desc: 'Output directory.',
			alias: 'o',
			default: defaultConfig.outDir,
			defaultDescription: './dist'
		})
		.option('cleanOutDir', {
			type: 'boolean',
			desc: 'Clean output directory before bundling.',
			alias: 'clean',
			default: defaultConfig.cleanOutDir
		})
		.option('sourceMap', {
			type: 'boolean',
			desc: 'Generate source map?',
			alias: 's',
			default: defaultConfig.sourceMap
		})
		.option('externals', {
			type: 'array',
			desc: `External dependencies. (Rollup's "external")`,
			alias: 'e',
			default: defaultConfig.externals
		})
	;
}

export async function handler(argv: Arguments): Promise<void> {
	const configPath: string = isNonEmptyStr(argv.config) ? argv.config : null;
	const cliConfig = purifyConfig(argv);
	const config = await loadConfig(cliConfig, configPath);
	config.outDir = resolvePath(config.outDir); // Resolve path before using

	await bundle(config);
}
