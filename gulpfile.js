var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    conu = require('gulp-concat-util');

var jsSources = ['components/scripts/rclick.js',
                 'components/scripts/pixgrid.js',
                 'components/scripts/tagline.js',
                 'components/scripts/template.js'
                ];


gulp.task('log', function () {
  
    gutil.log('It is working!');
    
});

var coffeeSource = ['components/coffee/tagline.coffee'];
gulp.task('coffee', function() {
    
        gulp.src(coffeeSource
                )
        .pipe(coffee({bare: true })
             .on('error', gutil.log ))
              .pipe(gulp.dest('components/scripts'))
});

gulp.task('js', function() {
   gulp.src(jsSources)
    .pipe(concat('script.js'))
        .pipe(gulp.dest('builds/development/js'))
});

gulp.task('jss', function() {
   return gulp.src(jsSources)
    .pipe(concat('script.js'))
    .pipe(gulp.dest('builds/development/js')); 
});