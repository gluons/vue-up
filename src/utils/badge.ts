import chalk from 'chalk';

export default function badge(text: string, bgColor: string, color = 'white'): string {
	text = text.toUpperCase();

	return chalk`{${color}.${bgColor}  ${text} }`;
}
