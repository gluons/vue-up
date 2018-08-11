declare module 'chalk-animation' {
	export interface CurrentAnimation {
		render: () => void;
		frame: () => string;
		stop: () => this;
		start: () => this;
	}
	export interface ChalkAnimation {
		rainbow: (str: string, speed?: number) => CurrentAnimation;
	}

	const chalkAnimation: ChalkAnimation;

	export default chalkAnimation;
}

