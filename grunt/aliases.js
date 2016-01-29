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
	"markup-styles": [
		"build-timestamp",
		"markup"
	],
	'default': [
		'concurrent'
	]
};
