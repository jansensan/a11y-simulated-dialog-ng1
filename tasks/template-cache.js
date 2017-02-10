var config = require('../gulp-config')().templateCache,
  gulp = require('gulp'),
  del = require('del'),
  template = require('gulp-angular-templatecache');


// tasks definitions
gulp.task('template-cache', ['clean:template-cache'], writeTemplateCache);
gulp.task('clean:template-cache', cleanTemplateCache);


// methods definitions
function writeTemplateCache() {
  return gulp
    .src(config.src)
    .pipe(template(
      config.fileName,
      config.opts
    ))
    .pipe(gulp.dest(config.dest));
}

function cleanTemplateCache(done) {
  var fileToDelete = config.dest.concat(config.fileName);
  return del(fileToDelete, done);
}
