import del from 'del';
import nvl from 'nvl';
import { join } from 'path';
import { rollup, RollupBuild } from 'rollup';

import createInputOptions from './createInputOptions';
import createOutputOptions from './createOutputOptions';
import {
	FormatInfo,
	moduleFormats,
	ssrFormats,
	webFormats
} from './lib/formats';
import nodeExternals, { NodeExternalsOptions } from './lib/nodeExternals';
import { pluginState } from './lib/ProgressPlugin';
import verifyConfig from './lib/verifyConfig';
import Configuration, { ExternalOption } from './types/Configuration';
import fulfilConfig from './utils/fulfilConfig';
import loadConfig from './utils/loadConfig';
import logError from './utils/logError';

export { Configuration, ExternalOption, nodeExternals, NodeExternalsOptions };

/**
 * Bundle Vue library.
 *
 * @export
 * @param {Configuration} config Configuration
 * @returns
 */
export default async function bundle(config?: Configuration): Promise<void> {
	process.env.NODE_ENV = 'production';

	config = nvl(config, await loadConfig());
	config = fulfilConfig(config);

	verifyConfig(config);

	const {
		entry,
		fileName,
		libraryName,
		outDir,
		cleanOutDir,
		alias,
		define,
		sourceMap,
		externals,
		globals
	} = config;
	const { module: moduleExternals, web: webExternals } = externals;

	// Always include 'vue' in `externals` for web bundle
	if (Array.isArray(webExternals) && !webExternals.includes('vue')) {
		webExternals.push('vue');
	}

	const newInputOptions = (
		externals: ExternalOption,
		isWeb = false,
		minimize = false,
		ssr = false
	) =>
		createInputOptions({
			entry,
			minimize,
			ssr,
			fileName,
			alias,
			define,
			externals,
			isWeb
		});

	try {
		cleanOutDir && (await del(join(outDir, '*'), { dot: true }));

		const moduleInputOptions = newInputOptions(moduleExternals);
		const ssrInputOptions = newInputOptions(
			moduleExternals,
			false,
			false,
			true
		);
		const webUnminInputOptions = newInputOptions(webExternals, true);
		const webMinInputOptions = newInputOptions(webExternals, true, true);

		const [
			moduleBundle,
			ssrBundle,
			webUnminBundle,
			webMinBundle
		] = await Promise.all([
			rollup(moduleInputOptions),
			rollup(ssrInputOptions),
			rollup(webUnminInputOptions),
			rollup(webMinInputOptions)
		]);

		const writer = (bundle: RollupBuild) => (formatInfo: FormatInfo) => {
			const { format, suffix } = formatInfo;

			const outputOptions = createOutputOptions({
				fileName,
				suffix: nvl(suffix, format),
				format,
				libraryName,
				outDir,
				sourceMap,
				globals
			});

			return bundle.write(outputOptions);
		};

		const webUnminFormats = webFormats.filter(format => !format.min);
		const webMinFormats = webFormats.filter(format => format.min);

		await Promise.all([
			...moduleFormats.map(writer(moduleBundle)),
			...ssrFormats.map(writer(ssrBundle)),
			...webUnminFormats.map(writer(webUnminBundle)),
			...webMinFormats.map(writer(webMinBundle))
		]);
	} catch (err) {
		pluginState.hasError = true;

		logError(err);
	}
}
