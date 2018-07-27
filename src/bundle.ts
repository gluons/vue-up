import del from 'del';
import nvl from 'nvl';
import { join } from 'path';
import { ModuleFormat, rollup, RollupSingleFileBuild } from 'rollup';

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

/**
 * Bundle Vue library.
 *
 * @export
 * @param {Configuration} options Options.
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

	// tslint:disable-next-line: no-unused-expression
	cleanOutDir && await del(join(outDir, '*'));

	const unminInputOptions = createInputOptions(entry, false, externals);
	const minInputOptions = createInputOptions(entry, true, externals);

	const unminBundle = await rollup(unminInputOptions);
	const minBundle = await rollup(minInputOptions);

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

	await Promise.all(unminList.map(writer(unminBundle)));
	await Promise.all(minList.map(writer(minBundle)));
}
