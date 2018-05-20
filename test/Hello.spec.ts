import { createLocalVue, mount } from '@vue/test-utils';
import { ComponentOptions } from 'vue';

import HelloPlugin from '../test-fixture/dist/hello-plugin.cjs';

const localVue = createLocalVue();
localVue.use(HelloPlugin);

describe('Components', () => {
	test('should have expect Hello component', () => {
		const wraper = mount(
			{ template: '<Hello/>' },
			{
				localVue
			}
		);

		expect(wraper.isVueInstance()).toBeTruthy();
	});
});
