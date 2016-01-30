import * as angular from "angular";
import * as sockjs from "sockjs-client";

import {App} from "lib/app";

export class Login {

	private _app: App;
	private _scope;

	constructor(app: App) {

		this._app = app;

		angular.module('gamepad-app').controller('loginCtrl', ['$scope', '$rootScope', '$state', ($scope, $rootScope, $state) => {

			this._scope = $scope;

			//$scope.sid
			$scope.app = app;
			$scope.join = this.join.bind(this);
		}])
	}

	private join() {
		if (typeof this._scope.sid !== 'number')
			return;

		this._app.join(this._scope.sid);
	}

	//public
}