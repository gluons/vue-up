import JoyCon from 'joycon';
import JoyConYAMLLoader from 'joycon-yaml-loader';
import nvl from 'nvl';
import { homedir } from 'os';
import { basename, dirname, resolve } from 'path';
import R from 'ramda';

import Configuration from '../types/Configuration';

const NAME = 'vue-up';

/**
 * If first object is not nil, it'll merge with second object. (First over second)
 * Otherwise, it'll return second object.
 *
 * @param {any} first First object.
 * @param {any} second Second object.
 */
const ifMerge = R.ifElse(R.isNil, R.nthArg(1), R.flip(R.merge(R.__)));

export default async function loadConfig(
	privilegeConfig?: Partial<Configuration>,
	configPath?: string
): Promise<Configuration> {
	const joycon = new JoyCon({
		files: [
			`${NAME}.config.js`,
			`${NAME}.config.json`,
			`${NAME}.config.yaml`,
			`${NAME}.config.yml`,
			`${NAME}.config.ts`
		],
		stopDir: homedir()
	});
	// YAML loader
	joycon.addLoader(JoyConYAMLLoader);

	// TypeScript loader
	try {
		const JoyConTSLoader = require('joycon-ts-loader');

		joycon.addLoader(JoyConTSLoader);
	} catch (_) {}

	let config: Configuration;
	if (configPath) {
		const configDir = resolve(dirname(configPath));
		const configFile = basename(configPath);
		const { data } = await joycon.load([configFile], configDir);

		config = nvl(data, {});
	} else {
		const { data } = await joycon.load();

		config = nvl(data, {});
	}

	config = ifMerge(privilegeConfig, config);

	return config;
}
