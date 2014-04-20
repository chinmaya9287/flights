module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
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
        }
    });

    grunt.loadNpmTasks('grunt-jslint');

    grunt.registerTask('default', ['jslint']);
};