import Vue from 'vue';

import HelloPlugin from '@/index.ts';

Vue.use(HelloPlugin);

new Vue({
	el: '#app',
	render: h => h('hello')
});
