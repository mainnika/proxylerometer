'use strict';

var exec = require('child_process').exec;

module.exports = function (grunt) {
	require('load-grunt-tasks')(grunt);
	require('load-grunt-config')(grunt);

	grunt.registerTask('build-timestamp', function () {
		grunt.config.merge({
			'buildTimestamp': Date.now()
		});
	});

	//grunt.registerTask('build-revision', function () {
	//	var done = this.async();
	//
	//	exec('git rev-parse HEAD', function (err, stdout, stderr) {
	//		if (err !== null) {
	//			grunt.log.error('.build-revision: ' + err);
	//		}
	//		else {
	//			grunt.file.write('.build-revision', stdout);
	//		}
	//
	//		done();
	//	});
	//});
};
