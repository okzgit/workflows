var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee');


gulp.task('log', function () {
  
    gutil.log('It is working!');
    
});

var coffeeSource = ['components/coffee/tagline.coffee'];
gulp.task('coffee', function() {
    
        gulp.src(coffeeSource)
        .pipe(coffee({bare: true })
             .on('error', gutil.log ))
              .pipe(gulp.dest('components/scripts'))
});