import { join, resolve } from 'path';

import bundle from '../dist/bundle';

const fixturePath = resolve(__dirname, '../test-fixture');

process.chdir(fixturePath);

bundle({
	entry: join(fixturePath, 'src/index.ts'),
	libraryName: 'Hello',
	fileName: 'hello-plugin'
})
	.catch(err => {
		console.error(err);
	});
