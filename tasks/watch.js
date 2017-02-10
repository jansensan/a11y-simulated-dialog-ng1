var config = require('../gulp-config')().watch,
  gulp = require('gulp'),
  watch = require('gulp-watch');


// tasks definitions
gulp.task('watch:src', watchSources);


// methods definitions
function watchSources() {
  return watch(config.src, runDev)
}

function runDev() {
  gulp.start('dev');
}
