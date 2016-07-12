
module.exports = (grunt) ->
    path = require 'path'
    require('load-grunt-tasks')(grunt)

    mountFolder = (connect, dir) ->
        connect.static path.resolve dir

    scriptFiles = 'app/scripts/**/*.coffee'

    grunt.initConfig
        coffee:
            compile:
                files: [
                    expand: true
                    cwd: 'app/scripts'
                    src: '**/*.coffee'
                    dest: '.tmp/scripts'
                    ext: '.js'
                ]
        connect:
            options:
                port: 9000
                hostname: 'localhost'
            livereload:
                options:
                    livereload: true
                    middleware: (connect) ->
                        [
                            mountFolder connect, '.tmp'
                            mountFolder connect, 'app'
                        ]
        clean:
            dev: '.tmp'
        watch:
            options:
                livereload: true
            scripts:
                files: scriptFiles
                tasks: [
                    'coffee'
                ]
            html:
                files: 'app/index.html'

    grunt.registerTask 'default', [
        'coffee'
        'connect'
        'watch'
    ]
