module.exports = function(grunt) {
    grunt.initConfig({
        babel: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    "dist/index.js": "src/index.js"
                }
            }
        },
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    './dist/css/style.css': './src/css/style.scss'
                }
            }
        },
        browserify: {
          dist: {
            files: {
              './dist/bundle.js': ['./src/index.js']
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