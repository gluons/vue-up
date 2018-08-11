import chalk from 'chalk';
import logUpdate from 'log-update';

import badge from './badge';
import { error } from './emoji';
import getErrorMessage from './getErrorMessage';

const { red } = chalk;

export default function logError(err: any): void {
	logUpdate(red(`${error} ${badge('error', 'bgRed')} ${getErrorMessage(err)}`));
}
