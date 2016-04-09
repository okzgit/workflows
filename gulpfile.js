var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect'),
    conu = require('gulp-concat-util');

var jsSources = ['components/scripts/rclick.js',
                 'components/scripts/pixgrid.js',
                 'components/scripts/tagline.js',
                 'components/scripts/template.js'
                ];

var sassSources = ['components/sass/style.scss'];

var htmlSources = ['builds/development/*.html'] ;
var jsonSources = ['builds/development/js/*.json'];

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
     .pipe(browserify())
        .pipe(gulp.dest('builds/development/js'))
            .pipe(connect.reload())
});

gulp.task('compass', function() {
   gulp.src(sassSources)
    .pipe(compass({
       sass: 'components/sass',
       image: 'builds/development/images',
       style: 'expanded'
   })
      .on('error', gutil.log))
     .pipe(gulp.dest('builds/development/css'))
        .pipe(connect.reload())
});

gulp.task('jss', function() {
   return gulp.src(jsSources)
    .pipe(conu('script.js'))
    .pipe(gulp.dest('builds/development/css')); 
});

gulp.task('watch', function() {
   gulp.watch(coffeeSource, ['coffee']);
    gulp.watch(jsSources, ['js']);
        gulp.watch('components/sass/*.scss', ['compass']);
          gulp.watch(htmlSources, ['html']);
            gulp.watch(jsonSources, ['json']);
});

gulp.task('connect', function() {
    connect.server({
        root: 'builds/development/',
        livereload: true  
    });
});

gulp.task('html', function() {
   gulp.src(htmlSources)  
    .pipe(connect.reload())
});

gulp.task('json', function() {
   gulp.src(jsonSources)  
    .pipe(connect.reload())
});

gulp.task('default', ['html', 'json', 'coffee', 'js', 'compass', 'connect', 'watch']);
