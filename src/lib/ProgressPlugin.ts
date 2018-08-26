import chalk from 'chalk';
import logUpdate from 'log-update';
import { relative } from 'path';
import { Plugin } from 'rollup';

import badge from '../utils/badge';
import { progress, start, success } from '../utils/emoji';

const { cyan, green, yellow } = chalk;

/**
 * Trim `\0` from file id.
 *
 * @param id File id
 */
const trim = (id: string) => id.replace(/\0/g, '').trim();

export const pluginState = {
	hasError: false
};

/**
 * A Rollup plugin for displaying the progress of Rollup.
 *
 * @export
 * @returns {Plugin}
 */
export default function ProgressPlugin(): Plugin {
	return {
		name: 'vue-up-progress-plugin',
		buildStart() {
			pluginState.hasError = false; // Reset state

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
			// Don't display success message when error found.
			if (!pluginState.hasError) {
				logUpdate(green(`${success} ${badge('success', 'green')} Bundle succeed.`));
			}
		}
	};
}
