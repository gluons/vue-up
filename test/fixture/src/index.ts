import Vue, { VueConstructor } from 'vue';

import Hello from '@comp/Hello.vue';

import '@/main.css';
import '@/secondary.scss';

const noop = (..._: any[]) => {};

function install(vue: VueConstructor<Vue>) {
	noop(HELLO);

	if (IS_WEB_BUNDLE) {
		noop('This will show only in web bundle.');
	}

	vue.component('Hello', Hello);
}

declare global {
	interface Window {
		Vue: typeof Vue;
	}
}
if ((typeof window !== 'undefined') && window.Vue) {
	install(window.Vue);
}

export default {
	install,
	components: {
		Hello
	}
};
