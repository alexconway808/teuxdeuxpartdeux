var gulp = require('gulp');
var minify = require('gulp-minify-css');
var less = require('gulp-less');

gulp.task('less', function() {
  return gulp.src('./assets/less/styles.less')
    .pipe(less())
    .pipe(gulp.dest('./public/stylesheets/'));

});


gulp.task('default', ['css']);

//watch these files for css files and when they are changed then 
//trigger a bunch of tasks
gulp.task('watch', function() {
  gulp.watch('less/style.less', ['less']);

//this will watch any compiled file when changed it will take in the 
//file and run the refresh change file command
  gulp.watch('.public/**/*')
    .on('change', function(file) {
      livereload.changed(file.path);
    });


});