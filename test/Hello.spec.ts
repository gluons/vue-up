import { createLocalVue, mount } from '@vue/test-utils';

import HelloPlugin from '../test-fixture/dist/hello-plugin.cjs';

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

		expect(wraper.isVueInstance()).toBeTruthy();
		expect(wraper.is('#hello')).toBe(true);
		expect(wraper.find('#hello span').exists()).toBe(true);
		expect(wraper.text()).toEqual('Hello, World!');
	});
});
