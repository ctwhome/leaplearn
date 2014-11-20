/*
 *  Gulp file
*/

// Compile sass
// Open browser
// Open node server
// Watch for changes

var appPath = 'app/'  // <<-- APP PATH
var settings = {
  compass: {
    mainSass  : appPath + 'assets/scss/style.scss',
    allStyles : appPath + 'scss/**/*.scss',
    dest      : appPath + 'assets/css',                   // is's generated the same name than the source
    
    // Compass options
    sourcemap : true,
    style     : 'compressed',                          // nested, expanded, compact, or compressed
    css       : appPath + 'assets/css',
    sass      : appPath + 'assets/scss',
    image     : appPath + 'assets/img',
    fonts     : appPath + 'assets/css/fonts',
    temp      : appPath + 'assets/css'
  },
  scripts: {
    src       : appPath + 'assets/js/*.js',
    dest      : 'app.min.js',
    folderDest: appPath + 'assets/js'
  },
  server : {
    host      : "localhost",
    port      : "8080"
  }
}


var gulp        = require('gulp');
var plumber     = require('gulp-plumber');            // Prevent pipe breaking caused by errors from gulp plugins

var compass     = require('gulp-compass')

// var uglify      = require('gulp-uglify');          // minify scripts
// var concat      = require('gulp-concat');          // minify scripts
var run         = require('gulp-run');
var opn         = require('opn');                     // Open window in the browser
var livereload  = require('gulp-livereload');

// 
// Compile Sass with compass and sourcemaps
//
gulp.task('compass', function() {
  gulp.src(settings.compass.mainSass)
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(compass({
      sourcemap: settings.compass.sourcemap,
      style : settings.compass.style,                 // nested, expanded, compact, or compressed
      css: settings.compass.css,
      sass: settings.compass.sass,
      image: settings.compass.image
    }))
    .on('error', function(err) {
      // Would like to catch the error here
    })

    .pipe(gulp.dest(settings.compass.temp));
});

//
// Compile js
//
// gulp.task('scripts', function(){
//   gulp.src(settings.scripts.src)                    // Anything with js extension
//   .pipe(concat(settings.scripts.dest))              // concat in destinifile
//   //.pipe(uglify())                                 // Minimize
//   .pipe(gulp.dest(settings.scripts.folderDest));
// });

//
// Run node server
//
gulp.task('server', function(){
   run('cat welcome').exec();
   run('node web_server').exec()  
})
//
// Open browser
//
gulp.task('openbrowser', ['server'], function() {
  opn( 'http://' + settings.server.host + ':' + settings.server.port );
});

//
// Watch listener
//
gulp.task('watch', function() {
  gulp.watch( settings.compass.allStyles, ['compass']);
  livereload.listen();
  gulp.watch(appPath + '**').on('change', livereload.changed);
});


//gulp.task('build', ['sass']);

gulp.task('default', ['compass', 'openbrowser', 'watch']);
