module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        requirejs: {
            compile: {
                options: {
                    baseUrl: "js",
                    name: "main",
                    out: "build/main.js"
                }
            }
        },
        stylus: {
            compile: {
                options: {
                    paths: ['js/**/*.styl']
//                    urlfunc: 'embedurl', // use embedurl('test.png') in our code to trigger Data URI embedding
//                    use: [
//                        require('fluidity') // use stylus plugin at compile time
//                    ],
//                    import: [      //  @import 'foo', 'bar/moo', etc. into every .styl file
//                        'foo',       //  that is compiled. These might be findable based on values you gave
//                        'bar/moo'    //  to `paths`, or a plugin you added under `use`
//                    ]
                },
                files: {
                    'build/main.css': ['js/**/*.styl']
                }
            }
        },
        jslint: {
            client: {
                src: [
                    'js/**/*.js'
                ],
                directives: {
                    browser: true,
                    predef: [
                        'jQuery'
                    ]
                },
                options: {
                    junit: 'out/client-junit.xml'
                }
            }
        },
        karma: {
            unit: {
                frameworks: ['mocha'],
                options: {
                    files: ['test/**/*.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', ['jslint', 'karma', 'stylus']);
};