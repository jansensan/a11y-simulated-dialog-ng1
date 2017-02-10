var config = require('../gulp-config')().styles;
var gulp = require('gulp');
var sass = require('gulp-sass');


// tasks definitions
gulp.task('styles', buildStyles);
gulp.task('styles:watch', watchStyles)


// methods definitions
function buildStyles() {
  return gulp.src(config.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.dest));
}

function watchStyles() {
  gulp.watch(config.src, ['styles']);
}
