import nvl from 'nvl';

import defaultConfig from '../lib/defaultConfig';
import Configuration from '../types/Configuration';

/**
 * Fulfil missing config value with default config.
 *
 * @export
 * @param {Configuration} config Configuration
 * @returns {Configuration}
 */
export default function fulfilConfig(config: Configuration): Configuration {
	Object.keys(defaultConfig).forEach(configName => {
		const defaultConfigValue = defaultConfig[configName];

		if (typeof defaultConfigValue === 'function') {
			config[configName] = nvl(config[configName], defaultConfigValue(config));
		} else {
			config[configName] = nvl(config[configName], defaultConfigValue);
		}
	});

	return config;
}
