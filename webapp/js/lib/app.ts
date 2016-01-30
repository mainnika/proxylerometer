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
		this._socket.onopen = this.onConnected.bind(this);
	}

	private static vibrate(ms: number): boolean {
		return navigator['vibrate'](ms);
	}

	private onConnected() {

		let id = window.location.hash.substr(1);

		if (!id)
			return;

		alert(id);

		this._socket.send(JSON.stringify({
			join: id
		}))
	}

	private onMotion(motion: IMotionEvent) {
		if (this._socket.readyState !== SockJS.OPEN) {
			return;
		}

		if (motion.y > 80) {
			App.vibrate(50);
		}

		this._socket.send(JSON.stringify({
			input: motion
		}));
	}
}

export function start() {
	new App();
}