var gulp = require('gulp');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var cleanCss = require('gulp-clean-css');
var concat = require('gulp-concat');
var css = require('gulp-concat-css');

gulp.task('scripts', function() {
  return gulp.src(
    [
      './bower_components/viewport-units-buggyfill/viewport-units-buggyfill.js',
      './bower_components/angular/angular.min.js',
      './bower_components/angular-animate/angular-animate.min.js',
      'js/*.js',
      'js/**/*.js'
    ])
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./bundle'));
});

gulp.task('styles', function() {
  return gulp.src(
    [
      'css/*.css',
      'css/**/*.css'
    ])
    .pipe(css("styles.css"))
    .pipe(cleanCss({compatibility: 'ie9'}))
    .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
    .pipe(gulp.dest('./bundle'));
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
