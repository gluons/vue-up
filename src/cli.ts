import { resolve } from 'path';
import yargs from 'yargs';

// tslint:disable:no-unused-expression

yargs
	.wrap(yargs.terminalWidth() - 5) // Use nearly max terminal width
	.help()
	.version()
	.alias('help', 'h')
	.alias('version', 'v')
	.commandDir(resolve(__dirname, './cli'))
	.option('config', {
		type: 'string',
		global: true,
		desc: 'Path to config file.',
		alias: 'c'
	}).argv;

// tslint:enable:no-unused-expression
