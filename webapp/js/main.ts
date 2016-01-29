///<reference path='../../typings/requirejs/require.d.ts' />
///<reference path='../../typings/angularjs/angular.d.ts' />

require.config({
	paths: {
		'jquery': `dist/jquery/dist/jquery.min.js?${window['buildTimestamp']}`,
		'angular': `dist/angular/angular.min.js?${window['buildTimestamp']}`,
		'angular-router': `dist/angular-ui-router/release/angular-ui-router.min.js?${window['buildTimestamp']}`,
		'bootstrap': `dist/bootstrap/dist/js/bootstrap.min.js?${window['buildTimestamp']}`,
		'sockjs': `dist/sockjs-client/dist/sockjs-1.0.3.min.js?${window['buildTimestamp']}`,
		'domReady': `dist/domReady/domReady.js?${window['buildTimestamp']}`,
	},

	shim: {
		'angular': {
			exports: 'angular',
			deps: ['jquery', 'domReady!']
		},
		'angular-router': ['angular'],
		'bootstrap': ['jquery']
	}
});

require(['angular', 'domReady!', 'lib/app'], function (angular, document, app) {

	angular.module('gamepad-app', []);
	angular.bootstrap(document, ['gamepad-app']);
});