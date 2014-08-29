//gulp modules
var gulp = require('gulp'),
    minify = require('gulp-minify-css'),
    less = require('gulp-less'),
    uglify = require('gulp-uglify'),//
    livereload = require('gulp-livereload'),
    nodemon = require('gulp-nodemon'),//
    plumber = require('gulp-plumber'),//
    notify = require('gulp-notify');//

function onError(err) {
  notify.onError(err.message)(err);
  this.emit('end');
}

//path for tasks
var paths = {
  less: './assets/less/*.less',
  js: './assets/javascripts/*.js'
}

gulp.task('less', function() {
  return gulp.src(paths.less)
    .pipe(plumber(onError))
    .pipe(less())
    .pipe(gulp.dest('./public/stylesheets/'));
});

gulp.task('js', function () {
  return gulp.src(paths.js)
  pipe(uglify())
  pipe(gulp.dest('./assets/javascripts'))
})

gulp.task('serve', function() {
  nodemon({
    script: 'app.js',
    ext: 'js',
    ignore: ['/assets/**', '/public/**']
  }).on('restart', function () {
    console.log('restarted! ' + (new Date()));
  });
})

gulp.task('watch', function () {

  livereload.listen();

  gulp.watch(paths.less, ['less']);
  gulp.watch(paths.js, ['js']);
  gulp.watch(['public/**/*', 'templates/**/*.jade'])
    .on('change', function(file) {
      livereload.changed(file.path);
    });
});

gulp.task('build', ['less', 'js']);
gulp.task('default', ['build', 'serve', 'watch']);
