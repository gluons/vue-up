import chalkAnimation from 'chalk-animation';
import del from 'del';
import nvl from 'nvl';
import { join } from 'path';
import { ModuleFormat, rollup, RollupSingleFileBuild } from 'rollup';
import { Signale } from 'signale';

import createInputOptions from './createInputOptions';
import createOutputOptions from './createOutputOptions';
import Configuration, { ExternalOption } from './types/Configuration';
import fulfilConfig from './utils/fulfilConfig';

export { ExternalOption };

type FormatList = {
	format: ModuleFormat,
	suffix?: string
};

const unminList: FormatList[] = [
	{
		format: 'cjs'
	},
	{
		format: 'es'
	},
	{
		format: 'iife',
		suffix: 'web'
	}
];
const minList: FormatList[] = [
	{
		format: 'iife',
		suffix: 'web.min'
	}
];

const rainbow = chalkAnimation.rainbow('Bundling...').stop();
const interactive = new Signale({
	interactive: true
});

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

	const awaitId = setInterval(() => {
		interactive.await(rainbow.frame().substring(11));
	}, 50);

	try {
		cleanOutDir && await del(join(outDir, '*'));

		const unminInputOptions = createInputOptions({
			entry,
			minimize: false,
			fileName,
			externals
		});
		const minInputOptions = createInputOptions({
			entry,
			minimize: true,
			fileName,
			externals
		});

		const [unminBundle, minBundle] = await Promise.all([
			rollup(unminInputOptions),
			rollup(minInputOptions)
		]);

		const writer = (bundle: RollupSingleFileBuild) => {
			return formatInfo => {
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
			...unminList.map(writer(unminBundle)),
			...minList.map(writer(minBundle))
		]);

		interactive.success('Bundle succeed.');
	} catch (err) {
		interactive.error(err);
	} finally {
		clearInterval(awaitId);
	}
}

module.exports = exports.default;
