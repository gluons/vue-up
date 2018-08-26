import { Arguments, Argv } from 'yargs';

import bundle from '../bundle';
import defaultConfig from '../lib/defaultConfig';
import isNonEmptyStr from '../utils/isNonEmptyStr';
import loadConfig from '../utils/loadConfig';
import purifyConfig from '../utils/purifyConfig';
import resolveCwd from '../utils/resolveCwd';

export const command = ['*', 'build'];

export const describe = 'Bundle Vue.js library';

export function builder(yargs: Argv): Argv {
	return yargs
		.option('entry', {
			type: 'string',
			desc: "Bundle's entry point.",
			alias: 'i',
			normalize: true
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
			defaultDescription: './dist',
			normalize: true
		})
		.option('cleanOutDir', {
			type: 'boolean',
			desc: 'Clean output directory before bundling.',
			alias: 'd',
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
	config.outDir = resolveCwd(config.outDir); // Resolve path before using

	await bundle(config);
}
