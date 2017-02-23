'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var file = require('gulp-file');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');

// All about that SASS
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

// All about that ES
var rollup = require('gulp-better-rollup');
var nodeResolve  = require('rollup-plugin-node-resolve');
var babel = require('rollup-plugin-babel');
var uglify = require('gulp-uglifyjs');

gulp.task('js', function () {
    return gulp.src('src/main.js')
        .pipe(sourcemaps.init())
        .pipe(rollup({
            plugins: [
                nodeResolve({
                    browser: true,
                    jsnext: true
                }),
                babel({
                    presets: [
                        ['latest', {
                            es2015: {
                                modules: false
                            }
                        }]
                    ],
                    babelrc: false,
                    exclude: 'node_modules/**'
                })
            ]
        }, {
            external: [ 'jquery', 'lodash' ],
            format: 'iife'
        }))
        .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write(''))
        .pipe(gulp.dest('dist'));
});

gulp.task('sass', function () {
    return gulp.src('sass/example.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: [
                'sass',
                'sass/includes'
            ],
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(postcss([ autoprefixer() ]))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('build', ['sass', 'js']);

gulp.task('watch', function () {
    gulp.watch('src/**/*.js', ['js']);
    gulp.watch('sass/**/*.scss', ['sass']);
});

gulp.task('default', ['watch']);
