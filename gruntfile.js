module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        requirejs: {
            compile: {
                options: {
                    baseUrl: "js",
                    name: "main",
                    out: "build/main.js",
                    paths: {
                        moment: '../bower_components/moment/min/moment.min',
                        underscore: '../bower_components/underscore/underscore',
                        jquery: '../bower_components/jquery/jquery.min',
                        select2: '../bower_components/select2/select2',
                        'jquery-ui': '../bower_components/jquery-ui/ui/jquery-ui'
                    },
                    shim: {
                        select2: ['jquery']
                    }
                }
            }
        },
        stylus: {
            compile: {
                options: {
                    paths: ['js/**/*.styl']
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
                exclude: [
                    'js/text.js'
                ],
                directives: {
                    browser: true,
                    predef: [
                        'alert',
                        'define',
                        'require'
                    ],
                    nomen: true,
                    plusplus: true,
                    todo: true
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
                        'bower_components/moment/min/moment.min.js',

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

    grunt.registerTask('default', ['jslint', 'karma', 'stylus', 'requirejs']);
};