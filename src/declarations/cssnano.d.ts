declare module 'cssnano' {
	import { AcceptedPlugin } from 'postcss';

	const plugin: (_options: unknown) => AcceptedPlugin;

	export default plugin;
}
