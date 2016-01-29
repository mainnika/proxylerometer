import * as SockJS from "sockjs-client";
import * as Angular from "angular";

import {Accelerometer, IMotionEvent} from "lib/accelerometer";

export class App {

	private _socket: __SockJSClient.SockJSClass;
	private _sensors: Accelerometer;

	constructor() {
		this._socket = new SockJS('/connect');
		this._sensors = new Accelerometer();

		this._sensors.on('motion', this.onMotion.bind(this));
	}

	private static vibrate(ms: number): boolean {
		return navigator['vibrate'](ms);
	}

	private onMotion(motion: IMotionEvent) {
		if (this._socket.readyState !== SockJS.OPEN) {
			return;
		}

		if (motion.y > 80) {
			App.vibrate(50);
		}

		this._socket.send(JSON.stringify(motion));
	}
}

export function start() {
	new App();
}