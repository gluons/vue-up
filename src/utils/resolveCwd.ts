import { resolve } from 'path';

/**
 * Resolve path with current working directory.
 *
 * @export
 * @param {string} path Path
 * @returns {string}
 */
export default function resolveCwd(path: string): string {
	return resolve(process.cwd(), path);
}
