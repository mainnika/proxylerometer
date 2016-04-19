'use strict';

module.exports = {

    backend: {
        src: [
            'typings/main.d.ts',
            'backend/**/*.ts',
        ],
        outDir: "dist/srv",
        options: {
            target: 'ES6',
            sourceMap: true,
            module: 'commonjs',
            verbose: true,
            compiler: './node_modules/typescript/lib/tsc.js'
        }
    },

    frontend: {
        src: [
            'frontend/ts/**/*.ts',
            'typings/browser.d.ts'
        ],
        out: 'dist/web/js/app.js',
        options: {
            target: 'ES5',
            sourceMap: true,
            module: 'system',
            verbose: true,
            compiler: './node_modules/typescript/lib/tsc.js'
        }
    }
};
