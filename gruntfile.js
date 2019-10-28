module.exports = function(grunt) {

    grunt.initConfig({
        copy: {
            assets: {
                files: [
                    // includes files within path
                    //{expand: true, src: ['./node_modules/bootstrap/dist/js/**/*.js'], dest: '_/js', filter: 'isFile'},

                    // includes files within path and its sub-directories
                    //{expand: true, src: ['path/**'], dest: 'dest/'},

                    // makes all src relative to cwd
                    //{expand: true, cwd: './node_modules/bootstrap/dist/js/', src: ['./node_modules/bootstrap/dist/js/**/*.js'], dest: '_/js'},

                    // JSs
                    {
                        expand: true,
                        flatten: true,
                        src: [
                            './node_modules/bootstrap/dist/js/!**!/!*.js',
                            './node_modules/jquery/dist/!*.js',
                            './node_modules/undescores-for-npm/js/!*.js',
                            './node_modules/tether/dist/js/!*.js',
                        ],
                        dest: '_/js'
                    },
                    // CSSs
                    {
                        expand: true,
                        flatten: true,
                        src: [
                            './node_modules/tether/dist/css/!*.css',
                        ],
                        dest: '_/css'
                    },
                    // BOOTSTRAP 4 SASSs
                    {
                        expand: true,
                        cwd: './node_modules/bootstrap/scss/',
                        src: [
                            '**',
                        ],
                        dest: './scss/bootstrap4'
                    },
                    // FONT-AWSOME SASSs
                    {
                        expand: true,
                        cwd: './node_modules/font-awesome/scss/',
                        src: [
                            '*.scss',
                        ],
                        dest: './scss/fontawesome'
                    },
                    // FONT-AWSOME FONTs
                    {
                        expand: true,
                        flatten: true,
                        src: [
                            './node_modules/font-awesome/fonts/!**!/!*.{ttf,woff,woff2,eof,svg}',
                        ],
                        dest: './fonts'
                    },
                    // UNDERSCORES SASSs
                    {
                        expand: true,
                        cwd: './node_modules/undescores-for-npm/sass/',
                        src: [
                            '**',
                        ],
                        dest: './scss/underscores'
                    },
                ],
            },
        },
        uglify: {
            dev: {
                options: {
                    sourceMap: true,
                    compress: false,
                    beautify: true,
                    sourceMapName: './js/scripts.min.map'
                },
                files: {
                    './js/scripts.min.js': [
                        '_/js/tether.js', // TETHER
                        '_/js/bootstrap.js', // BOOTSTRAP
                        '_/js/skip-link-focus-fix.js', // UNDERSCORES DEPS
                        //'_/js/customizer.js', // UNDERSCORES DEPS
                        //'_/js/navigation.js', // UNDERSCORES DEPS
                    ]
                }
            },
            prod: {
                options: {
                    sourceMap: false,
                    compress: true,
                    beautify: false,
                },
                files: {
                    './js/script.min.js': ['_/js/**/*.js']
                }
            },
        },
        cssmin: {
            dev: {
                options: {
                    sourceMap: true
                },
                files: [{
                    expand: true,
                    cwd: '_/css',
                    //src: ['*.css', '!*.min.css'],
                    src: ['style.css'],
                    dest: '_/css',
                    ext: '.min.css'
                }]
            }
        },
        concat_sourcemap: {
            options: {
                // Task-specific options go here.
            },
            all: {
                files: {
                    //src: ["_/css/*.min.css.map"],
                    //dest: "./css/style.min.css.map"
                    './css/style.min.css': ['_/css/*.min.css']
                }
            }
        },
        concat_css: {
            options: {
                // Task-specific options go here.
            },
            all: {
                src: ["_/css/*.min.css"],
                dest: "./css/style.min.css"
            },
        },
        compass: {
            dev: {
                options: {
                    sassDir: '_/sass',
                    cssDir: '_/css',
                    outputStyle: 'expanded',
                    sourcemap: true,
                    require: ['susy']
                }
            },
            prod: {
                options: {
                    sassDir: '_/sass',
                    cssDir: '_/css',
                    outputStyle: 'compressed',
                    require: ['susy']
                }
            },
        },
        watch: {
            options: {
                //livereload: true
                //livereload: 35729
            },
            js: {
                files: ['_/js/*.js'],
                tasks: ['uglify:dev'],
            },
            css: {
                files: ['_/css/*.css', '_/css/*.min.css'],
                tasks: ['cssmin:dev'],
            },
            sass: {
                files: ['_/sass/**/*.scss'],
                tasks: ['compass:dev', 'cssmin:dev' ,'concat_sourcemap'],
            },
            php: {
                files: ['./**/*.php'],
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        './css/*.css',
                        './js/*.js',
                        './**/*.php'
                    ]
                },
                options: {
                    watchTask: true,
                    open: 'external',
                    proxy: 'localhost/wp-php-theme',
                    port: 8080,
                }
            }
        },
        /*php: {
            dev: {
                options: {
                    port: 80,
                    base: 'wp-php-theme'
                }
            }
        }*/
    });

    //grunt.loadNpmTasks('grunt-contrib-jshint');
    //grunt.registerTask('default', ['jshint']);

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-concat-sourcemap');
    //grunt.loadNpmTasks('grunt-php');

    grunt.registerTask('default', ['browserSync', 'watch']);
};