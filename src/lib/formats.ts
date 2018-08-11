import { ModuleFormat } from 'rollup';

export interface FormatInfo {
	format: ModuleFormat;
	suffix?: string;
}

export const unminifiedFormats: FormatInfo[] = [
	{
		format: 'cjs'
	},
	{
		format: 'es'
	},
	{
		format: 'iife',
		suffix: 'web'
	}
];

export const minifiedFormats: FormatInfo[] = [
	{
		format: 'iife',
		suffix: 'web.min'
	}
];
