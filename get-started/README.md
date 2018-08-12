---
prev: /
next: /configuration/
---

# Get Started

Bundle your Vue.js library by following code ([TypeScript](https://www.typescriptlang.org/)) .

```ts
import bundle, { Configuration } from '@gluon/vue-up';

const config: Configuration = {
	entry: './src/index.ts',
	libraryName: 'MyVuePlugin',
	fileName: 'my-vue-plugin'
};

bundle(config)
	.then(() => {
		console.log('Bundle succeed.');
	})
	.catch(err => {
		console.error(err);
	});
```

After run it, you will get 4 bundled files at `dist` directory.
- `[filename].cjs.js` for CommonJS
- `[filename].es.js` for ES module
- `[filename].web.js` for non-minified web
- `[filename].web.min.js` for minified web
