import * as SockJS from "sockjs-client";

export class App {

	private _socket: __SockJSClient.SockJSClass;

	constructor() {
		this._socket = new SockJS('//localhost:9000/connect');
	}
}

export function start() {
	new App();
}