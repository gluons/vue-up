import { Arguments, Argv } from 'yargs';

import bundle from '../bundle';
import defaultConfig from '../lib/defaultConfig';
import purifyConfig from '../lib/purifyConfig';
import isNonEmptyStr from '../utils/isNonEmptyStr';
import loadConfig from '../utils/loadConfig';
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
			defaultDescription: JSON.stringify('./dist'),
			normalize: true
		})
		.option('cleanOutDir', {
			type: 'boolean',
			desc: 'Clean output directory before bundling.',
			alias: 'd',
			defaultDescription: JSON.stringify(defaultConfig.cleanOutDir)
		})
		.option('sourceMap', {
			type: 'boolean',
			desc: 'Generate source map?',
			alias: 's',
			defaultDescription: JSON.stringify(defaultConfig.sourceMap)
		})
		.option('externals', {
			type: 'array',
			desc: `External dependencies. (Rollup's "external")`,
			alias: 'e',
			defaultDescription: JSON.stringify(defaultConfig.externals)
		});
}

export type BuildArgs = {
	config?: string;
	entry?: string;
	libraryName?: string;
	fileName?: string;
	outDir?: string;
	cleanOutDir?: boolean;
	sourceMap?: boolean;
	externals?: string[];
};

export async function handler(argv: Arguments<BuildArgs>): Promise<void> {
	const configPath: string = isNonEmptyStr(argv.config) ? argv.config : null;
	const cliConfig = purifyConfig(argv);
	const config = await loadConfig(cliConfig, configPath);

	if (config.outDir) {
		config.outDir = resolveCwd(config.outDir); // Resolve path before using
	}

	await bundle(config);
}
