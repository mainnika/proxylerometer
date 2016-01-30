///<reference path='../../typings/requirejs/require.d.ts' />
///<reference path='../../typings/angularjs/angular.d.ts' />

require.config({
	paths: {
		'jquery': `dist/jquery/dist/jquery.min.js?${window['buildTimestamp']}`,
		'angular': `dist/angular/angular.min.js?${window['buildTimestamp']}`,
		'angular-router': `dist/angular-ui-router/release/angular-ui-router.min.js?${window['buildTimestamp']}`,
		'bootstrap': `dist/bootstrap/dist/js/bootstrap.min.js?${window['buildTimestamp']}`,
		'sockjs-client': `dist/sockjs-client/dist/sockjs-1.0.3.min.js?${window['buildTimestamp']}`,
		'domReady': `dist/domReady/domReady.js?${window['buildTimestamp']}`,
		'wolfy87-eventemitter': `dist/eventEmitter/EventEmitter.min.js?${window['buildTimestamp']}`,
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

require(['angular', 'angular-router', 'domReady!', 'lib/app'], function (angular, router, document, app) {

	navigator['vibrate'] = navigator['vibrate'] ||
		navigator['webkitVibrate'] ||
		navigator['mozVibrate'] ||
		navigator['msVibrate'];

	app.start();
});