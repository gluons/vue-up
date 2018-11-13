import del from 'del';
import nvl from 'nvl';
import { join } from 'path';
import { rollup, RollupSingleFileBuild } from 'rollup';

import createInputOptions from './createInputOptions';
import createOutputOptions from './createOutputOptions';
import { FormatInfo, minifiedFormats, unminifiedFormats } from './lib/formats';
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

	const createInputOptionsOuter = (minimize: boolean) => {
		return createInputOptions({
			entry,
			minimize,
			fileName,
			alias,
			externals
		});
	};

	try {
		cleanOutDir && await del(join(outDir, '*'), { dot: true });

		const unminInputOptions = createInputOptionsOuter(false);
		const minInputOptions = createInputOptionsOuter(true);

		const [unminBundle, minBundle] = await Promise.all([
			rollup(unminInputOptions),
			rollup(minInputOptions)
		]);

		const writer = (bundle: RollupSingleFileBuild) => {
			return (formatInfo: FormatInfo) => {
				let { format, suffix } = formatInfo;
				suffix = nvl(suffix, format);

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

		await Promise.all([
			...unminifiedFormats.map(writer(unminBundle)),
			...minifiedFormats.map(writer(minBundle))
		]);
	} catch (err) {
		pluginState.hasError = true;

		logError(err);
	}
}
