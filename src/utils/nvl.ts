import isset from './isset';

export default function nvl<T>(value: T, fallbackValue: T): T {
	return isset(value) ? value : fallbackValue;
}
