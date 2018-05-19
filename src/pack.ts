import { ExternalOption, rollup } from 'rollup';

import createInputOptions from './createInputOptions';
import createOutputOptions from './createOutputOptions';

export { ExternalOption };

export interface PackOptions {
	entry: string;
	libraryName: string;
	fileName: string;
	path?: string;
	sourceMap?: boolean;
	externals?: ExternalOption;
}

export default async function pack(options: PackOptions) {
	const {
		entry,
		externals,
		fileName,
		libraryName,
		path,
		sourceMap
	} = options;

	const inputOptions = createInputOptions(entry, externals);
	const outputOptionsList = createOutputOptions({
		fileName,
		libraryName,
		outPath: path,
		sourceMap
	});

	const bundle = await rollup(inputOptions);
	await Promise.all(outputOptionsList.map(outputOptions => bundle.write(outputOptions)));

	return Promise.resolve();
}
