import moren from 'moren';

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
	return moren(config, defaultConfig);
}
