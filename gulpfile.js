const path = require('path');
const gulp = require('gulp');
const less = require('gulp-less');

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

gulp.task('default', ['less', 'imageMove'], () => {
  gulp.watch('./src/less/**/*.less', () => {
    gulp.run('less');
  });
  console.log('gulp default task')
});