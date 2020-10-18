/* eslint-disable @typescript-eslint/no-explicit-any */
import pick from 'lodash.pick';

import DevOptions from '../types/DevOptions';

/**
 * Purify impure development options from CLI.
 *
 * @export
 * @param {Record<string, any>} impureDevOptions Impure development options
 * @returns {DevOptions}
 */
export default function purifyDevOptions(
	impureDevOptions: Record<string, any>
): DevOptions {
	const devOptions: DevOptions = pick(impureDevOptions, [
		'entry',
		'port',
		'htmlTitle'
	]);

	return devOptions;
}
