'use strict';
var LIVERELOAD_PORT = 35729;
var SERVER_PORT = 9000;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};
// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'
// templateFramework: 'lodash'

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // configurable paths
    var yeomanConfig = {
        app: 'source',
        dist: 'dist'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
            options: {
                nospawn: true,
                livereload: false
            },
            coffee: {
                files: ['<%= yeoman.app %>/coffee/**/**/*.coffee'],
                tasks: ['coffee:dist']
            },
            compass: {
                files: ['<%= yeoman.app %>/scss/{,*/}*.{scss,sass}'],
                tasks: ['compass:dist']
            },
            handlebars: {
                files: ['<%= yeoman.app %>/template/{,*/}*.hbs'],
                tasks: ['handlebars:test','uglify:cmdhandlebars']
            }
        },
        connect: {
            options: {
                port: grunt.option('port') || SERVER_PORT,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            test: {
                options: {
                    port: 9001,
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, 'tmp'),
                            mountFolder(connect, yeomanConfig.app+'/test')
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, yeomanConfig.dist)
                        ];
                    }
                }
            }
        },
        clean: {
            tmp: 'tmp/*'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js',
                '!<%= yeoman.app %>/scripts/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://localhost:<%= connect.test.options.port %>/test.html']
                }
            }
        },
        coffee: {
            dist: {
                files: [{
                    // rather than compiling multiple files here you should
                    // require them into your main .coffee file
                    expand: true,
                    cwd: '<%= yeoman.app %>/coffee/module',
                    src: '**/*.coffee',
                    dest: '../js/module',
                    ext: '.js'
                }]
            },
            test: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/test',
                    src: '{,*/}*.coffee',
                    dest: 'tmp/test',
                    ext: '.js'
                }]
            }
        },
        compass: {
            dist: {
                options :{
                    sassDir: '<%= yeoman.app %>/scss',
                    cssDir: '../css'
                }
            },
            test: {
                options: {
                    sassDir: '<%= yeoman.app %>/scss',
                    cssDir: 'tmp/css'
                }
            }
        },
        // uglify: {
        //     dist: {}
        // },
        // useminPrepare: {
        //     html: '<%= yeoman.app %>/index.html',
        //     options: {
        //         dest: '<%= yeoman.dist %>'
        //     }
        // },
        // usemin: {
        //     html: ['<%= yeoman.dist %>/{,*/}*.html'],
        //     css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
        //     options: {
        //         dirs: ['<%= yeoman.dist %>']
        //     }
        // },
        // cssmin: {
        //     dist: {
        //         files: {
        //             '<%= yeoman.dist %>/styles/main.css': [
        //                 '.tmp/styles/{,*/}*.css',
        //                 '<%= yeoman.app %>/styles/{,*/}*.css'
        //             ]
        //         }
        //     }
        // },
        /*htmlmin: {
            dist: {
                options: {
                    removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>',
                    src: '*.html',
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },*/
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,txt}',
                        'images/{,*/}*.{webp,gif}',
                        'styles/fonts/{,*/}*.*',
                        'bower_components/sass-bootstrap/fonts/*.*'
                    ]
                }, {
                    src: 'node_modules/apache-server-configs/dist/.htaccess',
                    dest: '<%= yeoman.dist %>/.htaccess'
                }]
            }
        },
        handlebars: {
            test: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/template/',
                    src: ['**/*.hbs'],
                    dest: 'tmp/template',
                    ext: '.js',
                    rename: function(src,dest) {
                        return src+'/'+dest.match(/[\w-]+/)+'.js';
                    }
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/template/',
                    src: ['**/*.hbs'],
                    dest: '../js/template',
                    ext: '.js',
                    rename: function(src,dest) {
                        return src+'/'+dest.match(/[\w-]+/)+'.js';
                    }
                }]
            }
        },
        uglify: {
            options: {
                banner: '(function() { define(function(require, exports, module) { require(\'handlebars\');',
                footer: '});}).call(this);'
            },
            cmdhandlebars: {
                files:  [{
                    expand: true,
                    cwd: 'tmp/template/',
                    src: ['*.js'],
                    dest: '../js/template',
                    ext: '.js',
                }]
            }
        }
        // transport: {
        //   options: {
        //     debug: false,
        //     paths: ['../js']
        //   },
        //   page: {
        //     options: {
        //       idleading: 'module/',  // 构建后id前缀，根据实际情况指定
        //       alias: {
        //         'handlebars': 'handlebars.runtime.min'
        //       }
        //     },
        //     files: [{
        //       expand: true,
        //       cwd: 'page',
        //       src: '*.js',
        //       filter: function(filepath){
        //         return grunt.file.exists('.build/' + filepath);
        //       },
        //       dest: '.build/page'
        //     }]
        //   }
        // }
        //,
        // rev: {
        //     dist: {
        //         files: {
        //             src: [
        //                 '<%= yeoman.dist %>/scripts/{,*/}*.js',
        //                 '<%= yeoman.dist %>/styles/{,*/}*.css',
        //                 '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
        //                 '/styles/fonts/{,*/}*.*',
        //                 'bower_components/sass-bootstrap/fonts/*.*'
        //             ]
        //         }
        //     }
        // }
    });

    // grunt.registerTask('createDefaultTemplate', function () {
    //     grunt.file.write('.tmp/scripts/templates.js', 'this.JST = this.JST || {};');
    // });

    grunt.registerTask('test', function (isConnected) {
        isConnected = Boolean(isConnected);
        var testTasks = [
                'clean:tmp',
                'coffee:test',
                'handlebars:test',
                'compass:test',
                'connect:test',
                'mocha',
            ];

        if(!isConnected) {
            return grunt.task.run(testTasks);
        } else {
            // already connected so not going to connect again, remove the connect:test task
            testTasks.splice(testTasks.indexOf('connect:test'), 1);
            return grunt.task.run(testTasks);
        }
    });
    grunt.registerTask('dev', [
        'clean:tmp',
        'coffee:dist',
        //'handlebars:dist',
        'handlebars:test',
        'uglify:cmdhandlebars',
        // 'compass:dist',
        'watch'
    ]);
    grunt.registerTask('build', [
        'clean:tmp',
        'coffee:dist',
        'handlebars:test',
        'uglify:cmdhandlebars',
        'compass:dist',
        // 'useminPrepare',
        // 'htmlmin',
        //'concat',
        // 'cssmin',
        // 'uglify',
        // 'copy',
        // 'rev',
        // 'usemin'
        //'watch'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);
};
