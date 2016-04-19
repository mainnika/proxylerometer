import * as SockJS from "sockjs-client";
import * as Angular from "angular";

import {Login as LoginCtrl} from "./ctrls/login";
import {Game as GameCtrl} from "./ctrls/game";
import {IMotionEvent} from "./accelerometer";

export enum State {
	INIT = 0,
	CONNECTING,
	CONNECTED,
	JOINING,
	JOINED,
}

export class App {

	private _socket: __SockJSClient.SockJSClass;

	private _loginCtrl: LoginCtrl;
	private _gameCtrl: GameCtrl;

	private _root;
	private _state: State;

	constructor() {

		console.log(`App created`);

		this.onDisconnect();

		angular.module('gamepad-app', ['ui.router']);

		this._loginCtrl = new LoginCtrl(this);
		this._gameCtrl = new GameCtrl(this);

		angular.module('gamepad-app').config(['$urlRouterProvider', '$stateProvider', '$httpProvider', ($urlRouterProvider, $stateProvider, $httpProvider) => {

				$urlRouterProvider.otherwise("/login");

				$stateProvider
					.state('login', {
						url: "/login",
						templateUrl: "includes/login.html",
					})
					.state('game', {
						url: "/game",
						templateUrl: "includes/game.html",
					});
			}])
			.run(['$rootScope', '$state', '$location', '$urlRouter', ($rootScope, $state, $location, $urlRouter) => {
				$rootScope.$state = $state;
				$rootScope.$app = this;

				this._root = $rootScope;
			}]);

		angular.bootstrap(document, ['gamepad-app']);
	}

	private onConnected() {

		this.State = State.CONNECTED;
		console.log(`Socket connected!`);
	}

	private onDisconnect() {

		this.State = State.CONNECTING;
		this._socket = new SockJS('/connect');
		this._socket.onopen = this.onConnected.bind(this);
		this._socket.onmessage = this.onMessage.bind(this);
		this._socket.onclose = this.onDisconnect.bind(this);
		console.log(`Socket reconnectring`);
	}

	private onMessage(message) {

		try {
			var obj: any = JSON.parse(message.data);
		}
		catch (err) {
			console.log(`Received malformed packet`);
			return;
		}

		switch (true) {
			case (obj.joined !== undefined):
				this.onJoined(obj.join);
				break;

			case (obj.kicked !== undefined):
				this.onKicked(obj.kicked);
				break;

			case (obj.error !== undefined):
				console.log(`Received error: ${obj.error}`);
				break;

			default:
				console.log(`Received malformed packet`);
				return;
		}
	}

	public onMotion(motion: IMotionEvent) {

		if (this.State !== State.JOINED) {
			return;
		}

		this._socket.send(JSON.stringify({
			input: motion
		}));
	}

	public onFire() {

		console.log('Fire');

		if (this.State !== State.JOINED) {
			return;
		}

		this._socket.send(JSON.stringify({
			fire: true
		}));
	}

	private onJoined(id) {

		this.State = State.JOINED;
		this._root.$state.go('game');
		console.log(`Joined to session ${id}`);
	}

	private onKicked(id) {

		this.State = State.CONNECTED;
		this._root.$state.go('login');
		console.log(`Kicked from session ${id}`);
	}

	public get State(): State {

		return this._state;
	}

	public set State(state: State) {

		this._state = state;

		if (state === State.JOINED) {
			this._root.$state.go('game');
		}

		//if (state === State.CONNECTING) {
		//	this._root.$state.go('login');
		//}
	}

	public join(id: number) {

		this.State = State.JOINING;
		this._socket.send(JSON.stringify({
			join: id
		}));
		console.log(`Joining session ${id}`);
	}

	public changeCtrl(ctrl: string) {
		this._root.$state.go(ctrl);
	}
}

export function start() {
	new App();
}