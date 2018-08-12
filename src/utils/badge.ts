import chalk from 'chalk';

const textColor = 'black';

export default function badge(text: string, bgColor: string): string {
	text = text.toUpperCase();

	return chalk`{${textColor}.${bgColor}  ${text} }`;
}
