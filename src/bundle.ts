import del from 'del';
import nvl from 'nvl';
import { join } from 'path';
import { rollup, RollupSingleFileBuild } from 'rollup';

import createInputOptions from './createInputOptions';
import createOutputOptions from './createOutputOptions';
import { FormatInfo, moduleFormats, webFormats } from './lib/formats';
import { pluginState } from './lib/ProgressPlugin';
import verifyConfig from './lib/verifyConfig';
import Configuration, { ExternalOption } from './types/Configuration';
import fulfilConfig from './utils/fulfilConfig';
import loadConfig from './utils/loadConfig';
import logError from './utils/logError';

export { Configuration, ExternalOption };

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

	const newInputOptions = (minimize: boolean, isWeb = false) => {
		return createInputOptions({
			entry,
			minimize,
			fileName,
			alias,
			externals,
			replaceNodeEnv: isWeb
		});
	};

	try {
		cleanOutDir && await del(join(outDir, '*'), { dot: true });

		const moduleInputOptions = newInputOptions(false);
		const webUnminInputOptions = newInputOptions(false, true);
		const webMinInputOptions = newInputOptions(true, true);

		const [moduleBundle, webUnminBundle, webMinBundle] = await Promise.all([
			rollup(moduleInputOptions),
			rollup(webUnminInputOptions),
			rollup(webMinInputOptions)
		]);

		const writer = (bundle: RollupSingleFileBuild) => {
			return (formatInfo: FormatInfo) => {
				const { format, min } = formatInfo;
				const ext = format === 'iife' ? 'web' : format;
				const suffix = min ? `${ext}.min` : ext;

				const outputOptions = createOutputOptions({
					fileName,
					suffix,
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
			...webUnminFormats.map(writer(webUnminBundle)),
			...webMinFormats.map(writer(webMinBundle))
		]);
	} catch (err) {
		pluginState.hasError = true;

		logError(err);
	}
}
