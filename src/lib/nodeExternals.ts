import { IsExternal } from 'rollup';
import validateNPMPackageName from 'validate-npm-package-name';

import isNonEmptyArray from '../utils/isNonEmptyArray';

const nodeModulesRegex = /[\/\\]node_modules[\/\\]/;

/**
 * Options of `nodeExternals`.
 *
 * @export
 * @interface NodeExternalsOptions
 */
export interface NodeExternalsOptions {
	/**
	 * List of additional modules to exclude from bundle
	 *
	 * @type {(Array<string | RegExp>)}
	 * @memberof NodeExternalsOptions
	 */
	extra?: Array<string | RegExp>;
	/**
	 * Whitelist of modules to include in bundle (Don't treat as externals)
	 *
	 * @type {(Array<string | RegExp>)}
	 * @memberof NodeExternalsOptions
	 */
	whitelist?: Array<string | RegExp>;
}

/**
 * Create function to treat node modules as external to the bundle.
 *
 * @export
 * @returns {IsExternal}
 */
export default function nodeExternals(
	options: NodeExternalsOptions = {}
): IsExternal {
	const { extra, whitelist } = options;

	return (id: string): boolean => {
		// Don't exclude `whitelist` from bundle
		if (
			isNonEmptyArray(whitelist) &&
			whitelist.some(item =>
				typeof item === 'string' ? id === item : item.test(id)
			)
		) {
			return false;
		}

		// Node package name
		const validateResult = validateNPMPackageName(id);
		const isNPMPackage: boolean = validateResult.validForNewPackages;
		if (isNPMPackage) {
			return true;
		}

		// In `node_modules` directory
		const isInNodeModules = nodeModulesRegex.test(id);
		if (isInNodeModules) {
			return true;
		}

		// Also exclude `extra` from bundle
		if (
			isNonEmptyArray(extra) &&
			extra.some(item =>
				typeof item === 'string' ? id === item : item.test(id)
			)
		) {
			return true;
		}

		return false;
	};
}
