'use strict';

module.exports = {
    'default': {
        files: [
            { expand: true, cwd: 'frontend/static', src: ['**'], dest: 'dist/web' },
        ],
    }
};
