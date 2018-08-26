import ow from 'ow';

import Configuration from '../types/Configuration';
import logError from '../utils/logError';

/**
 * Verify `vue-up`'s configuration.
 *
 * @export
 * @param {Configuration} config Configuration
 */
export default function verifyConfig(config: Configuration): void {
	try {
		ow(config.entry, ow.string.nonEmpty.label('entry'));
		ow(config.libraryName, ow.string.nonEmpty.label('libraryName'));
	} catch (err) {
		logError(err);
		process.exit(1);
	}
}
