import * as angular from "angular";
import {Accelerometer, IMotionEvent} from "../accelerometer";
import {App, State} from "../app";

export class Game {

	private _app: App;
	private _sensors: Accelerometer;

	constructor(app: App) {

		this._app = app;

		angular.module('gamepad-app').controller('gameCtrl', ['$scope', ($scope) => {

			$scope.$app = this._app;

			$scope.fire = this._app.onFire.bind(this._app);

			if (this._app.State != State.JOINED) {
				this._app.changeCtrl('login');
			}
		}]);

		this._sensors = new Accelerometer();
		this._sensors.on('motion', this._app.onMotion.bind(this._app));
	}
}