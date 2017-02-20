'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var autoprefixer = require('autoprefixer');

gulp.task('sass:dev', function () {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sass({
            includePaths: [
                './src/sass',
                './src/sass/includes'
            ]
        }).on('error', sass.logError))
        .pipe(postcss([ autoprefixer() ]))
        .pipe(gulp.dest('./dist/css'));
});


gulp.task('sass:prod', function () {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: [
                './src/sass',
                './src/sass/includes'
            ],
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(postcss([ autoprefixer() ]))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./src/sass/**/*.scss', ['sass:dev']);
});
