var gulp = require('gulp'),
sass = require('gulp-sass'),
watch = require('gulp-watch'),
minify = require('gulp-minify-css'),
rename = require('gulp-rename');

var foundationDir = 'public/foundation/',
stylesheetDir = 'public/stylesheets/',
sassDirs = [foundationDir + '*.scss', stylesheetDir + '*.scss'];

gulp.task('sassify', function(){
    gulp.src(sassDirs)
	    .pipe(sass())
		.pipe(rename({suffix: '.min'}))
		.pipe(minify())
		.pipe(gulp.dest(stylesheetDir));
});

gulp.task('watch', function(){
	gulp.watch(sassDirs, ['sassify']);
});

gulp.task('default', ['sassify', 'watch']);
