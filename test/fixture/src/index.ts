import Vue, { VueConstructor } from 'vue';

import Hello from '@comp/Hello.vue';

import '@/main.css';

function install(vue: VueConstructor<Vue>) {
	console.log(HELLO);
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
