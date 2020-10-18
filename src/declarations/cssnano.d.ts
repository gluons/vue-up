declare module 'cssnano' {
	import { AcceptedPlugin } from 'postcss';

	const plugin: (options: unknown) => AcceptedPlugin;

	export default plugin;
}
