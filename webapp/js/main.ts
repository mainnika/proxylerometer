///<reference path='../../typings/requirejs/require.d.ts' />
///<reference path='../../typings/angularjs/angular.d.ts' />

require.config({
	paths: {
		'jquery': 'dist/jquery/dist/jquery.min',
		'angular': 'dist/angular/angular.min',
		'bootstrap': 'dist/bootstrap/dist/js/bootstrap.min',
		'sockjs': 'dist/sockjs-client/dist/sockjs-1.0.3.min',
		'domReady': 'dist/domReady/domReady',
	},

	shim: {
		'angular': {
			exports: 'angular',
			deps: ['jquery', 'domReady']
		},
		'bootstrap': ['jquery']
	}
});

require(['angular', 'domReady', 'lib/app'], function (angular: ng.IAngularStatic, document, app) {

	console.log('watwat');
	console.log(app);

});