/**
 * @jest-environment node
 */

import { renderToString } from '@vue/server-test-utils';
import { createLocalVue } from '@vue/test-utils';
import cheerio from 'cheerio';

import HelloPlugin from './fixture/dist/hello-plugin.ssr';

const localVue = createLocalVue();
localVue.use(HelloPlugin);

const App = localVue.extend({
	template: '<Hello/>'
});

describe('Components', () => {
	test('should get an expect Hello component', async () => {
		const renderedString = await renderToString(App, {
			localVue
		});
		const $ = cheerio.load(renderedString);

		expect($('#hello span').length).toBeGreaterThan(0);
		expect($('#hello span').text()).toEqual('Hello, World!');
	});
});
