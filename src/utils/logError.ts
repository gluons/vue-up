import chalk from 'chalk';
import logUpdate from 'log-update';

import badge from './badge';
import { error } from './emoji';
import getErrorMessage from './getErrorMessage';

const { red } = chalk;

export default function logError(err: any): void {
	logUpdate.clear();
	logUpdate.stderr(red(`${error} ${badge('error', 'bgRed')} ${getErrorMessage(err)}`));
	logUpdate.stderr.done();
	process.exitCode = 1;
}
