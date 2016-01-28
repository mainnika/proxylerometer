'use strict';

module.exports = {
	grunt: {
		files: ['Gruntfile.js', 'grunt/*.js'],
		options: {
			reload: true
		}
	},
	scripts: {
		files: [
			'<%= typescript.app.src %>',
			'<%= typescript.webapp.src %>',
			'./typings/**/*.d.ts',
		],
		tasks: ['scripts'],
		options: {
			spawn: true
		}
	}
};
