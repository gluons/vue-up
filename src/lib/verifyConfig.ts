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
		ow(config.entry, 'entry', ow.string.nonEmpty);
		ow(config.libraryName, 'libraryName', ow.string.nonEmpty);

		if (!config.fileName) {
			throw new TypeError(
				[
					'`fileName` is empty.',
					"Maybe can't slugify your `libraryName`.",
					'Please check your `libraryName` or provide `fileName` directly.'
				].join(' ')
			);
		}
	} catch (err) {
		logError(err);
		process.exit(1);
	}
}
