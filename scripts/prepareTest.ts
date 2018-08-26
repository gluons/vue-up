import spawn from 'cross-spawn';
import { EOL } from 'os';
import { resolve } from 'path';

import badge from '../src/utils/badge';

const cliPath = resolve(__dirname, '../dist/cli.js');
const fixturePath = resolve(__dirname, '../test/fixture/');

const child = spawn('node', [cliPath, '-l', 'HelloPlugin'], {
	cwd: fixturePath,
	stdio: 'inherit'
});

child.on('close', code => {
	if (code === 0) {
		process.stdout.write(
			`${badge('Run CLI succeed.', 'green')}${EOL}`
		);
	} else {
		process.stderr.write(
			`${badge(`Run CLI fail. Exit with ${code}`, 'red')}${EOL}`
		);
	}
	process.exitCode = code;
});
child.on('error', err => {
	process.stderr.write(
		`${badge('Run CLI error.', 'red')}${EOL}`
	);
	console.error(err);
	process.exitCode = 1;
});
