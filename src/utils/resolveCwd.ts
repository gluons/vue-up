import { resolve } from 'path';

export default function resolveCwd(path: string): string {
	return resolve(process.cwd(), path);
}
