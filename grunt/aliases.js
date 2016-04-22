'use strict';

module.exports = {
	'backend': [
		'ts:backend'
	],
    'test': [
        'ts:test'
    ],
    'frontend': [
        'ts:frontend'
    ],
    'html': [
		'build-timestamp',
		'jade'
    ],
	'styles': [
		'sass-build-timestamp',
		'sass',
	],
    'static': [
        'copy'
    ],
	'default': [
		'concurrent'
	]
};
