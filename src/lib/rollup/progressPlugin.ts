import ora from 'ora';
import { Plugin } from 'rollup';

const spinner = ora();

export default function progressPlugin(): Plugin {
	return {
		name: 'progress',
		buildStart() {
			spinner.start('Start bundling...');
		},
		buildEnd(err) {
			if (err) {
				spinner.fail(err.toString());
			} else {
				spinner.succeed('Bundle succeed.');
			}
		},
		transform(_, id) {
			spinner.text = `Bundling ${id} ...`;

			return null;
		}
	};
}
