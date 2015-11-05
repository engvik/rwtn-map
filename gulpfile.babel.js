import gulp from 'gulp';
import { styleCheck } from 'gulp-eslint-style-checker';

gulp.task('style-check', () => {
  return styleCheck(['src/**/*.js', 'src/**/*.jsx']);
});

gulp.task('default', ['style-check']);
