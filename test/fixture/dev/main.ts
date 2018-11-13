import Vue from 'vue';

import HelloPlugin from '../src/index';

Vue.use(HelloPlugin);

new Vue({
	el: '#app',
	render: h => h('hello')
});
