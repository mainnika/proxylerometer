'use strict';

module.exports = {
	grunt: {
		files: ['Gruntfile.js', 'grunt/*.js'],
		options: {
			reload: true
		}
	},
	app: {
		files: [
			'<%= ts.app.src %>',
			'./typings/**/*.d.ts'
		],
		tasks: ['scripts'],
		options: {
			spawn: true
		}
	},
	webapp: {
		files: [
			'<%= ts.webapp.src %>',
			'./typings/**/*.d.ts'
		],
		tasks: ['scriptswebapp'],
		options: {
			spawn: true
		}
	},
	'markup-styles': {
		files: ['webapp/index.jade', 'webapp/includes/**/*.jade', 'webapp/css/**/*.scss'],
		tasks: ['markup-styles'],
		options: {
			spawn: false
		}
	}
};
