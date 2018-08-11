import del from 'del';
import nvl from 'nvl';
import { join } from 'path';
import R from 'ramda';
import { rollup, RollupFileOptions, RollupSingleFileBuild } from 'rollup';

import createInputOptions from './createInputOptions';
import createOutputOptions from './createOutputOptions';
import { FormatInfo, minifiedFormats, unminifiedFormats } from './lib/formats';
import LoadingIndicator from './lib/LoadingIndicator';
import Configuration, { ExternalOption } from './types/Configuration';
import fulfilConfig from './utils/fulfilConfig';

export { ExternalOption };

const loading = new LoadingIndicator();

/**
 * Bundle Vue library.
 *
 * @export
 * @param {Configuration} options Options
 * @returns
 */
export default async function bundle(config: Configuration): Promise<void> {
	config = fulfilConfig(config);

	const {
		entry,
		externals,
		fileName,
		libraryName,
		outDir,
		cleanOutDir,
		sourceMap
	} = config;

	const createInputOptionsInner: (minimize: boolean) => RollupFileOptions = R.pipe(
		R.assoc('minimize', R.__, {}),
		R.compose(
			createInputOptions,
			R.merge({ entry, fileName, externals })
		)
	);

	loading.start();

	try {
		cleanOutDir && await del(join(outDir, '*'));

		const unminInputOptions = createInputOptionsInner(false);
		const minInputOptions = createInputOptionsInner(true);

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

		loading.success('Bundle succeed.');
	} catch (err) {
		loading.error(err);
	} finally {
		loading.clear();
	}
}

module.exports = exports.default;
