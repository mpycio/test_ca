var gulp   = require('gulp'),
  clean = require('gulp-clean'),
  jshint = require('gulp-jshint'),
  inject = require('gulp-inject'),
  concat = require('gulp-concat'),
  connect = require('gulp-connect'),
  mainBowerFiles = require('main-bower-files'),
  sass = require('gulp-sass')
  ;

gulp.task('clean', function () {
  return gulp.src('./dist/*', {read: false})
    .pipe(clean());
});

gulp.task('lint', function() {
  return gulp.src([
    './app/app.js',
    './app/components/**/*.js']
  )
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('html-copy', function(){
  return gulp.src([
    './app/**/*.html',
    './app/components/**/*.html'
  ])
  .pipe(gulp.dest('./dist'))
  .pipe(connect.reload());
});

gulp.task('assets-copy', function(){
  return gulp.src([
      './lib/region-flags/svg/*',
    ])
    .pipe(gulp.dest('./dist/assets/flags'))
    .pipe(connect.reload());
});

gulp.task('vendor-css', function(){
  return gulp.src([
    'lib/html5-boilerplate/dist/css/normalize.css',
    'lib/html5-boilerplate/dist/css/main.css'
  ])
  .pipe(concat('vendor.css'))
  .pipe(gulp.dest('./dist/css'))
});

gulp.task('app-css', function(){
  return gulp.src([
    './app/*.scss',
    './app/components/**/*.scss']
  )
  .pipe(sass().on('error', sass.logError))
  .pipe(concat('main.css'))
  .pipe(gulp.dest('./dist/css'));
});

gulp.task('vendor-js', function() {

  return gulp.src(mainBowerFiles(), { base: './lib' })
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('app-js', function() {
  return gulp.src([
      './app/*.js',
      './app/**/*.js',
      '!./app/**/*_test.js',
      './components/**/*.js',
      '!./components/**/*_test.js'
    ])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./dist/js/'))
    .pipe(connect.reload());
});

gulp.task('index', ['html-copy', 'assets-copy', 'app-css', 'vendor-css', 'app-js', 'vendor-js'], function () {
  var sources = gulp.src([
    './dist/js/app.js',
    './dist/css/*.css'
  ], {read: false});

  return gulp.src('./app/index.html')
    .pipe(inject(gulp.src('./dist/js/vendor.js', {read: false}), {relative: true, ignorePath: '../dist/'}))
    .pipe(inject(sources, {relative: true, ignorePath: '../dist'}))
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload());
});

// Watch Files For Changes
gulp.task('watch', ['index'], function() {

  gulp.watch([
    './app.js',
    './app/**/*.js',
    './app/components/**/*.js'
  ], ['app-js']);

  gulp.watch([
    './app.scss',
    './app/**/*.scss',
    './app/components/**/*.scss'
  ], ['app-css']);

  gulp.watch([
    './app/**/*.html',
    './app/components/**/*.html'
  ], ['index']);

});

gulp.task('connect', function() {
  connect.server({
    root: './dist/',
    livereload: true,
    port: 9000,
    fallback: './dist/index.html'
  });
});

gulp.task('build:dev', ['clean'], function() {
  gulp.start(
    'index',
    'watch',
    'connect'
  );
});
