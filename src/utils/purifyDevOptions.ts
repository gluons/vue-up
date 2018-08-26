import R from 'ramda';

import DevOptions, { DevOptionsKeys } from '../types/DevOptions';

/**
 * Purify impure development options from CLI.
 *
 * @export
 * @param {Record<string, any>} impureDevOptions Impure development options
 * @returns {DevOptions}
 */
export default function purifyDevOptions(impureDevOptions: Record<string, any>): DevOptions {
	const devOptions: DevOptions = R.pick(DevOptionsKeys, impureDevOptions);

	return devOptions;
}
