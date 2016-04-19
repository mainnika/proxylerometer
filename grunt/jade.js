'use strict';

module.exports = {
	'default': {
		options: {
			pretty: true,
			data: {
				debug: false,
				buildTimestamp: '<%= buildTimestamp %>'
			}
		},
		files: [{
            cwd: "frontend/jade",
            src: "**/*.jade",
            dest: "dist/web",
			ext: '.html',
			extDot: 'last',
			expand: true
		}]
	}
};
