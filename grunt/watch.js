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
			'<%= typescript.app.src %>',
			'./typings/**/*.d.ts'
		],
		tasks: ['scripts:app'],
		options: {
			spawn: true
		}
	},
	webapp: {
		files: [
			'<%= typescript.webapp.src %>',
			'./typings/**/*.d.ts'
		],
		tasks: ['scripts:webapp'],
		options: {
			spawn: true
		}
	},
	'markup-styles': {
		files: ['webapp/index.jade', 'webapp/includes/**/*.jade'],
		tasks: ['markup-styles'],
		options: {
			spawn: false
		}
	}
};
