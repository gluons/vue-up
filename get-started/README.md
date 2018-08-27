---
prev: /
next: /configuration/
---

# Get Started

## CLI (Preferred)

Add `vue-up` command in `package.json`'s `scripts`.

```json{4-5}
{
	"name": "my-vue-library",
	"scripts": {
		"build": "vue-up",
		"dev": "vue-up dev"
	},
	"devDependencies": {
		"@gluons/vue-up": "*"
	}
}
```

Add [config](/configuration/) file.

**`vue-up.config.js`**

```js
module.exports = {
	entry: './src/index.ts',
	libraryName: 'MyVuePlugin'
};
```

Then run `build` to bundle your library!

```bash
npm run build
# or
yarn build
```

Or run `dev` to start development server.

```bash
npm run dev
# or
yarn dev
```

After run `build` it, you will get 4 bundled files at `dist` directory.
- `[filename].cjs.js` for CommonJS
- `[filename].es.js` for ES module
- `[filename].web.js` for non-minified web
- `[filename].web.min.js` for minified web

## Node API

Bundle your Vue.js library by following code ([TypeScript](https://www.typescriptlang.org/)) .

```ts
import bundle, { Configuration } from '@gluon/vue-up';

const config: Configuration = {
	entry: './src/index.ts',
	libraryName: 'MyVuePlugin'
};

bundle(config)
	.then(() => {
		console.log('Bundle succeed.');
	})
	.catch(err => {
		console.error(err);
	});
```
