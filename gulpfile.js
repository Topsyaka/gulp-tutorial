const path = require('path');
const gulp = require('gulp');
const less = require('gulp-less');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const browserSync = require('browser-sync').create();
const del = require('del');

gulp.task('clean', () => {
  return del(['./dist']);
});

gulp.task('less', () => {
  return gulp.src('./src/less/main.less')
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(gulp.dest('./dist/css'))
});

gulp.task('imageMove', () => {
  return gulp.src('./src/img/**/**.*')
    .pipe(gulp.dest('./dist/img'))
});

gulp.task('js', () => {
  gulp.src('./src/js/app.js')
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(gulp.dest('./dist/js'))
});

gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });
});

gulp.task('allTasks', ['less', 'imageMove', 'js'] ,() => {
});

// task add watcher for js files and add js task to default
gulp.task('default', ['clean', 'browser-sync'], () => {
  gulp.run('allTasks');
  gulp.watch('./src/less/**/*.less', () => {
    gulp.run('less');
  });
  gulp.watch('./src/js/**/*.js', () => {
    gulp.run('js')
  });
  console.log('gulp default task')
});