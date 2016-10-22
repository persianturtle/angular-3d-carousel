var gulp = require('gulp');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var css = require('gulp-concat-css');

gulp.task('scripts', function() {
  return gulp.src(
    [
      'js/directives/carousel.js'
    ])
    .pipe(concat('angular-3d-carousel.js'))
    .pipe(gulp.dest('./dist'))
});

gulp.task('styles', function() {
  return gulp.src(
    [
      'css/carousel.css'
    ])
    .pipe(css('angular-3d-carousel.css'))
    .pipe(autoprefixer({
        browsers: ['last 5 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['styles', 'scripts']);

gulp.watch(
  [
    'js/*.js',
    'js/**/*.js',
    'css/*.css',
    'css/**/*.css'
  ],
  ['styles', 'scripts']
);
