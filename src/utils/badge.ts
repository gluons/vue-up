import chalk from 'chalk';

export default function badge(text: string, color: string): string {
	text = text.toUpperCase();

	return chalk`{reset.inverse.bold.${color}  ${text} }`;
}
