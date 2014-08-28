var gulp = require('gulp'),
    minify = require('gulp-minify-css');

gulp.task('css', function() {

  gulp.src('public/stylesheets/styles.css')
    .pipe(minify())
    .pipe(gulp.dest(''));

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