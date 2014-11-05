Minify scripts: gulp-uglify

Is important install locally the npm modules because of the versions. 
For that, we have to install like "npm install gulp".
And then ADD the packpage to node fiel: package.json:
"npm install gulp --save-dev"



The gulpfile.js: 
==================
var gulp = require('gulp');
var uglify = require('uglify');			// minify scripts
var concat = require('concat');			// minify scripts

gulp.task('scripts', function(){
	gulp.src('src/*.js')				// Anything with js extension
	.pipe(concat('all.min.js'))			// concat in destinifile
	.pipe(uglyfy())						// Minimize
	.pipe(gulp.dest('folder-dest'));
});

we can creae as many task as we want:
gulp.task('coffee', function(){
	gulp.src('src/*.coffee')
	.pipe(coffee())
	.pipe(gulp.dest('dest-folder'));
});

If we run in terminal: "gulp scripts", this function will be executed

Dependencies between scripts (Run first ): 
gulp.task('name_of_this_function', ['dependncies', 'coffe', ...], function(){ ... })


Task watch
===========
gulp.task('watch', function(){
	gulp.watch('src/*.{js,coffee,scss', ['name_function_to_run'])
})