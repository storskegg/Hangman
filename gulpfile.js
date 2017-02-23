'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var autoprefixer = require('autoprefixer');

gulp.task('js', function () {
    return gulp.src('./src/main.js')
        .pipe(sourcemaps.init())
        .pipe(gulp.dest('./dist'));
});

gulp.task('sass', function () {
    return gulp.src('./src/sass/example.scss')
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

gulp.task('build', ['sass', 'js']);

gulp.task('watch', function () {
    gulp.watch('./src/**/*.js', ['js']);
    gulp.watch('./src/sass/**/*.scss', ['sass']);
});

gulp.task('default', ['watch']);
