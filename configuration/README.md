---
sidebar: auto
prev: /get-started/
---

# Configuration

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
