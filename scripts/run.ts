import { resolve } from 'path';

import bundle from '../dist/bundle';

const fixturePath = resolve(__dirname, '../test-fixture');

process.chdir(fixturePath);

bundle()
	.catch(err => {
		console.error(err);
	});
