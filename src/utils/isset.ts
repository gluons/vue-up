export default function isset(value: any): boolean {
	return (typeof value !== 'undefined') && (value != null);
}
