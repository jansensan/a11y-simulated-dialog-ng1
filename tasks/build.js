var config = require('../gulp-config')().build;
var gulp = require('gulp');
var concat = require('gulp-concat');


// tasks definitions
gulp.task('build:app', buildApp);
gulp.task('build:vendors', buildVendors);


// methods definitions
function buildApp() {
  return gulp
    .src(config.src.app)
    // concat files
    .pipe(concat('main.js'))
    // output file
    .pipe(gulp.dest(config.dest));
}

function buildVendors() {
  return gulp
    .src(config.src.vendors)
    // concat files
    .pipe(concat('vendors.js'))
    // output file
    .pipe(gulp.dest(config.dest));
}
