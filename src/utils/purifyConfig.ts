import R from 'ramda';

import Configuration, { ConfigKeys } from '../types/Configuration';

export default function purifyConfig(impureConfig: Record<string, any>): Configuration {
	const config: Configuration = R.pick(ConfigKeys, impureConfig);

	return config;
}
