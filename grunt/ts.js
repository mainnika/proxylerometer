'use strict';

module.exports = {

    app: {
        src: [
            'typings/main.d.ts',
            'src/**/*.ts',
        ],
        options: {
            target: 'ES6',
            sourceMap: true,
            module: 'commonjs',
            verbose: true,
            compiler: './node_modules/typescript/lib/tsc.js'
        }
    },

    webapp: {
        src: [
            'webapp/js/main.ts',
            'webapp/js/lib/**/*.ts',
            'typings/browser.d.ts'
        ],
        out: 'webapp/js/dist/app.js',
        options: {
            target: 'ES5',
            sourceMap: true,
            module: 'system',
            verbose: true,
            compiler: './node_modules/typescript/lib/tsc.js'
        }
    }
};
