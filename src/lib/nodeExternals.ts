import { IsExternal } from 'rollup';
import validateNPMPackageName from 'validate-npm-package-name';

import isNonEmptyArray from '../utils/isNonEmptyArray';

const areRegExpsEqual = (a: RegExp, b: RegExp) => a.toString() === b.toString();
const contain = (items: Array<string | RegExp>, itemToFind: string | RegExp) =>
	items.some(item => {
		if (typeof itemToFind !== typeof item) {
			return false;
		}
		if (itemToFind instanceof RegExp && item instanceof RegExp) {
			return areRegExpsEqual(itemToFind, item);
		}

		return itemToFind === item;
	});

const nodeModulesRegex = /[\/\\]node_modules[\/\\]/;
const forceBundleModules = [
	/vue-runtime-helpers/,
	/vue-class-component/,
	/vue-property-decorator/
];

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
	options: NodeExternalsOptions = { extra: [], whitelist: [] }
): IsExternal {
	const { extra, whitelist } = options;

	// Always bundle these modules
	forceBundleModules.forEach(moduleRegEx => {
		if (!contain(whitelist, moduleRegEx)) {
			whitelist.push(moduleRegEx);
		}
	});

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
