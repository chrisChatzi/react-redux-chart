module.exports = function(grunt) {
    grunt.initConfig({
        babel: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    "example/dist/index.js": "example/src/index.js"
                }
            }
        },
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    './example/dist/css/style.css': './example/src/css/style.scss'
                }
            }
        },
        browserify: {
          dist: {
            files: {
              './example/dist/bundle.js': ['./example/src/index.js']
            },
            options: {
                transform: [
                    [
                        'babelify', 
                        {
                            'presets': ["react", "es2015"]
                        }
                    ]
                ]
            }
          }
        },
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-sass');

    grunt.registerTask("default", ['sass', "browserify"]);
};