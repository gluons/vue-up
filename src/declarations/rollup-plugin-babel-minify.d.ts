declare module 'rollup-plugin-babel-minify' {
	import { Plugin } from 'rollup';

	const plugin: (options: unknown) => Plugin;

	export default plugin;
}
