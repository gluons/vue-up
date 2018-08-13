import spawn from 'cross-spawn';
import { resolve } from 'path';

const cliPath = resolve(__dirname, '../dist/cli.js');
const fixturePath = resolve(__dirname, '../test-fixture');

const child = spawn('node', [cliPath], {
	cwd: fixturePath,
	stdio: 'inherit'
});

child.on('close', code => {
	console.log(`Run CLI success. Exit with ${code}.`);
});
child.on('error', err => {
	console.log(`End with error.`);
	console.error(err);
});
