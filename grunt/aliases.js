'use strict';

module.exports = {
    'compile': [
        'ts:app',
        'ts:webapp'
    ],
    
	'scripts': [
		'ts:app'
	],
	'scriptswebapp': [
		'ts:webapp'
	],
	"markup": [
		"jade:webapp"
	],
	"styles": [
		"sass-build-timestamp",
		"sass"
	],
	"markup-styles": [
		"build-timestamp",
		"markup",
		"styles"
	],
	'default': [
		'concurrent'
	]
};
