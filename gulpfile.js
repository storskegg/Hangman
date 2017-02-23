'use strict';

var gulp = require('gulp');
var file = require('gulp-file');
var sass = require('gulp-sass');
var uglify = require('gulp-uglifyjs');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var autoprefixer = require('autoprefixer');
var rollup = require('rollup');
var babel = require('rollup-plugin-babel');

// gulp.task('js', function () {
//     return gulp.src('./src/main.js')
//         .pipe(sourcemaps.init())
//         .pipe(gulp.dest('./dist'));
// });
gulp.task('js', function () {
    return rollup.rollup({
        entry: './src/main.js',
        plugins: [
            babel({
                presets: [
                    [
                        "es2015", {
                            "modules": false
                        }
                    ]
                ],
                babelrc: false,
                exclude: 'node_modules/**'
            })
        ]
    })
    .then(bundle => {
        return bundle.generate({
            format: 'umd',
            moduleName: 'myModuleName'
        })
    })
    .then(gen => {
        return file('app.js', gen.code, {src: true})
            .pipe(uglify())
            .pipe(gulp.dest('./dist'));
    });
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
