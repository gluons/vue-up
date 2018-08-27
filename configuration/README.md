---
sidebar: auto
prev: /get-started/
next: /dev-options/
---

# Configuration

`vue-up` uses [JoyCon](https://github.com/egoist/joycon) to load configuration file.

These is config files that will be loaded in `vue-up`:
- `vue-up.config.js`
- `vue-up.config.json`
- `vue-up.config.yaml`
- `vue-up.config.yml`
- `vue-up.config.ts`

> `.yaml`, `.yml` are loaded by [joycon-yaml-loader](https://github.com/gluons/joycon-yaml-loader)  
   `.ts` is loaded by [joycon-ts-loader](https://github.com/gluons/joycon-ts-loader)

## `entry` <Badge text="Required" type="warn"/>
**Type:** `string`

Bundle's entry point.

## `libraryName` <Badge text="Required" type="warn"/>
**Type:** `string`

Library's name.

## `fileName`
**Type:** `string`

Name of output bundled files (without extension).

::: tip
If it isn't provided, `vue-up` will generate file name from [`libraryName`](#libraryname) by [slugify](https://github.com/sindresorhus/slugify).
:::

## `outDir`
**Type:** `string`  
**Default:** `dist`

Output directory.

## `cleanOutDir`
**Type:** `boolean`  
**Default:** `true`

Clean output directory before bundling.

## `sourceMap`
**Type:** `boolean`  
**Default:** `true`

Use source map?

## `externals`
**Type:** `ExternalOption`  
**Default:** `['vue']`

External dependencies. (Rollup's [`external`](https://rollupjs.org/guide/en#external-e-external))

## `dev`
**Type:** [`DevOptions`](/dev-options/)

Options for development server.
