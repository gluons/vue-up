import { resolve } from 'path';

import bundle from '../dist/bundle';

bundle({
	entry: resolve(__dirname, '../test-fixture/src/index.ts'),
	libraryName: 'Hello',
	fileName: 'hello-plugin',
	path: resolve(__dirname, '../test-fixture/dist'),
	sourceMap: false
})
	.then(() => {
		console.log('Build success.');
	})
	.catch(err => {
		console.error(err);
	});
