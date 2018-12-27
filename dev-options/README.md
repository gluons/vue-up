---
sidebar: auto
prev: /configuration/
---

# Development Options

Options for `vue-up`'s development server.

> Using [webpack-dev-server](https://github.com/webpack/webpack-dev-server) under the hood.

## `entry` <Badge type='warn' text='Required'/>
**Type:** `string`

Path to entry file for development.

## `define`
**Type:** `{ [key: string]: any }`

Define global constants to apply at compile time.

::: tip
`process.env.NODE_ENV` is automatically defined to `development`.
:::

## `port`
**Type:** `number`  
**Default:** `8080`

Port of development server.

## `open`
**Type:** `boolean`  
**Default**: `true`

Open in browser when server run.

## `htmlTitle`
Type: `string`  
Default: `Vue Library`

Title of development page.
