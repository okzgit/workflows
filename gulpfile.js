var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect'),
    gulpIf = require('gulp-if'),
    uglify = require('gulp-uglify'),
    conu = require('gulp-concat-util');

var   env, jsSources, sassSources, htmlSources,       
         jsonSources,coffeeSource,
    outputDir,
    sassStyle;
    
    env = process.env.NODE_ENV || 'production';

    if (env==='development') {
          outputDir = 'builds/development/';
        sassStyle = 'expanded';
    }else {
            outputDir = 'builds/production/';
            sassStyle = 'compressed';
    }
    
 jsSources = ['components/scripts/rclick.js',
                 'components/scripts/pixgrid.js',
                 'components/scripts/tagline.js',
                 'components/scripts/template.js'
                ];

sassSources = ['components/sass/style.scss'];
htmlSources = [ outputDir + '*.html'];
jsonSources = [ outputDir + 'js/*.json'];

gulp.task('log', function () {
  
    gutil.log('It is working!');
    
});

coffeeSource = ['components/coffee/tagline.coffee'];
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
      .pipe(gulpIf(env === 'production', uglify()))
        .pipe(gulp.dest(outputDir + 'js'))
            .pipe(connect.reload())
});

gulp.task('compass', function() {
   gulp.src(sassSources)
    .pipe(compass({
       sass: 'components/sass',
       image: outputDir + 'images',
       style: sassStyle
   })
      .on('error', gutil.log))
     .pipe(gulp.dest(outputDir + 'css'))
        .pipe(connect.reload())
});

gulp.task('jss', function() {
   return gulp.src(jsSources)
    .pipe(conu('script.js'))
    .pipe(gulp.dest(outputDir + 'css'));  
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
        root: outputDir,
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
