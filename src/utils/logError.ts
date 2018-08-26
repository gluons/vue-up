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
 * @template T Error type
 * @param {T} err An error
 */
export default function logError<T extends Error>(err: T): void {
	logUpdate.clear();
	logUpdate.stderr(`${error} ${badge('error', 'red')} ${red(getErrorMessage(err))}`);
	logUpdate.stderr.done();
	process.exitCode = 1;
}
