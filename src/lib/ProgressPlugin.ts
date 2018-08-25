import chalk from 'chalk';
import logUpdate from 'log-update';
import { relative } from 'path';
import { Plugin } from 'rollup';

import badge from '../utils/badge';
import { progress, start, success } from '../utils/emoji';

const { cyan, green, yellow } = chalk;
const trim = (id: string) => id.replace(/\0/g, '').trim();

export default function ProgressPlugin(): Plugin {
	return {
		name: 'vue-up-progress-plugin',
		buildStart() {
			logUpdate(cyan(`${start} ${badge('pending', 'cyan')} Start bundling.`));
		},
		transform(_, id) {
			let finalId: string = trim(id);

			try {
				finalId = relative(process.cwd(), finalId);
			} catch (_) {}

			logUpdate(yellow(`${progress} ${badge('in progress', 'yellow')} Bundling "${finalId}" ...`));
		},
		generateBundle() {
			logUpdate(green(`${success} ${badge('success', 'green')} Bundle succeed.`));
		}
	};
}
