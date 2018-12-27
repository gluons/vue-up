import del from 'del';
import nvl from 'nvl';
import { join } from 'path';
import { rollup, RollupSingleFileBuild } from 'rollup';

import createInputOptions from './createInputOptions';
import createOutputOptions from './createOutputOptions';
import { FormatInfo, moduleFormats, ssrFormats, webFormats } from './lib/formats';
import nodeExternals from './lib/nodeExternals';
import { pluginState } from './lib/ProgressPlugin';
import verifyConfig from './lib/verifyConfig';
import Configuration, { ExternalOption } from './types/Configuration';
import fulfilConfig from './utils/fulfilConfig';
import loadConfig from './utils/loadConfig';
import logError from './utils/logError';

export {
	Configuration,
	ExternalOption,
	nodeExternals
};

/**
 * Bundle Vue library.
 *
 * @export
 * @param {Configuration} config Configuration
 * @returns
 */
export default async function bundle(config?: Configuration): Promise<void> {
	config = nvl(config, await loadConfig());
	config = fulfilConfig(config);

	verifyConfig(config);

	const {
		entry,
		externals,
		fileName,
		libraryName,
		outDir,
		cleanOutDir,
		alias,
		sourceMap
	} = config;
	const { module: moduleExternals, web: webExternals } = externals;

	const newInputOptions = (
		externals: ExternalOption,
		minimize = false,
		ssr = false
	) => {
		return createInputOptions({
			entry,
			minimize,
			ssr,
			fileName,
			alias,
			externals
		});
	};

	try {
		cleanOutDir && await del(join(outDir, '*'), { dot: true });

		const moduleInputOptions = newInputOptions(moduleExternals);
		const ssrInputOptions = newInputOptions(moduleExternals, false, true);
		const webUnminInputOptions = newInputOptions(webExternals);
		const webMinInputOptions = newInputOptions(webExternals, true);

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

		const writer = (bundle: RollupSingleFileBuild) => {
			return (formatInfo: FormatInfo) => {
				const { format, suffix } = formatInfo;

				const outputOptions = createOutputOptions({
					fileName,
					suffix: nvl(suffix, format),
					format,
					libraryName,
					outDir,
					sourceMap
				});

				return bundle.write(outputOptions);
			};
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
