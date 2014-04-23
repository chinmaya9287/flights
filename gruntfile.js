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
                frameworks: [
                    'chai',
                    'mocha',
                    'sinon'
                ],
                options: {
                    files: [
                        'bower_components/requirejs/require.js',
                        'node_modules/karma-requirejs/lib/adapter.js',

                        'bower_components/jquery/jquery.js',
                        {pattern: 'node_modules/chai-jquery/chai-jquery.js', included: false},

                        'bower_components/jquery-ui/ui/jquery-ui.js',
                        'bower_components/select2/select2.js',
                        'bower_components/underscore/underscore.js',

                        {pattern: 'js/**/*.html', included: false},
                        {pattern: 'js/**/*.js', included: false},
                        {pattern: 'test/**/*.spec.js', included: false},

                        'test/main-test.js'
                    ],
                    exclude: [
                        'js/main.js'
                    ],
                    reporters: ['progress'],
                    port: 9999,
                    colors: true,
//                    logLevel: config.LOG_ERROR,
                    autoWatch: false,
                    browsers: ['PhantomJS'],
                    captureTimeout: 6000,
                    singleRun: true
                }
            }
        },
        watch: {
            scripts: {
                files: ['js/**/*.styl'],
                tasks: ['stylus'],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', ['karma', 'stylus']);
};