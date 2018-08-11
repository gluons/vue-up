import chalkAnimation from 'chalk-animation';
import { Signale } from 'signale';

export default class LoadingIndicator {
	private _rainbow: any;
	private _interactive: Signale;
	private _awaitId: NodeJS.Timer;

	constructor() {
		this._rainbow = chalkAnimation.rainbow('Bundling...').stop();
		this._interactive = new Signale({
			interactive: true
		});
	}

	start(interval = 15) {
		const rainbow = this._rainbow;
		const interactive = this._interactive;

		this._awaitId = setInterval(() => {
			interactive.await(rainbow.frame().substring(11));
		}, interval);
	}

	success(msg: string) {
		this._interactive.success(msg);
		this.clear();
	}

	error(err: any) {
		this._interactive.error(err);
		this.clear();
	}

	clear() {
		clearInterval(this._awaitId);
	}
}
