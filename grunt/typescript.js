'use strict';

module.exports = {
	app: {
		src: ['src/**/*.ts'],
		options: {
			references: [
				'typings/tsdapp.d.ts'
			],
			removeComments: true,
			//declaration: true,
			module: 'commonjs',
			target: 'es5',
			sourceMap: true
		}
	},
	webapp: {
		src: ['webapp/js/main.ts', 'webapp/js/lib/**/*.ts'],
		options: {
			references: [
				'typings/tsdweb.d.ts'
			],
			removeComments: true,
			//declaration: true,
			module: 'amd',
			target: 'es5',
			sourceMap: true
		}
	}
};
