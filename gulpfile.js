var gulp = require('gulp');

var sass = require('gulp-sass');
var jade = require('gulp-jade');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');

gulp.task('jade', function() {
	gulp.src('jade/*.jade')
		.pipe(plumber())
		.pipe(jade())
		.pipe(gulp.dest('.'))
		.pipe(browserSync.stream());
});

gulp.task('sass', function() {
	gulp.src(['sass/*.sass', 'sass/*.scss'])
		.pipe(plumber())
		.pipe(sass())
		.pipe(gulp.dest('css'))
		.pipe(browserSync.stream());
});

gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: '.'
		}
	})
});

gulp.task('watch', function() {
	gulp.watch(['sass/*.sass', 'sass/*.scss'], ['sass']);
	gulp.watch('jade/*.jade', ['jade']);
});

gulp.task('default', ['sass', 'jade', 'watch', 'browser-sync']);
