'use strict';

module.exports = {
	'scripts': [
		'typescript:app'
	],
	'scriptswebapp': [
		'typescript:webapp'
	],
	"markup": [
		"jade"
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
