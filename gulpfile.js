var gulp = require('gulp'),
sass = require('gulp-sass'),
watch = require('gulp-watch'),
cssnano = require('gulp-cssnano'),
minifyJS = require('gulp-minify'),
rename = require('gulp-rename');

var foundationDir = 'public/foundation/',
stylesheetDir = 'public/stylesheets/',
sassFiles = [foundationDir + '*.scss', stylesheetDir + '*.scss'],
scriptsDir = 'public/js/';
scriptFiles = scriptsDir + 'global.js';

gulp.task('sassify', function(){
    gulp.src(sassFiles)
	    .pipe(sass())
		.pipe(rename({suffix: '.min'}))
		.pipe(cssnano())
		.pipe(gulp.dest(stylesheetDir));
});

gulp.task('scriptify', function(){
    gulp.src(scriptFiles)
        .pipe(minifyJS({
            ignoreFiles: ['-min.js']
        }))
        .pipe(gulp.dest(scriptsDir));
});

gulp.task('watch', function(){
	gulp.watch(sassFiles, ['sassify']);
    gulp.watch(scriptFiles, ['scriptify']);
});

gulp.task('default', ['sassify', 'scriptify', 'watch']);
