import serve, { DefaultOptions, Options } from '@gluons/vue-pack-dev';
import nvl from 'nvl';
import { Arguments, Argv } from 'yargs';

import DevOptions from '../types/DevOptions';
import isNonEmptyStr from '../utils/isNonEmptyStr';
import loadConfig from '../utils/loadConfig';
import purifyDevOptions from '../utils/purifyDevOptions';
import resolveCwd from '../utils/resolveCwd';

export const command = 'dev';

export const describe = 'Start development server.';

export function builder(yargs: Argv): Argv {
	return yargs
		.option('entry', {
			type: 'string',
			desc: 'Path to entry file for development.',
			alias: 'i'
		})
		.option('port', {
			type: 'number',
			desc: 'Port of development server.',
			alias: 'p',
			defaultDescription: JSON.stringify(DefaultOptions.port)
		})
		.option('noOpen', {
			type: 'boolean',
			desc: 'Do not open in browser when server run.',
			alias: 'n',
			defaultDescription: JSON.stringify(!DefaultOptions.open)
		})
		.option('htmlTitle', {
			type: 'string',
			desc: 'Title of development page.',
			defaultDescription: JSON.stringify(DefaultOptions.htmlTitle)
		})
	;
}

export async function handler(argv: Arguments): Promise<void> {
	const configPath: string = isNonEmptyStr(argv.config) ? argv.config : null;
	const config = await loadConfig(null, configPath);
	const cliDevOptions = purifyDevOptions(argv);
	const configDevOptions = nvl(config.dev, {}) as DevOptions;

	const entry = resolveCwd(nvl(cliDevOptions.entry, configDevOptions.entry));
	const port = nvl(cliDevOptions.port, configDevOptions.port);
	const open = !nvl<boolean>(argv.noOpen, !configDevOptions.open);
	const htmlTitle = nvl(cliDevOptions.htmlTitle, configDevOptions.htmlTitle);

	const options: Options = {
		entry,
		port,
		open,
		htmlTitle,
		webpackBarName: 'Vue Up Dev'
	};

	await serve(options);
}
