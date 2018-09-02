import R from 'ramda';

import Configuration from '../types/Configuration';

/**
 * Purify impure config from CLI.
 *
 * @export
 * @param {Record<string, any>} impureConfig Impure config
 * @returns {Configuration}
 */
export default function purifyConfig(impureConfig: Record<string, any>): Configuration {
	const config: Configuration = R.pick(
		[
			'entry',
			'libraryName',
			'fileName',
			'outDir',
			'cleanOutDir',
			'sourceMap',
			'externals'
		],
		impureConfig
	);

	return config;
}
