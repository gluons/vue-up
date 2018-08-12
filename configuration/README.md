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

## `fileName` <Badge text="Required" type="warn"/>
**Type:** `string`

Bundle file's name.

::: tip
Don't need extension. Just file's name.
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
