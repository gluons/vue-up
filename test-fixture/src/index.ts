/// <reference path='./sfc.d.ts' />

import Vue from 'vue';

import Hello from './components/Hello.vue';

function install(vue: typeof Vue) {
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