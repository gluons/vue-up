import chalk from 'chalk';
import logUpdate from 'log-update';

import badge from './badge';
import { error } from './emoji';
import getErrorMessage from './getErrorMessage';

const { red } = chalk;

/**
 * Log error to terminal.
 *
 * @export
 * @param {any} err An error
 */
export default function logError(err: any): void {
	logUpdate.clear();
	logUpdate.stderr(red(`${error} ${badge('error', 'red')} ${getErrorMessage(err)}`));
	logUpdate.stderr.done();
	process.exitCode = 1;
}
