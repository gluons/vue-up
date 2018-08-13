import { resolve } from 'path';

export default function resolvePath(path: string): string {
	return resolve(process.cwd(), path);
}
