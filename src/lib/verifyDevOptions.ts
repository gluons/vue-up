import ow from 'ow';

import DevOptions from '../types/DevOptions';
import logError from '../utils/logError';

/**
 * Verify `vue-up`'s development options.
 *
 * @export
 * @param {DevOptions} devOptions Development options
 */
export default function verifyDevOptions(devOptions: DevOptions): void {
	try {
		ow(devOptions.entry, 'entry', ow.string.nonEmpty);
	} catch (err) {
		logError(err);
		process.exit(1);
	}
}
