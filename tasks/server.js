var config = require('../gulp-config')().server;
var gulp = require('gulp');
var webserver = require('gulp-webserver');


// tasks definitions
gulp.task('webserver', runServer);


// methods definitions
function runServer() {
  gulp
    .src(config.src)
    .pipe(webserver(config.options));
}