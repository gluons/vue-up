import Vue from 'vue';
import { createLocalVue, mount } from '@vue/test-utils';

import HelloPlugin from './fixture/dist/hello-plugin.cjs';

const localVue = createLocalVue();
localVue.use(HelloPlugin);

describe('Components', () => {
	test('should get an expect Hello component', () => {
		const wraper = mount(
			{ template: '<Hello/>' },
			{
				localVue
			}
		);

		expect(wraper.vm instanceof Vue).toBe(true);
		expect(wraper.attributes('id')).toBe('hello');
		expect(wraper.find('#hello span').exists()).toBe(true);
		expect(wraper.text()).toEqual('Hello, World!');
	});
});
