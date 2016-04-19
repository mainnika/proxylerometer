'use strict';

module.exports = {
	options: {
		//'no-write': true
	},

	app: [
		'src/**/*.js',
		'src/**/*.js.map'
	],

	webapp: [
		'webapp/js/main.js',
		'webapp/js/main.js.map',
		'webapp/js/lib/**/*.js',
		'webapp/js/lib/**/*.js.map',
		'webapp/index.html',
		'webapp/includes/**/*.html',        
	]
};
