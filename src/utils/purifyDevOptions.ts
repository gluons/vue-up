import R from 'ramda';

import DevOptions, { DevOptionsKeys } from '../types/DevOptions';

export default function purifyDevOptions(impureDevOptions: Record<string, any>): DevOptions {
	const devOptions: DevOptions = R.pick(DevOptionsKeys, impureDevOptions);

	return devOptions;
}
