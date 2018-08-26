import chalk from 'chalk';

/**
 * Create CLI badge.
 *
 * @export
 * @param {string} text Badge text
 * @param {string} color Badge color
 * @returns {string}
 */
export default function badge(text: string, color: string): string {
	text = text.toUpperCase();

	return chalk`{reset.inverse.bold.${color}  ${text} }`;
}
