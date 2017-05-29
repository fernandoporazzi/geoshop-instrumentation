const gulp = require('gulp');
const uglify = require('gulp-uglify');
const connect = require('gulp-connect');

gulp.task('js', () => {
  gulp.src(['assets/js/**/*.js'])
    .pipe(uglify({
      output: {
        comments: /^!|@preserve|@license|@cc_on/i
      }
    }))
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('webserver', () => {
  connect.server({
    root: '',
    port: 8001,
    https: true
  });
});

gulp.task('watch', () => {
  gulp.watch('assets/js/**/*.js', ['js']);
})

gulp.task('dist', ['js']);

gulp.task('dev', ['js', 'watch', 'webserver']);
