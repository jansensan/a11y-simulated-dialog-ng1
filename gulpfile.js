var gulp = require('gulp');
var requireDir = require('require-dir');
var runSequence = require('run-sequence');


// require tasks directory
requireDir('./tasks', {recurse: true});


// tasks definitions
gulp.task('default', ['compile']);
gulp.task('compile', compile);


// methods definitions
function compile() {
  runSequence(
    'build:vendors',
    'build:app',
    'template-cache',
    'styles',
    'webserver'
  );
}