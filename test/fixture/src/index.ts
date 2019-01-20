import Vue, { VueConstructor } from 'vue';

import Hello from '@comp/Hello.vue';

import '@/main.css';
import '@/secondary.scss';

function install(vue: VueConstructor<Vue>) {
	console.log(HELLO);

	if (IS_WEB_BUNDLE) {
		console.log('This will show only in web bundle.');
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
