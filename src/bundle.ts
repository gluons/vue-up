import del from 'del';
import { join } from 'path';
import { rollup } from 'rollup';

import createInputOptions from './createInputOptions';
import createOutputOptions from './createOutputOptions';
import Configuration, { ExternalOption } from './types/Configuration';
import fulfilConfig from './utils/fulfilConfig';

export { ExternalOption };

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

	const inputOptions = createInputOptions(entry, externals);
	const outputOptionsList = createOutputOptions({
		fileName,
		libraryName,
		outDir,
		sourceMap
	});

	const rollupBundle = await rollup(inputOptions);
	await Promise.all(outputOptionsList.map(outputOptions => rollupBundle.write(outputOptions)));
}
